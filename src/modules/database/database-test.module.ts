import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../person/entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      logging: false,
      entities: [Person],
      synchronize: true,
    }),
  ],
})
export class DatabaseTestModule {}
