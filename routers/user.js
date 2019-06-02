import express from 'express'
import User from 'models/user'
import { client } from 'db'
import uuid from 'uuid'
import config from 'config'

const router = express.Router()

// login

function checkCookie(req, res, next) {
  const { sessionId } = req.cookies

  if (sessionId) {
    client.getAsync(sessionId).then((value) => {
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
  const { userName, password, email, remember } = req.body

  const user = await User.findOne({ $or: [{ userName }, { email }] }).exec().catch(() => { res.json({ error: 'fail: unknown reason' }) })

  if (!user) res.json({ error: 'user didn\'t exitd'})
  if (user.authenticate(password)) {
    // generate session_id
    const sessionId = uuid.v4()
    // redis
    client.setAsync(sessionId, 'true', 'PX', config.expireTime).catch(err => console.log(err.message))

    res.cookie('sessionId', sessionId, { maxAge: remember ? config.expireTime : 2000 })
    res.json({ ...user._doc, sessionId })
    res.end()
  } else {
    res.json({ error: 'fail: password not authenticated' })
  }
})

router.get('/logout', setCors, async (req, res) => {
  console.log('logout--')
  const { sessionId } = req.cookies
  await client.delAsync(String(sessionId))
  res.clearCookie('sessionId')
  res.json({ message: 'logout success' })
})


// register
router.post('/register', async (req, res) => {
  const { body } = req
  const { userName, password, email } = body

  let result = {}
  try {
    result = await User.add({
      userName,
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
router.get('/:userName', async (req, res) => {
  const { userName } = req.params
  const user = await User.getUserByName(userName)
  if (!user || user.length <= 0) {
    res.sendStatus(404)
    return
  }
  res.json({ user })
  res.end()
})

export default router
