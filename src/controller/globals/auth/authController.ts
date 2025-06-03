



/*

register/sign up
Incoming data ==> username, email, password
Processing/Checking --> email valid, compulsory data
db query --> table ma insert/ read/delete/update

login
logout
forgot password
reset password / otp

*/


import {Request,Response} from "express"
import User from "../../../database/models/use.model"




const registerUser=async (req:Request,res:Response)=>{

  

// Incoming data accept garne

// Functional approach
/**
 
    const username=req.body.username
   const password=req.body.password
 const email=req.body.email
 */
  const {username, password, email}=req.body

//   Check 
if(!username||!password||!email){
    res.status(400).json({
        message:"Please provide username, password, email"
    })
   return;
}
 
     //   Insert into user table 
    await User.create({
        username,
        password,
        email
     })
     res.status(200).json({
        message:"Successfully registered user"
     })
    

}


// Class based approach

class AuthController{
  static async  registerUser(req:Request,res:Response){
const {username, password, email}=req.body

//   Check 
if(!username||!password||!email){
    res.status(400).json({
        message:"Please provide username, password, email"
    })
   return;
}
 
     //   Insert into user table 
    await User.create({
        username,
        password,
        email
     })
     res.status(200).json({
        message:"Successfully registered user"
     })
    
    }
}

export default AuthController