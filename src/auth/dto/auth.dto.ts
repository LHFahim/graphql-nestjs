import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserGQL } from 'src/user/entities/user.entity';

@ObjectType()
export class LoginResponseDto {
  @Field()
  access_token: string;

  @Field(() => UserGQL)
  user: UserGQL;
}

@InputType()
export class LoginInputDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
