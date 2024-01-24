import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm"
// import { Profile } from "./Profile.entity"
import { Todo } from "./Todo.entity"
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    firstName: string
    @Column()
    lastName: string
    @Column()
    age: number
    @OneToMany(()=>Todo,(todo)=>todo.user,{cascade:true})
    todos:Todo[]
}