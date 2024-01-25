import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('app_version')
export class AppVersionEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'app_version_id' })
  appVersionId: number;

  @Column({ name: 'app_platform', nullable: false, unique: true })
  platformType: string;

  @Column({ name: 'app_version', nullable: false })
  version: string;
}
