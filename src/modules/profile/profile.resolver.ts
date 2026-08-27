import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { isNil } from 'lodash';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Skill } from '@/modules/skill/entities/skill.entity';
import { Experience } from '@/modules/experience/entities/experience.entity';
import { Project } from '@/modules/project/entities/project.entity';

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

  @Mutation(() => Profile, { name: 'removeProfile' })
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.remove(id);
  }

  @ResolveField(() => [Skill])
  async skills(@Parent() profile: Profile) {
    return this.profileService.getSkillsByProfileId(profile.id);
  }

  @ResolveField(() => [Experience])
  async experience(@Parent() profile: Profile) {
    const result = await this.profileService.getExperienceByProfileId(
      profile.id,
    );

    return result ?? [];
  }

  @ResolveField(() => [Project])
  async projects(@Parent() profile: Profile) {
    const result = await this.profileService.getProjectsByProfileId(profile.id);

    return result ?? [];
  }
}
