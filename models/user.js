import mongoose from 'mongoose'
import crypto from 'crypto'
import config from 'config'
import Counter from './counter'

const { Schema } = mongoose

// user schema
const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    default: ''
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

userSchema.virtual('password')
  .set(function (password) {
    this.salt = this.makeSalt()
    this.hash_password = this.encryptPassword(password)
  })

// validate
userSchema.path('userName')
  .validate((name = '') => name.length, 'userName can\'t be blank!')
  .validate((name) => {
    const User = mongoose.model('User')
    return User.find({ userName: name }).exec()
      .then(users => (users.length ? Promise.reject(new Error('username exited')) : true))
  }, 'userName `{VALUE}` has already exited!')

// methods
userSchema.methods = {
  encryptPassword(password) {
    if (!password) return
    try {
      return crypto
        .createHmac('sha512', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },

  makeSalt() {
    return `${Math.round(new Date().valueOf() * Math.random())}`
  },

  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hash_password
  }
}

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
