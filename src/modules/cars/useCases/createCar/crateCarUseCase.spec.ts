import { AppError } from "../../../../shared/errors/appError";
import { CarsRepositoryInMemory } from "../../repositories/InMemory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./createCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("create car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Super Car",
            brand: "BMW", 
            category_id: "DWOK",
            daily_rate: 100, 
            description: "Description car", 
            fine_amount: 80, 
            license_plate: "ABC-1234"
        });

        expect(car).toHaveProperty('id');
    })

    it("create car alrady exists", async () =>
        expect(async () => {
            await createCarUseCase.execute({
                name: "Super Car",
                brand: "BMW", 
                category_id: "DWOK",
                daily_rate: 100, 
                description: "Description car", 
                fine_amount: 80, 
                license_plate: "ABC-1234"
            });

            await createCarUseCase.execute({
                name: "Super Car",
                brand: "BMW", 
                category_id: "DWOK",
                daily_rate: 100, 
                description: "Description car", 
                fine_amount: 80, 
                license_plate: "ABC-1234"
            });
        }).rejects.toBeInstanceOf(AppError)
    )

    it("create car with avalible true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Super Car",
            brand: "BMW", 
            category_id: "DWOK",
            daily_rate: 100, 
            description: "Description car", 
            fine_amount: 80, 
            license_plate: "ABC-1234"
        });

        expect(car.available).toBe(true);
    })
})