import { Specification } from "../entities/specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "../../../repositories/IspecificationRepository";
import { getRepository, Repository } from "typeorm";

class SpecificationRepository implements ISpecificationRepository{

    private specifications: Repository<Specification>;

    constructor(){
        this.specifications = getRepository(Specification);
    }

    async create({name, description}:  ICreateSpecificationDTO ):Promise<Specification>{
        const specification = await this.specifications.create({name, description});

        await this.specifications.save(specification)

        return specification;
    }

    async list(): Promise<Specification[]>{
        return await this.specifications.find();
    }

    async findByName(name: string): Promise<Specification | undefined>{
        const specification = await this.specifications.findOne({name: name})

        return specification;
    }

    async findByIds(id: string[]): Promise<Specification[]>{
        return await this.specifications.findByIds(id);
    }
}

export { SpecificationRepository };