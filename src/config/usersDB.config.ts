import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from 'src/users/user.entity'


export const usersDBOptions: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "users",
    synchronize: true,
    entities: ["dist/**/*.entity.js"]
}