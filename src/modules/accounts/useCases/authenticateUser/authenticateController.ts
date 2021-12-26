import { container } from "tsyringe"
import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

class AuthenticateUserController{

    async handle(req: Request, res: Response): Promise<Response>{

        const { email, password } = req.body

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

        const authentication = await authenticateUserUseCase.execute({email, password});

        return res.json(authentication);
    }
}

export { AuthenticateUserController }