import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    rollNum: string
    @Column()
    firstName: string
    @Column()
    lastName: string
    // @Column()
    // mail: string
    // @Column()
    // phn_number: number
}