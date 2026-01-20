import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config/api";

const STORAGE_URL = "http://127.0.0.1:8000/storage";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // 🔹 Load products + categories
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch(console.error);

    axios
      .get(`${API_BASE_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  // 🔹 Helpers
  const getCategoryName = (id) =>
    categories.find((c) => c.id === id)?.name || "—";

  const getTotalStock = (variants = []) =>
    variants.reduce((sum, v) => sum + Number(v.stock || 0), 0);

  const getMinPrice = (variants = []) =>
    variants.length
      ? Math.min(...variants.map((v) => Number(v.price)))
      : 0;

  // 🔹 Filter
  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(keyword.toLowerCase());
    const matchCategory = !categoryId || p.category_id === Number(categoryId);
    return matchName && matchCategory;
  });

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🔹 Delete
  const handleDelete = async (id) => {
    if (!confirm(`Xóa sản phẩm ID ${id}?`)) return;

    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Đã xóa sản phẩm");
    } catch {
      alert("Không thể xóa sản phẩm");
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 fw-bold">Danh sách sản phẩm</h4>
          <Link to="/admin/products/create" className="btn btn-primary px-4">
            + Thêm sản phẩm
          </Link>
        </div>

        {/* FILTER */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Tìm theo tên sản phẩm..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">-- Tất cả danh mục --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                setKeyword("");
                setCategoryId("");
                setCurrentPage(1);
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Danh mục</th>
                <th>Giá từ</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.map((p) => {
                const minPrice = getMinPrice(p.variants);
                const totalStock = getTotalStock(p.variants);

                // 👉 ƯU TIÊN ẢNH VARIANT
                const mainImage =
                  p.thumbnail || p.variants?.[0]?.image || null;

                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>

                    <td>
                      {mainImage ? (
                        <img
                          src={`${STORAGE_URL}/${mainImage}`}
                          alt={p.name}
                          width="60"
                          height="60"
                          style={{ objectFit: "cover", borderRadius: 6 }}
                        />
                      ) : (
                        <div
                          className="bg-light text-center d-flex align-items-center justify-content-center"
                          style={{ width: 60, height: 60, borderRadius: 6 }}
                        >
                          No img
                        </div>
                      )}
                    </td>

                    <td className="fw-medium">{p.name}</td>
                    <td>{getCategoryName(p.category_id)}</td>

                    <td className="text-danger fw-bold">
                      {minPrice.toLocaleString("vi-VN")} ₫
                    </td>

                    <td>
                      {totalStock > 0 ? (
                        <span className="badge bg-success">{totalStock}</span>
                      ) : (
                        <span className="badge bg-danger">Hết hàng</span>
                      )}
                    </td>

                    <td>
                      {p.status === 1 ? (
                        <span className="badge bg-success">Hoạt động</span>
                      ) : (
                        <span className="badge bg-secondary">Ẩn</span>
                      )}
                    </td>

                    <td>
                      <Link
                        to={`/admin/products/${p.id}/edit`}
                        className="btn btn-sm btn-warning me-2"
                      >
                        Sửa
                      </Link>
                      <Link
                        to={`/admin/products/${p.id}/variants`}
                        className="btn btn-sm btn-info me-2"
                      >
                        Variant
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination mb-0">
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
