import { Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Person extends BaseEntity {
  @Column()
  name: string;

  @Column()
  birthDate: Date;

  @Expose()
  get age(): number {
    const diff_ms = Date.now() - this.birthDate.getTime();
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
}
