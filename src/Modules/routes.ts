import Router from "@koa/router";
import CompanyController from "./controllers/companycontroller";

import UserController from "./controllers/usercontroller";

import { checkJwt } from "../Middleware/auth";



const router = new Router();


router.post("/create-user", UserController.createUser);
router.get("/get-user/:id", UserController.getUser);
router.get("/get-user", UserController.GetAllUsers);
router.delete("/delete-user/:id", UserController.deleteUser);
router.put("/update-user/:id", UserController.updateUser);

router.post("/login", checkJwt,  UserController.login);

router.post("/create-company", CompanyController.createCompany);


export default router;