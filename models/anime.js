import mongoose from 'mongoose'
import Counter from './counter'

const { Schema } = mongoose

const animeSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  aliases: [String],
  cover: String,
  poster: String,
  season: String,
  index: Number,
  updateIndex: Number,
  status: Boolean,
  tags: [String],
  likes: {
    type: Number,
    default: 0
  },
  score: Number,
  meta: {
    createdDate: Date,
    updateDate: Date,
  },
  info: {
    description: String,
    // todo: add cast
    // todo: add series
  },
  refer: {
    site: String,
    twitter: String,
    copyright: String,
  },
  // todo: add history
})

// statics methods
animeSchema.statics = {
  async add(anime) {
    const id = await Counter.getNextValue('anime')
    return this.create({ ...anime, id })
  },

  getAnimeById(id) {
    return this.findOne({ id }).exec()
  },

  updateAnimeById(id, anime) {
    return this.findOneAndUpdate({ id }, { ...anime }, { new: true, upsert: false }).exec()
  }

}

const Anime = mongoose.model('Anime', animeSchema)

export default Anime
