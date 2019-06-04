export function getErrorMessage(error = {}, type) {
  let message = 'unkown error'
  // set default errors obj
  error.errors = error.errors || {}
  if (type) {
    message = error.errors[type] && error.errors[type].message
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (let key in error.errors) {
      if (error.errors[key] instanceof Object) {
        message = error.errors[key].message
        break
      }
    }
  }

  return message
}

function errorHandleMiddleware(req, res, next) {
  // extends res method in order to adapt errors from mongoose
  res.error = function (data = {}, type) {
    const response = this
    return function (error) {
      const message = getErrorMessage(error, type)
      response.json({
        error: message,
        ...data
      })
    }
  }

  next()
}

export { errorHandleMiddleware }
export default errorHandleMiddleware
