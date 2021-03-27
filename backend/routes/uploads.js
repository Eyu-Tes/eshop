const path = require('path')
const express = require('express')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
    destination (req, file, cb) {
      cb(null, path.join('frontend', 'public', 'uploads'))
    },
    filename (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const checkFileType = (file, cb) => {
    const fileTypes = /jpg|jpeg|png/
    const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = fileTypes.test(file.mimetype)
    if (extName && mimetype) {
        return cb(null, true)
    }
    else {
        cb('Images only!')
    }
}

const upload = multer({
    storage, 
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/uploads/${req.file.filename}`)
})

module.exports = router
