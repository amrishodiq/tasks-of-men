import type { Task } from '../types/task.js';
import type { Profile as User } from '../types/user.js';

export class DataStorage {
  static saveTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static loadTasks(): Task[] {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  }

  static saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static loadUser(): User | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}