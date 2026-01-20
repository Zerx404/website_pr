import { Outlet, Link } from "react-router-dom";

export default function ClientLayout() {
  return (
    <>
      <header>
        <Link to="/">Home</Link> |{" "}
        <Link to="/products">Products</Link> |{" "}
        <Link to="/cart">Cart</Link>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
