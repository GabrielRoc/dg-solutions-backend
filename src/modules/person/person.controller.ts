import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationResponseDto } from 'src/common/dtos/pagination.dto';
import { PaginationParams } from 'src/common/interfaces/pagination.interface';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';
import { PersonService } from './person.service';

@Controller('person')
@UseInterceptors(ClassSerializerInterceptor)
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post('create')
  async create(
    @Body(new JoiPipe({ group: 'CREATE' }))
    createPersonDto: CreatePersonDto,
  ) {
    return await this.personService.create(createPersonDto);
  }

  @Get('list')
  async findAll(@Pagination() paginationParams: PaginationParams) {
    return new PaginationResponseDto<Person>(
      await this.personService.findAll(paginationParams),
    );
  }
}
