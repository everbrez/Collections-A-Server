import mongoose from 'mongoose'
import config from '../config'

const { database } = config

// mongoose connection options
const options = {
  useNewUrlParser: true,
}

mongoose.connect(database, options)

const db = mongoose.connection

// handle event
db.on('connecting', () => console.log('database is connecting...'))

db.on('connected', () => console.log('database is connected'))

db.on('close', () => console.log('database is closed'))

db.on('reconnected', () => console.log('database is reconnected'))

db.on('error', err => console.log(`an error occurs on a database connection: ${err.message}`))

db.on('reconnectFailed', () => console.log('reconnected is failed'))

export default db
