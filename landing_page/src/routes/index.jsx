import { Routes, Route } from "react-router-dom";

/* ADMIN */
import AdminLayout from "../Admin/layouts/AdminLayout";
import Dashboard from "../Admin/pages/Dashboard";
import Categories from "../Admin/pages/Categories";
import Products from "../Admin/pages/Products";
import ProductCreate from "../Admin/pages/Products/Create";
import ProductEdit from "../Admin/pages/Products/Edit";

/* VARIANTS - Đúng đường dẫn */
import ProductVariants from "../Admin/pages/Products/Variants";
import VariantCreate from "../Admin/pages/Products/Variants/Create";
import VariantEdit from "../Admin/pages/Products/Variants/Edit";

import Orders from "../Admin/pages/Orders";
import ShippingProviders from "../Admin/pages/ShippingProviders";
import Payments from "../Admin/pages/Payments";
import PaymentLogs from "../Admin/pages/PaymentLogs";
import Users from "../Admin/pages/Users";
import UserAddresses from "../Admin/pages/UserAddresses";

/* CLIENT */
import ClientLayout from "../Client/layouts/ClientLayout";
import Home from "../Client/pages/Home";
import ProductList from "../Client/pages/Products/List";
import Cart from "../Client/pages/Cart";

/* AUTH */
import Login from "../Auth/Login";

/* GUARD */
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />

      {/* CLIENT */}
      <Route element={<ClientLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* ADMIN */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          {/* PRODUCTS */}
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<ProductCreate />} />
          <Route path="products/:id/edit" element={<ProductEdit />} />

          {/* PRODUCT VARIANTS - Đã sửa import đúng, route giữ nguyên */}
          <Route path="products/:id/variants" element={<ProductVariants />} />
          <Route
            path="products/:id/variants/create"
            element={<VariantCreate />}
          />
          <Route
            path="products/:id/variants/:variantId/edit"
            element={<VariantEdit />}
          />

          {/* OTHERS */}
          <Route path="orders" element={<Orders />} />
          <Route path="shipping-providers" element={<ShippingProviders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="payment-logs" element={<PaymentLogs />} />
          <Route path="users" element={<Users />} />
          <Route path="user-addresses" element={<UserAddresses />} />
        </Route>
      </Route>
    </Routes>
  );
}