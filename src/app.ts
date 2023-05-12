import express, { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import path from 'path'

import indexRouter from '@/routes/index'
import { ErrorProps } from '@/types'

const app = express()

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  const error: ErrorProps = {
    status: err.status || 500,
    message: err.message,
  }

  if (app.get('env') === 'development') {
    error.stack = err.stack
  }

  res.status(error.status).send(error)
})

export default app
