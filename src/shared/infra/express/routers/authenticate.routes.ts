import {  Router } from "express";
import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authenticateUser/authenticateController";

const routerAuthenticate = Router();

const authenticateUserController = new AuthenticateUserController();

routerAuthenticate.post('/session', authenticateUserController.handle);

export { routerAuthenticate };