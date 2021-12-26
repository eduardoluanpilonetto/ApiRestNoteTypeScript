import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IuserRepository";
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/appError";

@injectable()
class CreateUserUseCase{

    constructor(@inject('UserRepository') private userRepository: IUserRepository){}

    async execute({name, email, password, driver_license}: ICreateUserDTO): Promise<void>{

        const UserAlreadyExists = await this.userRepository.findByEmail(email);

        if(UserAlreadyExists){
            throw new AppError('User alredy exists', 400)
        }

        await this.userRepository.create({name, email, password: await hash(password, 12), driver_license});
    }
}

export { CreateUserUseCase }