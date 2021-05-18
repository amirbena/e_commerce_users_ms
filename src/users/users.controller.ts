import { Controller, HttpStatus, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserInsert } from 'src/dto/user-insert.dto';
import { UserLogin } from 'src/dto/user-login-dto';
import { UserUpdate } from 'src/dto/user-update.dto';
import { UpdateRoleDto } from 'src/dto/update-role.dto';
import { Patterns } from 'src/enums/patterns.enum';
import { handleCatch } from 'src/helpers/handleCatch';
import { CreateResponse } from 'src/interfaces/response.interface';
import { User } from './user.entity';
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
            const result = handleCatch(error);
            status = result.status;
            message = result.message;
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
            const result = handleCatch(error);
            status = result.status;
            message = result.message;
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
            const result = handleCatch(error);
            status = result.status;
            message = result.message;
        }
        finally {
            return {
                user,
                status,
                message
            }
        }
    }

    @MessagePattern(Patterns.DELETE_USER)
    public async deleteUser(id: string) {
        let status = HttpStatus.OK;
        let message = "";
        try {
            message = await this.usersService.deleteUser(id);
        } catch (error) {
            const result = handleCatch(error);
            status = result.status;
            message = result.message;
        }
        finally {
            return {
                status,
                message
            }
        }
    }
    @MessagePattern(Patterns.GET_ALL_USERS)
    public async getAllUsers() {
        let allUsers: User[] = null;
        let status = HttpStatus.OK;
        let message = "";
        try {
            allUsers = await this.usersService.getAllUsers();
        } catch (error) {
            const result = handleCatch(error);
            status = result.status;
            message = result.message;
        }
        finally {
            return {
                allUsers,
                status,
                message
            }
        }
    }

    @MessagePattern(Patterns.GET_SPECIFIC_USER)
    public async getSpecificUser(id: string) {
        let user: User = null;
        let status = HttpStatus.OK;
        let message = "";
        try {
            user = await this.usersService.getUser(id);
        } catch (error) {
            const result = handleCatch(error);
            status = result.status;
            message = result.message;
        }
        finally {
            return {
                user,
                status,
                message
            }
        }
    }

    @MessagePattern(Patterns.UPDATE_ROLE)
    public async updateRole(updateRoleBody: UpdateRoleDto) {
        let status = HttpStatus.OK;
        let message = "";
        try {
            message = await this.usersService.updateRole(updateRoleBody);
        } catch (error) {
            const result = handleCatch(error);
            status = result.status;
            message = result.message;
        }
        finally {
            return {
                status,
                message
            }
        }
    }

}
