import { deleteOne } from 'model/common'

function deleteUserById(id) {
  return deleteOne(this)({ user_id: id })
}

export {
  deleteUserById,
}
