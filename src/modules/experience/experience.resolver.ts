import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExperienceService } from './experience.service';
import { Experience } from './entities/experience.entity';
import { CreateExperienceInput } from './dto/create-experience.input';
import { UpdateExperienceInput } from './dto/update-experience.input';
import { FindAllExperienceArgs } from './dto/find-all-experience.args';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Query(() => [Experience], { name: 'experiences' })
  findAll(@Args() args: FindAllExperienceArgs) {
    return this.experienceService.findAll(args);
  }

  @Query(() => Experience, { name: 'experience', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.experienceService.findOne(id);
  }

  @Mutation(() => Experience, { name: 'createExperience' })
  createExperience(@Args('input') input: CreateExperienceInput) {
    return this.experienceService.create(input);
  }

  @Mutation(() => Experience, { name: 'updateExperience' })
  updateExperience(@Args('input') input: UpdateExperienceInput) {
    return this.experienceService.update(input.id, input);
  }

  @Mutation(() => Experience, { name: 'removeExperience' })
  removeExperience(@Args('id', { type: () => Int }) id: number) {
    return this.experienceService.remove(id);
  }
}
