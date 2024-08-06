import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserGQL } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    const isValidPassword = await bcrypt.compare(password, user?.password);

    const { password: _, ...result } = user;

    if (user && isValidPassword) return result;

    return null;
  }

  async login(user: UserGQL) {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
      user: user,
    };
  }

  async register(registerInput: CreateUserDto) {
    const userExists = await this.userService.getUserByEmail(
      registerInput.email,
    );
    if (userExists) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(registerInput.password, 10);

    return this.userService.createUser({
      ...registerInput,
      password: hashedPassword,
    });
  }
}
