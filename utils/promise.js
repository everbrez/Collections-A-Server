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

export default toPromise
