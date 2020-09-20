import { db } from '../models/index.js'

const Transaction = db.transaction;

const create = async (req, res) => {
    const transaction = new Transaction(req.body);

    try {

        const data = await transaction.save();
        res.send(data);
    } catch (err) {
        res.status(500).send(`Erro ao inserir uma nova transaction' - ERRO: ${err}`);
    }
};

const findAll = async (req, res) => {
    try {

        const data = await Transaction.find();
        res.send(data);
    } catch (err) {
        res.status(500).send(`Erro ao buscar todas as transactions' - ERRO: ${err}`);
    }
};

const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Transaction.findById({ _id: id });
        if (!data) {
            res.status(404).send(`Não encontrado nenhuma transaction com esse ID: ${id}`)
        } else {
            res.send(data);
        }
    } catch (err) {
        res.status(500).send(`Erro ao buscar a transactions de ID: ${id} - ERRO: ${err}`);
    }
};

const findByMes = async (req, res) => {
    const period = req.query.period;
    if (!period) {
        res.send('Necessario informar o period no formato aaaa-mm');
    }

    console.log(period)

    try {

        const data = await Transaction.find({ yearMonth: period });
        if (!data) {
            res.status(404).send(`Não encontrado nenhuma transaction neste periodo: ${period}`)
        } else {
            res.send(data);
        }
    } catch (err) {
        res.status(500).send(`Erro ao buscar a transactions no periodo: ${period} - ERRO: ${err}`);
    }
};

const update = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Transaction.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!data) {
            res.status(404).send(`Não encontrado nenhuma transaction com esse ID: ${id}`)
        } else {
            res.send(data);
        }
    } catch (err) {
        res.status(500).send(`Erro ao atualizar a transactions de ID: ${id} - ERRO: ${err}`);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Transaction.findByIdAndRemove({ _id: id });
        if (!data) {
            res.status(404).send(`Não encontrado nenhuma transaction com esse ID: ${id}`)
        } else {
            res.send('Transaction excluida com sucesso');
        }

    } catch (err) {
        res.status(500).send(`Erro ao excluir a transactions de ID: ${id} - ERRO: ${err}`);
    }
};

export default { create, findAll, findOne, findByMes, update, remove };