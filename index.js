import express from 'express';
import cors from 'cors';
import transactionRouter from './routes/routes.js';
import path from 'path';
import dotenv from 'dotenv';
import { db } from './models/index.js'


/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Vinculando o React ao app
 */
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Rota raiz
 */
app.get('/api/', (_, response) => {
  response.send({
    message:
      'Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações',
  });
});

/**
 * Rotas principais do app
 */
app.use('/api', transactionRouter);

/**
 * Conexão ao Banco de Dados
 */
const { DB_CONNECTION } = process.env;

console.log('Iniciando conexão ao MongoDB...');
(async () => {
  try {
    await db.mongoose.connect(
      DB_CONNECTION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.error(`Erro na conexão ao MongoDB - ${err}`);
        }
      }
    );

    console.log('Conectado com sucesso...');
  }
  catch (err) {
    console.log(err);
  }
})();

const { connection } = db.mongoose;

connection.once('open', () => {
  console.log('Conectado ao MongoDB');

  /**
   * Definição de porta e
   * inicialização do app
   */
  const APP_PORT = process.env.PORT || 3001;
  app.listen(APP_PORT, () => {
    console.log(`Servidor iniciado na porta ${APP_PORT}`);
  });
});
