import { Request } from "express";
import "jsonwebtoken";

// Extend the Request interface to include the 'user' property
declare module "express" {
  interface Request {
    user?: any; // Replace 'any' with the actual type of your 'user' property
  }
}

declare module "jsonwebtoken" {
  interface JwtPayload {
    user?: any; // Replace 'any' with the actual type of your 'user' property
  }
}
