import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routers/todoRoutes.js';
import routerType from './routers/typeRouter.js'
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (err) => {
    console.log(err);
});

database.once('connected', () => {
    console.log('Kết nối thành công!');
});

app.use('/', todoRoutes);
app.use('/type', routerType);
app.listen(8088, () => {
    console.log("Listening on port 8088");
});
