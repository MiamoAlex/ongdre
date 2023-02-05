import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

// Dossier public
app.use(express.static('./public'));

app.listen(3006);