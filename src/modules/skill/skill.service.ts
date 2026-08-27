import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';
import { CreateSkillInput } from './dto/create-skill.input';
import { UpdateSkillInput } from './dto/update-skill.input';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.skill.findMany({ take: 100 });
  }

  async findOne(id: number) {
    return this.prisma.skill.findUnique({ where: { id } });
  }

  async create(input: CreateSkillInput) {
    return this.prisma.skill.create({ data: input });
  }

  async update(id: number, input: UpdateSkillInput) {
    return this.prisma.skill.update({ where: { id }, data: input });
  }

  async remove(id: number) {
    return this.prisma.skill.delete({ where: { id } });
  }
}
