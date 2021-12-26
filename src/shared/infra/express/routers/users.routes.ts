import { Router } from "express";
import { CreateUserController } from "../../../../modules/accounts/useCases/crateUser/createUserController";
import { UpdateUserAcatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/updateAvatarController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { EnsureAuthenticate } from "../middlewares/ensureAuthenticated";

const routerUsers = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar')) 

const createUserController = new CreateUserController();
const updateUserAcatarController = new UpdateUserAcatarController();

routerUsers.post('/', createUserController.handle)
routerUsers.patch('/avatar', EnsureAuthenticate,  uploadAvatar.single('avatar'), updateUserAcatarController.Handle)

export { routerUsers }