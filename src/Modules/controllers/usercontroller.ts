import { plainToInstance } from "class-transformer";
import { Context, } from "koa";
import status from "../../Generals/status";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
    CompanyTable,
    UserAttributes, UserTable
} from "../../Database/models";
import { CreateUserSchema, GetAllUserSchema, UpdateUserSchema } from "../validation/validation";
import { NotFoundError } from "../../Generals/errors/NotFoundError";
import config from "../../Database/config/secretKey";
import { getPassword } from "../../Generals/generics/generals";

export default class UserController {

    // static login = async (ctx : Context) => {
    //     //Check if username and password are set
    //     // let { username, password } = ctx.body;
    //     if (!(username && password)) {
    //      ctx.status = 400;
    //     }
    
    //     //Get user from database
    //     // const userRepository = getRepository(User);
    //     // let user: UserTable;
    //     try {
    //       user = await UserTable.findOne({ where: { username } });
    //     } catch (error) {
    //       res.status(401).send();
    //     }
    
    //     //Check if encrypted password match
    //     if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    //       res.status(401).send();
    //       return;
    //     }
    
    //     //Sing JWT, valid for 1 hour
    //     const token = jwt.sign(
    //       { userId: user.id, username: user.username },
    //       config.jwtSecret,
    //       { expiresIn: "1h" }
    //     );
    
    //     //Send the jwt in the response
    //     res.send(token);
    //   };

    public static async createUser(ctx: Context) {
        try {
           let  body = ctx.request.body;
            let data = plainToInstance(CreateUserSchema, body)
            data = await data.validate();
            const users = await UserTable.create({

                userName: data.username,
                // password: data.password,
                password:getPassword(),
                id: data.id,
                statusId: status.ACTIVE,
                authtoken: data.authtoken,

            });
            const token = jwt.sign(
                { userName: data.username, password:data.password },
                config.jwtSecret,
                {
                  expiresIn: "2h",
                }
              );
              // save user token
              users.authtoken = token;
          
              // return new user
             ctx.body = {
                message:'User Created',
                users
             }
            } catch (err) {
              console.log(err);
            }

        
    }


    public static async getUser(ctx: Context) {

        try {

        


                    // old code
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
            // include: [
            //     {
            //         model: CompanyTable,
            //         as: "company",
            //         attributes: ["companyname", "companycode"]
            //     }
            // ]
        })
        ctx.body = {
            allUsers
        }

    }
    
    catch (error){
        console.log(error);
    }
}


public static async login (ctx: Context , payLoad: any) {
    try {
        // Get user input
        let body = ctx.request.body;
        let data = plainToInstance(CreateUserSchema, body)
        data = await data.validate();
    
        // Validate user input
        if (!(data.username && data.password)) {
          ctx.status = 400;
        }
        // Validate if user exist in our database
        const user = await UserTable.findOne({ 

            where : {
                userName : data.username,
            }
        });
    
        if (user && (await bcrypt.compare(data.password, user.password))) {
          // Create token
          const token = jwt.sign(
            { userName: data.username, password:data.password},
            config.jwtSecret,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.authtoken = token;
          user.save();
    
          // user
          ctx.body={
            message : "User Successful",
            user
          }
        }
        ctx.body = {
            message : "Invalid Credential"
        }
      } catch (err) {
        console.log(err);
      }
}

}