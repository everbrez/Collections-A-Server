import mongoose from 'mongoose'

import getNextValue from './getNextValue'

const { Schema } = mongoose

const couterSchema = new Schema({
  id: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[\w_]+$/g,
  },
  value: {
    type: Number,
    default: 0,
  },
})

// add statics methods
couterSchema.statics.getNextValue = getNextValue

export default couterSchema
