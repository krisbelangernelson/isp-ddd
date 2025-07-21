import Stripe from 'stripe'

export interface PaymentBody {
  plan: string
}

export interface PaymentResponse {
  amount: number
  clientSecret: string | null
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'STRIPE_SECRET_KEY', {
  apiVersion: '2025-06-30.basil',
  appInfo: {
    // For sample support and debugging, not required for production:
    name: 'internet-orders-api',
    url: 'https://github.com/krisbelangernelson/internet-orders-api',
    version: '1.0.0'
  },
  typescript: true
})

const calculateOrderAmount = (plan: string): number => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  if (plan === 'home-fiber1000') return 110

  return 0
}

export const stripePaymentIntent = async (body: PaymentBody): Promise<PaymentResponse> => {
  const { plan } = body

  const params = {
    amount: calculateOrderAmount(plan),
    currency: 'cad',
    automatic_payment_methods: {
      enabled: true
    }
  }

  const paymentIntent = await stripe.paymentIntents.create(params)

  return {
    amount: calculateOrderAmount(plan),
    clientSecret: paymentIntent.client_secret
  }
}
