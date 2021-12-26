import { CreateCategoryUseCase } from "./createCategoryUseCase"
import { CategoriesRepositoryInMemory } from "../../repositories/InMemory/CategoryRepositoryInMemory"
import { AppError } from "../../../../shared/errors/appError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("createCategory", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it("Criar categoria corretamente", async () => {
        const category = {
            name: "SUV", 
            description: "Parece uma caminhonete"
        }

        await createCategoryUseCase.execute({name: category.name, description: category.description});

        const categoryExists = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryExists).toHaveProperty('id');
    })

    it("Criar categoria com nome existente", async () => {
        expect(async () => {
            const category = {
                name: "SUV", 
                description: "Parece uma caminhonete"
            }
    
            await createCategoryUseCase.execute({name: category.name, description: category.description});
    
            await createCategoryUseCase.execute({name: category.name, description: category.description});
        }).rejects.toBeInstanceOf(AppError)
    })
})