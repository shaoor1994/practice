import { Sequelize } from "sequelize-typescript";
//const Sequelize = require('sequelize');
import * as models from "../Advancing/modelcall";
import { UserTable } from "../Advancing/modelcall";
//const dataType = Sequelize
let sequelize: Sequelize;

const db = () => {
    if (sequelize && sequelize instanceof Sequelize) {
        return sequelize;
      }
sequelize = new Sequelize({
    host:'localhost',
    dialect: 'mysql',
    database:'prctice_code_db',
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

// });


// db.authenticate()
//     .then(()=>console.log("Connection Worked"))
//     .catch((err: string)=> console.log(err))



// const user = db.define('users',{
//     username: {
//         type: dataType.STRING(40),
//         allowNull: false,
//         unique : true

// },
//     password: {
//         type: dataType.STRING,
//         allowNul: false
//     }
// })




// //module.exports = {db,user};
}
export default db;