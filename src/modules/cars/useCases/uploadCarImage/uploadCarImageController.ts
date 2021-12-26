import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./uploadCarImageUseCase";

interface IFiles{
    filenames: string
}

class UploadCarImageController{
    async handle(req: Request, res: Response):Promise<Response>{
        const { id } = req.params;

        const images = req.files as IFiles[];

        const uploadImageCarUseCase = container.resolve(UploadCarImageUseCase)

        const imarge_name = images.map((file) => {file.filenames});

        await uploadImageCarUseCase.execute({car_id: id, imarge_name})

        return res.status(201).send();

    }
}

export { UploadCarImageController };