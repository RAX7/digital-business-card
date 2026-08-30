import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '@/core/dto/pagination.args';
import { OrderByInput } from '@/core/dto/order-by.input';
import { ProfileFilterInput } from './filter-profile.input';

@ArgsType()
export class FindAllProfileArgs extends PaginationArgs {
  @Field(() => ProfileFilterInput, { nullable: true, name: 'filter' })
  filter?: ProfileFilterInput;

  @Field(() => [OrderByInput], { nullable: true })
  orderBy?: OrderByInput[];
}
