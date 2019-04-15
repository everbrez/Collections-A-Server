import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
  const { body } = req
  console.log('post: ', body)
  res.json(body)
  res.end()
})

export default router
