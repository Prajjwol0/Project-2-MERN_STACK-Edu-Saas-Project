import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user.model";

// Extended request interface to hold extra user data
interface IExtendedRequest extends Request {
  user?: {
    name?: string;
    age?: number;
  };
}

// Interface for decoded JWT result
interface IResultAayo {
  id: string;
  iat: number;
  exp: number;
}

class Middleware {

  // Middleware function to check if user is logged in
  static isLoggedIn(req: IExtendedRequest, res: Response, next: NextFunction) {
    
    // Get token from request header
    const token = req.headers.authorization;

    // If token is not provided
    if (!token) {
      res.status(401).json({
        message: "Please provide token"
      });
      return;
    }

    // Verify the provided token
    jwt.verify(token, 'thisissecret', async (erroraayo, resultaayo: any) => {
      if (erroraayo) {
        // If token is invalid
        res.status(403).json({
          message: "Token invalid"
        });
        return;
      } else {
        // If token is valid
        console.log(resultaayo);

        // Find user by ID from token
        const UserData = await User.findByPk(resultaayo.id);

        // If user not found
        if (!UserData) {
          res.status(403).json({
            message: "No user with that id, invalid token"
          });
          return;
        } else {
          // If user found, add extra data to request object
          req.user = {
            name: "this.name", // you can replace this.name with actual name
            age: 23
          };
        }

        // proceed to next middleware/controller
        next();
      }
    });
  }

  // Placeholder for restrictTo middleware
  static restrictTo(req: Request, res: Response) {
    // You will implement this part later
  }
}

export default Middleware;
