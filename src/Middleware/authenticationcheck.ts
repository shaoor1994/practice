import {Context, Next} from "koa";
import {UserTable}  from "../Database/models/index" 

export const checkRole = (roles: Array<string>) => {
  return async (ctx:Context ) => {
   
    const id = ctx.locals.jwtPayload.Id;

     let user: UserTable;
    try {
       await UserTable.findOne(id);
    } catch (id) {
      ctx.status = 401;
    }

   

}
}