import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
function ListPage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/tours");
        setTours(data);
      } catch (error) {
        toast.error("Không thể tải:", error);
      }
    };
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("bạn có chắc chắn muốn xóa k")) return;
    try {
      await axios.delete(`http://localhost:3000/tours/${id}`);
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
          <thead className="bg-gray-100 text-blue-600">
            <tr>
              <th className="px-4 py-2 border border-blue-300 text-left">ID</th>
              <th className="px-4 py-2 border border-blue-300 text-left">
                Tên Tour
              </th>
              <th className="px-4 py-2 border border-blue-300 text-left">
                Hình ảnh
              </th>
              <th className="px-4 py-2 border border-blue-300 text-left">
                Điểm đến
              </th>
              <th className="px-4 py-2 border border-blue-300 text-left">
                Giá
              </th>
              <th className="px-4 py-2 border border-blue-300 text-left">
                Thời gian
              </th>
              <th className="px-4 py-2 border border-blue-300 text-left">
                Hạng mục
              </th>
              <th className="px-4 py-2 border border-blue-300 text-left">
                Chỗ còn lại
              </th>
              <th className="px-4 py-2 border border-blue-300 text-left">
                Trạng thái
              </th>
              <th className="px-4 py-2 border border-blue-300 text-left">
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
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {tour.destination}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {tour.price?.toLocaleString("vi-VN")} VNĐ
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {tour.duration}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {tour.category}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      tour.available > 5
                        ? "bg-green-100 text-green-700"
                        : tour.available > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tour.available > 0 ? `${tour.available} chỗ` : "Hết chỗ"}
                  </span>
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      tour.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tour.active ? "Đang hoạt động" : "Ngừng hoạt động"}
                  </span>
                </td>

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
                <td
                  colSpan="10"
                  className="px-4 py-4 text-center text-gray-500"
                >
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
