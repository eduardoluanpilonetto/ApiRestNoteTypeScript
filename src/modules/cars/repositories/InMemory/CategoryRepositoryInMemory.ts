import { Category } from "../../infra/typeorm/entities/category";
import { ICategoryRepository, ICreateCategoryDTO } from "../IcategoriesRespository";

class CategoriesRepositoryInMemory implements ICategoryRepository{
    private categories: Category[] = [];

    async create({name, description}:  ICreateCategoryDTO ): Promise<void>{

        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date
        })

        this.categories.push(category)
    }

    async list():Promise<Category[]>{

        const all = await this.categories;

        return all;
    }

    async findByName(name: string): Promise<Category | undefined>{
        const category = await this.categories.find((category) => category.name === name)

        return category;
    }
}

export { CategoriesRepositoryInMemory }