const path = require('path')
const express = require('express')
// const multer = require('multer')

const upload = require('../utils/multer')
const { cloudinary } = require('../utils/cloudinary')

const router = express.Router()

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, path.join('frontend', 'public', 'images'))
//     },
//     filename(req, file, cb) {
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const checkFileType = (file, cb) => {
//     const fileTypes = /jpg|jpeg|png/
//     const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
//     const mimetype = fileTypes.test(file.mimetype)
//     if (extName && mimetype) {
//         return cb(null, true)
//     }
//     else {
//         cb('Images only!')
//     }
// }

// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb)
//     }
// })

// router.post('/', upload.single('image'), (req, res) => {
//     res.send(`/images/${req.file.filename}`)
// })



// @route   /api/upload
// @access  Public
// @method  POST
// @desc    Upload File
router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file.path)
    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'eshop' })
        res.json(result.secure_url)
    } catch (err) {
        console.log(err)
        res.status(500).json('Something went wrong')
    }
})

module.exports = router
