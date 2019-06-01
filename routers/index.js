import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import user from './user'

const router = express.Router()

// parse json
router.use(bodyParser.json())
router.use(cookieParser())
router.use(express.urlencoded())

router.use(user)

export default router
