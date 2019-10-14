import { Request, Response } from "express";
import { Secure } from "threerest";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

export const BEARER_HEADER = "Bearer ";
export const HEADER_AUTH = "Authorization";

/* Express middleware for extract user from JWT Token */
export function jwtMiddleWare(request:Request, response:Response, next) {
  if (request && request.get && request.get(HEADER_AUTH) && request.get(HEADER_AUTH).slice(0, BEARER_HEADER.length) == BEARER_HEADER) {
    let token = request.get(HEADER_AUTH).substring(BEARER_HEADER.length);
    var cert = fs.readFileSync(path.join(process.env.house_dir_cert || path.join(__dirname, "cert"), "public.pem"));  // get public key
    jwt.verify(token, cert, { algorithms: ["RS256"] }, function (err, decoded) {

      (<any>request).user = decoded.user;
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  } else {
    next();
  }
}

/* Generate a JWT token for varrequest */
export function generateToken(user) {
  console.log(path.join(process.env.house_dir_cert || path.join(__dirname, "cert"), "private.pem"));
  var cert = fs.readFileSync(path.join(process.env.house_dir_cert || path.join(__dirname, "cert"), "private.pem"));  // get private key
  return jwt.sign({ user: user }, cert, { algorithm: "RS256"/*["HS256", "RS512"]*/ });
}