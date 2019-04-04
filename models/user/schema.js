import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  user_id: Number,
  user_name: String,
  user_pwd: String,
  vip: Number,
  level: Number,
  exp: Number,
  coins: Number,
  avatar: String,
  information: {
    mail: String,
    phone: String,
  },
  social_media: {
    github: String,
    bilibili: String,
    qq: String,
    wechat: String,
    twitter: String,
    facebook: String,
    google: String,
  },
  // todo: add timeline
  // todo: add history
})

export default userSchema
