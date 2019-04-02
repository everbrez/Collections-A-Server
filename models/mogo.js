import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/test')

const db = mongoose.connection

db.on('error', e => console.log('error: ', e.message))

db.on('open', () => {
  console.log('connect')
})
