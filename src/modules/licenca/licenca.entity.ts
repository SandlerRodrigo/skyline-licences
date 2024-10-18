import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Licenca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  chave: string;

  @Column({ unique: true })
  mac_address: string;

  @Column({ default: true })
  validade: boolean;

  @Column()
  data_expiracao: Date;
}
