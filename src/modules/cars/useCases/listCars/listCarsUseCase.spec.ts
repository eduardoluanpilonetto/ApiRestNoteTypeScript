import { CarsRepositoryInMemory } from "../../repositories/InMemory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./listCarsUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory
describe('list cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    it('list Cars', async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Super Car",
            brand: "BMW", 
            category_id: "DWOK",
            daily_rate: 100, 
            description: "Description car", 
            fine_amount: 80, 
            license_plate: "ABC-1234"
        })

        const cars = await listCarsUseCase.execute({})

        expect(cars).toEqual([car]);
    })

    it('List Cars By name', async () => {
        const car2 = await carsRepositoryInMemory.create({
            name: "NameCar",
            brand: "BMW", 
            category_id: "DWOK",
            daily_rate: 100, 
            description: "Description car", 
            fine_amount: 80, 
            license_plate: "ABC-1235"
        })

        const cars2 = await listCarsUseCase.execute({
            name: "NameCar"
        })

        expect(cars2).toEqual([car2]);
    })

    it('list Cars by branc', async () => {

        const car3 = await carsRepositoryInMemory.create({
            name: "Super Car",
            brand: "brandCar", 
            category_id: "DWOK",
            daily_rate: 100, 
            description: "Description car", 
            fine_amount: 80, 
            license_plate: "ABC-1236"
        })

        const cars3 = await listCarsUseCase.execute({
            brand: "brandCar"
        })

        expect(cars3).toEqual([car3]);
    })

    it('list Cars by category id', async () => {

        const car4 = await carsRepositoryInMemory.create({
            name: "Super Car",
            brand: "BMZ", 
            category_id: "category_id",
            daily_rate: 100, 
            description: "Description car", 
            fine_amount: 80, 
            license_plate: "ABC-1237"
        })

        const cars4 = await listCarsUseCase.execute({
            category_id: "category_id"
        })

        expect(cars4).toEqual([car4]);
    })
})