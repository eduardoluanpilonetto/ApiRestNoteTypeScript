import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/typeorm/entities/category";
import { ICategoryRepository } from "../../repositories/IcategoriesRespository";

@injectable()
class ListCategoryUseCase{

    constructor(@inject('CategoriesRepository') private categoriesRepository: ICategoryRepository){}


    async execute(): Promise< Category[]>{
        return await this.categoriesRepository.list();
    }

}

export { ListCategoryUseCase }