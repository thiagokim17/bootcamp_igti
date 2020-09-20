import express from 'express';
import transactionController from '../controller/transactionController.js'

const transactionRouter = express.Router();

//CREATE
transactionRouter.post('/transaction', transactionController.create);

//GET
transactionRouter.get('/transactionall', transactionController.findAll);
transactionRouter.get('/transactionid/:id', transactionController.findOne);
transactionRouter.get('/transaction?:period', transactionController.findByMes);

//UPDATE
transactionRouter.put('/transaction/:id', transactionController.update);

//DELETE
transactionRouter.delete('/transaction/:id', transactionController.remove);

export default transactionRouter;

