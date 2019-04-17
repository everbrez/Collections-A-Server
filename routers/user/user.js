import express from 'express'
import User from 'models/user'

const router = express.Router()

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
