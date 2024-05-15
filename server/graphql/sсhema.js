const {buildSchema} = require('graphql')

const schema = buildSchema(`
  enum Directions {
    ASC
    DESC
  }
  
  input UserInput {
    username: String!
    password: String!
    email: String!
  }
  
  input FilterInput {
    limit: Float
    username: String
  }
  
  input SortInput {
    field: String
    direction: Directions
  }
  
   type User {
     username: String!
     email: String!
     balance: Float!
     transactions: [UserTransaction]
  }
 
  type UserResponse {
    user: User,
    token_id: String!
  }
  
  type Transaction {
    id: Float
    date: String
    user: User
    amount: Float
  }
  
  type UserTransaction {
    id: Float
    date: String
    username: String
    balance: Float
    amount: Float
  }
    
  type TransactionResponse {
    trans_token: UserTransaction
  }
  
  type Query {
    getAllUsers(filter: FilterInput): [User]
    userTransactions: [UserTransaction]
    login(email: String!, password: String!): UserResponse
    userInfo(sort: SortInput): User!
  }
  
  type Mutation {
     createUser(input: UserInput): UserResponse
     sendTransaction(username: String!, amount: Float!): TransactionResponse!
  }
`)

module.exports = schema
