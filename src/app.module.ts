import { join } from 'path';
import { Request, Response } from 'express';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from '@/modules/profile/profile.module';
import { PrismaModule } from '@/core/prisma/prisma.module';
import { extractBasicAuth } from '@/core/utils/extract-basic-auth';
import { GraphQLContext } from '@/core/types/graphql-context';
import { SkillModule } from '@/modules/skill/skill.module';
import { ExperienceModule } from '@/modules/experience/experience.module';
import { ProjectModule } from '@/modules/project/project.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,

      context: ({
        req,
        res,
      }: {
        req: Request;
        res: Response;
      }): GraphQLContext => {
        const auth = extractBasicAuth(req);

        return {
          req,
          res,
          auth,
        };
      },
    }),
    ProfileModule,
    SkillModule,
    ExperienceModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
