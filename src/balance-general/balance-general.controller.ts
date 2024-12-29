import { Controller, Get, Query } from '@nestjs/common';
import { BalanceGeneralService } from './balance-general.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/enums/rol.enum';
import { ExtractToken } from 'src/common/decorators/userToken.decorator';
import { UserAuth } from 'src/auth/auth.service';
import { FindForDateTimeDto } from 'src/common/dto/findForDateTime.dto';

@Auth(Role.USER)
@ApiTags('Modulo BALANCE-GENERAL')
@ApiBearerAuth()
@Controller('balance-general')
export class BalanceGeneralController {
  constructor(private readonly balanceGeneralService: BalanceGeneralService) {}

  @Get()
  async findAll(
    @ExtractToken() user: UserAuth,
    @Query() query: FindForDateTimeDto,
  ) {
    return await this.balanceGeneralService.findAll(user, query);
  }
}
