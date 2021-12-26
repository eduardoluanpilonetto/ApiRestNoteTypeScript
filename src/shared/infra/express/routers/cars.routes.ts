import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/createCarController";
import { EnsureAuthenticate } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import { ListCarsController } from "../../../../modules/cars/useCases/listCars/listCarsController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/creteCarSpecificationController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/uploadCarImageController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";

const routerCars = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/cars')) 


const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

routerCars.post('/', EnsureAuthenticate, ensureIsAdmin, createCarController.handle);
routerCars.get('/',EnsureAuthenticate, listCarsController.handle)
routerCars.post('/specifications/:id',EnsureAuthenticate, createCarSpecificationController.handle)
routerCars.post('/images/:id', EnsureAuthenticate, ensureIsAdmin, uploadAvatar.array('images'), uploadCarImageController.handle)

export { routerCars }