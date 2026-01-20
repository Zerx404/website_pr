import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo/logo.png";
import "../../assets/styles/admin.css";


export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1200);
  const [productMenuOpen, setProductMenuOpen] = useState(true);

  // Responsive: tự đóng sidebar khi màn hình nhỏ
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="app">
      {/* SIDEBAR */}
      <div id="sidebar" className={sidebarOpen ? "active" : ""}>
        <div className="sidebar-wrapper active">
          {/* HEADER */}
          <div className="sidebar-header">
            <div className="d-flex justify-content-between">
              <div className="logo">
                <NavLink to="/admin">
                  <img src={logo} alt="Logo" />
                </NavLink>
              </div>

              {/* Close sidebar (mobile) */}
              <button
                className="sidebar-hide d-xl-none d-block"
                onClick={() => setSidebarOpen(false)}
              >
                <i className="bi bi-x bi-middle"></i>
              </button>
            </div>
          </div>

          {/* MENU */}
          <div className="sidebar-menu">
            <ul className="menu">
              <li className="sidebar-title">Danh mục</li>

              {/* Dashboard */}
              <li className="sidebar-item">
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    "sidebar-link" + (isActive ? " active" : "")
                  }
                >
                  <i className="bi bi-grid-fill"></i>
                  <span>Bảng điều khiển</span>
                </NavLink>
              </li>

              {/* SẢN PHẨM - SUB MENU */}
              <li
                className={`sidebar-item has-sub ${
                  productMenuOpen ? "active" : ""
                }`}
              >
                <a
                  href="#"
                  className="sidebar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setProductMenuOpen(!productMenuOpen);
                  }}
                >
                  <i className="bi bi-box-seam"></i>
                  <span>Sản phẩm</span>
                </a>

                <ul
                  className={`submenu ${productMenuOpen ? "active" : ""}`}
                >
                  <li className="submenu-item">
                    <NavLink
                      to="/admin/products"
                      className={({ isActive }) =>
                        isActive ? "active" : ""
                      }
                    >
                      Danh sách sản phẩm
                    </NavLink>
                  </li>

                  <li className="submenu-item">
                    <NavLink
                      to="/admin/products/create"
                      className={({ isActive }) =>
                        isActive ? "active" : ""
                      }
                    >
                      Thêm sản phẩm
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Danh mục sản phẩm */}
              <li className="sidebar-item">
                <NavLink
                  to="/admin/categories"
                  className={({ isActive }) =>
                    "sidebar-link" + (isActive ? " active" : "")
                  }
                >
                  <i className="bi bi-tags-fill"></i>
                  <span>Danh mục sản phẩm</span>
                </NavLink>
              </li>

              {/* Đơn hàng */}
              <li className="sidebar-item">
                <NavLink
                  to="/admin/orders"
                  className={({ isActive }) =>
                    "sidebar-link" + (isActive ? " active" : "")
                  }
                >
                  <i className="bi bi-cart-check-fill"></i>
                  <span>Đơn hàng</span>
                </NavLink>
              </li>

              {/* Người dùng */}
              <li className="sidebar-item">
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    "sidebar-link" + (isActive ? " active" : "")
                  }
                >
                  <i className="bi bi-people-fill"></i>
                  <span>Người dùng</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div id="main">
        <header className="mb-3">
          {/* Open sidebar (mobile) */}
          <button
            className="burger-btn d-block d-xl-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="bi bi-justify fs-3"></i>
          </button>
        </header>

        <div className="page-content">
          <Outlet />
        </div>

        <footer>
          <div className="footer clearfix mb-0 text-muted">
            <div className="float-start">
              <p>2026 © Quản trị hệ thống</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}