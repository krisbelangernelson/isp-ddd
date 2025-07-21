import { Router } from 'express'
import { stripeConfig, stripePaymentIntent } from './stripe.controller'

const router = Router()

router.get('/config', stripeConfig)
router.post('/create-payment-intent', stripePaymentIntent)

export default router
