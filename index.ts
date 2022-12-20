import koa from 'koa';
import Router from "@koa/router";
import koaRouter from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import userroutes from "./Advancing/routes";
import sequelize from "./models/user";


const app = new koa();
const router = new Router();

// import { db, user } from './models/user';
// import query from './models/query';


const database = sequelize();
database.authenticate();
// database.sync();
app.use(bodyParser());
app.use(json());
app.use(router.routes())
   .use(router.allowedMethods());


// router.get('/',async (ctx: Context)=>{
//     const people = await query.viewAll();
//     ctx.body = people;
// });

// router.post('/add', async(ctx: Context)=>{
//     //previously it was from body ctx.request.body
//     const body = ctx.request.query;
//     const pass =  CryptoJs.SHA256(body.password).toString(CryptoJs.enc.Base64);
//     await query.add(body.username,pass);
    
//     ctx.body = {
//         message:'User added',
//     }

//     //ctx.redirect('/');
    
// })

// router.put('/update', async(ctx: Context)=> {
//     const data = ctx.request.query;
//     let { id } = ctx.params;
//     const updateUsers = await query.update( data.username);
//     //ctx.body = updateUsers;
//     // if (!id && !updateUsers) ctx.body = {
//     //     message: "No users exist with this name"
//     // }
//     ctx.body = {
//         message: 'user updated'
//     }
// })

// router.post('/login' , async(ctx : Context)=>{
//       //previously it was from body ctx.request.body
//     let data = ctx.request.query;
//     const pass = CryptoJs.SHA256(data.password).toString(CryptoJs.enc.Base64);
//     const user =  await query.findUser(data.username);
//     if (!user) {
// 		ctx.body = "Invalid Login";
// 	}
//     console.log(user);
//     if(pass == user.password)
//     {
//         const token = jwt.sign(
//             {
//                 username: user.username,
//             },
//            'secret123'
//         )
//         ctx.body = token;
//         ctx.redirect('/hidden');
//         console.log(token);
        
//     }
//     else{
//         ctx.body = "Please Login or Signup";
//         }
// })




// router.get('/hidden', async (ctx : Context)=>{
//     const token = ctx.request.headers['x-access-token']
// 	try {
// 		const decoded = jwt.verify(token, 'secret123')
// 		const username = decoded.username
// 		const user = await query.findUser(username);
// 		ctx.body =  `This is hidden ${token} ${username}`; 
// 	} catch (error) {
// 		console.log(error)
// 		ctx.body = "Login first";
// 	}

    
// })

// // router.delete('/destroy', async (ctx : Context)=> {
// //     const { id } = ctx.params;
// //     const usersData = await query.findUser(id);
// //     if (!usersData){
// //      ctx.body = {
// //          message : "user not found"
// //      }
// //      await usersData.destroy(id);
// //     } 
// //  })

// // router.delete('/destroy',async (ctx: Context)=>{
// //    let data = ctx.request.query;
// //     const deletedUser = await query.deleteUser(data);
// //     ctx.body = {
// //         message: 'user deleted'
// //     }
// // });

// router.delete('/delete-operation/', async (ctx: Context) => {
   
//     try {
//         const { username } = ctx.params;
//       const userdel = await db.user.destroy({
//         where: {
//           username
//         }
//       });
//       ctx.body = {
//         message: 'deleted'
//       }
//     } catch (err) {
//       ctx.body = {
//         message: 'not deleted'
//       }
//     }
//   });


 router.use(userroutes.routes());


app.listen(5000,()=>{
    console.log('Listening on port 5000');
})


