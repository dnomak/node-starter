import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import { RateLimiterMemory } from 'rate-limiter-flexible'

const defaultOptions = new RateLimiterMemory({
  points: 100,
  duration: 60 * 10,
})

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip: string = req.ip

  defaultOptions
    .consume(ip)
    .then(() => {
      next()
    })
    .catch(() => {
      next(createError(429))
    })
}
