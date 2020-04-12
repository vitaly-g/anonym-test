
import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import GratitideService from '../services/gratitudes';

@Controller('gratitudes')
export default class GratitudeController {
  constructor(private readonly gratitideService: GratitideService) { }

  @Get('list')
  async list(
    @Query('cursor') cursor: string,
    @Query('id') to: string,
    @Query('perPage') perPage: number,
  ): Promise<any> {
    return this.gratitideService.list({ to, perPage }, cursor);
  }

  @Post('add')
  async add(
    @Body() gratitude: { from: string, to: string, reason: string }
  ): Promise<void> {
    await this.gratitideService.add(gratitude);
  }
}
