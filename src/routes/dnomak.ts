import express from 'express'

const router = express.Router()

router.get('/dnomak', (req, res) => {
  res.json({ developer: 'dnomak' })
})

export default router
