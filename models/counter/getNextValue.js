import { toPromise } from 'util'

/**
 * return the next sequence value,
 * ensure there is a unique key stored in the database
 *
 * @param {*} id
 * @returns {Promise}
 */
function getNextValue(id) {
  return toPromise((cb) => {
    this.findOneAndUpdate(
      { id },
      { $inc: { value: 1 } },
      {
        new: true,
        upsert: true,
      },
      /* eslint-disable function-paren-newline */
      cb)
    /* eslint-enable function-paren-newline */
  })
}

export default getNextValue
