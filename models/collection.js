import mongoose from 'mongoose'

const { Schema } = mongoose

const collectionSchema = new Schema({
  id: Number,
  type: String,
})

export default collectionSchema

export { collectionSchema }
