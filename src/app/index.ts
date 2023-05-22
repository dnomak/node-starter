import compression from 'compression'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import createError from 'http-errors'
import logger from 'morgan'
import sassMiddleware from 'node-sass-middleware'
import path from 'path'

import { ErrorProps } from '@/app/types'
import homeRouter from '@/routes/home'

const app = express()

app.set('views', path.join(__dirname, '../views/pages'))
app.set('view engine', 'pug')

app.use(
  sassMiddleware({
    src: path.join(__dirname, '../views/assets/styles'),
    dest: path.join(__dirname, '../../public/assets/css'),
    debug: false,
    outputStyle: 'compressed',
    prefix: '/assets/css',
  })
)

app.use(express.static(path.join(__dirname, '../../public')))

app.use(logger('dev'))
app.use(helmet())
app.use(compression())

app.use('/', homeRouter)

app.use((req, res, next) => {
  next(createError(404))
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
