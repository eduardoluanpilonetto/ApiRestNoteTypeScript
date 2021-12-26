import { ICarImageRepository } from "../../repositories/ICarImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest{
    car_id: string;
    imarge_name: string[];
}

@injectable()
class UploadCarImageUseCase{

    constructor(@inject("CarImageRepository") private carsImageRepository: ICarImageRepository){}

    async execute({car_id, imarge_name}: IRequest):Promise<void>{
        imarge_name.map(async (imarge_names) => {
            await this.carsImageRepository.create({car_id, imarge_name: imarge_names});
        })
       

    }
}

export { UploadCarImageUseCase };