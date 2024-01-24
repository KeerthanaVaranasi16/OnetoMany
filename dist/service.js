"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = __importDefault(require("./DataSource/dataSource"));
const Todo_entity_1 = require("./entities/Todo.entity");
const Users_entity_1 = require("./entities/Users.entity");
class UserService {
    constructor() {
        this.userRepo = dataSource_1.default.getRepository(Users_entity_1.Users);
        this.todoRepo = dataSource_1.default.getRepository(Todo_entity_1.Todo);
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepo.find({
                order: {
                    id: "ASC",
                },
                relations: ["todos"],
            });
            // return await this.userRepo
            //   .createQueryBuilder("user")
            //   .leftJoinAndSelect("user.todos", "todos")
            //   .where("user.id = :userId", { userId: 1 })
            //   .getOne();
        });
    }
    // private todoRepo=AppDataSource.getRepository(Todo)           //ManytoOne
    // async getAllUsers() {
    //     return this.todoRepo.find({
    //         order:{
    //                 id:"ASC"
    //             },
    //             relations:['user']
    //         });
    //     }
    getUserByOptions(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepo.findOne({
                where: options,
                //   select: { firstName: true }
            });
        });
    }
    createUser(firstName, lastName, age, todos) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTodos = todos.map((todoData) => {
                const todo = new Todo_entity_1.Todo();
                todo.title = todoData.title;
                todo.description = todoData.description;
                return todo;
            });
            const newUser = new Users_entity_1.Users();
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.age = age;
            newUser.todos = newTodos;
            return this.userRepo.save(newUser);
        });
    }
    updateTodos(todoRepo, todos) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const todoData of todos) {
                const { title } = todoData, todoDetails = __rest(todoData, ["title"]);
                if (title != todoData.title) {
                    throw new Error(`User with ID ${title} not found`);
                }
                yield todoRepo.update({ title }, todoDetails);
            }
        });
    }
    updateUser(userId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { todos } = updatedData, userData = __rest(updatedData, ["todos"]);
            yield this.userRepo.update(userId, userData);
            if (todos && todos.length > 0) {
                yield this.updateTodos(this.todoRepo, todos);
            }
            else {
                console.log("No todo found");
            }
        });
    }
    //   async deleteTodos(todos: Todo[]): Promise<void> {
    //     for (const todoData of todos) {
    //         const { id, ...todoDetails } = todoData;
    //         await this.todoRepo.delete(id);
    //     }
    //   }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOne({
                where: { id: userId },
                relations: ["todos"],
            });
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }
            const todos = user.todos || [];
            if (todos && todos.length > 0) {
                yield this.todoRepo.remove(todos);
            }
            yield this.userRepo.delete(userId);
        });
    }
}
exports.default = new UserService();
