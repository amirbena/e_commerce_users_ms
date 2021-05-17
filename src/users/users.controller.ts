import { Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserInsert } from 'src/dto/user-insert.dto';
import { UserLogin } from 'src/dto/user-login-dto';
import { UserUpdate } from 'src/dto/user-update.dto';
import { Patterns } from 'src/enums/patterns.enum';
import { CreateResponse } from 'src/interfaces/response.interface';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) { }

    @MessagePattern(Patterns.CREATE_USER)
    public async createUser(user: UserInsert): Promise<CreateResponse> {
        let createdUser = null;
        let status = HttpStatus.OK;
        let message = "";
        try {
            createdUser = await this.usersService.createUser(user);
        } catch (error) {
            status = error.status;
            message = error.message;
        }
        finally {
            return {
                user: createdUser,
                status,
                message
            }
        }
    }

    @MessagePattern(Patterns.LOGIN_USER)
    public async userLogin(loggedUser: UserLogin) {
        let user = null;
        let status = HttpStatus.OK;
        let message = "";
        try {
            user = await this.usersService.loginUser(loggedUser);
        } catch (error) {
            status = error.status;
            message = error.message;
        }
        finally {
            return {
                user,
                status,
                message
            }
        }
    }
    @MessagePattern(Patterns.UPDATE_USER)
    public async updateUser(updateDetails: UserUpdate) {
        let user = null;
        let status = HttpStatus.OK;
        let message = "";
        try {
            user = await this.usersService.updateUser(updateDetails);
        } catch (error) {
            status = error.status;
            message = error.message;
        }
        finally {
            return {
                user,
                status,
                message
            }
        }
    }
}
