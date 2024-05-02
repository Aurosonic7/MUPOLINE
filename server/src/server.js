import express from 'express';
import cors from 'cors';

const server = express();
const URI = process.env.DATABASE_URL ? process.env.DATABASE_URL : "mysql://root:12345678@localhost:3306/db_Mupoline"

server.set('port', process.env.PORT ? process.env.PORT : 8080);

server.use(cors());
server.use(express.json());



export default server;