import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config/api";

export default function ProductCreate() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category_id: "",
    description: "",
    status: "1",
  });

  // Load categories
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "name") {
      const slug = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/products`, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category_id: Number(formData.category_id),
        brand_id: 1, // tạm hardcode
        status: Number(formData.status),
      });

      alert("Tạo sản phẩm thành công! Hãy thêm biến thể.");
      navigate("/admin/products");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Lỗi khi tạo sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h4 className="mb-4 fw-bold">Thêm sản phẩm mới</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tên sản phẩm *</label>
              <input
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Slug</label>
              <input
                name="slug"
                className="form-control"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Tự động tạo"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Danh mục *</label>
              <select
                name="category_id"
                className="form-select"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Trạng thái</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="1">Hiển thị</option>
                <option value="0">Ẩn</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label">Mô tả</label>
              <textarea
                name="description"
                rows="4"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary me-2 px-4"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu sản phẩm"}
            </button>
            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={() => navigate("/admin/products")}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
