import express from 'express'
import User from 'models/user'

const router = express.Router()
router.use(express.urlencoded())

router.get('/:userName', async (req, res) => {
  const { userName } = req.params
  const user = await User.getUserByName(userName)
  console.log(user)
  if (!user || user.length <= 0) {
    res.sendStatus(404)
    return
  }
  res.json({ user })
  res.end()
})

router.post('/login', async (req, res) => {
  const { userName, password } = req.body
  User.findOne({ userName }).exec()
    .then((user) => {
      if (!user) res.end('user didn\'t exitd')
      if (user.authenticate(password)) {
        res.end('success')
      } else {
        res.end('fail')
      }
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
