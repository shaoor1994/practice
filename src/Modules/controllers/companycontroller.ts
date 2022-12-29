import { plainToInstance } from "class-transformer";
import { Context, } from "koa";
import status from "../../Generals/status";
import { CompanyTable } from "../../Database/models";
import { CreateCompanySchema } from "../validation/validation";

export default class CompanyController {

    public static async createCompany (ctx : Context) {
        let body = ctx.request.body;
        let data = plainToInstance ( CreateCompanySchema, body )
        data = await data.validate();
        const companies = await CompanyTable.create({
            
             companyName: data.companyname,
             companyCode:data.companycode,
             id:data.id,
             statusId: status.ACTIVE, 
               
        
        
        });

        ctx.body = {
            message: "Company Created",
            companies
        }
    }


}