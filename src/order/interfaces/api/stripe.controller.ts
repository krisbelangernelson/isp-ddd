import type { Request, Response } from 'express'
import { errorResponses } from '@/shared/httpErrors/errorResponses'
import type { Error } from '@/shared/httpErrors'
import * as stripeService from '@/order/application/stripe.service'
import type { PaymentBody } from '@/order/application/stripe.service'

const stripeConfig = (_req: Request, res: Response): void => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
}

const stripePaymentIntent = async (req: Request, res: Response): Promise<void> => {
  try {
    const paymentResponse = await stripeService.stripePaymentIntent(req.body as PaymentBody)
    res.send(paymentResponse)
  } catch (e) {
    errorResponses(
      res,
      { code: 'ERR-400', reason: 'Bad Request', message: (e as Error).message },
      'stripePaymentIntent'
    )
  }
}

export { stripeConfig, stripePaymentIntent }
