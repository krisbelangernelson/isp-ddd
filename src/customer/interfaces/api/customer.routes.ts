import { verifyRegistration, verifyToken } from '@/infrastructure/middlewares'
import { Router } from 'express'
import { autoLoginCheck, customerArea, customerExists, loginCustomer, registerCustomer } from './customer.controller'

const router = Router()

router.post('/exists', customerExists)
router.get('/area', verifyToken, customerArea)
router.post('/register', verifyRegistration.verifyBody, verifyRegistration.verifyEmailNotExist, registerCustomer)
router.post('/login', loginCustomer)
router.get('/auto-login-check', autoLoginCheck)

export default router
