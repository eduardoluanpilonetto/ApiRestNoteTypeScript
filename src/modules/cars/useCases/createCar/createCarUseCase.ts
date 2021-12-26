import { ICarsRepository } from "../../repositories/IcarRepository";
import { AppError } from "../../../../shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/entities/car";

interface IRequest{
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase{

    constructor(@inject("CarsRepository") private carsRepository: ICarsRepository){}

    async execute({name, brand, category_id, daily_rate, description, fine_amount, license_plate}: IRequest): Promise<Car>{

        const carAlreadExists = await this.carsRepository.findByLicencePlate(license_plate);

        if(carAlreadExists){
            throw new AppError('Plate alredy exists');
        }

        const car = await this.carsRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })

        return car;
    }
}

export { CreateCarUseCase }