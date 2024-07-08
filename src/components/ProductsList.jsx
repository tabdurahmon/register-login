//rrd import
import { useLoaderData } from "react-router-dom";
//components
import Product from "./Product";

function ProductsList({ withibleProduct }) {
  const {
    products: { products },
  } = useLoaderData();

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
      {products.slice(0, withibleProduct).map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductsList;
