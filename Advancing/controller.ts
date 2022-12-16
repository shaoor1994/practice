import { plainToInstance } from "class-transformer";
import { Context, } from "koa";


import {
    UserAttributes, UserTable
} from "./usermodel";
import { CreateUserSchema } from "./validation";

export default class UserController {
    public static async createUser (ctx : Context) {
        let body = ctx.request.body;
        let data = plainToInstance ( CreateUserSchema, body )
        data = await data.validate();
        const user = await UserTable.create(data);

        ctx.body = {
            message: "UserCreated",
            user
        }
    }
}