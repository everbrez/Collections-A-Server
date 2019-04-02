import mongoose from 'mongoose'

const { Schema } = mongoose

const animeSchema = new Schema({
  item_id: Number,
  title: String,
  aliases: [String],
  cover: String,
  poster: String,
  season: String,
  index: Number,
  update_index: Number,
  status: Boolean,
  tags: [String],
  likes: Number,
  score: Number,
  meta: {
    created_date: Date,
    update_date: Date,
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

const Anime = mongoose.model('Anime', animeSchema)

export default Anime
export { Anime, animeSchema }
