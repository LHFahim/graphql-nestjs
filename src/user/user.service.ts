import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { UserGQL } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserGQL) private usersRepository: Repository<UserGQL>,
  ) {}

  async getUsers() {
    return await this.usersRepository.find();
  }

  getUserById(id: number) {
    return this.usersRepository.findOne({
      where: { id: String(id) },
    });
  }

  async createUser(createUserData: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserData);
    return await this.usersRepository.save(newUser);
  }
}
