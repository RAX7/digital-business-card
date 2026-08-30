import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Experience as ExperienceModel } from '@prisma/client';
import { Profile } from '@/modules/profile/entities/profile.entity';

@ObjectType()
export class Experience implements Partial<ExperienceModel> {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  company!: string;

  @Field(() => String)
  position!: string;

  @Field(() => Date)
  firstWorkDay!: Date;

  @Field(() => Date, { nullable: true })
  lastWorkDay?: Date | null;

  @Field(() => Int)
  profileId!: number;

  @Field(() => Profile)
  profile!: Profile;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
