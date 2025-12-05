import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tourRes = await axios.get(`${API}/tours`);
        const desRes = await axios.get(`${API}/destinations`);

        setTours(tourRes.data);
        setDestinations(desRes.data);
      } catch (err) {
        console.log("Lỗi tải dữ liệu", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="p-6 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6 space-y-10">
      <div className="w-full h-48 bg-blue-200 flex items-center justify-center rounded-lg">
        <h1 className="text-2xl font-bold">Chào mừng đến với Travel Go</h1>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Tour nổi bật</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="border rounded-lg overflow-hidden bg-white"
            >
              <img
                src={tour.image || "https://picsum.photos/400"}
                alt={tour.name}
                className="w-full h-40 object-cover"
              />

              <div className="p-3">
                <h3 className="font-semibold text-lg">{tour.name}</h3>
                <p className="text-sm text-gray-600">{tour.destination}</p>

                <div className="mt-2 text-blue-700 font-bold">
                  {Number(tour.price).toLocaleString()}₫
                </div>

                <Link
                  to={`/tour/${tour.id}`}
                  className="inline-block mt-3 text-indigo-600 underline"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Điểm đến</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {destinations.map((des) => (
            <div key={des.id} className="p-4 bg-white border rounded-lg">
              <div className="text-3xl">{des.icon}</div>
              <h3 className="font-semibold text-lg">{des.name}</h3>
              <p className="text-sm text-gray-600">{des.description}</p>
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-gray-800 text-white p-10 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">Giới thiệu</h3>
            <p className="text-sm">✈️GO_TRAVEL</p>
            <br />
            <p className="text-sm mt-2">Hotline: 098888888</p>
            <br />
            <p className="text-sm">Email:gotral@gmail.com</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Hỗ trợ</h3>
            <ul>
              <li>
                <a href="" className="text-sm hover:text-red-400">
                  Câu hỏi thường gặp (FAQ)
                </a>
              </li>
              <br />
              <li>
                <a href="#" className="text-sm hover:text-red-400">
                  Phản ánh dịch vụ
                </a>
              </li>
              <br />
              <a href="#" className="text-sm hover:text-blue-400">
                Cẩm nang du lịch
              </a>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Kết Nối Với Chúng Tôi</h3>
            <p className="text-sm mb-4">Theo dõi chúng tôi trên mạng xã hội:</p>
            <p className="text-xs mt-6">
              © 2025 Tour Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
