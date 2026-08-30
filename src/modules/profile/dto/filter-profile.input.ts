import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { DateFilterInput } from '@/core/dto/date-filter.input';

@InputType()
export class ProfileFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => DateFilterInput, { nullable: true })
  @IsOptional()
  createdAt?: DateFilterInput;

  @Field(() => DateFilterInput, { nullable: true })
  @IsOptional()
  updatedAt?: DateFilterInput;
}
