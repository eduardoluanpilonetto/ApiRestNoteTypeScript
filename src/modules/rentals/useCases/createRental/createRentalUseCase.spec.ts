import { AppError } from "../../../../shared/errors/appError";
import { RentalRepositoryInMemory } from "../../repositories/inMemory/rentalRepositoryInMemory";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { DayJsDateProvider } from "../../../../shared/container/providers/datePrivider/implementations/dayJsProvider"
import dayjs from "dayjs";


let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalRepositoryInMemory
let dayJsDateProvider: DayJsDateProvider

describe("create a new rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

     beforeEach(() => {
        rentalRepositoryInMemory = new RentalRepositoryInMemory();
        dayJsDateProvider = new DayJsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dayJsDateProvider);
     })

    it("shuld be able to create a new rental", async () => {
        console.log(dayAdd24Hours)
        const rental = await createRentalUseCase.execute({
            user_id: "4757", 
            car_id:"7445", 
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id")
    })

    it("shuld not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
             const rental1 = await createRentalUseCase.execute({
                user_id: "4757", 
                car_id:"7445", 
                expected_return_date: dayAdd24Hours
            });
    
            const rental2 = await createRentalUseCase.execute({
                user_id: "4757", 
                car_id:"98098", 
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError)
    })
    
    it("shuld not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            const rental1 = await createRentalUseCase.execute({
                user_id: "4757", 
                car_id:"7445", 
                expected_return_date: dayAdd24Hours
            });

            const rental2 = await createRentalUseCase.execute({
                user_id: "4750", 
                car_id:"7445", 
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError)
    })

    it("shuld not be able to create a new rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "4757", 
                car_id:"7445", 
                expected_return_date: dayjs().toDate()
            });
        }).rejects.toBeInstanceOf(AppError)
    })
})