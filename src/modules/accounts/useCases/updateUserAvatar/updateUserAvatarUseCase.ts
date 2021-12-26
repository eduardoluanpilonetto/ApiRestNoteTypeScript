import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IuserRepository";
import { deleteFile } from "../../../../util/file"

interface IRequest{
    id_user: string;
    avatar_file: string
}

@injectable()
class UpdateUserAvatarUseCase {

    constructor(@inject('UserRepository') private userRepository: IUserRepository){}

    async execute({ id_user, avatar_file}: IRequest):Promise<void>{

        const user = await this.userRepository.findById(id_user);

        if(user.avatar){
            await deleteFile(`./tmp/avatar/${user?.avatar}`);
        }

        user!.avatar = avatar_file;

        await this.userRepository.create(user)
    }

}

export { UpdateUserAvatarUseCase }