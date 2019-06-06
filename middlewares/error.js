export function getErrorMessage(error = {}, type) {
  let message = 'unkown error'
  if (!error.errors) {
    // common error
    return error.message
  }

  if (type) {
    message = error.errors[type] && error.errors[type].message
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in error.errors) {
      if (error.errors[key] instanceof Object) {
        // eslint-disable-next-line prefer-destructuring
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
