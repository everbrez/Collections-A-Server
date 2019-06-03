import { client } from 'db'
import config from 'config'

export default {
  set(sid, uid, expireTime = config.expireTime) {
    return client.setAsync(sid, uid, 'PX', expireTime)
  },

  get(key) {
    return client.getAsync(key)
  },

  del(key) {
    return client.delAsync(key)
  }
}
