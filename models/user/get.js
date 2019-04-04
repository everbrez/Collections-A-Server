import { toPromise } from 'utils';

function getUserById(userId) {
  return toPromise((cb) => {
    console.log(userId)
    this.find({
      user_id: userId,
    }).exec(cb)
  })
}

export default getUserById
