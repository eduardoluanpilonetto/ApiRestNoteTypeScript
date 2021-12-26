import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/IRentalDTO";
import { Rental } from "../../../infra/typeorm/entities/rental";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";

class RentalRepository implements IRentalsRepository{
    private repository: Repository<Rental>

    constructor(){
        this.repository = getRepository(Rental);
    }

    async create({user_id, car_id, expected_return_date}:ICreateRentalDTO):Promise<Rental>{
        const rental = this.repository.create({
            user_id,
            car_id, 
            expected_return_date
       })

       await this.repository.save(rental);

       return rental;
   }

    async findByRentalCar(car_id: string):Promise<Rental | undefined>{
        return await this.repository.findOne({car_id})
    }

    async findOpenByRentalUser(user_id: string):Promise<Rental | undefined>{
        return await this.repository.findOne({user_id}) 
    }
}

export { RentalRepository }