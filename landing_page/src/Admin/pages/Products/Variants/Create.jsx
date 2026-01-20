import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../config/api";

export default function VariantCreate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sku: "",
    price: "",
    stock: "",
    attribute_value_ids: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("sku", formData.sku);
    form.append("price", formData.price);
    form.append("stock", formData.stock);

    if (e.target.image.files[0]) {
      form.append("image", e.target.image.files[0]);
    }

    Array.from(e.target.images.files).forEach((file) => {
      form.append("images[]", file);
    });

    formData.attribute_value_ids.forEach((attrId) => {
      form.append("attribute_value_ids[]", attrId);
    });

    await axios.post(
      `${API_BASE_URL}/products/${id}/variants`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Tạo biến thể thành công");
    navigate(`/admin/products/${id}/variants`);
  };

  return (
    <div className="card p-4">
      <h4 className="fw-bold mb-3">Thêm biến thể</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">SKU</label>
          <input
            className="form-control"
            value={formData.sku}
            onChange={(e) =>
              setFormData({ ...formData, sku: e.target.value })
            }
            required
          />
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Giá</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tồn kho</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label">Ảnh đại diện</label>
          <input type="file" name="image" className="form-control" />
        </div>

        <div className="mt-3">
          <label className="form-label">Ảnh phụ</label>
          <input type="file" name="images" className="form-control" multiple />
        </div>

        <div className="mt-4">
          <button className="btn btn-primary px-4">Lưu biến thể</button>
        </div>
      </form>
    </div>
  );
}
