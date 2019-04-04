import express from 'express'

import Counter from 'models/counter'

const router = express.Router()

router.get('/register', async (req, res) => {
  const a = await Counter.getNextValue('test')
  console.log(a)
  res.end(`${a}`)
})

export default router
