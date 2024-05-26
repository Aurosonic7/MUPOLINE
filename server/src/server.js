import express from 'express';
import cors from 'cors';

import workerRoutes from './routes/Worker.routes.js';

const server = express();
const URI = process.env.DATABASE_URL ? process.env.DATABASE_URL : "mysql://root:12345678@localhost:3306/db_Mupoline"

//Settings
server.set('port', process.env.PORT ? process.env.PORT : 5001);

//Middlewares
server.use( cors({ origin: "http://localhost:3000", credentials: true, }) );
server.use(express.json());

//Routes
server.use('/api/workers', workerRoutes);



export default server;