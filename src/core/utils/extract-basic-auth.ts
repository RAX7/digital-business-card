import { Request } from 'express';
import { UserAuthPayload } from '../types/user-auth-payload';

export function extractBasicAuth(req: Request): UserAuthPayload | null {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  const [scheme, credentials] = authHeader.split(' ');

  if (scheme.toLowerCase() !== 'basic' || !credentials) {
    return null;
  }

  try {
    const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
    const [user] = decoded.split(':');

    if (user && user.length > 0) {
      return { user: user };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }

  return null;
}
