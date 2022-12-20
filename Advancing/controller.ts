import { plainToInstance } from "class-transformer";
import { Context, } from "koa";
import status from "../Generals/status";


import {
    UserAttributes, UserTable
} from "./modelcall";
import { CreateUserSchema, GetAllUserSchema, UpdateUserSchema } from "./validation";

export default class UserController {
    public static async createUser (ctx : Context) {
        let body = ctx.request.body;
        let data = plainToInstance ( CreateUserSchema, body )
        data = await data.validate();
        const users = await UserTable.create({
            
             userName: data.username,
             password:data.password,
             id:data.id,
             statusId: status.ACTIVE, 
        
        });

        ctx.body = {
            message: "UserCreated",
            users
        }
    }


    public static async getUser (ctx : Context) {

        const {id} = ctx.params;

        const user = await UserTable.findOne ({
            where: {
                id:id
            }
        });

        ctx.body= {
            user,
        }
    }

    public static async deleteUser ( ctx : Context){
        const { id } = ctx.params;
        // const deleteUser =  await UserTable.findOne({
        //     where: {
        //         id: id,
        //     }
        // })
        const statusUpdate = await UserTable.update(
            {statusId: status.DELETED},
          {  where:{
            id:id,
            }
        }
        )

        ctx.body = {
            message: " User Deleted "
        }
    }

    public static async updateUser( ctx: Context) {

        let body = ctx.request.body;
        let data = plainToInstance ( UpdateUserSchema, body )
        data = await data.validate();

        const {id} = ctx.params;

        const updatedUser =  await UserTable.update(
            {userName:data.username,password:data.password},
            {
                where:{
                    id:id,
                    statusId:status.ACTIVE
                }
            }
        )
            ctx.body = {
                message:`User Updated with id no ${id} ` ,
               // updatedUser
            }
    }

    public static async GetAllUsers( ctx: Context) {
        let body = ctx.request.body;
        let data = plainToInstance (GetAllUserSchema,body)
        data = await data.validate();
        const allUsers = await UserTable.findAll({

            where: {

                // userName:data.username,
                statusId: status.ACTIVE
            },
            attributes: 
        [
            "username"
        ]        })
        ctx.body = {
            allUsers
        }

    }

}