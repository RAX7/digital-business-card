import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.profile.findMany({ take: 100 });
  }

  async findOne(id: number) {
    const entity = await this.prisma.profile.findUnique({ where: { id } });
    return entity;
  }

  async create(input: CreateProfileInput) {
    return this.prisma.profile.create({ data: input });
  }

  async update(id: number, input: UpdateProfileInput) {
    return this.prisma.profile.update({ where: { id }, data: input });
  }

  async remove(id: number) {
    return this.prisma.profile.delete({ where: { id } });
  }
}
