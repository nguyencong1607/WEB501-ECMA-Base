import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function AddPage() {
  const [newTour, setNewTour] = useState({
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
  const validateData = () => {
    let message = "";

    if (!name) {
      return "Tên tour là bắt buộc";
    }
    if (name.length < 5 || name.length > 100) {
      return "Tên tour phải từ 5 - 100 ký tự";
    }

    if (!destination) {
      return "Điểm đến là bắt buộc";
    }
    if (destination.length < 2 || destination.length > 50) {
      return "Điểm đến phải từ 2 - 50 ký tự";
    }

    if (!duration) {
      return "Thời lượng tour là bắt buộc";
    }

    if (!price) {
      return "Giá tour là bắt buộc";
    }
    if (Number(price) <= 0) {
      return "Giá tour phải lớn hơn 0";
    }

    const urlRegex = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if (!image) {
      return "Ảnh là bắt buộc";
    }
    if (!urlRegex.test(image)) {
      return "URL ảnh không hợp lệ";
    }

    if (!description) {
      return "Mô tả là bắt buộc";
    }
    if (description.length < 10 || description.length > 1000) {
      return "Mô tả phải từ 10 - 1000 ký tự";
    }

    if (available === "" || available == null) {
      return "Số chỗ còn lại là bắt buộc";
    }
    if (Number(available) < 0) {
      return "Số chỗ phải ≥ 0";
    }

    if (!type || !["tour nội địa", "tour quốc tế"].includes(type)) {
      return "Loại tour không hợp lệ";
    }

    if (typeof active !== "boolean") {
      return "Giá trị active không hợp lệ";
    }

    return "";
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setNewTour((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = validateData();
    if (message) {
      toast.error(message);
      return;
    }

    try {
      await axios.post("http://localhost:3000/tours", newTour);
      toast.success("Thêm tour thành công!");

      setNewTour({
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
    } catch (error) {
      toast.error("Lỗi: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Thêm Tour Mới</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1 text-gray-700"
            >
              Tên Tour:
            </label>
            <input
              name="name"
              value={newTour.name}
              onChange={handleInputChange}
              type="text"
              id="name"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="destination"
              className="block font-medium mb-1 text-gray-700"
            >
              Điểm đến:
            </label>
            <input
              name="destination"
              value={newTour.destination}
              onChange={handleInputChange}
              type="text"
              id="destination"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="duration"
              className="block font-medium mb-1 text-gray-700"
            >
              Thời gian:
            </label>
            <input
              name="duration"
              value={newTour.duration}
              onChange={handleInputChange}
              type="text"
              id="duration"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block font-medium mb-1 text-gray-700"
            >
              Giá (VNĐ):
            </label>
            <input
              name="price"
              value={newTour.price}
              onChange={handleInputChange}
              type="number"
              id="price"
              min=""
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="available"
              className="block font-medium mb-1 text-gray-700"
            >
              Số lượng chỗ còn:
            </label>
            <input
              name="available"
              value={newTour.available}
              onChange={handleInputChange}
              type="number"
              id="available"
              min="0"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block font-medium mb-1 text-gray-700"
            >
              Ảnh:
            </label>
            <input
              name="image"
              value={newTour.image}
              onChange={handleInputChange}
              type="text"
              id="image"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-medium mb-1 text-gray-700"
          >
            Mô tả:
          </label>
          <textarea
            name="description"
            value={newTour.description}
            onChange={handleInputChange}
            id="description"
            rows="3"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label
              htmlFor="category"
              className="block font-medium mb-1 text-gray-700"
            >
              Hạng mục Tour:
            </label>
            <select
              name="category"
              id="category"
              value={newTour.category}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="tour nội địa">Tour Nội Địa</option>
              <option value="tour quốc tế">Tour Quốc Tế</option>
            </select>
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              name="active"
              type="checkbox"
              checked={newTour.active}
              onChange={handleInputChange}
              id="active"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="active" className="text-gray-700 font-medium">
              Tour đang hoạt động
            </label>
          </div>
        </div>

        {/* === NÚT SUBMIT === */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full font-medium"
        >
          Thêm Tour
        </button>
      </form>
    </div>
  );
}

export default AddPage;
