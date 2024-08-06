import { Injectable } from '@nestjs/common';
import { Env, parseEnv } from 'atenv';
import { plainToClass } from 'class-transformer';
import { IsDefined, IsString, validateSync } from 'class-validator';

@Injectable()
export class ConfigService {
  @IsDefined()
  @Env('JWT_SECRET')
  @IsString({ message: 'INVALID JWT' })
  JWT_SECRET: string;
}

export const ParsedConfigs = parseEnv(ConfigService);

export const validate = (config: any) => {
  const validatedConfig = plainToClass(ConfigService, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
