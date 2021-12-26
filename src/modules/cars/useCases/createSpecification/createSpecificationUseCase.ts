import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { ISpecificationRepository } from "../../repositories/IspecificationRepository";

interface IRequest{
    name: string;
    description: string
}

@injectable()
class CreateSpecificationUseCase{

    constructor(@inject("SpecificationRepository") private specificationRepository: ISpecificationRepository){}

    async execute({name, description}: IRequest): Promise<void>{
        const specificationAlreadyExists = await this.specificationRepository.findByName(name);

        if(specificationAlreadyExists){
            throw new AppError('Specification Already exists!', 400);
        }

        await this.specificationRepository.create({name, description})
    }

}

export { CreateSpecificationUseCase }