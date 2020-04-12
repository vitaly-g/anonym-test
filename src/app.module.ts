import { Module } from '@nestjs/common';

import GratitudesModule from './modules/gratitudes';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GratitudesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
