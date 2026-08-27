import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project], { name: 'project' })
  findAll() {
    return this.projectService.findAll();
  }

  @Query(() => Project, { name: 'project', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.findOne(id);
  }

  @Mutation(() => Project, { name: 'createProject' })
  createProject(@Args('input') input: CreateProjectInput) {
    return this.projectService.create(input);
  }

  @Mutation(() => Project, { name: 'updateProject' })
  updateProject(@Args('input') input: UpdateProjectInput) {
    return this.projectService.update(input.id, input);
  }

  @Mutation(() => Project, { name: 'removeProject' })
  removeProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.remove(id);
  }
}
