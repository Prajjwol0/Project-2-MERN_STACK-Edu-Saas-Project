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

import { Request, Response } from "express";
import User from "../../../database/models/use.model";
import bcrypt from "bcrypt";
// ==============================
// Functional approach (COMMENTED OUT)
// ==============================

/*

const registerUser = async (req: Request, res: Response) => {
  // Incoming data accept garne

  // Functional approach
  /**
      const username=req.body.username
      const password=req.body.password
      const email=req.body.email
   */
  /*
  const { username, password, email } = req.body;

  // Check
  if (!username || !password || !email) {
    res.status(400).json({
      message: "Please provide username, password, email",
    });
    return;
  }

  // Insert into user table
  await User.create({
    username,
    password,
    email,
  });
  res.status(200).json({
    message: "Successfully registered user",
  });
};

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

    const [data]=await User.findAll({
      where:{
        email
      }
    })
    // Insert into user table
    await User.create({
      username:username,
      password:bcrypt.hashSync(password,8),  //8 chahi salt value ho ! salt ko value jati thuko hunxa teti nai strength
      email:email,
    });

    res.status(201).json({
      message: "Successfully registered user",
    });
  }
}

export default AuthController;
