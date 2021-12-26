import { Router } from "express";
import { routerCategories } from "./cotegories.routes";
import { routerSpecification } from "./specification.routes";
import { routerUsers } from "./users.routes";
import { routerAuthenticate } from "./authenticate.routes";
import { routerCars } from "./cars.routes";
import { routerRentals } from "./rentals.routes";

const router = Router();

router.use('/categories', routerCategories);
router.use('/specifications', routerSpecification);
router.use('/users', routerUsers)
router.use('/cars', routerCars)
router.use(routerAuthenticate);
router.use('/rentals', routerRentals)

export { router };