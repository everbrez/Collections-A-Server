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

  setField(field) {
    return Object.create(this, {
      field: {
        value: field,
        writable: true,
        enumerable: true
      }
    })
  }

  unique(field = this.field) {
    // TODO: 创建一个共享变量，防止同时注册时冲突
    return (value) => {
      return this.model
        .findOne({ [field]: value })
        .then(item => item ? Promise.reject(false) : true)
    }
  }

  notEmpty() {
    // undefined, null, '', '  ', []
    return (value) => {
      if (typeof value === 'string') return value.trim()
      if (Array.isArray(value)) return value.length
      return value
    }
  }
}

export default Validator
