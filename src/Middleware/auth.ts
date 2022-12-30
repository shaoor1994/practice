import { Context, Next } from "koa";
import * as jwt from "jsonwebtoken";
import config from "../Database/config/secretKey"

export const checkJwt = (ctx: Context, next: Next ) => {



    try {
        
     
    const token = ctx.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token , config.jwtSecret);
      if (!token) {
      
  
          ctx.body = {
              message: "A token is required for authentication"
          }
        }
      ctx.body = decoded;
    } catch (err) {
    //   return res.status(401).send("Invalid Token");
    ctx.body = {
        message:err,
        status: (401)
    }
    }

  };
  

