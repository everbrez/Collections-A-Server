const config = {
  database: {
    // mlab uri
    // uri: 'mongodb://ds131676.mlab.com:31676/collections',
    uri: 'mongodb://127.0.0.1:27017/collections',
    options: {
      dbName: 'collections',
      // user: 'everbrez',
      // pass: 'everbrez233',
    },
  },
  server: {
    port: 8888,
  },
  user: {
    defaultUserId: 1000,
    counter: 'user',
  },
  expireTime: 20 * 60 * 1000, // 20min
  defaultExpireTime: 1 * 60 * 1000 // 1min
}

export default config
