import { toPromise } from 'utils'
import Counter from 'models/counter'
import config from 'config'

// get the next userId, ensure the userId is unique
async function generateUserId() {
  const userId = await Counter.getNextValue(config.user.counter)
  return userId
}

// add user, the user argument must be validated
async function addUser(user) {
  const userId = await generateUserId()
  return toPromise((cb) => {
    console.log(userId)
    this.create({ ...user, user_id: userId }, cb)
  })
}

export default addUser
