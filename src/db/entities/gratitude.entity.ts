import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { IGratitudeData } from '../../types/gratitude.data';

@Entity({ name: 'gratitudes' })
export class Gratitude implements IGratitudeData {
  @PrimaryColumn({ length: 23, nullable: false })
  id: string;

  @Column({ nullable: true, default: null, length: 16 })
  from: string | null;

  @Column({ nullable: false })
  to: string;

  @Column({ nullable: false })
  reason: string;

  @CreateDateColumn({ precision: null, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createDate: Date;
}