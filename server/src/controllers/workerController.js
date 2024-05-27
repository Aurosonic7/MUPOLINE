import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export const getWorker = async (req, res) => {
  try {
    const workers = await prisma.worker.findMany();
    res.json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting workers" });
  } finally {
    await prisma.$disconnect();
  }
};

export const loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash256 = crypto.createHash('sha256').update(password).digest('hex');
    const worker = await prisma.worker.findFirst({ where: { email: email, password: hash256, } });

    if (worker) res.status(200).json({ message: "Worker found", worker });
    else res.status(404).json({ message: "Worker not found" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error login worker" });
  } finally {
    await prisma.$disconnect();
  }
};

export const procedureRegisterWorker = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash256 = crypto.createHash('sha256').update(password).digest('hex');
    const result = await prisma.$executeRaw`CALL sp$worker$insert(${name}, ${email}, ${hash256})`;
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