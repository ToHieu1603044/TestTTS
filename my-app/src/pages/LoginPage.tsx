import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ username: string }>();

  const onSubmit = ({ username }: { username: string }) => {
    localStorage.setItem("user", JSON.stringify({ username }));
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-xl font-bold">Đăng nhập</h1>
        <input
          {...register("username", { required: true })}
          className="border px-3 py-2"
          placeholder="Nhập tên người dùng"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Đăng nhập</button>
      </form>
    </div>
  );
}
