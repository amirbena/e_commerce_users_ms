import { UserInsert } from "src/dto/user-insert.dto";
import { Roles } from "src/enums/roles.enum";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { v4 as uuid } from 'uuid';
import { UserLogin } from "src/dto/user-login-dto";
import { UserUpdate } from "src/dto/user-update.dto";
import { hash, compare } from 'bcrypt';

@EntityRepository(User)
export class UserRepoistory extends Repository<User>{
    async createUser(userToCreate: UserInsert): Promise<User> {
        let user = new User();
        user.id = uuid();
        const isFound = await this.findOne({ where: { email: userToCreate.email } });
        if (isFound) return null;
        Object.entries(userToCreate).forEach(([key, value]) => {
            user[key] = value;
        })
        const salt = 10;
        user.password = await hash(user.password, salt);
        user.role = Roles.USER;
        await this.save(user);
        return user;
    }

    async getUserAccordingLoginDetails(loginDetails: UserLogin): Promise<User> {
        const user = await this.findOne(loginDetails);
        if (!user) return null;
        const compared = await compare(loginDetails.password, user.password);
        if (!compared) return undefined;
        return user;
    }

    async updateUser(updateDetails: UserUpdate): Promise<User | null> {
        const { id, userToUpdate } = updateDetails;
        if (userToUpdate.password) {
            const salt = 10;
            userToUpdate.password = await hash(userToUpdate.password, salt);
        }
        const result = await this.update(id, userToUpdate);
        if (result.affected) return null;
        return await this.findOne(id);
    }

    async removeUser(id: string) {
        const result = await this.delete(id);
        return result.affected;
    }

    async getAllUsers() {
        return await this.find();
    }

    async getSpecificUser(id: string) {
        return await this.findOne(id);
    }

    async updateRole(id: string, role: Roles) {
        const updated = await this.update({ role }, { id });
        return updated.affected;
    }
}