import { ListCategoryUseCase } from "./listCategoryUseCase";
import { Request, Response } from "express"
import { container } from "tsyringe";

class ListCategoryController{
    async handle(req: Request, res: Response): Promise<Response>{
        const listCategoryUseCase = container.resolve(ListCategoryUseCase);

        const categories = await listCategoryUseCase.execute();

        return res.status(200).json(categories); 
    }
}

export { ListCategoryController }