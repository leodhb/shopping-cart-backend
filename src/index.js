require('dotenv/config');
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() =>   console.log('[MONGODB] Conectado ao database'))
    .catch(err => console.log('[MONGODB] Erro ao conectar ao database:', err));

app.listen(process.env.PORT, () => console.log('[API] Positivo e operante na porta 3000'));

