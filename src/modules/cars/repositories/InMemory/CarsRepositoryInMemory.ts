import { ICarsDTO } from "../../dtos/ICarsRepositoryDTO";
import { Car } from "../../infra/typeorm/entities/car";
import { ICarsRepository } from "../IcarRepository";

class CarsRepositoryInMemory implements ICarsRepository{
    repositoryCars: Car[] = [];

    async create({name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specification,
        id
    }: ICarsDTO): Promise<Car>{
            const car = new Car();

            Object.assign(car, {
                name,
                description,
                daily_rate,
                license_plate,
                fine_amount,
                brand,
                category_id,
                specification,
                id
            })

            this.repositoryCars.push(car)

            return car;
    }

    async findByLicencePlate(license_plate: string): Promise<Car | undefined>{
        const FindCar = this.repositoryCars.find((car) => car.license_plate == license_plate )

        return FindCar;
    }

    async findAvailable(name?: string, brand?: string, category_id?: string):Promise<Car[]>{
        return  this.repositoryCars.filter(
            (car) => {
                if(car.available == true || ((name && name == car.name) || (brand && car.brand == brand) || (category_id && car.category_id))){
                    return car;
                }
            })
    }

    async findById(car_id: string):Promise<Car | undefined>{
        return await this.repositoryCars.find((car) => car.id == car_id)
    }
} 

export { CarsRepositoryInMemory }