import { PrismaClient } from '@prisma/client';
import { Dropbox } from 'dropbox';
import QRCode from 'qrcode';

const prisma = new PrismaClient();
const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN_DROPBOX });

const valid = (title, description, workerid, files = {}, isFileRequired = false) => {
  const errors = [];
  if (isFileRequired && (!files.image || !files.audio)) errors.push('Both image and audio files are required');
  if (errors.length) {
    return errors.join(', ');
  }
  return '';
};

const uploadToDropbox = async (file) => {
  try {
    const uploadResponse = await dbx.filesUpload({
      path: '/' + file.originalname,
      contents: file.buffer,
    });
    // console.log('Upload Response:', uploadResponse);

    const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
      path: uploadResponse.result.path_lower,
    });
    // console.log('Link Response:', linkResponse);

    const rawUrl = linkResponse.result.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
    // console.log('Generated Raw Image URL:', rawUrl);
    return rawUrl;
  } catch (error) {
    // console.error('Error uploading to Dropbox:', error);
    throw error;
  }
};

const deleteFromDropbox = async (url) => {
  try {
    const path = url.split('/').pop().split('?')[0];
    await dbx.filesDeleteV2({ path: '/' + path });
  } catch (error) {
    console.error('Error deleting file from Dropbox:', error);
    throw new Error('Failed to delete file from Dropbox');
  }
};

const generateQRCode = async (url) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url);
    return qrCodeDataUrl;
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
};

export const getArtworks = async (req, res) => {
  try {
    const { id } = req.params;
    const artworks = id ? await prisma.artwork.findUnique({ where: { id: parseInt(id) } }) : await prisma.artwork.findMany();
    res.status(200).json({ status: true, artworks });
  } catch (error) {
    res.status(500).json({ status: false, error });
  }
};

export const createArtwork = async (req, res) => {
  try {
    const { title, description, workerid } = req.body;
    const files = {
      image: req.files.image ? req.files.image[0] : null,
      audio: req.files.audio ? req.files.audio[0] : null,
    };

    if (!workerid) 
      return res.status(400).json({ status: false, errors: 'Worker ID is required' });

    const existingWorker = await prisma.worker.findUnique({ where: { id: parseInt(workerid) } });
    if (!existingWorker)
      return res.status(400).json({ status: false, errors: 'Worker ID does not exist' });
    

    const validErrors = valid(title, description, workerid, files, true);
    if (validErrors) {
      return res.status(400).json({ status: false, errors: validErrors });
    }

    const imageUrl = await uploadToDropbox(files.image);
    console.log('Generated Image URL:', imageUrl);
    const audioUrl = await uploadToDropbox(files.audio);
    console.log('Generated Audio URL:', audioUrl);
    const qrCodeUrl = await generateQRCode(audioUrl); 

    const newArtwork = await prisma.artwork.create({
      data: {
        title,
        description,
        workerid: parseInt(workerid),
        image: imageUrl,
        audio: audioUrl,
        QRCode: qrCodeUrl,
      },
    });
    
    res.status(201).json({ status: true, message: 'Artwork created', newArtwork });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ status: false, error: error.message, details: error });
  }
};

export const updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, workerid } = req.body;
    const files = {
      image: req.files.image ? req.files.image[0] : null,
      audio: req.files.audio ? req.files.audio[0] : null,
    };

    const existingArtwork = await prisma.artwork.findUnique({ where: { id: parseInt(id) } });
    if (!existingArtwork) {
      return res.status(404).json({ status: false, errors: 'Artwork not found' });
    }

    let values = {};

    if (title) values.title = title;
    if (description) values.description = description;
    if (workerid) values.workerid = parseInt(workerid);

    if (files.image) {
      await deleteFromDropbox(existingArtwork.image);
      values.image = await uploadToDropbox(files.image);
    }
    if (files.audio) {
      await deleteFromDropbox(existingArtwork.audio);
      values.audio = await uploadToDropbox(files.audio);
      values.QRCode = await generateQRCode(values.audio);
    }

    const validErrors = valid(title, description, workerid, files, false);
    if (!validErrors) {
      await prisma.artwork.update({ where: { id: parseInt(id) }, data: values });
      res.status(200).json({ status: true, message: 'Artwork updated' });
    } else {
      res.status(400).json({ status: false, errors: validErrors });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ status: false, error: error.message, details: error });
  }
};

export const deleteArtwork = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.$transaction(async (tx) => {
      const artwork = await tx.artwork.findUnique({ where: { id: parseInt(id) } });
      if (!artwork) {
        throw new Error('Artwork not found');
      }

      await deleteFromDropbox(artwork.image);
      await deleteFromDropbox(artwork.audio);

      await tx.artwork.delete({ where: { id: parseInt(id) } });
    });

    res.status(200).json({ status: true, message: 'Artwork deleted' });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
