import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSkillInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;
}
