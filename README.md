# demo-koa-sql
This is a basic authentication and authorisation app having a CRUD functionality to it.

## Setup
Setup a Node environment and the install KOA a web framework on to using this command:
`npm i koa`
For keeping the server running we need:
`npm install --global nodemon`


similarly install packages for the app which includes:
 1. koa-bodyparser
    * For reading getting the post request data.
 2. koa-router
    * Creating restful routes in the application.
 3. koa-json
    * Reading the JSON data.
 4. crypto-js
    * Encrypting/Hashing the passwords for users and safely storing them in the database.
 5. jsonwebtoken
    * Using JWT for Authorisation and keeping user logged in.
 6. Sequelize and mysql2
    * We used mysql for storing the data so for for connecting the KOA with the database we use sequelize.
  
 ## Starting the application
 use command `nodemon index.js`
 
### Structure
The routes and controllers for routers are index.js and this is the file we start the server on.
Models folder contains all the model design and querying functions on model is respective order:
1. user.js (model design and creation)
2. query.js (adding a user viewing a user and viewing all users)


