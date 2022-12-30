import {Context, Next} from "koa";
import {UserTable}  from "../Database/models/index" 

export const checkRole = (roles: Array<string>) => {
  return async (ctx:Context ) => {
    //Get the user ID from previous midleware
    const id = ctx.locals.jwtPayload.Id;

    //Get user role from the database
    // const userRepository = getRepository(User);
     let user: UserTable;
    try {
       await UserTable.findOne(id);
    } catch (id) {
      ctx.status = 401;
    }

   

}
}