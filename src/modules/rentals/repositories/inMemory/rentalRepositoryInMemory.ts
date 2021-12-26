import { ICreateRentalDTO } from "../../dtos/IRentalDTO";
import { Rental } from "../../infra/typeorm/entities/rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalRepositoryInMemory implements IRentalsRepository{
    private repository: Rental[] = [];

    async create({user_id, car_id, expected_return_date}:ICreateRentalDTO):Promise<Rental>{
        const rental = new Rental();
        Object.assign(rental, {
           user_id,
           car_id, 
           expected_return_date,
           start_date: new Date()
       })

       this.repository.push(rental);

       return rental;
   }

    async findByRentalCar(car_id: string):Promise<Rental | undefined>{
        const rental = await this.repository.find(rental => rental.car_id == car_id && !rental.end_date)
        return rental;
    }

    async findOpenByRentalUser(user_id: string):Promise<Rental | undefined>{
        const rental = await this.repository.find(rental => rental.user_id == user_id && !rental.end_date)
        return rental;
    }
}

export { RentalRepositoryInMemory }