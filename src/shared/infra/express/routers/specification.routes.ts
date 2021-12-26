import { Router } from "express";
import { EnsureAuthenticate } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/crateSpecificationController";

const routerSpecification = Router();

const createSpecificationController = new CreateSpecificationController();

routerSpecification.post('/', EnsureAuthenticate, ensureIsAdmin, createSpecificationController.handle)

export { routerSpecification }