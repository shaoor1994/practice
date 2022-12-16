import Router from "@koa/router";

import UserController from "./controller";

const router = new Router();


router.post("create-user", UserController.createUser);
router.use(router.routes());

export default router;