import {
    IsDefined,
    IsOptional,
    IsString,
    validate,
    ValidationError,
  } from "class-validator";
  import { plainToInstance } from "class-transformer";



  export class CreateUserSchema{
    @IsDefined()
    @IsString()
    username: string;

    @IsDefined()
    @IsString()
    password: string;

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