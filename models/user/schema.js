import mongoose from 'mongoose'
import add from './add'
import getUserById from './get'

const { Schema } = mongoose

const userSchema = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_pwd: {
    type: String,
    required: true,
  },
  vip: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  exp: {
    type: Number,
    default: 0,
  },
  coins: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default: '',
  },
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

// bind funtions
userSchema.statics.add = add
userSchema.statics.getUserById = getUserById

export default userSchema
