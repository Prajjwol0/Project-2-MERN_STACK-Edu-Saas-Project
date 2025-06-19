// Multer configuration


import { Request } from "express";
import multer from "multer";


// locally file store garidai:::

const storage = multer.diskStorage({

    //  location incoming file kata nira rakhne vanera ho
    // bd- callback function
    destination: function(req:Request,file:Express.Multer.File,cb:any){
        cb(null,'./src/storage')  //First argument(null) chahi error aayo vane k garne vannera ho aile error aayo vane kehi gardaina (null) and second argument= error aayena vane store garne given location ma
    },

    //  Mathi ko location deko ma rakhey paxi, k name ma rakhne ?
    filename:function(req:Request,file:Express.Multer.File,cb:any){
         cb(null,Date.now()+"-"+file.originalname) 

    }
})

/*
hello.pdf--> multer--> location(storage) --> hello2025081654.pdf
hello.pdg --> multer --> location(storage) -->hello2025081734.pdf

the file name are changed into a unique name to prevent naming conflict with another file
*/


export {multer,storage}

