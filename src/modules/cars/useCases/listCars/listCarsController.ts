import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListCarsUseCase } from "./listCarsUseCase";

class ListCarsController{
    async handle(req: Request, res: Response): Promise<Response>{
        const listCarsUseCase = container.resolve(ListCarsUseCase);

        const { name, brand, category_id } = req.query;

        const cars = await listCarsUseCase.execute({name: name as string, brand: brand as string, category_id: category_id as string})

        return res.status(200).json(cars)
    }
}

export { ListCarsController }