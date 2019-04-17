import mongoose from 'mongoose'
import config from 'config'
import Counter from 'models/counter'

const { Schema } = mongoose

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
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
  email: {
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

// model methods
userSchema.statics = {
  async add(user) {
    const id = await Counter.getNextValue(config.user.counter || 'user')
    return this.create({ ...user, id })
  },

  getUserByName(userName) {
    return this.findOne({ userName }).exec()
  },

  getUserById(id) {
    return this.findOne({ id }).exec()
  },

  getUserByEmail(email) {
    return this.findOne({ email }).exec()
  },

  updateUserNameByName(userName, newUserName) {
    return this.findOneAndUpdate({ userName }, { userName: newUserName }, {
      new: true,
      upsert: false,
    }).exec()
  },

}

const User = mongoose.model('User', userSchema)

export default User
