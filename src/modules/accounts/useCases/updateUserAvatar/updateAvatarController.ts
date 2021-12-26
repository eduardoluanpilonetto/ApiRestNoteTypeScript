import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from "./updateUserAvatarUseCase";
import { container } from "tsyringe";

class UpdateUserAcatarController{
    async Handle(req: Request, res: Response): Promise<Response>{

        const { id } = req.user;

        const fileName = req.file!.filename;

        const updateAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

        updateAvatarUseCase.execute({id_user: id, avatar_file: fileName})

        return res.status(204).send();
    }
}

export { UpdateUserAcatarController }