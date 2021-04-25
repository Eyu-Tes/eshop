const multer = require("multer")
const path = require("path")

// Multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png/
        const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
        const mimetype = fileTypes.test(file.mimetype)
        if (extName && mimetype) {
            return cb(null, true)
        }
        else {
            cb('Images only!')
        }
    },
})
