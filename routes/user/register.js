import express from 'express'
import User from 'models/user'

const router = express.Router()

let number = 666
router.get('/register', (req, res) => {
  User.create({ user_id: number++ })
  res.end('success')
})

export default router
