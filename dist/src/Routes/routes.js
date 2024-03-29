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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var service_1 = __importDefault(require("../service"));
var router = express_1.default.Router();
router.get("/getAll", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service_1.default.getAllUsers()];
                case 1:
                    users = _a.sent();
                    res.json(users);
                    return [2 /*return*/];
            }
        });
    });
});
// router.get("/getOne/:id", async function (req, res) {
//   const id = parseInt(req.params.id);
//   if (!id) {
//     return res.status(400).json({ message: "Invalid input" });
//   }
//   const user = await userService.getUserById(id);
//   res.json(user);
// });
router.get("/getOne", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var options, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = req.query;
                    console.dir(req, { depth: null });
                    return [4 /*yield*/, service_1.default.getUserByOptions(options)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                    }
                    res.json(user);
                    return [2 /*return*/];
            }
        });
    });
});
router.post("/create", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, age, todos, savedUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, age = _a.age, todos = _a.todos;
                    if (!firstName || !lastName || age === undefined) {
                        return [2 /*return*/, res.status(400).json({ message: "Incomplete data provided" })];
                    }
                    return [4 /*yield*/, service_1.default.createUser(firstName, lastName, age, todos)];
                case 1:
                    savedUser = _b.sent();
                    res.json(savedUser);
                    return [2 /*return*/];
            }
        });
    });
});
router.put("/update/:userId", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, updateData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = parseInt(req.params.userId);
                    updateData = req.body;
                    if (!userId || !updateData) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid input" })];
                    }
                    return [4 /*yield*/, service_1.default.updateUser(userId, updateData)];
                case 1:
                    _a.sent();
                    res.json({ message: "User updated successfully" });
                    return [2 /*return*/];
            }
        });
    });
});
router.delete("/delete/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = parseInt(req.params.id);
                    console.dir(req, { depth: null });
                    if (!userId) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid input" })];
                    }
                    return [4 /*yield*/, service_1.default.deleteUser(userId)];
                case 1:
                    _a.sent();
                    res.json({ message: "User deleted successfully" });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        return [2 /*return*/, res.status(500).json({ error: error_1.message })];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
// router.delete("/todo/delete/:todoId", async function(req,res){
//   const todoId = parseInt(req.params.todoId);
//   if (!todoId) {
//     return res.status(400).json({ error: "Invalid input" });
//   }
//   await userService.deleteTodo(todoId);
//   res.json({ message: "Todo deleted successfully" });
// })
// router.delete("/delete", async function (req, res) {
//   const userId = parseInt(req.body.id);
//   if (!userId) {
//     return res.status(400).json({ error: "Invalid input" });
//   }
//   await userService.deleteUser(userId);
//   res.json({ message: "User deleted successfully" });
// });
router.delete("/delete", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userIdString, userId, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userIdString = req.query.id;
                    if (userIdString === undefined) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid input" })];
                    }
                    userId = parseInt(userIdString);
                    if (!userId) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ error: "Invalid input. 'id' must be a valid number." })];
                    }
                    return [4 /*yield*/, service_1.default.deleteUser(userId)];
                case 1:
                    _a.sent();
                    res.json({ message: "User deleted successfully" });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    if (error_2 instanceof Error) {
                        return [2 /*return*/, res.status(500).json({ error: error_2.message })];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
