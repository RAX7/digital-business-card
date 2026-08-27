import { InputType, Field, Int, OmitType } from '@nestjs/graphql';
import { CreateExperienceInput } from '@/modules/experience/dto/create-experience.input';
import { CreateProjectInput } from '@/modules/project/dto/create-project.input';

@InputType()
export class CreateExperienceNestedInput extends OmitType(
  CreateExperienceInput,
  ['profileId'] as const,
) {}

@InputType()
export class CreateProjectNestedInput extends OmitType(CreateProjectInput, [
  'profileId',
] as const) {}

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => [CreateExperienceNestedInput], { nullable: true })
  experience?: CreateExperienceNestedInput[];

  @Field(() => [CreateProjectNestedInput], { nullable: true })
  projects?: CreateProjectNestedInput[];

  @Field(() => [Int], { nullable: true })
  skills?: number[];
}
