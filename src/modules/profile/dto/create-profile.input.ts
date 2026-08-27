import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String, { nullable: true })
  lastName?: string | null;
}
