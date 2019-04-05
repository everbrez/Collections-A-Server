import { queryPromise } from 'utils';

function getUserById(userId) {
  return queryPromise(this.find({ user_id: userId }))
}

export default getUserById
