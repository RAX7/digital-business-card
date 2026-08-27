import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateExperienceInput {
  @Field(() => String)
  company!: string;

  @Field(() => String)
  position!: string;

  @Field(() => Date)
  firstWorkDay!: Date;

  @Field(() => Date)
  lastWorkDay?: Date | null;

  @Field(() => Int)
  profileId!: number;
}
