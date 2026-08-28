import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from '../emums/sort-order.enum';

@InputType()
export class OrderByInput {
  @Field(() => String)
  @IsString()
  field!: string;

  @Field(() => SortOrder, { defaultValue: SortOrder.Asc })
  @IsOptional()
  @IsEnum(SortOrder)
  order!: SortOrder;
}
