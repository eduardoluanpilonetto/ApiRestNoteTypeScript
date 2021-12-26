import {  Router } from "express";
import { CreateCategoryController } from "../../../../modules/cars/useCases/crateCategory/createCategoryController";
import { ListCategoryController }from "../../../../modules/cars/useCases/listCategory/listCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/importCategoryController";
import { EnsureAuthenticate } from "../middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin";
import multer from "multer";

const routerCategories = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

const upload = multer({
    dest: "./tmp"
});

routerCategories.post('/',EnsureAuthenticate, ensureIsAdmin, createCategoryController.handle);
routerCategories.get('/', EnsureAuthenticate, listCategoryController.handle)
routerCategories.post('/import',EnsureAuthenticate, ensureIsAdmin, upload.single('file'), importCategoryController.handle);

export { routerCategories };