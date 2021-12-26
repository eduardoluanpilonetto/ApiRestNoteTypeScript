import { Category } from "../entities/category";
import { ICategoryRepository, ICreateCategoryDTO } from "../../../repositories/IcategoriesRespository";
import { getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICategoryRepository{
    private categories: Repository<Category>;

    constructor(){
        this.categories = getRepository(Category);
    }

    async create({name, description}:  ICreateCategoryDTO ): Promise<void>{

        const category = await this.categories.create({name, description});

        await this.categories.save(category)
    }

    async list():Promise<Category[]>{

        const all = await this.categories.find();

        return all;
    }

    async findByName(name: string): Promise<Category | undefined>{
        const category = await this.categories.findOne({name: name})

        return category;
    }
}

export { CategoriesRepository }