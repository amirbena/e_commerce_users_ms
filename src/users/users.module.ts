import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepoistory } from './user.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserRepoistory])],
  controllers: [UsersController]

})
export class UsersModule { }
