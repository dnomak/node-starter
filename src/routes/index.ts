import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'node-starter' })
})

export default router
