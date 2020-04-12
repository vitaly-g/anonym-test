import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Gratitude } from '../db/entities/gratitude.entity';
import GratitudeController from '../controllers/gratitudes';
import GratitudeService from '../services/gratitudes';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gratitude]),
  ],
  providers: [
    GratitudeService
  ],
  controllers: [
    GratitudeController,
  ],
})
export default class GratitudesModule {}