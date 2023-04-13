import express from 'express'
import path from 'path'

import indexRouter from '@/routes/index'

const app = express()

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)

export default app
