import mongoose from 'mongoose'
import { collectionSchema } from './collection'

const { Schema } = mongoose

const timeTableSchema = new Schema({
  season: String,
  content: [collectionSchema],
})

const TimeTable = mongoose.model('TimeTable', timeTableSchema)

export default TimeTable
export { TimeTable, timeTableSchema }
