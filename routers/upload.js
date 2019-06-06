import express from 'express'
import multer from 'multer'
import uuid from 'uuid'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/images')
  },

  filename(req, file, cb) {
    const originalFilename = file.originalname.replace(/[^\w._-]+/g, '')
    let filename = originalFilename
    let extension = ''
    const extensionPos = filename.lastIndexOf('.')
    if (extensionPos > 0) {
      filename = originalFilename.slice(0, extensionPos)
      extension = originalFilename.slice(extensionPos)
    }

    cb(null, `${uuid.v1()}-${filename}${extension}`)
  }
})

const upload = multer({ storage })

const router = express.Router()

router.post('/uploads', upload.single('avatar'), (req, res) => {
  res.status(200).json({ data: req.file.path.replace(/^public/, '') })
})

export default router
