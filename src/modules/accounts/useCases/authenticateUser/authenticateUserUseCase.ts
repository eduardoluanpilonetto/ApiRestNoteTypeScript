import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IuserRepository";
import {compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../shared/errors/appError";

interface IRequest{
    email:string,
    password: string
}

interface IResponse{
    token:string,
    user: {
        name: string,
        email: string
    }
}

@injectable()
class AuthenticateUserUseCase{
    
    constructor(@inject("UserRepository") private userRepository: IUserRepository){}

    async execute({email, password}: IRequest): Promise<IResponse>{

        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new AppError('Email or password incorect', 401);
        }

        const userIsValid = await compare(password,  user.password!);

        if(userIsValid == false){
            throw new AppError('Email or password incorect', 401);
        }

        const token = sign({ email: user.email }, 'palavraSuperSecreta', {
            expiresIn: '5h',
            subject: user.id
        })

        return {
            token: token,
            user: {
                name: user.name!,
                email: user.email!
            }
        }
    }

}

export { AuthenticateUserUseCase }