import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//auth para swagger
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

//decoradores de autenticacion
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ExtractToken } from 'src/common/decorators/userToken.decorator';
import { UserAuth } from 'src/auth/auth.service';

@ApiTags('Modulo Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Auth(Role.USER)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Auth(Role.SUPERADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @ExtractToken() user: UserAuth,
  ) {
    return this.userService.update(+id, updateUserDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
