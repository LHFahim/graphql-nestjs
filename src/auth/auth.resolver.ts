import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserGQL } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInputDto, LoginResponseDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  @UseGuards(LocalAuthGuard)
  async login(@Args('loginInput') loginInput: LoginInputDto, @Context() ctx) {
    return this.authService.login(ctx.user);
  }

  @Mutation(() => UserGQL)
  async register(@Args('registerInput') registerInput: CreateUserDto) {
    return this.authService.register(registerInput);
  }
}
