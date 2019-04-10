import express from 'express'

const router = express.Router()

router.get('/:userId', (req, res) => {
  const { userId } = req.param
  res.end(userId)
})

export default router
