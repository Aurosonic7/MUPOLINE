import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todas las obras de arte
export const getAllArtworks = async (req, res) => {
  try {
    const artworks = await prisma.artwork.findMany({ include: { worker: true } });
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva obra de arte
export const createArtwork = async (req, res) => {
  const { title, description, workerid } = req.body;
  const audio = req.files.audio ? req.files.audio[0].path : null;
  const image = req.files.image ? req.files.image[0].path : null;

  try {
    const newArtwork = await prisma.artwork.create({
      data: {
        title,
        description,
        audio,
        image,
        workerid: parseInt(workerid),
      },
    });

    // Construir la URL completa para la imagen y el audio
    const response = {
      ...newArtwork,
      audioUrl: audio ? `${req.protocol}://${req.get('host')}/${audio}` : null,
      imageUrl: image ? `${req.protocol}://${req.get('host')}/${image}` : null,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una obra de arte existente
export const updateArtwork = async (req, res) => {
  const { id } = req.params;
  const { title, description, workerid } = req.body;
  const audio = req.files && req.files.audio ? req.files.audio[0].path : null;
  const image = req.files && req.files.image ? req.files.image[0].path : null;

  try {
    const existingArtwork = await prisma.artwork.findUnique({ where: { id: Number(id) } });

    if (!existingArtwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    const updatedArtwork = await prisma.artwork.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        audio: audio ? audio : existingArtwork.audio,
        image: image ? image : existingArtwork.image,
        workerid: parseInt(workerid),
        updateat: new Date(),
      },
    });

    // Construir la URL completa para la imagen y el audio
    const response = {
      ...updatedArtwork,
      audioUrl: audio ? `${req.protocol}://${req.get('host')}/${audio}` : existingArtwork.audio,
      imageUrl: image ? `${req.protocol}://${req.get('host')}/${image}` : existingArtwork.image,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una obra de arte
export const deleteArtwork = async (req, res) => {
  const { id } = req.params;

  try {
    const existingArtwork = await prisma.artwork.findUnique({ where: { id: Number(id) } });

    if (!existingArtwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    await prisma.artwork.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
