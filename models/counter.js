import mongoose from 'mongoose'

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
couterSchema.statics = {
  getNextValue(id) {
    return this.findOneAndUpdate({ id }, { $inc: { value: 1 } }, {
      new: true,
      upsert: true,
    }).then(data => data.value)
  },
}

const Counter = mongoose.model('Counter', couterSchema)

export default Counter
