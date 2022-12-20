import Router from "@koa/router";

import UserController from "./controller";

const router = new Router();


router.post("/create-user", UserController.createUser);

router.get("/create-user/:id", UserController.getUser);
router.get("/", UserController.GetAllUsers);
router.delete("/create-user/:id", UserController.deleteUser);
router.put("/create-user/:id", UserController.updateUser);
export default router;