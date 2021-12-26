import { Specification } from "../infra/typeorm/entities/specification";

interface ICreateSpecificationDTO{
    name: string;
    description: string;
}

interface ISpecificationRepository{
    create({name, description}:  ICreateSpecificationDTO ): Promise<Specification>;
    list(): Promise<Specification[]>;
    findByName(name: string): Promise<Specification | undefined>;
    findByIds(id: string[]): Promise<Specification[] >;
}

export { ISpecificationRepository, ICreateSpecificationDTO };