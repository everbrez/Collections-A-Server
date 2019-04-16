import { toPromise } from 'utils'
import Counter from 'models/counter'
import config from 'config'

// add user, the user argument must be validated
async function addUser(user) {
  // get next userId
  const userId = await Counter.getNextValue(config.user.counter)
  return toPromise((cb) => {
    console.log(userId)
    this.create({ ...user, user_id: userId }, cb)
  })
}

export default addUser
