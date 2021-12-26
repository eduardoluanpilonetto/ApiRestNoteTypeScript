import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/user";
import { IUserRepository } from "../IuserRepository";

class UserRepositoryInMemory implements IUserRepository{

    private repository: User[] = []


    async create({name, email, password, driver_license}: ICreateUserDTO): Promise<void>{

        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            driver_license,
            createdAt: new Date
        });

        this.repository.push(user);

    }

    async findByEmail(email: string): Promise<User | undefined>{
        const user = await this.repository.find((userr) => userr.email == email );
 
        return user;
    }

    async findById(id: string): Promise<User | undefined>{
        const user = await this.repository.find((userr) => userr.id == id );

        return user;
    }
}

export { UserRepositoryInMemory }