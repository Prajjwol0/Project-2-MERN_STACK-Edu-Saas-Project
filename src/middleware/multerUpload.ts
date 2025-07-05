// Import multer for handling multipart/form-data (i.e., file uploads)
import multer from 'multer'

// Import Cloudinary config (cloudinary instance and custom storage setup)
import { cloudinary, storage } from '../services/cloudinaryConfig'

// Import Request type for type-safety in the file filter
import { Request } from 'express'

// Setup multer middleware with cloudinary storage
const upload = multer({ 
    storage: storage, // Use custom Cloudinary storage defined elsewhere

    // Filter to accept only certain file types
    fileFilter: (req: Request, file: Express.Multer.File, cb) => {
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg']

        // Check if uploaded file is one of the allowed types
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true) // Accept the file
        } else {
            // Reject the file and send an error
            cb(new Error("Only image support garxaa hai!!!")) 
        }
    },

    // Limit the max file size to 4MB
    limits: {
        fileSize: 4 * 1024 * 1024 // 4 MB
    }
})

export default upload
