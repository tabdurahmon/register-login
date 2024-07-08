import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <div className="card glass bg-slate-600">
      <Link to={`/singleProduct/${product.id}`} className="mx-auto">
        <img
          className="w-48 card glass border-r-8 lg:w-40"
          src={product.thumbnail}
          alt="car!"
        />
      </Link>
      <div className="card-body w-full">
        <h2 className=" text-center mb-4 font-bold  ">{product.title}</h2>
        <p className="text-center mb-6">{product.description} </p>
        <div className="card-actions justify-center ">
          <Link
            to={`/singleProduct/${product.id}`}
            type="button"
            className="btn btn-block "
          >
            Buy
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
