import { IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class CreateRewardtDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  reward: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
