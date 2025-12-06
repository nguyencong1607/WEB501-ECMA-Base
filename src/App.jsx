import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import AddPage from "../src/pages/Add";
import ListPage from "../src/pages/List";
import EditPage from "../src/pages/Edit";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER - Navbar Tailwind */}
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>Web Du Lịch</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/login" className="hover:text-gray-200">
              Đăng nhập
            </a>
            <a href="/register" className="hover:text-gray-200">
              Đăng ký
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center  bg-blue-100">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
        {/* Routing List */}

        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
