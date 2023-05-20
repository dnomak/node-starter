import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('home', { title: 'node-starter' })
})

export default router
