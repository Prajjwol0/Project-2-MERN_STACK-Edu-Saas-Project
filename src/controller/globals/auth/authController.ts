import { Request, Response } from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
/*

register/sign up
Incoming data ==> username, email, password
Processing/Checking --> email valid, compulsory data
db query --> table ma insert/ read/delete/update

login
logout
forgot password
reset password / otp



login flow: 
email/user,password, (basic)

email,password --> data accept --> validation
// First check email exist or not (verify)


email/username, password

google login,fb,github (oauth)
email login (SSO)

*/





// ==============================
// Class based approach (ACTIVE)
// ==============================





class AuthController {

  static async registerUser(req: Request, res: Response) {
   
   
    if(req.body==undefined){
      res.status(400).json({
        message:"No data was send!!!!!"
      })
    }

    const { username, password, email } = req.body;


    // Check
    if (!username || !password || !email) {
      res.status(400).json({
        message: "Please provide username, password, email",
      });
      return;
    } 

    //"Find all users whose email equals the given email."
//findAll() returns an array of users.
// data = the first user with the matching email if found.
    const [data]=await User.findAll({
      where:{
        email
      },
    });

    // const hashedPassword=bcrypt.hashSync(password,8); //8 chahi salt value ho ! salt ko value jati thuko hunxa teti nai strength
    
    // Insert into user table
    await User.create({
      userName:username,
      password:bcrypt.hashSync(password,8),
    
      email:email,
    });

    res.status(201).json({
      message: "Successfully registered user",
    });
  }


 static async loginUser(req:Request,res:Response){
    const {email,password}=req.body
    if(!email || !password){
      res.status(400).json({
        message:"Please provide email,password"
      })
      return
    }
    // Check if email exist or not in out users table
    const data =await User.findAll({
      where : {
        email
}
  })

  if (data.length==0){
    res.status(404).json({
      message:"Not registered!!"
    }) 
  }
  else {
    // Check password, password123 --> hashed pw-->efdifjigri
    // compare(plain password user bata aako pw, hashed pw register huda table ma baseko)
    const isPasswordMatch=bcrypt.compareSync(password,data[0].password)
  if(isPasswordMatch){
    // login vayo, token generation
const token=jwt.sign({id:data[0].id},"thisissecret",{
  expiresIn:"30d"
}) //jwt.sign({name:"prjjwol"},"thisIsSecret") 

res.json({
  token:token,
  message:"Logged in Success"
})

  }else{
    res.status(404).json({
      message:"Invalid email or password!!"
    })
  }
  
  }
  }
}







export default AuthController;
