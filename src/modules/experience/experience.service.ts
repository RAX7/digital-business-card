import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';
import { CreateExperienceInput } from './dto/create-experience.input';
import { UpdateExperienceInput } from './dto/update-experience.input';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.experience.findMany({ take: 100 });
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
