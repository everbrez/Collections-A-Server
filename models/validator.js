import R from 'ramda'

export const unique = R.curry(
  (model, props, value) => model.findOne({ [props]: value }).exec().then(data => !data)
)

export const email = R.curry(
  value => /^[a-zA-Z][\w_]*@\w+\.\w+$/.test(value)
)
