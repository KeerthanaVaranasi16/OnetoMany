"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Student_entity_1 = require("../entities/Student.entity");
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgre",
    database: "postgres",
    logging: true,
    synchronize: false,
    entities: [
        // Users,
        // Todo,
        Student_entity_1.Student
    ],
    migrations: ["src/migrations/*.ts"]
});
exports.default = dataSource;
