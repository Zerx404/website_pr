import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config/api";

export default function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category_id: "",
    description: "",
    status: "1",
  });

  // load categories + product
  useEffect(() => {
    axios.get(`${API_BASE_URL}/categories`).then(res => {
      setCategories(res.data);
    });

    axios.get(`${API_BASE_URL}/products/${id}`).then(res => {
      const p = res.data;
      setProduct(p);
      setFormData({
        name: p.name,
        slug: "",
        category_id: p.category_id,
        description: p.description || "",
        status: String(p.status ?? 1),
      });
      setPreview(p.thumbnail ? `${API_BASE_URL.replace("/api","")}/storage/${p.thumbnail}` : null);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "name") {
      const slug = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("category_id", formData.category_id);
      form.append("status", formData.status);

      const file = e.target.thumbnail.files[0];
      if (file) form.append("thumbnail", file);

      await axios.post(`${API_BASE_URL}/products/${id}?_method=PUT`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Lỗi cập nhật sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h4 className="mb-4 fw-bold">Sửa sản phẩm #{product.id}</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tên sản phẩm *</label>
              <input name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label className="form-label">Slug</label>
              <input className="form-control" value={formData.slug} disabled />
            </div>

            <div className="col-md-6">
              <label className="form-label">Danh mục *</label>
              <select name="category_id" className="form-select" value={formData.category_id} onChange={handleChange} required>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Trạng thái</label>
              <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                <option value="1">Hiển thị</option>
                <option value="0">Ẩn</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label">Ảnh đại diện</label>
              <input type="file" name="thumbnail" className="form-control" accept="image/*" onChange={handleFileChange} />
              {preview && <img src={preview} className="mt-3 img-thumbnail" style={{ maxWidth: 200 }} />}
            </div>

            <div className="col-md-12">
              <label className="form-label">Mô tả</label>
              <textarea name="description" rows="4" className="form-control" value={formData.description} onChange={handleChange} />
            </div>
          </div>

          <div className="mt-4">
            <button className="btn btn-primary px-4" disabled={loading}>
              {loading ? "Đang lưu..." : "Cập nhật"}
            </button>
            <Link to="/admin/products" className="btn btn-secondary ms-2 px-4">
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
