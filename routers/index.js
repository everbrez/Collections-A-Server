import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import user from './user'
import upload from './upload'

const router = express.Router()

router.use(express.static('public', {
  dotfiles: 'ignore'
}))

// parse json
router.use(bodyParser.json())
router.use(cookieParser())
router.use(express.urlencoded())

router.use(user)
router.use(upload)

export default router
