import { update } from 'model/common'

function updateUserById(id, value) {
  return update(this)({ user_id: id }, { $set: value }, {
    new: true,
    upsert: false,
  })
}

export {
  updateUserById,
}
