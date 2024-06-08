import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import workerRoutes from './router/Worker.routes.js';
import artworkRouter from './router/Artwork.routes.js';

const server = express();

// Settings
server.set('port', process.env.PORT || 5005);
server.set('host', process.env.HOST || 'localhost');
server.set('port_front', process.env.PORT_FRONT || 3001);
server.set('host_front', process.env.HOST_FRONT || 'localhost');

// Middlewares
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
const corsOptions = {
  origin: `http://${server.get('host_front')}:${server.get('port_front')}`,
  credentials: true,
};
server.use(cors(corsOptions));
server.use(morgan('dev'));

// Routes
server.use(workerRoutes);
server.use(artworkRouter);

// Middleware routes Not found
server.use((req, res) => { res.status(404).json({ status: false, errors: 'Not found' }) });

// Exporting server
export default server;
