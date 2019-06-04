import mongoose from 'mongoose'
import uuid from 'uuid'

import config from 'config'
import session from 'models/session'

const User = mongoose.model('User')

// user info

export async function getUserInfo(req, res, next) {
  const { uname, email } = req.body

  if (!(uname || email)) {
    res.status(400).json({ error: 'a user name or an email is required' })
  }

  const user = await User.getUserInfo({ uname, email })
    .catch(res.status(500).error({ code: 500 }))

  if (!user) {
    res.status(404).json({ error: 'user not found' })
    return
  }

  req.user = user
  next()
}

export async function getUserDetail(req, res, next) {
  if (!req.uid) res.status(500).json({ error: 'required a user id' })

  const user = await User.getUserDetail({ uid: req.uid })
    .catch(res.status(500).error())

  if (!user) {
    res.status(404).json({ error: 'user not found' })
    return
  }

  req.user = user
  next()
}

export function sendUserInfo(req, res, next) {
  const { user } = req
  res.status(200).json({ data: user })
}

export function updateUserDetail(...field) {
  return async function (req, res) {
    if (!req.uid) res.status(500).json({ error: 'user id not found' })

    const type = req.query.type ? req.query.type : field[0]

    if (!type || !field.includes(type)) res.status(403).json({ error: 'type error' })

    const newValue = req.body[type]

    const user = await User.updateUser(req.uid, {
      [type]: newValue
    })
      .catch(res.status(403).error())

    res.status(200).json(user)
  }
}

export async function userLogin(req, res) {
  const { uname, email, password, remember } = req.body

  const user = await User.getUser({ uname, email })
    .catch(error => res.status(500).json({ error: error.message }))

  if (!user) {
    res.json({ error: `user ${uname || email} is not exit` })
    return
  }

  // success find user
  if (user.authenticate(password)) {
    // if password pass validate
    // generate a session id
    const sid = uuid.v4()

    // set redis
    session.set(sid, user.uid, remember ? config.expireTime : config.defaultExpireTime)

    // set cookies
    res.cookie('sid', sid, { maxAge: remember ? config.expireTime : config.defaultExpireTime})
    res.status(200).json({ code: 200, message: 'login success' })

    return
  }

  // validate password fail
  res.status(402).json({ code: 402, error: 'password validate fail' })
}

export async function userLogout(req, res) {
  const { sid } = req.cookies
  if (sid) {
    await session.del(String(sid))
      .catch(error => res.status(500).json({ code: 500, error: `logout fail: ${error.message}` }))
  }

  res.clearCookie('sid')
  res.status(200).json({ code: 200, message: 'logout success' })
}

export async function checkLogin(req, res, next) {
  const { sid } = req.cookies

  if (!sid) {
    // Unauthorized 未登录
    res.status(401).json({
      code: 401,
      error: 'you can request this resource after login'
    })
    return
  }

  // 查询 session id 是否存在
  const sidVal = await session.get(String(sid))

  if (sidVal) {
    // if session id exited
    req.uid = sidVal
    next()
    return
  }

  // else guide to login page
  res.status(401).json({
    code: 401,
    error: 'you can request this resource after login'
  })
}

export async function register(req, res) {
  const { uname, password, email } = req.body
  const userData = {
    uname,
    password,
    email
  }

  const user = await User.add(userData)
    .catch(res.status(403).error())

  if (user) {
    const sid = uuid.v4()
    console.log(user, 'user')

    // set redis
    session.set(sid, user.uid, config.defaultExpireTime)

    // set cookies
    res.cookie('sid', sid)
    res.status(201).json({ code: 201, message: 'created'})

    return
  }

  res.status(500).json({ code: 500, error: 'unkown error occur'})
}
