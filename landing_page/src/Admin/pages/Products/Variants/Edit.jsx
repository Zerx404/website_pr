import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../config/api";

const STORAGE_URL = "http://127.0.0.1:8000/storage/";

export default function VariantEdit() {
  const navigate = useNavigate();
  const { id, variantId } = useParams();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    sku: "",
    price: "",
    stock: "",
  });

  const [mainPreview, setMainPreview] = useState("");
  const [gallery, setGallery] = useState([]);
  const [newImagesPreview, setNewImagesPreview] = useState([]);

  // 🔹 Load variant
  useEffect(() => {
    axios.get(`${API_BASE_URL}/products/${id}`).then((res) => {
      const variant = res.data.variants.find(
        (v) => v.id === Number(variantId)
      );

      if (!variant) {
        navigate(`/admin/products/${id}/variants`);
        return;
      }

      setFormData({
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
      });

      // ảnh đại diện
      setMainPreview(
        variant.image ? STORAGE_URL + variant.image : ""
      );

      // ảnh phụ
      setGallery(variant.images || []);
      setLoading(false);
    });
  }, [id, variantId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // preview ảnh đại diện mới
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainPreview(URL.createObjectURL(file));
    }
  };

  // preview ảnh phụ mới
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    setNewImagesPreview(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("price", formData.price);
    form.append("stock", formData.stock);

    const mainFile = e.target.main_image.files[0];
    if (mainFile) {
      form.append("image", mainFile);
    }

    const galleryFiles = e.target.images.files;
    for (let i = 0; i < galleryFiles.length; i++) {
      form.append("images[]", galleryFiles[i]);
    }

    try {
      await axios.post(
        `${API_BASE_URL}/variants/${variantId}?_method=PUT`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Cập nhật biến thể thành công!");
      navigate(`/admin/products/${id}/variants`);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật biến thể");
    }
  };

  if (loading) return <div className="text-center py-5">Đang tải…</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h4 className="mb-4 fw-bold">Sửa biến thể #{variantId}</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">SKU</label>
              <input className="form-control" value={formData.sku} disabled />
            </div>

            <div className="col-md-3">
              <label className="form-label">Giá</label>
              <input
                name="price"
                type="number"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Tồn kho</label>
              <input
                name="stock"
                type="number"
                className="form-control"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            {/* ẢNH ĐẠI DIỆN */}
            <div className="col-md-12">
              <label className="form-label">Ảnh đại diện</label>
              <input
                type="file"
                name="main_image"
                className="form-control"
                accept="image/*"
                onChange={handleMainImageChange}
              />
              {mainPreview && (
                <img
                  src={mainPreview}
                  className="mt-3 img-thumbnail"
                  style={{ maxWidth: 200 }}
                />
              )}
            </div>

            {/* ẢNH PHỤ HIỆN CÓ */}
            {gallery.length > 0 && (
              <div className="col-md-12">
                <label className="form-label">Ảnh phụ hiện có</label>
                <div className="d-flex flex-wrap gap-3">
                  {gallery.map((img) => (
                    <img
                      key={img.id}
                      src={STORAGE_URL + img.image}
                      width="100"
                      height="100"
                      style={{ objectFit: "cover", borderRadius: 6 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* THÊM ẢNH PHỤ */}
            <div className="col-md-12">
              <label className="form-label">Thêm ảnh phụ</label>
              <input
                type="file"
                name="images"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
              />

              {newImagesPreview.length > 0 && (
                <div className="mt-3 d-flex flex-wrap gap-3">
                  {newImagesPreview.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      width="100"
                      height="100"
                      style={{ objectFit: "cover", borderRadius: 6 }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary me-3">
                Cập nhật
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  navigate(`/admin/products/${id}/variants`)
                }
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
