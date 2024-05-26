import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getWorker = async (req, res) => {
  try {
    const workers = await prisma.worker.findMany();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: "Error getting workers" });
  } finally {
    await prisma.$disconnect();
  }
};


export const procedureInsertWorker = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await prisma.$executeRaw`CALL sp$worker$insert(${name}, ${email}, ${password})`;
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

export const procedureUpdateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const nameNull = name ? name : null;
    const emailNull = email ? email : null;
    const passwordNull = password ? password : null;
    const result = await prisma.$executeRaw`CALL sp$worker$update(${id}, ${nameNull}, ${emailNull}, ${passwordNull})`;
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

export const procedureDeleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.$executeRaw`CALL sp$worker$delete(${id})`;
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