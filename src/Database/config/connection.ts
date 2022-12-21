import { Sequelize } from "sequelize-typescript";
import * as models from "../models/modelcall";
import { UserTable } from "../models/modelcall";
let sequelize: Sequelize;

const db = () => {
    if (sequelize && sequelize instanceof Sequelize) {
        return sequelize;
      }
sequelize = new Sequelize({
    host:'localhost',
    dialect: 'mysql',
    database:'practice_code_db',
    username:'root',
    password:'123456789',
    // models: [UserTable],
    models: Object.values(models),
    logging: false
})
sequelize.sync({alter: false})
.then(()=> console.log("synchronised"))
.catch((err)=>console.log(err)) 
return sequelize;


}
export default db;