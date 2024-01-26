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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var dataSource_1 = __importDefault(require("./DataSource/dataSource"));
var Todo_entity_1 = require("./entities/Todo.entity");
var Users_entity_1 = require("./entities/Users.entity");
var UserService = /** @class */ (function () {
    function UserService() {
        this.userRepo = dataSource_1.default.getRepository(Users_entity_1.Users);
        this.todoRepo = dataSource_1.default.getRepository(Todo_entity_1.Todo);
    }
    UserService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // return this.userRepo.find({    //OnetoMany
                //   order: {
                //     id: "ASC",
                //   },
                //   relations: ["todos"],
                // });
                console.log("Getting all the users");
                return [2 /*return*/, this.userRepo
                        .createQueryBuilder("user")
                        .leftJoinAndSelect("user.todos", "todos")
                        .orderBy("user.id", "ASC")
                        .getMany()];
            });
        });
    };
    // private todoRepo=AppDataSource.getRepository(Todo)           //ManytoOne
    // async getAllUsers() {
    //     return this.todoRepo.find({
    //         order:{
    //                 id:"ASC"
    //             },
    //             relations:['user']
    //         });
    //     }
    UserService.prototype.getUserByOptions = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo
                            .createQueryBuilder("user")
                            .leftJoinAndSelect("user.todos", "todos")];
                    case 1:
                        user = _a.sent();
                        Object.keys(options).forEach(function (key) {
                            var _a;
                            user.andWhere("user.".concat(key, " = :").concat(key), (_a = {}, _a[key] = options[key], _a));
                        });
                        return [4 /*yield*/, user.getOne()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    UserService.prototype.createUser = function (firstName, lastName, age, todos) {
        return __awaiter(this, void 0, void 0, function () {
            var newTodos, newUser;
            return __generator(this, function (_a) {
                newTodos = todos.map(function (todoData) {
                    var todo = new Todo_entity_1.Todo();
                    todo.title = todoData.title;
                    todo.description = todoData.description;
                    return todo;
                });
                newUser = new Users_entity_1.Users();
                newUser.firstName = firstName;
                newUser.lastName = lastName;
                newUser.age = age;
                newUser.todos = newTodos;
                return [2 /*return*/, this.userRepo.save(newUser)];
            });
        });
    };
    // const result= await this.userRepo
    //   .createQueryBuilder("user")
    //   .insert()
    //   .values({
    //     firstName,
    //     lastName,
    //     age,
    //     todos: todos.map((todoData) => ({
    //       title: todoData.title,
    //       description: todoData.description,
    //     })),
    //   })
    //   .returning("*")
    //   .execute();
    //   const newUser = result.raw[0];
    //   const todoInsertPromises = todos.map((todoData) =>
    //     this.todoRepo
    //       .createQueryBuilder("todo")
    //       .insert()
    //       .values({
    //         title: todoData.title,
    //         description: todoData.description,
    //         user: newUser,
    //       })
    //       .execute()
    //   );
    //   await Promise.all(todoInsertPromises);
    //   return newUser;
    UserService.prototype.updateTodos = function (todoRepo, todos) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, todos_1, todoData, title, todoDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, todos_1 = todos;
                        _a.label = 1;
                    case 1:
                        if (!(_i < todos_1.length)) return [3 /*break*/, 4];
                        todoData = todos_1[_i];
                        title = todoData.title, todoDetails = __rest(todoData, ["title"]);
                        if (title != todoData.title) {
                            throw new Error("User with ID ".concat(title, " not found"));
                        }
                        return [4 /*yield*/, todoRepo.update({ title: title }, todoDetails)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // async addTodosToUser(userId,newTodos:any[]){
    //   const user = await this.userRepo.findOne({where:{id:userId}});
    //   if (!user) {
    //     throw new Error(`User with ID ${userId} not found`);
    //   }
    //   const todoEntities = newTodos.map(todoData => {
    //     const todo = new Todo();
    //     todo.title = todoData.title;
    //     todo.description = todoData.description;
    //     todo.user = user;  
    //     return todo;
    //   });
    //   await this.todoRepo.save(todoEntities);
    // }
    UserService.prototype.updateUser = function (userId, updatedData) {
        return __awaiter(this, void 0, void 0, function () {
            var todos, userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        todos = updatedData.todos, userData = __rest(updatedData, ["todos"]);
                        // await this.userRepo.update(userId, userData);
                        return [4 /*yield*/, this.userRepo
                                .createQueryBuilder("user")
                                .update(Users_entity_1.Users)
                                .set(userData)
                                .where("id = :userId", { userId: userId })
                                .execute()];
                    case 1:
                        // await this.userRepo.update(userId, userData);
                        _a.sent();
                        if (!(todos && todos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateTodos(this.todoRepo, todos)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, todos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo
                            .createQueryBuilder("user")
                            .leftJoinAndSelect("user.todos", "todos")
                            .where("user.id=:userId", { userId: userId })
                            .getOne()];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User with ID ".concat(userId, " not found"));
                        }
                        todos = user.todos || [];
                        if (!(todos && todos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.todoRepo.remove(todos)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.userRepo
                            .createQueryBuilder()
                            .delete()
                            .from(Users_entity_1.Users)
                            .where("id=:userId", { userId: userId })
                            .execute()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.default = new UserService();
