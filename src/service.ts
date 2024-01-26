import { Repository } from "typeorm";
import AppDataSource from "./DataSource/dataSource";
import { Todo } from "./entities/Todo.entity";

import { Users } from "./entities/Users.entity";
import { todo } from "node:test";
class UserService {
  private userRepo = AppDataSource.getRepository(Users);
  private todoRepo = AppDataSource.getRepository(Todo);
  async getAllUsers() {
    // return this.userRepo.find({    //OnetoMany
    //   order: {
    //     id: "ASC",
    //   },
    //   relations: ["todos"],
    // });
    console.log("Getting all the users")
    return this.userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.todos", "todos")
      .orderBy("user.id", "ASC")
      .getMany();
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
    // return await this.userRepo.findOne({
    //   where: options,
    //   relations:['todos']
    //   //   select: { firstName: true }
    // });
    const user = await this.userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.todos", "todos");
    Object.keys(options).forEach((key) => {
      user.andWhere(`user.${key} = :${key}`, { [key]: options[key] });
    });
    const result = await user.getOne();
    return result;
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
  

  async updateTodos(todoRepo: Repository<Todo>, todos: any[]) {
    for (const todoData of todos) {
      const { title, ...todoDetails } = todoData;
      if (title != todoData.title) {
        throw new Error(`User with ID ${title} not found`);
      }
      await todoRepo.update({ title }, todoDetails);
    }
  }
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

  async updateUser(userId: number, updatedData: any) {
    const { todos, ...userData } = updatedData;
    // await this.userRepo.update(userId, userData);
    await this.userRepo
      .createQueryBuilder("user")
      .update(Users)
      .set(userData)
      .where("id = :userId", { userId })
      .execute();
    if (todos && todos.length > 0) {
      await this.updateTodos(this.todoRepo,todos);
    }
  }

  async deleteUser(userId: number) {
    // const user = await this.userRepo.findOne({
    //   where: { id: userId },
    //   relations: ["todos"],
    // });
    const user=await this.userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.todos","todos")
      .where("user.id=:userId",{userId})
      .getOne()
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    const todos = user.todos || [];
    if (todos && todos.length > 0) {
      await this.todoRepo.remove(todos);
    }
    await this.userRepo
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where("id=:userId",{userId})
      .execute();
  }
}
export default new UserService();
