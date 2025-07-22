

import { Task } from "../types/task";

export function saveTasksToStorage(tasks: Task[]) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  export function loadTasksFromStorage(): Task[] {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  }
  
  export {};
  