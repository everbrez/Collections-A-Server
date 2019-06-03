import mongoose from 'mongoose'
import crypto from 'crypto'
import config from 'config'
import Counter from './counter'

const { Schema } = mongoose

// user schema
const userSchema = new Schema({
  uid: {
    type: Number,
    required: true,
  },
  uname: {
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
userSchema.path('uname')
  .validate((name = '') => name.length, 'user name can\'t be blank!')
  .validate((name) => {
    const User = mongoose.model('User')
    return User.find({ uname: name }).exec()
      .then(users => (users.length ? Promise.reject(new Error('user name exited')) : true))
  }, 'user name `{VALUE}` has already exited!')

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

const privateFields = ['_id', 'hash_password', 'salt', '__v']

// model methods

function or(query) {
  return Object.keys(query)
    .filter(key => ['uname', 'uid', 'email'].includes(key))
    .map(key => ({ [key]: query[key] }))
}

userSchema.statics = {
  getUser(user, fields = []) {
    return this.findOne({ $or: or(user) })
      .select(fields.join(' '))
  },

  // get user common info by user name or email
  getUserInfo(user) {
    const commonSelectedFields = ['uname', 'email', 'uid', 'avatar', 'level', '-_id']
    return this.getUser(user, commonSelectedFields).lean()
  },

  // get all user info by user name or email
  getUserDetail(user) {
    return this.getUser(user, privateFields.map(field => `-${field}`)).lean()
  },

  async add(user) {
    const uid = await Counter.getNextValue(config.user.counter || 'user')
    return this.create({ ...user, uid })
  },

  updateUser(uid, doc) {
    return this.findOneAndUpdate({ uid }, { $set: doc }, {
      new: true,
    })
      .select(privateFields.map(field => `-${field}`))
      .lean()
  }
}

const User = mongoose.model('User', userSchema)

export default User
