const jwt = require("jsonwebtoken");
const { format } = require("date-fns");
const config = require("config")
const { User, Transaction } = require('../mongodb/schemas/schemas');
const { getSort } = require("../helpers/utils");

const secretKey = config.get('secretKey')

const login = async ({ password, email }) => {
  if (!email || !password) {
    throw new Error('You must send username and password');
  }

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

  return { user, token_id: token };
};

const createUser = async ({ input }) => {
  if (!input.username || !input.password) {
    throw new Error('You must send username and password');
  }

  const existingUser = await User.findOne({ email: input.email });

  if (existingUser) {
    throw new Error('A user with that email already exists');
  }

  const newUser = new User({
    ...input,
    balance: 500,
    transactions: []
  });

  const token = jwt.sign({ email: newUser.email }, secretKey, { expiresIn: '1h' });

  await newUser.save();

  return { user: newUser, token_id: token };
};

const userInfo = async ({ sort }, ctx) => {
  const userEmail = ctx?.user;

  if (!userEmail) {
    throw new Error('UnauthorizedError');
  }

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.balance || !user.password) {
    throw new Error('Invalid user');
  }

  if (sort?.field && sort?.direction && user.transactions.length > 0) {
    const transactions = await Transaction.find({ _id: { $in: user.transactions } });
    const sortedTransactions = getSort(transactions, sort.field, sort.direction);

    return { ...user.toObject(), transactions: sortedTransactions };
  }

  return user;
};

const sendTransaction = async ({ amount, username }, ctx) => {
  const userEmail = ctx?.user;

  if (!userEmail) {
    throw new Error('UnauthorizedError');
  }

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.balance === null) {
    throw new Error('Invalid user');
  }

  const updatedBalance = user.balance - amount;

  if (updatedBalance < 0) {
    throw new Error(`Not enough tokens on your balance`);
  }

  const transactionDate = new Date();
  const formattedDate = format(transactionDate, 'dd.MM.yyyy, HH:mm:ss');
  const transactionCount = user.transactions.length + 1;

  const transaction = new Transaction({
    id: transactionCount,
    amount: -amount,
    username,
    date: formattedDate,
    balance: updatedBalance
  });

  await transaction.save();

  await User.updateOne(
    { email: userEmail },
    {
      $set: { balance: updatedBalance },
      $push: { transactions: transaction }
    }
  );

  return { trans_token: transaction };
};

const getAllUsers = async ({ filter }, ctx) => {
  const username = filter?.username;
  const userEmail = ctx?.user;

  if (username) {
    const users = await User.find({ email: { $ne: userEmail }, username: { $regex: username, $options: 'i' } });
    return users;
  }

  const users = await User.find({ email: { $ne: userEmail } });

  return users;
};

module.exports = { login, createUser, getAllUsers, sendTransaction, userInfo }
