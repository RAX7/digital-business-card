import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateExperienceInput {
  @Field(() => String)
  company!: string;

  @Field(() => String)
  position!: string;

  @Field(() => Int)
  profileId!: number;
}
