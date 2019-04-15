import express from 'express'

import User from 'models/user'

const router = express.Router()

router.post('/', async (req, res) => {
  const { body } = req
  const { userName, password, mail } = body

  const result = await User.addUser({
    user_name: userName,
    user_pwd: password,
    mail,
  }).catch(err => ({ code: 500, message: err.message }))

  res.json(result)
  res.end()
})

export default router
