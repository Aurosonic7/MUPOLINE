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