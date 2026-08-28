import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';
import { CreateExperienceInput } from './dto/create-experience.input';
import { UpdateExperienceInput } from './dto/update-experience.input';
import { FindAllExperienceArgs } from './dto/find-all-experience.args';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async findAll(args: FindAllExperienceArgs) {
    const { skip, take, filter, orderBy } = args;

    return this.prisma.experience.findMany({
      skip,
      take,
      where: {
        id: filter?.id,
        firstWorkDay: filter?.firstWorkDay,
        lastWorkDay: filter?.lastWorkDay,
        OR: filter?.search
          ? [
              { company: { contains: filter.search, mode: 'insensitive' } },
              { position: { contains: filter.search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      orderBy: orderBy?.map((el) => ({
        [el.field]: el.order,
      })),
    });
  }

  async findOne(id: number) {
    return this.prisma.experience.findUnique({ where: { id } });
  }

  async create(input: CreateExperienceInput) {
    const { profileId, ...data } = input;

    return this.prisma.experience.create({
      data: {
        ...data,
        profile: {
          connect: { id: profileId },
        },
      },
    });
  }

  async update(id: number, input: UpdateExperienceInput) {
    return this.prisma.experience.update({ where: { id }, data: input });
  }

  async remove(id: number) {
    return this.prisma.experience.delete({ where: { id } });
  }
}
