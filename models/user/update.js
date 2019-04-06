import R from 'ramda'
import { queryPromise } from 'utils'

function update(model, condition, value, ...others) {
  return queryPromise(model.findOneAndUpdate(condition, value, ...others))
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
