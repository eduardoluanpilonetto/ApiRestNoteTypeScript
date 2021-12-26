import { ICarImagesRepositoryDTO } from "modules/cars/dtos/ICarsImageRepositoryDTO";
import { ICarImageRepository } from "modules/cars/repositories/ICarImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/carImage";

class CarImageRepository implements ICarImageRepository{
    private repository: Repository<CarImage>

    constructor(){
        this.repository = getRepository(CarImage);
    }

    async create({id, car_id, imarge_name}: ICarImagesRepositoryDTO):Promise<CarImage>{
        const carImage = this.repository.create({
            car_id,
            imarge_name,
            id
        })

        await this.repository.save(carImage);

        return carImage;
    }
}

export { CarImageRepository }