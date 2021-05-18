import { Roles } from "src/enums/roles.enum";

export interface UpdateRoleDto {
    userId: string;
    role: Roles;
}