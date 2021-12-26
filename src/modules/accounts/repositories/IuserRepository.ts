import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/user";


interface IUserRepository{
    create(data: ICreateUserDTO):Promise<void>;
    findByEmail(email: string): Promise<User | undefined>
    findById(id: string): Promise<User | undefined>

}

export { IUserRepository }