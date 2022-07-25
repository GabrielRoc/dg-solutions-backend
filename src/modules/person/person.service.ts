import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PaginationParams,
  PaginationResult,
} from 'src/common/interfaces/pagination.interface';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  @InjectRepository(Person)
  private readonly personRepository: Repository<Person>;

  async create(createTodoItemDto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(createTodoItemDto);

    return await this.personRepository.save(person);
  }

  async findAll(
    paginationParams: PaginationParams,
  ): Promise<PaginationResult<Person>> {
    const todoItems = await this.personRepository.find({
      skip: (paginationParams.page - 1) * paginationParams.limit,
      take: paginationParams.limit,
    });

    const countItems = await this.personRepository.count();

    const meta = {
      itemsPerPage: +paginationParams.limit,
      totalItems: +countItems,
      currentPage: +paginationParams.page,
      totalPages: +Math.ceil(countItems / paginationParams.limit),
    };

    return {
      data: todoItems,
      meta: meta,
    };
  }
}
