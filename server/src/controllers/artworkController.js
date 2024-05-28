import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const prisma = new PrismaClient();

export const getArtwork = async (req, res) => {
  try {
    const artwork = await prisma.artwork.findMany();
    res.json(artwork);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting artwork" });
  } finally {
    await prisma.$disconnect();
  }
};

export const procedureRegisterArtwork = async (req, res) => {
  try {
    const { title, description, audio, image, idworker } = req.body;
    const result = await prisma.$executeRaw`CALL sp$artwork$insert(${title}, ${description}, ${audio}, ${image}, ${idworker})`;
    console.log(result);
    res.status(200).json({ message: "Procedimiento almacenado ejecutado correctamente" });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error execute procedure stored" });
  } finally {
    await prisma.$disconnect();
  }
};

export const procedureDeleteArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.$executeRaw`CALL sp$artwork$delete(${id})`;
    console.log(result);
    res.status(200).json({ message: "Procedimiento almacenado ejecutado correctamente" });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error execute procedure stored" });
  } finally {
    await prisma.$disconnect();
  }
};

export const uploadArtwork = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.buffer : null;

    const newArtwork = await prisma.artwork.create({
      data: {
        title,
        description,
        image,
        createat: new Date(),
        updateat: new Date(),
      },
    });

    res.status(201).json(newArtwork);
  } catch (error) {
    console.error("Error al subir la obra de arte:", error);
    res.status(500).json({ error: 'Failed to upload artwork', details: error.message });
  }
};
















// Obtener una obra de arte por ID
export const getArtworks = async (req, res) => {
  try {
    const { id } = req.params;
    const artwork = await prisma.artwork.findUnique({
      where: { idartwork: parseInt(id) },
    });

    if (!artwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.status(200).json(artwork);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve artwork' });
  }
};