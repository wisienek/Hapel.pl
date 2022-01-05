import { IsNumber, IsString, NotEquals } from 'class-validator';
import { Expose } from 'class-transformer';

export class DbEnv {
  @IsString()
  @NotEquals('')
  @Expose()
  DB_HOST: string;

  @IsNumber()
  @Expose()
  DB_PORT: number;

  @IsString()
  @NotEquals('')
  @Expose()
  DB_USERNAME: string;

  @IsString()
  @NotEquals('')
  @Expose()
  DB_PASSWORD: string;

  @IsString()
  @NotEquals('')
  @Expose()
  DB_DATABASE: string;
}
