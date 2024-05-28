import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export const getWorker = async (req, res) => {
  try {
    const workers = await prisma.worker.findMany();
    res.status(200).json(workers);
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

export const registerWorker = async (req, res) => {
  try {
    const { email, password } = req.body;
    const idworker = 1;
    const idboss = 1;
    const name = null;
    const workerExists = await prisma.worker.findFirst({ where: { email: email } });
    if (workerExists) return res.status(400).json({ message: "Worker already exists" });
    const hash256 = crypto.createHash('sha256').update(password).digest('hex');
    const newWorker = await prisma.worker.create({
      data: {
        idworker,
        idboss,
        name,
        email,
        password: hash256 
      }
    });
    res.status(201).json({ message: "Worker created", newWorker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating worker" });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await prisma.worker.delete({ where: { idworker: parseInt(id) } });
    res.status(200).json({ message: "Worker deleted", worker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting worker" });
  } finally {
    await prisma.$disconnect();
  }
};