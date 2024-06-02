import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

const valid = (title, description, workerid, files = {}, isFileRequired = false) => {
  const errors = [];
  if (!title?.trim()) errors.push('Title is required');
  if (!description?.trim()) errors.push('Description is required');
  if (!workerid) errors.push('Worker ID is required');
  if (isFileRequired && (!files.image || !files.audio)) errors.push('Both image and audio files are required');

  if (errors.length) {
    if (files.image && !isFileRequired) fs.unlinkSync(`./public/uploads/${files.image.filename}`);
    if (files.audio && !isFileRequired) fs.unlinkSync(`./public/uploads/${files.audio.filename}`);
    return errors.join(', ');
  }

  return '';
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
      audio: req.files.audio ? req.files.audio[0] : null
    };
    if (!workerid) {
      if (files.image) fs.unlinkSync(`./public/uploads/${files.image.filename}`);
      if (files.audio) fs.unlinkSync(`./public/uploads/${files.audio.filename}`);
      return res.status(400).json({ status: false, errors: 'Worker ID is required' });
    }
    const existingWorker = await prisma.worker.findUnique({ where: { id: parseInt(workerid) } });
    if (!existingWorker) {
      if (files.image) fs.unlinkSync(`./public/uploads/${files.image.filename}`);
      if (files.audio) fs.unlinkSync(`./public/uploads/${files.audio.filename}`);
      return res.status(400).json({ status: false, errors: 'Worker ID does not exist' });
    }
    const validErrors = valid(title, description, workerid, files, true);
    if (validErrors) {
      if (files.image) fs.unlinkSync(`./public/uploads/${files.image.filename}`);
      if (files.audio) fs.unlinkSync(`./public/uploads/${files.audio.filename}`);
      return res.status(400).json({ status: false, errors: validErrors });
    }
    const newArtwork = await prisma.artwork.create({ 
      data: { 
        title, 
        description, workerid: 
        parseInt(workerid), 
        image: files.image.filename, 
        audio: files.audio.filename, 
      } 
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
      audio: req.files.audio ? req.files.audio[0] : null
    };
    if (!title?.trim() || !description?.trim() || !workerid) {
      if (files.image) fs.unlinkSync(`./public/uploads/${files.image.filename}`);
      if (files.audio) fs.unlinkSync(`./public/uploads/${files.audio.filename}`);
      return res.status(400).json({ status: false, errors: 'Title, Description, and Worker ID are required' });
    }
    const existingArtwork = await prisma.artwork.findUnique({ where: { id: parseInt(id) } });
    if (!existingArtwork) {
      if (files.image) fs.unlinkSync(`./public/uploads/${files.image.filename}`);
      if (files.audio) fs.unlinkSync(`./public/uploads/${files.audio.filename}`);
      return res.status(404).json({ status: false, errors: 'Artwork not found' });
    }

    let values = { title, description, workerid: parseInt(workerid) };

    if (files.image) {
      values.image = files.image.filename;
      if (existingArtwork.image) fs.unlinkSync(`./public/uploads/${existingArtwork.image}`);
    }
    if (files.audio) {
      values.audio = files.audio.filename;
      if (existingArtwork.audio) fs.unlinkSync(`./public/uploads/${existingArtwork.audio}`);
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
      if (artwork.image) fs.unlinkSync(`./public/uploads/${artwork.image}`);
      if (artwork.audio) fs.unlinkSync(`./public/uploads/${artwork.audio}`);
      res.status(200).json({ status: true, message: 'Artwork deleted' });
    } else {
      res.status(404).json({ status: false, message: 'Artwork not found' });
    }
  } catch (error) {
    res.status[500].json({ status: false, error });
  }
};