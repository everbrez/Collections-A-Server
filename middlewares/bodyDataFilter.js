function bodyDataFilter(filter) {
  return function (req, res, next) {
    if (filter) {
      req.body = filter(req.body)
    }
    next()
  }
}

export default bodyDataFilter
export {
  bodyDataFilter
}
