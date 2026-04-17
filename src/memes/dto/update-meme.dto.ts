import { IsString, IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMemeDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  texts?: any[];
}