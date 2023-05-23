import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import createError from 'http-errors'
import logger from 'morgan'
import path from 'path'

import { rateLimiter } from '@/app/modules/rate-limiter'
import { ErrorProps } from '@/app/types'
import dnomakRouter from '@/routes/dnomak'
import homeRouter from '@/routes/home'

const app = express()

app.set('views', path.join(__dirname, '../views/pages'))
app.set('view engine', 'pug')

const sassMiddleware = app.get('env') === 'production' ? null : require('node-sass-middleware')
if (sassMiddleware) {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, '../views/assets/styles'),
      dest: path.join(__dirname, '../../public/assets/css'),
      debug: false,
      outputStyle: 'compressed',
      prefix: '/assets/css',
    })
  )
}
app.use(express.static(path.join(__dirname, '../../public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  cors({
    origin: app.get('env') === 'production' ? 'https://dnomak.com' : true,
    credentials: true,
  })
)
app.use(logger('dev'))
app.use(helmet())
app.use(compression())
app.use(rateLimiter)

app.use('/', homeRouter)
app.use('/', dnomakRouter)

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
