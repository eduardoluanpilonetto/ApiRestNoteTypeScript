import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { ICategoryRepository } from "../../repositories/IcategoriesRespository";

interface IRequest{
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase{

    constructor(@inject('CategoriesRepository') private categoriesRepository: ICategoryRepository){}

    async execute({name, description}: IRequest): Promise<void>{
        const categoryAlReadyExists = await this.categoriesRepository.findByName(name);

        if(categoryAlReadyExists){
           throw new AppError('Category already exists', 400);
        }
    
        this.categoriesRepository.create({name, description});
    }
}

export { CreateCategoryUseCase }