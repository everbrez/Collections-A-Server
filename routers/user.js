import express from 'express'
import User from 'models/user'
import { client } from 'db'
import uuid from 'uuid'
import config from 'config'
import { getUserInfo } from '../controllers/user'

const router = express.Router()


// login

function checkCookie(req, res, next) {
  const { sid } = req.cookies

  if (sid) {
    client.getAsync(sid).then((value) => {
      if (value) res.json({ message: 'success login with cookie'})
      else next()
    })
  } else {
    next()
  }
}

// set cors
function setCors(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Credentials', 'true')

  next()
}

router.options('/login', setCors, (req, res) => {
  res.end()
})

router.post('/login', setCors, async (req, res) => {
  const { uname, password, email, remember } = req.body

  const user = await User.findOne({ $or: [{ uname }, { email }] }).exec().catch(() => { res.json({ error: 'fail: unknown reason' }) })

  if (!user) res.json({ error: 'user didn\'t exitd'})
  if (user.authenticate(password)) {
    // generate session id
    const sid = uuid.v4()
    // redis
    client.setAsync(sid, 'true', 'PX', config.expireTime).catch(err => console.log(err.message))

    res.cookie('sid', sid, { maxAge: remember ? config.expireTime : 2000 })
    res.json({ ...user._doc, sid })
    res.end()
  } else {
    res.json({ error: 'fail: password not authenticated' })
  }
})

router.get('/logout', setCors, async (req, res) => {
  console.log('logout--')
  const { sid } = req.cookies
  await client.delAsync(String(sid))
  res.clearCookie('sid')
  res.json({ message: 'logout success' })
})


// register
router.post('/register', async (req, res) => {
  const { body } = req
  const { uname, password, email } = body

  let result = {}
  try {
    result = await User.add({
      uname,
      password,
      email,
    })
    res.json(result)
    res.end()
  } catch (err) {
    res.end(err.message)
  }
})

// user pages
router.get('/:uname', async (req, res) => {
  const { uname } = req.params
  const user = await User.getUserByName(uname)
  if (!user || user.length <= 0) {
    res.sendStatus(404)
    return
  }
  res.json({ user })
  res.end()
})

router.post('/api/users', getUserInfo, (req, res) => {
  res.json(req.user)
})

router.put('/api/users', async (req, res) => {
  const { uid, uname } = req.body

  const user = await User.updateUser(uid, {
    uname
  })

  res.json(user)
})

export default router
