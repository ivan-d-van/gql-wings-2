const { login, createUser, getAllUsers, sendTransaction, userInfo } = require('./handlers')

const root = {
  login,
  createUser,
  userInfo,
  sendTransaction,
  getAllUsers
};

module.exports = root
