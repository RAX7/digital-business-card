import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import { PrismaService } from '@/core/prisma/prisma.service';
import {
  CreateExperienceNestedInput,
  CreateProfileInput,
  CreateProjectNestedInput,
} from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async findAll(args: FindAllProfileArgs) {
    const { skip, take, filter, orderBy } = args;

    return this.prisma.profile.findMany({
      skip,
      take,
      where: {
        id: filter?.id,
        createdAt: filter?.createdAt,
        updatedAt: filter?.updatedAt,
        OR: filter?.search
          ? [
              { firstName: { contains: filter.search, mode: 'insensitive' } },
              { lastName: { contains: filter.search, mode: 'insensitive' } },
              { description: { contains: filter.search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      orderBy: orderBy?.map((el) => ({
        [el.field]: el.order,
      })),
    });
  }

  async findOne(id: number) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  async create(input: CreateProfileInput) {
    const { experience, projects, skills, ...data } = input;

    return await this.prisma.profile.create({
      data: {
        ...data,
        experience: experience ? { create: experience } : undefined,
        projects: projects ? { create: projects } : undefined,
        skills: skills ? { connect: skills.map((id) => ({ id })) } : undefined,
      },
    });
  }

  async update(id: number, input: UpdateProfileInput) {
    const { experience, projects, skills, ...data } = input;

    return this.prisma.profile.update({
      where: { id },
      data: {
        ...data,
        projects: {
          create: projects?.filter((entity) =>
            isNil(entity.id),
          ) as CreateProjectNestedInput[],
          update: projects
            ?.filter((entity) => !isNil(entity.id))
            ?.map((entity) => ({
              where: { id: entity.id! },
              data: entity,
            })),
        },
        experience: {
          create: experience?.filter((entity) =>
            isNil(entity.id),
          ) as CreateExperienceNestedInput[],
          update: experience
            ?.filter((entity) => !isNil(entity.id))
            ?.map((entity) => ({
              where: { id: entity.id! },
              data: entity,
            })),
        },
        skills: skills ? { set: skills.map((id) => ({ id })) } : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.profile.delete({ where: { id } });
  }

  async getSkillsByProfileId(id: number) {
    return this.prisma.profile.findUnique({ where: { id } }).skills();
  }

  async getExperienceByProfileId(id: number) {
    return this.prisma.profile.findUnique({ where: { id } }).experience();
  }

  async getProjectsByProfileId(id: number) {
    return this.prisma.profile.findUnique({ where: { id } }).projects();
  }
}
