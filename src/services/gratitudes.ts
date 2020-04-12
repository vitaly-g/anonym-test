import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Gratitude } from '../db/entities/gratitude.entity';

import CursorService from '../db/utils/cursor';

@Injectable()
export default class GratitudeService {
  constructor(
    @InjectRepository(Gratitude)
    private readonly gratitudeRepository: Repository<Gratitude>,
  ) { }

  async list(params: { to: string, perPage: number }, cursor: string) {
    let nextCursor = null;

    let take = params.perPage;
    let to = params.to;

    let skip = 0;
    let page = 2;

    if (cursor) {
      const oldCursor: any = CursorService.decode(cursor);

      to = oldCursor.to;
      skip = (Number(oldCursor.page) - 1) * Number(oldCursor.take);
      take = Number(oldCursor.take);

      page = Number(oldCursor.page) + 1;
    }

    const [items, total]: [Gratitude[], number] = await this.gratitudeRepository.findAndCount({
      where: { to }, skip, take, select: ['from', 'reason'],
      order: { createDate: 'DESC' }
    });
    const next: Gratitude[] = await this.gratitudeRepository.find({
      where: { to },
      skip: !cursor ? take : take * (page - 1),
      take,
      order: { createDate: 'DESC' }
    });

    if (next.length > 0) {
      nextCursor = CursorService.create({ to, page, take });
    }

    return { nextCursor, items, total };
  }

  async add(params: { from: string, to: string, reason: string }): Promise<void> {
    const gratitudeQueryBuilder = this.gratitudeRepository.createQueryBuilder()

    await gratitudeQueryBuilder
      .insert()
      .into(Gratitude)
      .updateEntity(false)
      .values({
        id: () => `(SELECT CONCAT((SELECT CONCAT('${params.to}','#')), (SELECT LPAD(((SELECT COUNT(*) AS 'the_count' FROM gratitudes gr) + 1),6, '0'))))`,
        from: params.from,
        to: params.to,
        reason: params.reason,
      })
      .execute();
  }
}
