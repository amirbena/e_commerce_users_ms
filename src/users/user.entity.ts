import { Roles } from "src/enums/roles.enum";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    street: string;

    @Column({ nullable: false })
    building: number;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    country: string;


    @Column({ nullable: false })
    role: Roles;
}