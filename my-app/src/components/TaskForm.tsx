import { useForm } from "react-hook-form";
import { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm({ onSave }: { onSave: (task: Task) => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Task, "id">>();

  const onSubmit = (data: Omit<Task, "id">) => {
    onSave({ ...data, id: uuidv4() });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-6 bg-white rounded-xl shadow-md max-w-md w-full mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-700">Thêm công việc</h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium text-gray-600">Tiêu đề *</label>
        <input
          {...register("title", {
            required: "Tiêu đề không được để trống",
            minLength: {
              value: 3,
              message: "Tiêu đề phải có ít nhất 3 ký tự",
            },
            maxLength: {
              value: 100,
              message: "Tiêu đề không được vượt quá 100 ký tự",
            },
          })}
          placeholder="Nhập tiêu đề"
          className={`border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.title ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium text-gray-600">Mô tả</label>
        <input
          {...register("description", {
            maxLength: {
              value: 255,
              message: "Mô tả không được vượt quá 255 ký tự",
            },
          })}
          placeholder="Nhập mô tả"
          className={`border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.description ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      {/* Due Date */}
      <div>
        <label className="block mb-1 font-medium text-gray-600">Hạn chót *</label>
        <input
          type="date"
          {...register("dueDate", {
            required: "Hạn chót không được để trống",
            validate: (value) =>
              new Date(value) >= new Date(new Date().toDateString()) || "Hạn chót phải là ngày hiện tại hoặc tương lai",
          })}
          className={`border rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 ${
            errors.dueDate ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
      </div>

      {/* Status */}
      <div>
        <label className="block mb-1 font-medium text-gray-600">Trạng thái</label>
        <select
          {...register("status")}
          className="border border-gray-300 rounded-md w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="todo">Chưa bắt đầu</option>
          <option value="inprogress">Đang làm</option>
          <option value="done">Đã hoàn thành</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-2 px-4 rounded-md"
      >
        Thêm công việc
      </button>
    </form>
  );
}
