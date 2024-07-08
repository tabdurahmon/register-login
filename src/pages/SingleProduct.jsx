//costum Fetch
import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
//import react
import { useState } from "react";

//Loader
export const loader = async ({ params }) => {
  const requset = await customFetch(`${params.id}`);
  const product = requset.data;

  return { product };
};

//global context
import { useGlobalContext } from "../hooks/useGlobalContext";

function SingleProduct() {
  const { addToCart } = useGlobalContext();
  const { product } = useLoaderData();
  // console.log(product)

  const [amount, setAmount] = useState(0);

  const handleAddToCart = () => {
    const newProduct = {
      ...product,
      amount,
    };
    addToCart(newProduct);
  };

  return (
    <div className="h-lvh p-12">
      <div className="card card-side  shadow-xl">
        <figure className=" ">
          <img
            className="md:max-w-[400px] glass card  lg:max-w-[500px]"
            src={product.thumbnail}
          />
        </figure>
        <div className="flex flex-col justify-between  py-10">
          <div className="px-10">
            <h2 className="md:text-xl lg:w-full font-serif font-bold text-4xl text-center text-zinc-950 mb-10">
              {product.title}
            </h2>
            <p className="text-center text-lime-600 w-full mb-10 italic">
              {product.description}
            </p>

            <div className="bg-slate-200 flex gap-6 p-5 rounded-[25px] mb-10">
              <p className="font-semibold font-serif ">Price:</p>
              <p className="text-red-900 font-bold flex gap-10">
                {product.price}$
              </p>
            </div>
          </div>
          <div className="card-actions justify-center items-center bg-base-300 rounded-xl  py-3">
            <button
              onClick={() => setAmount((prev) => (prev += 1))}
              className="btn w-10 glass bg-slate-300 text-xl font-serif ml-7 font-semibold"
            >
              +
            </button>
            <p className="mx-5 font-serif fontsem select-none">{amount}</p>
            <button
              disabled={amount == 0 && true}
              onClick={() => setAmount((prev) => (prev -= 1))}
              className="btn w-10 glass bg-slate-300 text-xl  font-serif "
            >
              -
            </button>
            <button
              onClick={handleAddToCart}
              className="btn glass ml-auto mr-4   w-30 "
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
