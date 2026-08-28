import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';

@InputType()
export class DateFilterInput {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  gte?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  lte?: Date;
}
