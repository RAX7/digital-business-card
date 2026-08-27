import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Skill as SkillModel } from '@prisma/client';
import { Profile } from '@/modules/profile/entities/profile.entity';

@ObjectType()
export class Skill implements Partial<SkillModel> {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [Profile])
  profiles: Profile[] = [];
}
