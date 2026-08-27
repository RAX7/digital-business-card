import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile as ProfileModel } from '@prisma/client';

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

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
