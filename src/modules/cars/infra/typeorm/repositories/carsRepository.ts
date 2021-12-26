import { getRepository, Repository } from "typeorm";
import { ICarsDTO } from "../../../dtos/ICarsRepositoryDTO";
import { Car } from "../../../infra/typeorm/entities/car";
import { ICarsRepository } from "../../../repositories/IcarRepository";

class CarsRepository implements ICarsRepository{

    private repository: Repository<Car>;

    constructor(){
        this.repository = getRepository(Car);
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specification,
        id
        }: ICarsDTO): Promise<Car>{
            const car = await this.repository.create({
                id,
                name,
                description,
                daily_rate,
                license_plate,
                fine_amount,
                brand,
                category_id,
                specification
            });

            await this.repository.save(car);

            return car;
    }

    async findByLicencePlate(license_plate: string): Promise<Car | undefined>{
        return this.repository.findOne({license_plate})
    }

    async findAvailable(name?: string, brand?: string, category_id?: string ):Promise<Car[]>{
        const carsQuery = this.repository
        .createQueryBuilder("c")
        .where("available = :available", {available: true})
        if(brand){carsQuery.andWhere("c.brand = :brand", {brand})}
        if(name){carsQuery.andWhere("c.name = :name", {name})}
        if(category_id){carsQuery.andWhere("c.category_id = :category_id", {category_id})}

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findById(car_id: string):Promise<Car | undefined>{
        return await this.repository.findOne({id: car_id});
    }

} 

export { CarsRepository }