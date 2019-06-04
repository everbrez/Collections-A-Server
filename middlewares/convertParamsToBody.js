function convertParamsToBody(req, res, next) {
  const { body, params } = req
  if (req.convertParamsToBody) next()
  else {
    req.body = Object.assign({}, body, params)
    req.convertParamsToBody = true
    next()
  }
}

export default convertParamsToBody
export {
  convertParamsToBody
}
