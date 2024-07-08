//react icons
import { TiDelete } from "react-icons/ti";
//context
import { useGlobalContext } from "../hooks/useGlobalContext";

function TableItem({ product }) {
  const { incrementAmount, decrementAmount, handleDelete } = useGlobalContext();
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex glass   rounded-btn items-center gap-3">
          <div className="avatar">
            <div
              className="  glass
             h-24 w-24"
            >
              <img src={product.thumbnail} />
            </div>
          </div>
          <div>
            <div className="font-bold text-slate-950">{product.title}</div>
            <div className="text-sm text-orange-800 font-bold">
              {product.brand}
            </div>
          </div>
        </div>
      </td>
      <td className="flex items-center justify-between pt-10">
        <div>${product.price}</div>
      </td>
      <td>
        <div className="flex items-center gap-3 pl-5">
          <button
            onClick={() => incrementAmount(product.id)}
            className="btn glass btn-sm "
          >
            +
          </button>
          <p>
            {product.amount == 0 ? handleDelete(product.id) : product.amount}
          </p>
          <button
            disabled={product.amount == 0 && true}
            onClick={() => decrementAmount(product.id)}
            className="btn glass btn-sm"
          >
            -
          </button>
        </div>
      </td>
      <th>
        <button
          onClick={() => handleDelete(product.id)}
          className="btn hover:text-red-500  glass hover:btn-ghost "
        >
          {" "}
          <TiDelete />
        </button>
      </th>
    </tr>
  );
}

export default TableItem;
