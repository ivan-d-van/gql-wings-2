const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const config = require("config")
const mongoose = require('mongoose');

const authMiddleware = require("./middlewears/auth");
const schema = require('./graphql/sсhema')
const root = require('./graphql/root')

const PORT = config.get('serverPort')
const MONGO_DATA = config.get('mongoConfig')

const MONGODB_URI = `mongodb://${MONGO_DATA.host}:${MONGO_DATA.port}/${MONGO_DATA.dbName}`

const app = express()
app.use(cors())
app.use('/graphql', authMiddleware);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/graphql', graphqlHTTP((req) => {
  return {
    graphiql: true,
    schema,
    context: {
      user: req.user
    },
    rootValue: root
  }
}))

app.listen(PORT, () => console.log(`Server is already - ${PORT}`) )
