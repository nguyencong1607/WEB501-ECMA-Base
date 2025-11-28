import React, { useState } from "react";

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewTour((prevTour) => ({
      ...prevTour,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tourToSubmit = {
      ...newTour,
      price: parseInt(newTour.price) || 0,
      available: parseInt(newTour.available) || 0,
    };

    console.log("Dữ liệu Tour để gửi đi:", tourToSubmit);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Thêm Tour Mới 
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cấu trúc Grid cho các trường ngang hàng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tên Tour */}
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
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Điểm đến (Destination) */}
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
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Thời gian (Duration) */}
          <div>
            <label
              htmlFor="duration"
              className="block font-medium mb-1 text-gray-700"
            >
              Thời gian (VD: 4 ngày 3 đêm):
            </label>
            <input
              name="duration"
              value={newTour.duration}
              onChange={handleInputChange}
              type="text"
              id="duration"
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Giá (Price) */}
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
              required
              min="0"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Số lượng chỗ còn (Available) */}
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
              required
              min="0"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className="block font-medium mb-1 text-gray-700"
            >
              Ảnh (URL):
            </label>
            <input
              name="image"
              value={newTour.image}
              onChange={handleInputChange}
              type="url"
              id="image"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>{" "}
        {/* End Grid */}
        {/* Mô tả (Description) */}
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
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        {/* Nâng cao: Category (Select) và Active (Checkbox) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          {/* Category (Select Box) */}
          <div>
            <label
              htmlFor="category"
              className="block font-medium mb-1 text-gray-700"
            >
              Hạng mục Tour (Category):
            </label>
            <select
              name="category"
              id="category"
              value={newTour.category}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tour nội địa">Tour Nội Địa</option>
              <option value="tour quốc tế">Tour Quốc Tế</option>
            </select>
          </div>

          {/* Active (Checkbox) */}
          <div className="flex items-center space-x-2">
            <input
              name="active"
              type="checkbox"
              id="active"
              checked={newTour.active}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="active" className="text-gray-700 font-medium">
              Tour đang hoạt động (Active)
            </label>
          </div>
        </div>
        {/* Submit button */}
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
