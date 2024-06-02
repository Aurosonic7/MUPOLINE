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
  }
};

export const loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash256 = crypto.createHash('sha256').update(password).digest('hex');
    const worker = await prisma.worker.findUnique({ where: { email } });
    if (!worker) return res.status(404).json({ message: "Worker not found" });
    if (worker.password !== hash256) return res.status(400).json({ message: "Incorrect password" });
    res.status(200).json({ message: "Worker found", worker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error login worker" });
  }
};

export const registerWorker = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password) return res.status(400).json({ message: "Password is required" });
    const workerExists = await prisma.worker.findFirst({ where: { email } });
    if (workerExists) return res.status(400).json({ message: "Worker already exists" });
    const hash256 = crypto.createHash('sha256').update(password).digest('hex');
    const newWorker = await prisma.worker.create({ data: { email, password: hash256, } });
    res.status(201).json({ message: "Worker created", newWorker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating worker" });
  }
};

export const updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const worker = await prisma.worker.findUnique({ where: { id: parseInt(id) } });
    if (!worker) return res.status(404).json({ message: "Worker not found" });
    let updatedData = {};
    if (email) updatedData.email = email;
    if (password) {
      const hash256 = crypto.createHash('sha256').update(password).digest('hex');
      updatedData.password = hash256;
    }
    const updatedWorker = await prisma.worker.update({ where: { id: parseInt(id) }, data: updatedData });
    res.status(200).json({ message: "Worker updated", updatedWorker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating worker" });
  }
};

export const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await prisma.worker.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: "Worker deleted", worker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting worker" });
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit();
});
