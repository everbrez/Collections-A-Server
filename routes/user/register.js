import express from 'express'

import User from 'models/user'

const router = express.Router()

router.post('/', async (req, res) => {
  const { body } = req
  const { userName, password, mail } = body

  let result = {}
  try {
    result = await User.addUser({
      user_name: userName,
      user_pwd: password,
      mail,
    })
    res.json(result)
    res.end()
  } catch (err) {
    res.end(err.message)
  }
})

export default router
