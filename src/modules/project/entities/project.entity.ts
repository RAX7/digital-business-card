import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project as ProjectModel } from '@prisma/client';
import { Profile } from '@/modules/profile/entities/profile.entity';

@ObjectType()
export class Project implements Partial<ProjectModel> {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Int)
  profileId!: number;

  @Field(() => Profile)
  profile!: Profile;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
