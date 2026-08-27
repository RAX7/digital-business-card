import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { UpdateExperienceInput } from '@/modules/experience/dto/update-experience.input';
import { UpdateProjectInput } from '@/modules/project/dto/update-project.input';
import { CreateProfileInput } from './create-profile.input';

@InputType()
export class UpdateProjectNestedInput extends OmitType(UpdateProjectInput, [
  'id',
  'profileId',
] as const) {
  @Field(() => Int, { nullable: true })
  id?: number;
}

@InputType()
export class UpdateExperienceNestedInput extends OmitType(
  UpdateExperienceInput,
  ['id', 'profileId'] as const,
) {
  @Field(() => Int, { nullable: true })
  id?: number;
}

@InputType()
export class UpdateProfileInput extends PartialType(
  OmitType(CreateProfileInput, ['projects', 'experience'] as const),
) {
  @Field(() => Int)
  id!: number;

  @Field(() => [UpdateProjectNestedInput], { nullable: true })
  projects?: UpdateProjectNestedInput[];

  @Field(() => [UpdateExperienceNestedInput], { nullable: true })
  experience?: UpdateExperienceNestedInput[];
}
