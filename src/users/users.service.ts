import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInsert } from 'src/dto/user-insert.dto';
import { UserLogin } from 'src/dto/user-login-dto';
import { UserUpdate } from 'src/dto/user-update.dto';
import { UserMessages } from 'src/enums/messages.enum';
import { User } from './user.entity';
import { UserRepoistory } from './user.repository';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserRepoistory) private userRepository: UserRepoistory) { }

    public async createUser(userInsert: UserInsert): Promise<User> {
        const result = await this.userRepository.createUser(userInsert);
        if (!result) throw { status: HttpStatus.CONFLICT, message: UserMessages.USER_DUPLICATED }
        return result;
    }

    public async loginUser(userLogin: UserLogin): Promise<User> {
        const result = await this.userRepository.getUserAccordingLoginDetails(userLogin);
        if (result === null) throw { status: HttpStatus.NOT_FOUND, message: UserMessages.USER_NOT_FOUND };
        if (result === undefined) throw { status: HttpStatus.CONFLICT, message: UserMessages.PASSWORDS_NOT_MATCH };
        return result;
    }

    public async updateUser(userDetails: UserUpdate): Promise<User> {
        const result = await this.userRepository.updateUser(userDetails)
        if (!result) throw { status: HttpStatus.NOT_FOUND, message: UserMessages.USER_NOT_FOUND }
        return result;
    }

    public async deleteUser(id: string): Promise<string> {
        const deleted = await this.userRepository.removeUser(id);
        if (!deleted) throw new NotFoundException(UserMessages.USER_NOT_FOUND);
        return UserMessages.USER_DELETED;
    }


}
