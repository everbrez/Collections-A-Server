import mongoose from 'mongoose'

class Validator {
  constructor(modelName, field) {
    let model

    Object.defineProperty(this, 'model', {
      get() {
        if (!model) {
          model = mongoose.model(modelName)
        }
        return model
      }
    })

    this.field = field
  }

  setField(field, showName = field) {
    // return a new instance
    return Object.create(this, {
      field: {
        value: field,
        writable: true,
        enumerable: true
      },
      showName: {
        value: showName,
        writable: true,
        enumerable: true
      }
    })
  }

  unique(field = this.field) {
    // TODO: 创建一个共享变量，防止同时注册时冲突
    return [
      value => this.model
        .findOne({ [field]: value })
        .then(item => (item ? Promise.reject(new Error('not unique')) : true)),
      `${this.showName} \`{VALUE}\` has already existed!`
    ]
  }

  notEmpty() {
    // undefined, null, '', '  ', []
    return [
      (value) => {
        if (typeof value === 'string') return value.trim()
        if (Array.isArray(value)) return value.length
        return value
      },
      `${this.showName} should not be empty`
    ]
  }

  number() {
    return [
      (value) => {
        if (typeof value !== 'number' || typeof value !== 'string') return false
        if (typeof value === 'string' && value.trim() === '') return false
        if (isNaN(Number(value))) return false
        return true
      },
      `${this.showName} should be Number`
    ]
  }

  email() {
    return [
      value => /^\w[\w._\-$]+@\w+\.[\w.]*\w$/.test(value),
      `${this.showName} format error`
    ]
  }

  require() {
    return this.notEmpty()
  }
}

export default Validator
