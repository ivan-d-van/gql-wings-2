const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  balance: { type: Number, default: 500 },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  username: { type: String, required: true },
  date: { type: String },
  balance: { type: Number, required: true },
  id: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { User, Transaction };
