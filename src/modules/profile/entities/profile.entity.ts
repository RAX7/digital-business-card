import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile as ProfileModel } from '@prisma/client';
import { Skill } from '@/modules/skill/entities/skill.entity';
import { Experience } from '@/modules/experience/entities/experience.entity';
import { Project } from '@/modules//project/entities/project.entity';

@ObjectType()
export class Profile implements Partial<ProfileModel> {
  @Field(() => Int, { description: 'Id of profile' })
  id!: number;

  @Field(() => String, { description: 'Email of profile' })
  email!: string;

  @Field(() => String, { description: 'Users first name' })
  firstName!: string;

  @Field(() => String, { nullable: true, description: 'Users last name' })
  lastName?: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Description for profile',
  })
  description?: string | null;

  @Field(() => [Skill])
  skill: Skill[] = [];

  @Field(() => [Experience])
  experience: Experience[] = [];

  @Field(() => [Project])
  projects: Project[] = [];

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
