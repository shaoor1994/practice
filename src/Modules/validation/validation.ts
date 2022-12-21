import {
    IsDefined,
    IsNotEmpty,
    IsOptional,
    IsString,
    validate,
    ValidationError,
  } from "class-validator";
  import { plainToInstance } from "class-transformer";



  export class CreateUserSchema{
    @IsDefined()
    @IsString()
    @IsNotEmpty({message:"Username is required"})
    username: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty({message: "Password id required"})
    password: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty({message: "Status id required"})
    statusId: number;

    @IsOptional()
    @IsString()
    id?: string;


    public async validate(): Promise<CreateUserSchema> {
        const obj: CreateUserSchema = plainToInstance(
          CreateUserSchema,
          this
        );
        const errors: ValidationError[] = await validate(obj, { whitelist: true });
        if (errors.length > 0) {
         console.log("error")
        }
        return obj as CreateUserSchema;
      }
  }


  export class UpdateUserSchema{
    @IsDefined()
    @IsString()
    @IsNotEmpty({message:"Username is required"})
    username: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty({message: "Password id required"})
    password: string;


    public async validate(): Promise<UpdateUserSchema> {
        const obj: UpdateUserSchema = plainToInstance(
          UpdateUserSchema,
          this
        );
        const errors: ValidationError[] = await validate(obj, { whitelist: true });
        if (errors.length > 0) {
         console.log("error")
        }
        return obj as UpdateUserSchema;
      }

    
}

export class GetAllUserSchema{
  @IsDefined()
  @IsString()
  @IsNotEmpty({message:"Username is required"})
  username: string;


  public async validate(): Promise<GetAllUserSchema> {
      const obj: GetAllUserSchema = plainToInstance(
        GetAllUserSchema,
        this
      );
      const errors: ValidationError[] = await validate(obj, { whitelist: true });
      if (errors.length > 0) {
       console.log("error")
      }
      return obj as GetAllUserSchema;
    }


}


export class CreateCompanySchema{
  @IsDefined()
  @IsString()
  @IsNotEmpty({message:"Companyname is required"})
  companyname: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty({message: " company code is  required"})
  companycode: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty({message: "Status id required"})
  statusId: number;

  @IsOptional()
  @IsString()
  id?: string;


  public async validate(): Promise<CreateCompanySchema> {
      const obj: CreateCompanySchema = plainToInstance(
        CreateCompanySchema,
        this
      );
      const errors: ValidationError[] = await validate(obj, { whitelist: true });
      if (errors.length > 0) {
       console.log("error")
      }
      return obj as CreateCompanySchema;
    }
}