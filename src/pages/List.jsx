import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
function ListPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/tours");
        setTours(data);
      } catch (error) {
        toast.error("Không thể tải:", error);
      }
    };
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("bạn cóc chắc chắn muốn xóa k")) return;
    try {
      await axios.delete(`http://localhost:3001/tours/${id}`);
      setTours(tours.filter((tour) => tour.id !== id));
    } catch (err) {
      toast.error("Không thể tải:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tours</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100  text-blue-400">
            <tr>
              <th className="px-4 py-2 border border-blue-300 text-left  text-blue-400">ID</th>
              <th className="px-4 py-2 border border-blue-300 text-left text-blue-400">
                Tên Tour
              </th>
              <th className="px-4 py-2 border border-blue-300 text-left  text-blue-400">
                Giá
              </th>
              <th className="px-4 py-2 border border-blue-300 text-left  text-blue-400">
                Thời gian
              </th>
              {/* <th className="px-4 py-2 border border-gray-300 text-left">
                Trạng thái
              </th> */}
              <th className="px-4 py-2 border border-blue-300 text-left  text-blue-400">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{tour.id}</td>
                <td className="px-4 py-2 border border-gray-300 font-medium">
                  {tour.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.price?.toLocaleString("vi-VN")} VNĐ
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.duration}
                </td>
                {/* <td className="px-4 py-2 border border-gray-300">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      tour.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tour.status}
                  </span>
                </td> */}
                <td className="px-4 py-2 border border-gray-300 space-x-2">
                  <Link
                    to={`/edit/${tour.id}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {tours.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  Không có tour nào trong danh sách.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
