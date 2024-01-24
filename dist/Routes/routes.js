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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = __importDefault(require("../service"));
const router = express_1.default.Router();
router.get("/getAll", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield service_1.default.getAllUsers();
        res.json(users);
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
    return __awaiter(this, void 0, void 0, function* () {
        const options = req.query;
        console.dir(req, { depth: null });
        const user = yield service_1.default.getUserByOptions(options);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    });
});
router.post("/create", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, age, todos } = req.body;
        if (!firstName || !lastName || age === undefined) {
            return res.status(400).json({ message: "Incomplete data provided" });
        }
        const savedUser = yield service_1.default.createUser(firstName, lastName, age, todos);
        res.json(savedUser);
    });
});
router.put("/update/:userId", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.userId);
        const updateData = req.body;
        if (!userId || !updateData) {
            return res.status(400).json({ error: "Invalid input" });
        }
        yield service_1.default.updateUser(userId, updateData);
        res.json({ message: "User updated successfully" });
    });
});
router.delete("/delete/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.id);
            console.dir(req, { depth: null });
            if (!userId) {
                return res.status(400).json({ error: "Invalid input" });
            }
            yield service_1.default.deleteUser(userId);
            res.json({ message: "User deleted successfully" });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
        }
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
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userIdString = req.query.id;
            if (userIdString === undefined) {
                return res.status(400).json({ error: "Invalid input" });
            }
            const userId = parseInt(userIdString);
            if (!userId) {
                return res
                    .status(400)
                    .json({ error: "Invalid input. 'id' must be a valid number." });
            }
            yield service_1.default.deleteUser(userId);
            res.json({ message: "User deleted successfully" });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
        }
    });
});
exports.default = router;
