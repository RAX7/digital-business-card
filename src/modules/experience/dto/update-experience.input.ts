import { CreateExperienceInput } from './create-experience.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExperienceInput extends PartialType(CreateExperienceInput) {
  @Field(() => Int)
  id!: number;
}
