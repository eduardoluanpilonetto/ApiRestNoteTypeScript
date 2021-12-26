import { SpecificationRepositoryInMemory } from "../../repositories/InMemory/specificationRepositoryInMemory";
import { AppError } from "../../../../shared/errors/appError";
import { CarsRepositoryInMemory } from "../../repositories/InMemory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("create car specificar", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory);
    })

    it("shoul not be able a new specification to now-existent car", async () => {
        expect(async () => {
            const car_id = '1234';
            const specifications_id = ['1234'];

            await createCarSpecificationUseCase.execute({car_id, specifications_id})
        }).rejects.toBeInstanceOf(AppError)
    })

    it("shoul be able a new specification to the car", async () => {
        const specification = await specificationRepositoryInMemory.create({
            name: 'SPEC 1',
            description: "This is a description"
        })

        const car = await carsRepositoryInMemory.create({
            name: "Super Car",
            brand: "BMW", 
            category_id: "DWOK",
            daily_rate: 100, 
            description: "Description car", 
            fine_amount: 80, 
            license_plate: "ABC-1234"
         })
        const specifications_id = [specification.id!];

        const specificationCar = await createCarSpecificationUseCase.execute({car_id: car.id!, specifications_id})

        expect(specificationCar).toHaveProperty("specification");
        expect(specificationCar.specification?.length).toBe(1)
    })
})