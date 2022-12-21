import koa from 'koa';
import Router from "@koa/router";
import koaRouter from 'koa-router';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import userroutes from "./Modules/routes";
import sequelize from "./Database/config/connection";


const app = new koa();
const router = new Router();



const database = sequelize();
database.authenticate();
app.use(bodyParser());
app.use(json());
app.use(router.routes())
   .use(router.allowedMethods());

 router.use(userroutes.routes());


app.listen(5000,()=>{
    console.log('Listening on port 5000');
})


