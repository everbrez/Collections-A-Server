import express from 'express'

import User from 'models/user'

const router = express.Router()

router.use(express.urlencoded())

router.post('/', async (req, res) => {
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

export default router
