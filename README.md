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



