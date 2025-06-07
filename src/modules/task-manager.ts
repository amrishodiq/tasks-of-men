import { DataStorage } from './data-storage.js';
import type { Task } from '../types/task.js';

export const TaskManager = (() => {
  let tasks: Task[] = DataStorage.loadTasks();

  function getTasks() {
    return tasks;
  }

  function addTask(task: Task): void {
    tasks.push(task);
    DataStorage.saveTasks(tasks);
  }

  function deleteTask(id: String): void {
    tasks = tasks.filter(task => task.id !== id);
    DataStorage.saveTasks(tasks);
  }

  function updateTask(updatedTask: Task): void {
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    DataStorage.saveTasks(tasks);
  }

  return {
    getTasks,
    addTask,
    deleteTask,
    updateTask
  };
})();
