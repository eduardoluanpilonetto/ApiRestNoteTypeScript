import { container } from "tsyringe";
import { IUserRepository } from "../../modules/accounts/repositories/IuserRepository";
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/userRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/IcategoriesRespository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/categoriesRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/specificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/IspecificationRepository";
import { ICarsRepository } from "../../modules/cars/repositories/IcarRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/carsRepository";
import { ICarImageRepository } from "../../modules/cars/repositories/ICarImagesRepository";
import { CarImageRepository } from "../../modules/cars/infra/typeorm/repositories/carsImageRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";
import { RentalRepository } from "../../modules/rentals/infra/typeorm/repositories/repositoryRental";
import { IDataProvider } from "./providers/datePrivider/IDataProvider";
import { DayJsDateProvider } from "./providers/datePrivider/implementations/dayJsProvider";

container.registerSingleton<ICategoryRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
)

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
)

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarImageRepository>(
    "CarImageRepository",
    CarImageRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalRepository",
    RentalRepository
)

container.registerSingleton<IDataProvider>(
    "DayJsDateProvider",
    DayJsDateProvider
)