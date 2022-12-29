import { Context, Next } from "koa";
import * as jwt from "jsonwebtoken";
import config from "../Database/config/secretKey"

export const checkJwt = (ctx: Context, next: Next ) => {



    try {
        
      
    let token:any = ctx.request.query.token;
      const decoded = jwt.verify(token , config.jwtSecret);
      if (!token) {
      
  
          ctx.body = {
              message: "A token is required for authentication"
          }
        }
      ctx.body = decoded;
    } catch (err) {
  
    ctx.body = {
        message:'Invalid Token',
        status: (401)
    }
    }

  };
  

