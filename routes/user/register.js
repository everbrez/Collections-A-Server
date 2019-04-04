import express from 'express'

import User from 'models/user'

const router = express.Router()

router.get('/register', async (req, res) => {
  const { name } = req.query
  const a = await User.add({ user_name: name }).catch(err => res.end(err.message))
  res.end(`${a}`)
})

export default router
