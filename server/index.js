import express from 'express';
import connection from './database/db.js';
import dotenv from 'dotenv'
import cors from 'cors';
import Router from './routes/route.js';
dotenv.config()
const app = express();
app.use(express.json())
app.use(cors())

app.use('/',Router)

const PORT = 4000
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
connection(USERNAME,PASSWORD)
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))