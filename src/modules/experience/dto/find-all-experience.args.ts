import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '@/core/dto/pagination.args';
import { ExperienceFilterInput } from './filter-experience.input';
import { OrderByInput } from '@/core/dto/order-by.input';

@ArgsType()
export class FindAllExperienceArgs extends PaginationArgs {
  @Field(() => ExperienceFilterInput, { nullable: true, name: 'filter' })
  filter?: ExperienceFilterInput;

  @Field(() => [OrderByInput], { nullable: true })
  orderBy?: OrderByInput[];
}
