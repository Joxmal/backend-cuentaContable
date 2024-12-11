import { $Enums } from '@prisma/client';

export interface JwtStrategyInterface {
  userId: number;
  name: string;
  role: $Enums.PrimaryRole;
}
