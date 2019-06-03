import mongoose from 'mongoose'
import config from 'config'
import Counter from 'models/counter'
import 'model'

const { database } = config
mongoose.set('useFindAndModify', false);

// mongoose connection options
const options = {
  useNewUrlParser: true,
  ...database.options,
}

mongoose.connect(database.uri, options)
  .catch(err => console.log(`an error occurs on a database connection: ${err.message}`))

const db = mongoose.connection

// handle event
db.on('connecting', () => console.log('database is connecting...'))

db.on('connected', () => {
  console.log('database is connected')
  init()
})

db.on('close', () => console.log('database is closed'))

db.on('reconnected', () => console.log('database is reconnected'))

db.on('error', err => console.log(`an error occurs on a database connection: ${err.message}`))

db.on('reconnectFailed', () => console.log('reconnected is failed'))

console.log('database is connecting...')

// init database
function init() {
  // check the counter for user
  Counter.findOne({ id: config.user.counter }, (err, userCounter) => {
    if (err) console.log(err.message)
    else {
      // if null, then create the counter
      // eslint-disable-next-line no-lonely-if
      if (!userCounter) {
        Counter.create({
          id: config.user.counter,
          value: config.user.defaultUserId - 1,
        },
        (error) => {
          if (error) console.log(err.message)
          else console.log('userCounter check successfully!')
        })
      } else {
        console.log('userCounter check successfully!')
      }
    }
  })
}

export default db
