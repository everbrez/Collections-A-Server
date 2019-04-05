import express from 'express'

import User from 'models/user'

const router = express.Router()

router.get('/register', async (req, res) => {
  const { id, name } = req.query
  // const a = await User.add({ user_name: name }).catch(err => res.end(err.message))
  const a = await User.getUserById(id)
  res.end(`${a}`)
})

export default router
