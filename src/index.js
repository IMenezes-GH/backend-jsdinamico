import Express from "express";
import chalk from "chalk";

import { configDotenv } from "dotenv";

import cors from 'cors';
import corsOptions from "./config/corsOptions.js";

configDotenv();

import {cLog, cInfo, cWarn, cError} from './config/chalkConfig.js';

// ROUTES =============================================================
import {router as root} from "./routes/root.js";
import {router as userRoute} from './routes/user.js';
import {router as taskRoute} from './routes/task.js';
import {router as authRoute} from './routes/auth.js';

import mongoConnect from "./config/mongoConnect.js";
import mongoose from "mongoose";

// -------------------------------------------------------------------
// Conectar ao DB primeiro
mongoConnect();

const PORT = process.env.PORT || 3100; 
const app = Express();

app.use(cors());

app.use('/', Express.urlencoded({extended:false}));

app.use('/', root);
app.use('/user', userRoute);
app.use('/user', taskRoute);
app.use('/login', authRoute);

app.all('*', async (req, res) => {
    
    res.status(404);
    res.json({message: '404 - Página não existe.'});
})


mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        cInfo(`Servidor está rodando no port: ${chalk.yellow(PORT)}`);
    })
});