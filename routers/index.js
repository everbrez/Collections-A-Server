import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import user from './user/user'
import register from './user/register'

const router = express.Router()

// parse json
router.use(bodyParser.json())
router.use(cookieParser())

router.use(user)
router.use('/register', register)

export default router
