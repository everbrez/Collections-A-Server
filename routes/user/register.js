import express from 'express'

import User from 'models/user'

const router = express.Router()

router.get('/register', async (req, res) => {
  const { id, name, pwd = '', mail } = req.query
  const a = await User.addUser({ mail, user_name: name, user_pwd: pwd }).catch(err => res.end(err.message))
  // const a = await User.getUserById(id)
  res.end(`${a}`)
})

router.get('/register/get', async (req, res) => {
  const { type, id, name, mail } = req.query
  let result = null
  switch (type) {
    case 'id':
      result = await User.getUserById(id)
      break
    case 'name':
      result = await User.getUserByName(name)
      break
    case 'mail':
      result = await User.getUserByMail(mail)
      break
    default:
      res.sendStatus(400)
      result = 'type error'
      break
  }

  res.end(`${result}`)
})

router.get('/register/update', async (req, res) => {
  const { id, name } = req.query
  const result = await User.updateUserById(id, { user_name: name })
  res.end(String(result))
})

router.get('/register/delete', async (req, res) => {
  const { id } = req.query
  const result = await User.deleteUserById(id)
  console.log(result)
  res.json(result)
  res.end()
})

export default router
