import mongoose from 'mongoose';
import TransactionModel from './TransactionModel.js'

const db = {};

mongoose.set('useFindAndModify', false);
db.mongoose = mongoose;

db.transaction = TransactionModel(mongoose);

export { db };