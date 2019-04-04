import mongoose from 'mongoose'
import schema from './schema'

const Counter = mongoose.model('Counter', schema)

export default Counter
