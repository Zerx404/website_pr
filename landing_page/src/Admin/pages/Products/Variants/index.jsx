import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../config/api";

export default function ProductVariants() {
  const { id } = useParams();
  const productId = Number(id);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load product + variants
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setVariants(res.data.variants || []);
      })
      .catch(() => navigate("/admin/products"))
      .finally(() => setLoading(false));
  }, [productId, navigate]);

  // 🔹 Delete variant
  const handleDelete = async (variantId) => {
    if (!confirm(`Bạn chắc chắn muốn xóa biến thể ID ${variantId}?`)) return;

    try {
      await axios.delete(`${API_BASE_URL}/variants/${variantId}`);
      setVariants((prev) => prev.filter((v) => v.id !== variantId));
      alert("Xóa biến thể thành công!");
    } catch (err) {
      console.error(err);
      alert("Không thể xóa biến thể!");
    }
  };

  if (loading) {
    return <div className="text-center py-5">Đang tải dữ liệu...</div>;
  }

  if (!product) {
    return (
      <div className="alert alert-danger text-center py-5">
        Không tìm thấy sản phẩm với ID: {id}
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 fw-bold">
            Quản lý biến thể – {product.name} (ID: {product.id})
          </h4>
          <Link
            to={`/admin/products/${productId}/edit`}
            className="btn btn-secondary px-3"
          >
            Quay lại sửa sản phẩm
          </Link>
        </div>

        {variants.length === 0 ? (
          <div className="alert alert-info text-center py-5">
            Sản phẩm này chưa có biến thể nào. Hãy thêm biến thể mới!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>SKU</th>
                  <th>Giá</th>
                  <th>Tồn kho</th>
                  <th>Ảnh</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v) => (
                  <tr key={v.id}>
                    <td className="fw-medium">{v.id}</td>
                    <td>{v.sku || "—"}</td>
                    <td className="fw-bold text-danger">
                      {Number(v.price).toLocaleString("vi-VN")} ₫
                    </td>
                    <td>
                      {v.stock > 0 ? (
                        <span className="badge bg-success px-3 py-2">
                          {v.stock}
                        </span>
                      ) : (
                        <span className="badge bg-danger px-3 py-2">
                          Hết hàng
                        </span>
                      )}
                    </td>
                    <td>
                      {v.image ? (
                        <img
                          src={v.image}
                          alt="Variant"
                          width="50"
                          height="50"
                          style={{
                            objectFit: "cover",
                            borderRadius: "6px",
                          }}
                        />
                      ) : (
                        <span className="text-muted small">Không có</span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/admin/products/${productId}/variants/${v.id}/edit`}
                        className="btn btn-sm btn-warning me-2 px-3"
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-sm btn-danger px-3"
                        onClick={() => handleDelete(v.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4">
          <Link
            to={`/admin/products/${productId}/variants/create`}
            className="btn btn-success px-4"
          >
            + Thêm biến thể mới
          </Link>
        </div>
      </div>
    </div>
  );
}
