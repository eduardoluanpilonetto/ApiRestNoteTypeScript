import { Specification } from "../../infra/typeorm/entities/specification";
import { ISpecificationRepository, ICreateSpecificationDTO } from "../IspecificationRepository";
import { getRepository, Repository } from "typeorm";

class SpecificationRepositoryInMemory implements ISpecificationRepository{

    private specifications: Specification[] = [];

    async create({name, description}:  ICreateSpecificationDTO ):Promise<Specification>{
        const specification = new Specification()

        Object.assign(specification, {
            name, 
            description,
            created_at: new Date()
        })

        this.specifications.push(specification);

        return specification;
    }

    async list(): Promise<Specification[]>{
        return await this.specifications;
    }

    async findByName(name: string): Promise<Specification | undefined>{
        return await this.specifications.find(specification => specification.name == name)
    }

    async findByIds(id: string[]): Promise<Specification[]>{
        return await this.specifications.filter(specification => id.includes(specification.id!))
    }
}

export { SpecificationRepositoryInMemory };