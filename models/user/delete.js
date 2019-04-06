import R from 'ramda'
import { queryPromise } from 'utils'

function deleteOne(model, condition) {
  return queryPromise(model.deleteOne(condition))
}

const deleteUser = R.curry(deleteOne)

function deleteUserById(id) {
  return deleteUser(this)({ user_id: id })
}

export {
  deleteUserById,
}
