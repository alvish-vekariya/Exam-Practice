import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import express from 'express';
import config from 'config';
import { connection } from './db/db.connection';
import container from './inversify config/inversify.config';
import './controllers';
import path from 'path';
import cors from 'cors';

const server = new InversifyExpressServer(container);
server.setConfig(app=>{
    app.use(express.json());
    app.use(cors({
        origin : 'http://localhost:4200',
        credentials : true
    }))
    app.use(express.static(path.join(__dirname, '..','public','profiles')));
})

const app = server.build();
const port = config.get("PORT") || 3000;

app.listen(config.get("PORT"),()=>{
    console.log(`Server is connected on ${port}!!`);
    connection().then(()=>{console.log("Database is connected!!")}).catch((err: any)=>{console.log('error while connecting to the server : ' +err.message)});
})