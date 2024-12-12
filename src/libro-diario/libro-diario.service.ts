import { Injectable } from '@nestjs/common';
import { CreateLibroDiarioDto } from './dto/create-libro-diario.dto';
import { UpdateLibroDiarioDto } from './dto/update-libro-diario.dto';
import { UserAuth } from 'src/auth/auth.service';

@Injectable()
export class LibroDiarioService {
  create(createLibroDiarioDto: CreateLibroDiarioDto, user: UserAuth) {
    return { createLibroDiarioDto, user };
    return 'This action adds a new libroDiario';
  }

  findAll(user: UserAuth) {
    return { user };

    return `This action returns all libroDiario`;
  }

  findOne(id: number, user: UserAuth) {
    return { user };

    return `This action returns a #${id} libroDiario`;
  }

  update(id: number, updateLibroDiarioDto: UpdateLibroDiarioDto) {
    return { updateLibroDiarioDto };

    return `This action updates a #${id} libroDiario`;
  }

  remove(id: number) {
    return `This action removes a #${id} libroDiario`;
  }
}
