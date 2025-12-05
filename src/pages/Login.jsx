import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Vui lòng điền đầy đủ Email và Mật khẩu.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      toast.success("Đăng nhập thành công!");
      setEmail("");
      setPassword("");
      navigate("/list");
    } catch (error) {
      toast.error("Lỗi: " + error.message);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-2xl rounded-xl mt-16 border border-gray-100">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700">
        Đăng nhập
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block font-semibold mb-2 text-gray-700"
            >
              Email:
            </label>
            <input
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              id="email"
              required
              placeholder="name@gmail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-semibold mb-2 text-gray-700"
            >
              {" "}
              Password:
            </label>
            <input
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
              required
              placeholder="Mật khẩu của bạn"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-5 py-3 mt-6 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition duration-200 ease-in-out font-bold text-lg 
                     shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Đăng nhập
        </button>

        <p className="text-center text-sm text-gray-600 pt-2">
          Chưa có tài khoản?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            {" "}
            Đăng kí ngay
          </a>
        </p>
      </form>
    </div>
  );
}
export default LoginPage;
