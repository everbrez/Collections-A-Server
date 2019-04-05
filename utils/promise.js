function toPromise(handle) {
  const promise = new Promise((resolve, reject) => {
    function callback(err, data) {
      if (err) reject(err)
      else resolve(data)
    }
    handle(callback)
  })

  return promise
}

function queryPromise(query) {
  return toPromise((callback) => {
    query.exec(callback)
  })
}

export {
  toPromise,
  queryPromise,
}
