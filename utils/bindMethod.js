import R from 'ramda'

function bind(obj, method) {
  if (!(obj instanceof Object)) return
  if (!(method instanceof Function)) return
  // eslint-disable-next-line no-param-reassign
  obj[method.name] = method
}

// curry
const bindMethod = R.curry(bind)

export { bindMethod }
