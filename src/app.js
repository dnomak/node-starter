import express from 'express'

import { resolvePath } from './utils.js'

import indexRouter from './routes/index.js'

const app = express()

app.set('views', resolvePath('./views'))
app.set('view engine', 'pug')

app.use(express.static(resolvePath('../public')))

app.use('/', indexRouter)

export default app
