import {  Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/createRentalController";
import { EnsureAuthenticate } from "../middlewares/ensureAuthenticated";

const routerRentals = Router();

const createRentalController = new CreateRentalController();

routerRentals.post('/',EnsureAuthenticate, createRentalController.handle)

export { routerRentals };