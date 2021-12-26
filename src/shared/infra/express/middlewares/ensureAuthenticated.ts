import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/appError";
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/userRepository";

interface Ipayload{
    sub: string
}

export async function EnsureAuthenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new AppError('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try{
        const { sub: userId } = verify(token, 'palavraSuperSecreta') as Ipayload

        const userRepository = new UserRepository();

        const user = await userRepository.findById(userId);

        if(!user){
            throw new AppError('User invalid', 401);
        }

        req.user = {
            id: userId
        }

        next()
    }catch{
        throw new AppError('Invalid token', 401);
    }
}