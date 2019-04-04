import { toPromise } from "utils";

function getByUserId(userId) {
  toPromise((cb) => {
    this.find({
      user_id: userId,
    }, cb)
  })
}

export default getByUserId
