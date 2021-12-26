import { ICarsDTO } from "../dtos/ICarsRepositoryDTO";
import { Car } from "../infra/typeorm/entities/car";

interface ICarsRepository{
    create(data: ICarsDTO): Promise<Car>;
    findByLicencePlate(license_plate: string): Promise<Car | undefined>
    findAvailable(name?: string, brand?: string, category_id?: string ):Promise<Car[]>
    findById(car_id: string): Promise<Car | undefined>
}

export { ICarsRepository }