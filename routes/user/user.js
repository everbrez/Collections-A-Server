import express from 'express'

const router = express.Router()

router.get('/:userName', (req, res) => {
  const { userName } = req.param
  res.end(userName)
})

export default router
