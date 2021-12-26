import { ICreateRentalDTO } from "../dtos/IRentalDTO";
import { Rental } from "../infra/typeorm/entities/rental";

interface IRentalsRepository{
    findByRentalCar(car_id: string):Promise<Rental | undefined>;
    findOpenByRentalUser(user_id: string):Promise<Rental | undefined>;
    create(data: ICreateRentalDTO): Promise<Rental>
}

export { IRentalsRepository }