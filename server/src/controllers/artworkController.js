import { PrismaClient } from '@prisma/client';
import { Dropbox } from 'dropbox';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();
const dbx = new Dropbox({ accessToken: process.env.ACCESS_TOKEN_DROPBOX });

const valid = (title, description, workerid, files = {}, isFileRequired = false) => {
  const errors = [];
  if (!title?.trim()) errors.push('Title is required');
  if (!description?.trim()) errors.push('Description is required');
  if (!workerid) errors.push('Worker ID is required');
  if (isFileRequired && (!files.image || !files.audio)) errors.push('Both image and audio files are required');

  if (errors.length) {
    return errors.join(', ');
  }

  return '';
};

const uploadToDropbox = async (file) => {
  const filePath = path.join(process.cwd(), 'public', 'uploads', file.filename);
  const buffer = await fs.readFile(filePath);
  const uploadResponse = await dbx.filesUpload({
    path: '/' + file.filename,
    contents: buffer,
  });
  const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
    path: uploadResponse.result.path_lower,
  });
  await fs.unlink(filePath); // Eliminar el archivo del servidor después de subirlo a Dropbox
  return linkResponse.result.url.replace('?dl=0', '?raw=1');
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

    if (!workerid) {
      return res.status(400).json({ status: false, errors: 'Worker ID is required' });
    }

    const existingWorker = await prisma.worker.findUnique({ where: { id: parseInt(workerid) } });
    if (!existingWorker) {
      return res.status(400).json({ status: false, errors: 'Worker ID does not exist' });
    }

    const validErrors = valid(title, description, workerid, files, true);
    if (validErrors) {
      return res.status(400).json({ status: false, errors: validErrors });
    }

    const imageUrl = await uploadToDropbox(files.image);
    const audioUrl = await uploadToDropbox(files.audio);

    const newArtwork = await prisma.artwork.create({
      data: {
        title,
        description,
        workerid: parseInt(workerid),
        image: imageUrl,
        audio: audioUrl,
      },
    });
    res.status(201).json({ status: true, message: 'Artwork created', newArtwork });
  } catch (error) {
    res.status(500).json({ status: false, error });
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

    if (!title?.trim() || !description?.trim() || !workerid) {
      return res.status(400).json({ status: false, errors: 'Title, Description, and Worker ID are required' });
    }

    const existingArtwork = await prisma.artwork.findUnique({ where: { id: parseInt(id) } });
    if (!existingArtwork) {
      return res.status(404).json({ status: false, errors: 'Artwork not found' });
    }

    let values = { title, description, workerid: parseInt(workerid) };

    if (files.image) {
      values.image = await uploadToDropbox(files.image);
    }
    if (files.audio) {
      values.audio = await uploadToDropbox(files.audio);
    }

    const validErrors = valid(title, description, workerid);
    if (!validErrors) {
      await prisma.artwork.update({ where: { id: parseInt(id) }, data: values });
      res.status(200).json({ status: true, message: 'Artwork updated' });
    } else {
      res.status(400).json({ status: false, errors: validErrors });
    }
  } catch (error) {
    res.status(500).json({ status: false, error });
  }
};

export const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const artwork = await prisma.artwork.findUnique({ where: { id: parseInt(id) } });

    if (artwork) {
      await prisma.artwork.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ status: true, message: 'Artwork deleted' });
    } else {
      res.status(404).json({ status: false, message: 'Artwork not found' });
    }
  } catch (error) {
    res.status(500).json({ status: false, error });
  }
};
