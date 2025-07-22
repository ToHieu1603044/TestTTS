import { useEffect, useReducer, useState } from "react";
import { taskReducer } from "../hooks/useTaskReducer";
import { Task } from "../types/task";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const FILTERS = [
  { label: "Tất cả", value: "" },
  { label: "Chưa bắt đầu", value: "todo" },
  { label: "Đang làm", value: "inprogress" },
  { label: "Hoàn thành", value: "done" },
];

export default function DashboardPage() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      dispatch({ type: "SET", payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.status === "done").length,
    overdue: tasks.filter(
      (t) => new Date(t.dueDate) < new Date() && t.status !== "done"
    ).length,
  };

  const filteredTasks = filter ? tasks.filter((t) => t.status === filter) : tasks;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">📝 Quản lý Công việc</h1>

      {/* Bộ lọc */}
      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full border 
              ${filter === f.value ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-gray-500">Tổng</div>
          <div className="text-xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-gray-500">Hoàn thành</div>
          <div className="text-xl font-bold text-green-600">{stats.done}</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-gray-500">Quá hạn</div>
          <div className="text-xl font-bold text-red-600">{stats.overdue}</div>
        </div>
      </div>

      {/* Form thêm công việc */}
      <div className="bg-white rounded-xl shadow p-4">
        <TaskForm onSave={(task) => dispatch({ type: "ADD", payload: task })} />
      </div>

      {/* Danh sách công việc */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => dispatch({ type: "DELETE", payload: task.id })}
              onUpdate={(updatedTask) =>
                dispatch({ type: "UPDATE", payload: updatedTask })
              }
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-6">Không có công việc nào.</div>
        )}
      </div>
    </div>
  );
}
