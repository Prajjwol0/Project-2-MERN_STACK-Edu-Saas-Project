import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface for extended request (currently empty, can be extended later)
interface IExtendedRequest extends Request {}

class Middleware {

  // Middleware function to check if user is logged in
  static isLoggedIn(req: Request, res: Response, next: NextFunction) {
    
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
    jwt.verify(token, 'thisissecret', (erroraayo, resultaayo) => {
      if (erroraayo) {
        // If token is invalid
        res.status(403).json({
          message: "Token invalid"
        });
        return;
      } else {
        // If token is valid
        console.log(resultaayo);
        next();  // proceed to next middleware/controller
      }
    });
  }

  // Placeholder for restrictTo middleware
  static restrictTo(req: Request, res: Response) {
    // You will implement this part later
  }
}

export default Middleware;
