import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import multer from 'multer';

import workerRoutes from './routes/Worker.routes.js';
import artworkRouter from './routes/Artwork.routes.js';

const server = express();
const URI = process.env.DATABASE_URL ? process.env.DATABASE_URL : "mysql://root:12345678@localhost:3306/db_Mupoline"

//Settings
server.set('port', process.env.PORT ? process.env.PORT : 5001);
server.set('port_front', process.env.PORT_FRONT ? process.env.PORT_FRONT : 3001);
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

//Middlewares
server.use( cors({ origin: `http://localhost:${server.get('port_front')}`, credentials: true, }) );
console.log(`Front: http://localhost:${server.get('port_front')}`);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(multer({ dest: path.join(__dirname, 'public/img/uploads')}).single('image'))
server.use(morgan('dev'));

//Routes
server.use('/api/workers', workerRoutes);
server.use('/api/artworks', artworkRouter);

export default server;