import { products } from "../../../mock/products.mock";

export default function ProductList() {
  return (
    <>
      <h1>Products</h1>
      {products.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </>
  );
}
