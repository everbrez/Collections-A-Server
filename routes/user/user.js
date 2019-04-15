import express from 'express'

const router = express.Router()

router.get('/:userName', (req, res) => {
  const { userName } = req.params
  res.end(userName)
})

export default router
