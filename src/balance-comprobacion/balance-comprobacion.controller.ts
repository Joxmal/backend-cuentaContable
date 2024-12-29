import { Controller, Get, Query } from '@nestjs/common';
import { BalanceComprobacionService } from './balance-comprobacion.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ExtractToken } from 'src/common/decorators/userToken.decorator';
import { UserAuth } from 'src/auth/auth.service';
import { FindBalanceComprobacionDto } from './dto/find-balance-comprobacion.dto';

@Auth(Role.USER)
@ApiTags('Modulo BALANCE-COMPROBACIÓN')
@ApiBearerAuth()
@Controller('balance-comprobacion')
export class BalanceComprobacionController {
  constructor(
    private readonly balanceComprobacionService: BalanceComprobacionService,
  ) {}

  @Get()
  async findAll(
    @ExtractToken() user: UserAuth,
    @Query() query: FindBalanceComprobacionDto,
  ) {
    return await this.balanceComprobacionService.findAll(user, query);
  }
}
