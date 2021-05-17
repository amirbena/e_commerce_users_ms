import { HttpStatus } from "@nestjs/common";
import { User } from "src/users/user.entity";

export interface CreateResponse {
    user: User;
    status: HttpStatus;
    message: string;
}

export interface LoginResponse {
    user: User;
    status: HttpStatus;
    message: string

}
