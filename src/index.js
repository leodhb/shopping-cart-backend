const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


require('dotenv/config');
const app = express();

const postsRouter = require('./routes/products-router');

app.use(bodyParser.json());
app.use(cors());
app.use('/products', postsRouter);

//COnn to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('[MONGODB] Conectado ao database'))
    .catch(err => console.log('[MONGODB] Erro ao conectar ao database:', err));

app.listen(3000, () => console.log('[API] Positivo e operante na porta 3000'));

