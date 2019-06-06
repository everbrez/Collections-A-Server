import mongoose from 'mongoose'
import crypto from 'crypto'
import uuid from 'uuid'
import config from 'config'
import Counter from './counter'
import Validator from './validator'

const userValidator = new Validator('User')

const { Schema } = mongoose

// user schema
const userSchema = new Schema({
  uid: {
    type: Number,
    required: true,
  },
  uname: {
    type: String,
    default: uuid.v4,
    trim: true
  },
  hash_password: {
    type: String,
    default: uuid.v4
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
  points: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
    trim: true,
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
const unameValidator = userValidator.setField('uname', 'user name')

userSchema.path('uname')
  .validate(...unameValidator.notEmpty())
  .validate(...unameValidator.unique())

const emailValidator = userValidator.setField('email')
userSchema.path('email')
  .validate(...emailValidator.notEmpty())
  .validate(...userValidator.unique('email'))
  .validate(...emailValidator.email())

// methods
userSchema.methods = {
  encryptPassword(password) {
    if (typeof password !== 'string') return
    if (!password.trim()) return
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
  },

  updatePassword(newPassword) {
    this.password = newPassword
    return this.update({
      hash_password: this.hash_password,
      salt: this.salt
    })
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
    const options = {
      // run validator
      runValidators: true,
      new: true,
      omitUndefined: true
    }

    // filter protected fields
    // can not update these fields with this method
    const {
      password,
      hash_password: hashPassword,
      uid: userId,
      ...others
    } = doc

    return this.findOneAndUpdate({ uid }, { $set: others }, options)
      .select(privateFields.map(field => `-${field}`))
      .lean()
  },

  unique(field, value) {
    return this.findOne({ [field]: value })
      .select(`${field}`)
      .lean()
  }
}

const User = mongoose.model('User', userSchema)

export default User
