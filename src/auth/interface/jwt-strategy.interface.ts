import { $Enums } from '@prisma/client';

export interface JwtStrategyInterface {
  companyId: number;
  userId: number;
  name: string;
  role: $Enums.PrimaryRole;
}
