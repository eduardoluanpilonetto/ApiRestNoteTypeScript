import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/user";
import { IUserRepository } from "../../../repositories/IuserRepository";

class UserRepository implements IUserRepository{

    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User);
    }

    async create({name, email, password, driver_license, id, avatar}: ICreateUserDTO): Promise<void>{
        const user =  await this.repository.create({
            name,
            email,
            password,
            driver_license,
            id, 
            avatar
        })

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined>{
        const user = await this.repository.findOne({email: email})
        
        return user;
    }

    async findById(id: string): Promise<User | undefined>{
        const user = await this.repository.findOne({id: id})
        
        return user;
    }
}

export { UserRepository }