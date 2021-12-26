import { Rental } from "../../infra/typeorm/entities/rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { AppError } from "../../../../shared/errors/appError";
import { IDataProvider } from "../../../../shared/container/providers/datePrivider/IDataProvider";
import { inject, injectable } from "tsyringe";


interface IRequest{
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase{

    constructor(
        @inject("RentalRepository") 
        private rentalsRepository: IRentalsRepository,
        @inject("DayJsDateProvider") 
        private dateProvider: IDataProvider
        ){}

    async execute({user_id, car_id, expected_return_date}:IRequest):Promise<Rental>{
        const minimunHour = 24;

        const carAvailable = await this.rentalsRepository.findByRentalCar(car_id)

        if(carAvailable){
            throw new AppError('car id unavailable', 400);
        }

        const userAvailable = await this.rentalsRepository.findOpenByRentalUser(user_id);

        if(userAvailable){
            throw new AppError('user id unavailable', 400);
        }

        const dateNow = this.dateProvider.dayNow();
        const compare = this.dateProvider.compare(dateNow, expected_return_date)

        if(compare < minimunHour){
            throw new AppError('Minimum rental is 24 hours', 400);
        }

        return await this.rentalsRepository.create({user_id, car_id, expected_return_date});
    }
}

export { CreateRentalUseCase }