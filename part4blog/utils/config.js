require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@fullstackopen.p11mir4.mongodb.net/blogApp?retryWrites=true&w=majority&appName=FullStackOpen`

module.exports = {
  MONGODB_URI,
  PORT
}