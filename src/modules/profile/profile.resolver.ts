import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { isNil } from 'lodash';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    return this.profileService.findAll();
  }

  @Query(() => Profile, { name: 'profile', nullable: true })
  findOne(@Args('id', { type: () => Int, nullable: true }) id?: number) {
    if (isNil(id)) {
      return this.profileService.findOne(1);
    }

    return this.profileService.findOne(id);
  }

  @Mutation(() => Profile, { name: 'createProfile' })
  createProfile(@Args('input') input: CreateProfileInput) {
    return this.profileService.create(input);
  }

  @Mutation(() => Profile, { name: 'updateProfile' })
  updateProfile(@Args('input') input: UpdateProfileInput) {
    return this.profileService.update(input.id, input);
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.remove(id);
  }
}
