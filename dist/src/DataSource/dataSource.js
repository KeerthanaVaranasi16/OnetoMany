"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Users_entity_1 = require("../entities/Users.entity");
var Todo_entity_1 = require("../entities/Todo.entity");
var Student_entity_1 = require("../entities/Student.entity");
var dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgre",
    database: "postgres",
    logging: true,
    synchronize: false,
    entities: [
        Users_entity_1.Users,
        Todo_entity_1.Todo,
        Student_entity_1.Student
    ],
    migrations: ["dist/src/migrations/*.js"]
});
exports.default = dataSource;
