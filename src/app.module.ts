import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './modules/database/database.module';
import { PersonModule } from './modules/person/person.module';

@Module({
  imports: [PersonModule, DatabaseModule],
  controllers: [AppController],
})
export class AppModule {}
