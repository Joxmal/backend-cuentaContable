import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ExtractToken } from 'src/common/decorators/userToken.decorator';
import { UserAuth } from 'src/auth/auth.service';

@ApiTags('Modulo roles de los usuarios')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Auth(Role.SUPERADMIN)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @ExtractToken() user: UserAuth) {
    return this.rolesService.create(createRoleDto, user);
  }
  @Auth(Role.SUPERADMIN)
  @Get()
  findAll(@ExtractToken() user: UserAuth) {
    return this.rolesService.findAll(user);
  }

  @Auth(Role.SUPERADMIN)
  @Get('root')
  findOne() {
    return this.rolesService.findOneRoot();
  }

  @Auth(Role.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Auth(Role.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
