import { Request, Response } from 'express';
import { UserAuthPayload } from './user-auth-payload';

export interface GraphQLContext {
  req: Request;
  res: Response;
  auth?: UserAuthPayload | null;
}
