import { ICarsRepository } from "../../repositories/IcarRepository"
import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/appError";
import { ISpecificationRepository } from "../../repositories/IspecificationRepository";
import { Car } from "../../infra/typeorm/entities/car";

interface Irequest{
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase{

    constructor(
        @inject("CarsRepository") 
        private carRepository: ICarsRepository,
        @inject("SpecificationRepository")
        private specificationsRespository: ISpecificationRepository
    ){}

    async execute({car_id, specifications_id}: Irequest):Promise<Car>{
        
        const carAlredyExists = await this.carRepository.findById(car_id);

        if(!carAlredyExists){
            console.log('entrou')
            throw new AppError('Car not exists', 400)
        }

        const specifications = await this.specificationsRespository.findByIds(specifications_id)

        carAlredyExists.specification = specifications;

        await this.carRepository.create({
            name: carAlredyExists.name!,
            description: carAlredyExists.description!,
            daily_rate: carAlredyExists.daily_rate!,
            license_plate: carAlredyExists.license_plate!,
            fine_amount: carAlredyExists.fine_amount!,
            brand: carAlredyExists.brand!,
            category_id: carAlredyExists.category_id!,
            specification: carAlredyExists.specification,
            id: carAlredyExists.id
            });

        return carAlredyExists;
    }
}

export { CreateCarSpecificationUseCase }