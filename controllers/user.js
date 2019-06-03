import mongoose from 'mongoose'
import { client } from 'db'

const User = mongoose.model('User')

// user info

export async function getUserInfo(req, res, next) {
  const { uname, email } = req.body

  if (!(uname || email)) {
    res.status(400).json({ error: 'a user name or an email is required' })
  }

  const user = await User.getUserInfo({ uname, email })
    .catch(error => res.status(500).json({ error: error.message }))

  if (!user) {
    res.status(404).json({ error: 'user not found' })
    return
  }

  req.user = user
  next()
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
  const sidVal = await client.getAsync(sid)

  if (sidVal) {
    // if session id exited
    next()
    return
  }

  // else guide to login page
  res.status(401).json({
    code: 401,
    error: 'you can request this resource after login'
  })
}
