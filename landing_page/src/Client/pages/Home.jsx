import { Link, useNavigate } from "react-router-dom";
import { products } from "../../mock/products.mock";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg,#4f46e5,#9333ea)",
          color: "#fff",
          padding: "40px 24px",
          borderRadius: 12,
          marginBottom: 32,
        }}
      >
        <h1>Tech Store</h1>
        <p>Thiết bị công nghệ chính hãng – Giá tốt mỗi ngày</p>

        {/* 👉 đi tới trang sản phẩm */}
        <button
          onClick={() => navigate("/products")}
          style={{
            marginTop: 16,
            padding: "10px 20px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          Xem tất cả sản phẩm
        </button>
      </section>

      {/* FEATURE */}
      <section style={{ display: "flex", gap: 16, marginBottom: 32 }}>
        <Feature title="🚚 Giao nhanh" desc="Toàn quốc 24–48h" />
        <Feature title="💳 Thanh toán" desc="Online & COD" />
        <Feature title="🛡️ Bảo hành" desc="Chính hãng 12 tháng" />
      </section>

      {/* PRODUCTS */}
      <section>
        <h2>Sản phẩm nổi bật</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 16,
              }}
            >
              <div
                style={{
                  height: 120,
                  background: "#f3f4f6",
                  borderRadius: 6,
                  marginBottom: 12,
                }}
              />

              <h4>{p.name}</h4>
              <p style={{ color: "#ef4444", fontWeight: 600 }}>
                {p.price.toLocaleString()} đ
              </p>

              {/* 👉 đi tới trang chi tiết */}
              <Link
                to={`/products/${p.id}`}
                style={{
                  display: "block",
                  marginTop: 8,
                  textAlign: "center",
                  padding: "8px 0",
                  background: "#4f46e5",
                  color: "#fff",
                  borderRadius: 6,
                  textDecoration: "none",
                }}
              >
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>

        {/* 👉 đi tới giỏ hàng */}
        <div style={{ marginTop: 24 }}>
          <Link to="/cart">🛒 Xem giỏ hàng</Link>
        </div>
      </section>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div
      style={{
        flex: 1,
        background: "#f9fafb",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
