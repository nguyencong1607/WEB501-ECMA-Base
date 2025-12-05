import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    name: "",
    destination: "",
    duration: "",
    price: 0,
    image: "",
    description: "",
    available: 0,
    category: "tour nội địa",
    active: true,
  });

  // Load tour khi vào trang Edit
  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/${id}`)
      .then((res) => setTour(res.data))
      .catch(() => toast.error("Không tải được dữ liệu tour"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTour((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/tours/${id}`, tour);
      toast.success("Cập nhật tour thành công");
      navigate("/");
    } catch (error) {
      toast.error("Lỗi cập nhật tour");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Sửa Tour</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Tên tour</label>
          <input
            name="name"
            value={tour.name}
            onChange={handleChange}
            type="text"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Điểm đến</label>
          <input
            name="destination"
            value={tour.destination}
            onChange={handleChange}
            type="text"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Thời gian</label>
            <input
              name="duration"
              value={tour.duration}
              onChange={handleChange}
              type="text"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Giá (VNĐ)</label>
            <input
              name="price"
              value={tour.price}
              onChange={handleChange}
              type="number"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Số chỗ còn</label>
          <input
            name="available"
            value={tour.available}
            onChange={handleChange}
            type="number"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">URL Ảnh</label>
          <input
            name="image"
            value={tour.image}
            onChange={handleChange}
            type="text"
            className="w-full border px-3 py-2 rounded"
          />

          {tour.image && (
            <img
              src={tour.image}
              alt="preview"
              className="w-24 h-24 mt-3 object-cover rounded border"
            />
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Mô tả</label>
          <textarea
            name="description"
            value={tour.description}
            onChange={handleChange}
            rows="3"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Hạng mục</label>
          <select
            name="category"
            value={tour.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="tour nội địa">Tour nội địa</option>
            <option value="tour quốc tế">Tour quốc tế</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            name="active"
            type="checkbox"
            checked={tour.active}
            onChange={handleChange}
          />
          <label className="font-medium">Tour đang hoạt động</label>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditPage;
