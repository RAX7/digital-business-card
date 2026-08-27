import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.project.findMany({ take: 100 });
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  async create(input: CreateProjectInput) {
    const { profileId, ...data } = input;

    return this.prisma.project.create({
      data: {
        ...data,
        profile: {
          connect: { id: profileId },
        },
      },
    });
  }

  async update(id: number, input: UpdateProjectInput) {
    return this.prisma.project.update({ where: { id }, data: input });
  }

  async remove(id: number) {
    return this.prisma.project.delete({ where: { id } });
  }
}
