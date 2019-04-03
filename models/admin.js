import mongoose from 'mongoose'

const { Schema } = mongoose

const adminSchema = new Schema({
  user_id: Number,
  admin_pwd: String,
  admin_level: Number,
  // todo: add permission
})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
export { adminSchema, Admin }
