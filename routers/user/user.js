import express from 'express'
import User from 'models/user'
import { client } from 'db'
import uuid from 'uuid'
import config from 'config'

const router = express.Router()
router.use(express.urlencoded())

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

router.post('/login', async (req, res, next) => {
  const { userName } = req.body
  const { sessionId } = req.cookies

  if (sessionId) {
    client.getAsync(userName).then((value) => {
      if (sessionId === value) res.end('success login with cookie')
      else next()
    })
  } else {
    next()
  }
}, async (req, res) => {
  const { userName, password } = req.body

  User
    .findOne({ userName }).exec()
    .then((user) => {
      if (!user) res.end('user didn\'t exitd')
      if (user.authenticate(password)) {
        // generate session_id
        const sessionId = uuid.v4()
        client.setAsync(user.userName, sessionId, 'PX', config.expireTime).catch(err => console.log(err.message))

        res.cookie('sessionId', sessionId, { maxAge: config.expireTime })
        res.json({ ...user._doc, sessionId })
        res.end()
      } else {
        res.end('fail: password not authenticated')
      }
    })
    .catch(() => {
      res.end('fail: unknown reason')
    })
})

router.get('/:userName/update', async (req, res) => {
  const { userName } = req.params
  const { newUserName } = req.query
  console.log(req.param)
  try {
    const user = await User.updateUserNameByName(userName, newUserName)
    console.log('changeName: ', user)
    res.json({ user })
    res.end()
  } catch (err) {
    res.end('...')
  }
})

export default router
