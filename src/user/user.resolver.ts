import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserDto } from './dto/user.dto';
import { UserGQL } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => UserGQL, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    console.log('id', id);
    return this.userService.getUserById(id);
  }

  @Query((returns) => [UserGQL])
  getUsers() {
    return this.userService.getUsers();
  }

  @Mutation((returns) => UserGQL)
  createUser(@Args('createUserData') createUserData: CreateUserDto) {
    return this.userService.createUser(createUserData);
  }
}