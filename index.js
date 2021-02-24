const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();

//COnn to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao database'))
    .catch(err => console.log('Erro ao conectar ao database:', err));

app.listen(3000, () => console.log('Positivo e operante na porta 3000'));