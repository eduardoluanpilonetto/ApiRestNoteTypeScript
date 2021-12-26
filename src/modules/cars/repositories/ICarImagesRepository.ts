import { ICarImagesRepositoryDTO } from "../dtos/ICarsImageRepositoryDTO";
import { CarImage } from "../infra/typeorm/entities/carImage";

interface ICarImageRepository{
    create(data: ICarImagesRepositoryDTO):Promise<CarImage>
}

export { ICarImageRepository }