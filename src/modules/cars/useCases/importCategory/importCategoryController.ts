import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./importCategoryUseCase";
import { container } from "tsyringe";

class ImportCategoryController{

    async handle(req: Request, res: Response):Promise<Response>{
        const { file } = req;

        const importCategoryUseCase = await container.resolve(ImportCategoryUseCase)
    
        importCategoryUseCase.execute(file);

        return res.status(201).send();
    }
}

export { ImportCategoryController };