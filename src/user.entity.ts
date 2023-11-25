import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: '_name', length: 25, default: '' })
  name: string;

  @Column({ name: 'middle_name', length: 25, default: '' })
  middle_name: string;

  @Column({ length: 20, unique: true, nullable: false })
  rut: string;

  @Column({ name: 'phone_number', length: 25, nullable: false })
  phone_number: string;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Column({ name: '_password', length: 255, nullable: false })
  password: string;
}
