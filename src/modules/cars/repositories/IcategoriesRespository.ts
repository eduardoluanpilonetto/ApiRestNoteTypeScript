import { Category } from "../infra/typeorm/entities/category"

interface ICreateCategoryDTO{
    name: string;
    description: string;
}

interface ICategoryRepository{
    create({name, description}:  ICreateCategoryDTO ):Promise<void>;
    list():Promise<Category[]>;
    findByName(name: string): Promise<Category | undefined>;
}

export { ICreateCategoryDTO, ICategoryRepository };