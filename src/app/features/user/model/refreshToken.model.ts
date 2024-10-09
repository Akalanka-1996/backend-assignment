import {RefreshToken as DbToken} from '@prisma/client';

export class RefreshToken implements DbToken {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  tokenHash: string;
  expiresAt: Date;
  issuedAt: Date;
}
