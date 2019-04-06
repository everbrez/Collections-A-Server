import R from 'ramda'
import { queryPromise } from 'utils'

function update(model, condition, value, options) {
  return queryPromise(model.findOneAndUpdate(condition, value, options))
}

// eslint-disable-next-line no-func-assign
update = R.curry(update)

function updateUserById(id, value) {
  return update(this)({ user_id: id }, { $set: value }, {
    new: true,
    upsert: false,
  })
}

export {
  updateUserById,
}
