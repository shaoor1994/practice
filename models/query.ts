import { Context } from 'koa';
import { db, user } from './user';


const add =  async(uname: string,pass: string)=>{


    try{
        await db.sync()
        await user.create({
            username: uname,
            password : pass
             
        })
    }catch(e) {
        console.log(e);
    }
}

const update = async (id:string,username:string) => {
    try{
await db.sync()
await user.update({ 
    where: {
    id:id,
    username: 'saad'}
})
user.push({
    username:user.username
})
user.save();
    } catch(e){
        console.log(e);
    }
}

const viewAll = async()=>{
    try{
        await db.sync();
        const people:string [] = [];
        const users = await user.findAll();
        users.forEach((user: { dataValues: { username: string; }; }) => people.push(user.dataValues.username));
        return  people;

    }catch(e){
        console.error(e);
    }
}

const findUser = async(uname: string)=>{
    try{
        await db.sync();
        let us: any;
        const users = await user.findAll({ 
            where : { username: uname}
        });
        users.forEach((user: { dataValues: any; }) =>  us = user.dataValues);
        return us;
        
    }catch(e){
        console.error(e);
    }
}

const deleteUser = async( username :string ) => {

try{
await user.destroy({
        where: {
           username: username,
        },
      }); 
    }
    catch (err) {
        console.log(err)
    }
    
}

module.exports = {add,viewAll,findUser, update, deleteUser};