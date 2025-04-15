import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('tb_user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({
    name: 'using_platform',
    comment:
      '사용중인 로그인 플랫폼. (0. 카카오 / 1. 네이버 / 2. 카카오 / 3. 애플)',
  })
  usingPlatform: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'user_hash', nullable: false, unique: true, select: false })
  userHash: string;
}
