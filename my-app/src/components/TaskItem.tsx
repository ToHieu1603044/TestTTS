import { Task } from "../types/task";

export default function TaskItem({
  task,
  onDelete,
  onUpdate,
}: {
  task: Task;
  onDelete: () => void;
  onUpdate: (task: Task) => void;
}) {
  const statusLabel = {
    todo: "Chưa bắt đầu",
    in_progress: "Đang làm",
    done: "Đã hoàn thành",
  }[task.status];

  const handleDelete = () => {
    if (window.confirm("Xác nhận xoá?")) {
      onDelete();
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("vi-VN");

  return (
    <div className="border p-3 rounded flex justify-between items-start gap-4 bg-white shadow-sm">
      <div className="flex-1">
        <div className="font-bold text-lg">{task.title}</div>
        <div className="text-sm text-gray-600">{task.description}</div>
        <div className="text-sm text-gray-500 mt-1">Hạn: {formatDate(task.dueDate)}</div>
        <div className="text-sm mt-1">Trạng thái: <strong>{statusLabel}</strong></div>
      </div>

      <div className="space-x-2">
        <button
          className="text-red-500 hover:underline"
          onClick={handleDelete}
        >
          Xoá
        </button>

        {task.status !== "done" && (
          <button
            className="text-green-500 hover:underline"
            onClick={() => {
              const updated = { ...task, status: "done" as const }; // Sửa lỗi ở đây
              onUpdate(updated);
            }}
          >
            Hoàn thành
          </button>
        )}
      </div>
    </div>
  );
}
