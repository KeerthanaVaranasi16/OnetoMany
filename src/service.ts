import { Repository } from "typeorm";
import AppDataSource from "./DataSource/dataSource";
import { Todo } from "./entities/Todo.entity";

import { Users } from "./entities/Users.entity";
class UserService {
  private userRepo = AppDataSource.getRepository(Users);
  private todoRepo = AppDataSource.getRepository(Todo);
  async getAllUsers() {
    return this.userRepo.find({    //OnetoMany
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
  async getUserByOptions(options: any) {
    return await this.userRepo.findOne({
      where: options,
      //   select: { firstName: true }
    });
  }

  async createUser(
    firstName: string,
    lastName: string,
    age: number,
    todos: { title: string; description: string }[]
  ) {
    const newTodos = todos.map((todoData) => {
      const todo = new Todo();
      todo.title = todoData.title;
      todo.description = todoData.description;
      return todo;
    });
    const newUser = new Users();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.age = age;
    newUser.todos = newTodos;

    return this.userRepo.save(newUser);
  }

  async updateTodos(todoRepo: Repository<Todo>, todos: any[]) {
    for (const todoData of todos) {
      const { title, ...todoDetails } = todoData;
      if (title != todoData.title) {
        throw new Error(`User with ID ${title} not found`);
      }
      await todoRepo.update({ title }, todoDetails);
    }
  }

  async updateUser(userId: number, updatedData: any) {
    const { todos, ...userData } = updatedData;
    await this.userRepo.update(userId, userData);
    if (todos && todos.length > 0) {
      await this.updateTodos(this.todoRepo, todos);
    } else {
      console.log("No todo found");
    }
  }

  //   async deleteTodos(todos: Todo[]): Promise<void> {
  //     for (const todoData of todos) {
  //         const { id, ...todoDetails } = todoData;
  //         await this.todoRepo.delete(id);
  //     }
  //   }

  async deleteUser(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["todos"],
    });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    const todos = user.todos || [];
    if (todos && todos.length > 0) {
      await this.todoRepo.remove(todos);
    }
    await this.userRepo.delete(userId);
  }
}
export default new UserService();
