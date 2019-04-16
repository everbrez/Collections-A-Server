import mongoose from 'mongoose'
import addUser from './add'
import { getUserById, getUserByMail, getUserByName } from './get'
import { updateUserById } from './update'
import { deleteUserById } from './delete'

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
  mail: {
    type: String,
    required: true,
  },
  phone: String,
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

// bind methods
userSchema.statics = {
  addUser,
  getUserById,
  getUserByMail,
  getUserByName,
  updateUserById,
  deleteUserById,
}

const User = mongoose.model('User', userSchema)

export default User
