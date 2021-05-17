import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { usersDBOptions } from './config/usersDB.config';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(usersDBOptions),
    UsersModule
  ],
  providers: [AppService],
})
export class AppModule { }
