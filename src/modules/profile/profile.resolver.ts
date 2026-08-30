import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { isNil } from 'lodash';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { FindAllProfileArgs } from './dto/find-all-profile.args';
import { Skill } from '@/modules/skill/entities/skill.entity';
import { Experience } from '@/modules/experience/entities/experience.entity';
import { Project } from '@/modules/project/entities/project.entity';
import { type GraphQLContext } from '@/core/types/graphql-context';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => [Profile], { name: 'profiles' })
  findAll(@Args() args: FindAllProfileArgs) {
    return this.profileService.findAll(args);
  }

  @Query(() => Profile, { name: 'profile' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const profile = await this.profileService.findOne(id);

    if (isNil(profile)) {
      throw new NotFoundException();
    }

    return profile;
  }

  @Query(() => Profile, { name: 'ownProfile' })
  async findOwn(@Context() ctx: GraphQLContext) {
    if (isNil(ctx.auth) || isNil(ctx.auth.user)) {
      throw new UnauthorizedException();
    }

    const profile = await this.profileService.findOneByEmail(ctx.auth.user);

    if (isNil(profile)) {
      throw new NotFoundException();
    }

    return profile;
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
