import { plainToInstance } from "class-transformer";
import { Context, } from "koa";
import status from "../../Generals/status";


import {
    CompanyTable,
    UserAttributes, UserTable
} from "../../Database/models/modelcall";
import { CreateUserSchema, GetAllUserSchema, UpdateUserSchema } from "../validation/validation";
import { NotFoundError } from "../../Generals/errors/NotFoundError";

export default class UserController {
    public static async createUser(ctx: Context) {
        try {
            let body = ctx.request.body;
            let data = plainToInstance(CreateUserSchema, body)
            data = await data.validate();
            const users = await UserTable.create({

                userName: data.username,
                password: data.password,
                id: data.id,
                statusId: status.ACTIVE,

            });

            ctx.body = {
                message: "UserCreated",
                users
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    public static async getUser(ctx: Context) {

        try {

            const { id } = ctx.params;
            if (!id) {
                throw new NotFoundError("User not Found")
            }

            const user = await UserTable.findOne({
                where: {
                    id: id
                }
            });

            ctx.body = {
                user,
            }
        }


        catch (error) {
            console.log(error)
        }
    }

    public static async deleteUser(ctx: Context) {

        try {

            const { id } = ctx.params;
            // const deleteUser =  await UserTable.findOne({
            //     where: {
            //         id: id,
            //     }
            // })

            if (!id) {
                throw new NotFoundError(" User Not Found ")
            }
            const statusUpdate = await UserTable.update(
                { statusId: status.DELETED },
                {
                    where: {
                        id: id,
                    }
                }
            )
            ctx.body = {
                message: " User Deleted "
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    public static async updateUser(ctx: Context) {

        try {

            let body = ctx.request.body;
            let data = plainToInstance(UpdateUserSchema, body)
            data = await data.validate();

            const { id } = ctx.params;

            if (!id) {
                throw new NotFoundError(" User Not Found ")
            }

            const updatedUser = await UserTable.update(
                { userName: data.username, password: data.password },
                {
                    where: {
                        id: id,
                        statusId: status.ACTIVE
                    }
                }
            )
            ctx.body = {
                message: "User Updated",
                // updatedUser
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    public static async GetAllUsers(ctx: Context) {
        try{
        let body = ctx.request.body;
        let data = plainToInstance(GetAllUserSchema, body)
        data = await data.validate();
        const allUsers = await UserTable.findAll({

            where: {

                // userName:data.username,
                statusId: status.ACTIVE
            },
            attributes: [

                "username"
            ],
            include: [
                {
                    model: CompanyTable,
                    as: "company",
                    attributes: ["companyname", "companycode"]
                }
            ]
        })
        ctx.body = {
            allUsers
        }

    }
    
    catch (error){
        console.log(error);
    }
}
}