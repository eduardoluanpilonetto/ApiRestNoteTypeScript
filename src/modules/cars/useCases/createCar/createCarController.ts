import { Request, Response } from "express"
import { container } from "tsyringe";
import { CreateCarUseCase } from "./createCarUseCase";

class CreateCarController{
    async handle(req: Request, res: Response):Promise<Response>{
        
        const {name, brand, category_id, daily_rate, description, fine_amount, license_plate} = req.body;

        const createCarUseCase = container.resolve(CreateCarUseCase);

        const car = await createCarUseCase.execute({name, brand, category_id, daily_rate, description, fine_amount, license_plate});

        return res.status(201).json(car);
    }
}

export { CreateCarController }