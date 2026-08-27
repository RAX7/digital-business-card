import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma/prisma.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.profile.findMany({ take: 100 });
  }

  async findOne(id: number) {
    return this.prisma.profile.findUnique({ where: { id } });
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
