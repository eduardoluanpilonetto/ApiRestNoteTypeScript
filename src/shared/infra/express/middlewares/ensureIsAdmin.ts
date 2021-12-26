import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors/appError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/userRepository";

export async function ensureIsAdmin(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(id);

    if(user?.isAdmin == false){
        throw new AppError('Use is not admin', 406)
    }

    next()
}
