import R from 'ramda'
import { queryPromise } from 'utils'

// eslint-disable-next-line max-len
const updateOne = R.curry((model, condition, value, options) => queryPromise(model.findOneAndUpdate(condition, value, options)))
const updateMany = R.curry((model, condition, value) => queryPromise(model.updateMany(condition, value)))

const deleteOne = R.curry((model, condition) => queryPromise(model.deleteOne(condition)))
const deleteMany = R.curry((model, condition) => queryPromise(model.deleteMany(condition)))

const get = R.curry((model, condition) => queryPromise(model.find(condition)))

export {
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  get,
}
