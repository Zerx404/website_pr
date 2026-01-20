import { useNavigate } from "react-router-dom";
import { products } from "../../mock/products.mock";
import ReactApexChart from "react-apexcharts";

export default function Dashboard() {
  const navigate = useNavigate();

  // Biểu đồ Lượt truy cập (bar chart) - Giữ nguyên
  const luotTruyCapOptions = {
    chart: { type: "bar", height: 350, toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 4, horizontal: false, columnWidth: "55%" } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    colors: ["#6366f1"],
    xaxis: {
      categories: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
    },
    yaxis: { title: { text: undefined } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val) => `${val} lượt truy cập` } },
  };

  const luotTruyCapSeries = [{ name: "Lượt truy cập", data: [8, 16, 32, 24, 16, 24, 32, 24, 16, 24, 32, 24] }];

  // Sparkline cho các tỉnh thành lớn sau sáp nhập
  const sparklineOptions = (color) => ({
    chart: { type: "area", sparkline: { enabled: true } },
    stroke: { curve: "smooth", width: 2 },
    colors: [color],
    fill: { opacity: 0.3 },
  });

  // Dữ liệu mẫu sau sáp nhập (tăng lượt truy cập ở Miền Nam do đô thị lớn)
  const mienBacSeries = [{ data: [20, 25, 18, 22, 19, 21, 23, 20, 18, 22, 20, 19] }];
  const mienTrungSeries = [{ data: [15, 18, 14, 16, 13, 15, 17, 14, 12, 16, 15, 14] }];
  const mienNamSeries = [{ data: [45, 50, 42, 48, 45, 52, 60, 55, 50, 58, 55, 52] }]; // Tăng cao do TP.HCM + ĐBSCL hợp nhất

  // Pie chart Thành phần khách truy cập
  const pieOptions = {
    chart: { type: "donut", height: 220 },
    colors: ["#6366f1", "#a5b4fc"],
    labels: ["Nam", "Nữ"],
    legend: { show: false },
    dataLabels: { enabled: false },
  };

  const pieSeries = [70.8, 29.2];

  return (
    <div className="page-heading">
      <h3 className="mb-4 fw-bold">Bảng điều khiển</h3>

      <div className="row g-4">
        {/* Sản phẩm */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card stats-card border-0 rounded-4 shadow-sm overflow-hidden"
            onClick={() => navigate("/admin/products")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body p-4 d-flex align-items-center">
              <div className="stats-icon purple rounded-3 me-4 d-flex align-items-center justify-content-center">
                <i className="bi bi-box-seam fs-2"></i>
              </div>
              <div>
                <p className="text-muted mb-1 small fw-medium">Sản phẩm</p>
                <h4 className="fw-bold mb-0">{products.length}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Đơn hàng */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card stats-card border-0 rounded-4 shadow-sm overflow-hidden"
            onClick={() => navigate("/admin/orders")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body p-4 d-flex align-items-center">
              <div className="stats-icon blue rounded-3 me-4 d-flex align-items-center justify-content-center">
                <i className="bi bi-cart-check fs-2"></i>
              </div>
              <div>
                <p className="text-muted mb-1 small fw-medium">Đơn hàng</p>
                <h4 className="fw-bold mb-0">24</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Doanh thu */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card stats-card border-0 rounded-4 shadow-sm"
            onClick={() => navigate("/admin/payments")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body p-4 d-flex align-items-center">
              <div className="stats-icon green rounded-3 me-4 d-flex align-items-center justify-content-center">
                <i className="bi bi-cash-stack fs-2"></i>
              </div>
              <div>
                <p className="text-muted mb-1 small fw-medium">Doanh thu</p>
                <h4 className="fw-bold mb-0">120.000.000 đ</h4>
              </div>
            </div>
          </div>
        </div>
        {/* Người dùng */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card stats-card border-0 rounded-4 shadow-sm overflow-hidden"
            onClick={() => navigate("/admin/users")}
            style={{ cursor: "pointer" }}
          >
            <div className="card-body p-4 d-flex align-items-center">
              <div className="stats-icon red rounded-3 me-4 d-flex align-items-center justify-content-center">
                <i className="bi bi-people-fill fs-2"></i>
              </div>
              <div>
                <p className="text-muted mb-1 small fw-medium">Người dùng</p>
                <h4 className="fw-bold mb-0">18</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phần biểu đồ */}
      <div className="row g-4">
        {/* Lượt truy cập - Biểu đồ cột */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-0 pb-0">
              <h5 className="card-title mb-0 fw-semibold">Lượt truy cập</h5>
            </div>
            <div className="card-body">
              <ReactApexChart options={luotTruyCapOptions} series={luotTruyCapSeries} type="bar" height={350} />
            </div>
          </div>
        </div>

        {/* Tin nhắn gần đây */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white border-0 pb-0">
              <h5 className="card-title mb-0 fw-semibold">Tin nhắn gần đây</h5>
            </div>
            <div className="card-body p-0">
              {/* ... (giữ nguyên phần tin nhắn như trước) ... */}
              <div className="d-flex px-4 py-3 border-bottom align-items-center">
                <div className="avatar bg-success text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px" }}>
                  HS
                </div>
                <div>
                  <h6 className="mb-0">Hank Schrader</h6>
                  <small className="text-muted">@johnducky</small>
                </div>
              </div>
              {/* Các tin nhắn khác */}
              <div className="p-4">
                <button className="btn btn-primary w-100">Bắt đầu trò chuyện</button>
              </div>
            </div>
          </div>
        </div>

        {/* Phần dưới: Lượt truy cập theo khu vực (sau sáp nhập) */}
        <div className="col-12">
          <div className="row g-4">
            {/* Lượt truy cập theo khu vực lớn sau sáp nhập */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-header bg-white border-0 pb-0">
                  <h5 className="card-title mb-0 fw-semibold">Lượt truy cập theo khu vực (sau sáp nhập 2025)</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="text-primary">● Miền Bắc</span>
                      <h6 className="mb-0">862</h6>
                    </div>
                    <ReactApexChart options={sparklineOptions("#6366f1")} series={mienBacSeries} type="area" height={80} width={120} />
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="text-success">● Miền Trung</span>
                      <h6 className="mb-0">375</h6>
                    </div>
                    <ReactApexChart options={sparklineOptions("#10b981")} series={mienTrungSeries} type="area" height={80} width={120} />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className="text-danger">● Miền Nam</span>
                      <h6 className="mb-0">1025</h6>
                    </div>
                    <ReactApexChart options={sparklineOptions("#ef4444")} series={mienNamSeries} type="area" height={80} width={120} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bình luận mới nhất */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-header bg-white border-0 pb-0">
                  <h5 className="card-title mb-0 fw-semibold">Bình luận mới nhất</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-start mb-4">
                    <div className="avatar bg-purple text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                      SC
                    </div>
                    <div>
                      <strong>Si Cantik</strong>
                      <p className="mb-0 text-muted small">Chúc mừng tốt nghiệp nhé!</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <div className="avatar bg-dark text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                      SG
                    </div>
                    <div>
                      <strong>Si Ganteng</strong>
                      <p className="mb-0 text-muted small">Thiết kế tuyệt vời! Bạn có thể làm thêm hướng dẫn cho thiết kế này không?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thành phần khách truy cập */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-header bg-white border-0 pb-0">
                  <h5 className="card-title mb-0 fw-semibold">Thành phần khách truy cập</h5>
                </div>
                <div className="card-body text-center">
                  <ReactApexChart options={pieOptions} series={pieSeries} type="donut" height={220} />
                  <div className="mt-3">
                    <span className="badge bg-primary me-2">Nam 70.8%</span>
                    <span className="badge bg-info">Nữ 29.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}