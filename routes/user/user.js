import express from 'express'
import User from 'models/user'

const router = express.Router()

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
