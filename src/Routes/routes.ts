import express from "express";
import AppDataSource from "../DataSource/dataSource";
import { Users } from "../entities/Users.entity";
import userService from "../service";

const router: express.Router = express.Router();
router.get("/getAll", async function (req, res) {
  const users = await userService.getAllUsers();
  res.json(users);
});

// router.get("/getOne/:id", async function (req, res) {
//   const id = parseInt(req.params.id);
//   if (!id) {
//     return res.status(400).json({ message: "Invalid input" });
//   }
//   const user = await userService.getUserById(id);
//   res.json(user);
// });

router.get("/getOne", async function (req, res) {
  const options = req.query;
  console.dir(req, { depth: null });
  const user = await userService.getUserByOptions(options);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

router.post("/create", async function (req, res) {
  const { firstName, lastName, age, todos } = req.body;
  if (!firstName || !lastName || age === undefined) {
    return res.status(400).json({ message: "Incomplete data provided" });
  }
  const savedUser = await userService.createUser(
    firstName,
    lastName,
    age,
    todos
  );
  res.json(savedUser);
});
router.put("/update/:userId", async function (req, res) {
  const userId = parseInt(req.params.userId);
  const updateData = req.body;
  if (!userId || !updateData) {
    return res.status(400).json({ error: "Invalid input" });
  }
  await userService.updateUser(userId, updateData);
  res.json({ message: "User updated successfully" });
});

router.delete("/delete/:id", async function (req, res) {
  try {
    const userId = parseInt(req.params.id);
    console.dir(req, { depth: null });
    if (!userId) {
      return res.status(400).json({ error: "Invalid input" });
    }
    await userService.deleteUser(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
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
router.delete("/delete", async function (req, res) {
  try {
    const userIdString = req.query.id as string | undefined;
    if (userIdString === undefined) {
      return res.status(400).json({ error: "Invalid input" });
    }
    const userId = parseInt(userIdString);
    if (!userId) {
      return res
        .status(400)
        .json({ error: "Invalid input. 'id' must be a valid number." });
    }
    await userService.deleteUser(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
});
export default router;
