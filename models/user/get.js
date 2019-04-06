import R from 'ramda'
import { queryPromise } from 'utils'

function get(model, condition) {
  return queryPromise(model.find(condition))
}

const getUser = R.curry(get)

function getUserById(userId) {
  return getUser(this)({ user_id: userId })
}

function getUserByName(userName) {
  return getUser(this)({ user_name: userName })
}

function getUserByMail(mail) {
  return getUser(this)({ mail })
}

export {
  getUserById,
  getUserByName,
  getUserByMail,
}
