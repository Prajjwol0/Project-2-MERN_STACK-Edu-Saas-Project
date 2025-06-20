

import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

 // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    

   const storage= new CloudinaryStorage ({
        cloudinary,
        params:async(req,file)=>(
             {
            folder:"fullstact-saas"
        }
        )
           
    })

    export {cloudinary,storage}
