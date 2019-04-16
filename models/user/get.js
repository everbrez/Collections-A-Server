import { get } from 'model/common'

function getUserById(userId) {
  return get(this)({ user_id: userId })
}

function getUserByName(userName) {
  return get(this)({ user_name: userName })
}

function getUserByMail(mail) {
  return get(this)({ mail })
}

export {
  getUserById,
  getUserByName,
  getUserByMail,
}
