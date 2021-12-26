import { UserRepositoryInMemory } from "../../repositories/in-memory/userRepositoryInMemory";
import { CreateUserUseCase } from "../crateUser/createUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase"
import { ICreateUserDTO} from "../../dtos/ICreateUserDTO";
import { AppError } from "../../../../shared/errors/appError";

describe("authenticate user", () => {

    let userRepositoryInMemory: UserRepositoryInMemory;
    let authenticateUserUseCase: AuthenticateUserUseCase;
    let createUserUseCase: CreateUserUseCase;


    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    })

        
    it("usuario logado com sucesso", async () => {
        const user: ICreateUserDTO = {
            name: "eduardo",
            email: "teste@teste.com",
            password: "1234",
            driver_license: "9280234"
        }

        await createUserUseCase.execute(user);

        const userAuthenticate = await authenticateUserUseCase.execute({email: user.email, password: user.password})

        expect(userAuthenticate).toHaveProperty("token");
    })



    it("usuario logado com email Incorreto", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "eduardo",
                email: "teste@teste.com",
                password: "1234",
                driver_license: "9280234"
            }
    
            await createUserUseCase.execute(user);
            
            const userAuthenticate = await authenticateUserUseCase.execute({email: 'gosto de batatas', password: user.password})
        }).rejects.toBeInstanceOf(AppError)
    })

    it("usuario logado com senha Incorreta", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "eduardo",
                email: "teste@teste.com",
                password: "1234",
                driver_license: "9280234"
            }
    
            await createUserUseCase.execute(user);
    
            const userAuthenticate = await authenticateUserUseCase.execute({email: user.email, password: "senha secreta"})
        }).rejects.toBeInstanceOf(AppError)
    })
})