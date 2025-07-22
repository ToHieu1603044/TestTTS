// useTaskReducer.ts
import { Task } from "../types/task";

type Action =
  | { type: "ADD"; payload: Task }
  | { type: "UPDATE"; payload: Task }
  | { type: "DELETE"; payload: string }
  | { type: "SET"; payload: Task[] };

export function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    case "SET":
      return action.payload;
    default:
      return state;
  }
}
