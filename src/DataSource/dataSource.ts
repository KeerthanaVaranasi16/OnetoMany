import { DataSource } from "typeorm";
import { Users } from "../entities/Users.entity";
import { Todo } from "../entities/Todo.entity";
import { Student } from "../entities/Student.entity";
const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgre",
    database: "postgres",
    logging:true,
    synchronize:false,
    entities:[
        Users,
        Todo,
        Student
    ],
    migrations:["dist/src/migrations/*.js"]
})

export default dataSource;