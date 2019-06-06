import express from 'express'

import {
  errorHandleMiddleware,
  convertParamsToBody,
  bodyDataFilter
} from 'middlewares'
import {
  userLogin,
  userLogout,
  register,
  checkLogin,
  getUserDetail,
  updateUserDetail,
  getUserInfo,
  sendUserInfo,
  getUser,
  updatePassword,
  validateByOldPassword,
} from '../controllers/user'

const router = express.Router()
router.use(errorHandleMiddleware)

// set cors headers
function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}

router.use(cors)

// login
router.post('/login', userLogin)

router.get('/logout', userLogout)


// register
router.post('/register', register)

// user info
router.get('/api/users/detail/:uid?', checkLogin, convertParamsToBody, getUserDetail, sendUserInfo)

router.get(
  '/api/users/:uid',
  convertParamsToBody,
  bodyDataFilter(({ uid }) => ({ uid })),
  getUserInfo,
  sendUserInfo
)

// update user info
router.put('/api/users', checkLogin, updateUserDetail('email', 'uname'))
router.put(
  '/api/users/password',
  (req, res, next) => {
    const { uid } = req.body
    if (!uid) {
      res.status(400).json({ error: 'uid required' })
      return
    }
    req.uid = uid
    next()
  },
  getUser,
  validateByOldPassword,
  updatePassword
)

// user pages

export default router
