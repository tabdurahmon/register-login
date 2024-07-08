//immer import
import { produce } from "immer";

//react import
import { createContext, useEffect, useReducer } from "react";

const stateFormLocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem("my-store")) || {
      user: null,
      isAuthReady: false,
      products: [],
      totalProducts: 0,
      totalPrice: 0,
    }
  );
};

export const GlobalContext = createContext();

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOG_IN":
      return { ...state, user: payload };
    case "LOG_OUT":
      return { ...state, user: null };
    case "IS_AUTH_READY":
      return { ...state, isAuthReady: true };
    case "ADD_PRODUCT":
      return { ...state, products: payload };
    case "TOTAL_PRODUCT_ADD":
      return { ...state, totalProducts: payload };
    default:
      return state;
  }
};

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, stateFormLocalStorage());

  const addToCart = (product) => {
    if (!state.products.length) {
      dispatch({ type: "ADD_PRODUCT", payload: [product] });
    } else {
      state.products.map((prod) => {
        if (prod.id === product.id) {
          const findeProduct = state.products.find(
            (prod) => prod.id === product.id
          );
          const updateAmount =
            (findeProduct.amount =
            findeProduct.amount +=
              product.amount);

          const updateAmounts = state.products.map((prod) => {
            if (prod.id == updateAmount.id) {
              return { ...prod, amount: updateAmount };
            } else {
              return prod;
            }
          });

          dispatch({
            type: "ADD_PRODUCT",
            payload: updateAmounts,
          });
        } else {
          dispatch({
            type: "ADD_PRODUCT",
            payload: [...state.products, product],
          });
        }
      });
    }
  };

  const incrementAmount = (id) => {
    function toggleTodo(state, id) {
      return produce(state, (draft) => {
        const product = draft.products.find((prod) => prod.id == id);
        product.amount += 1;
      });
    }

    const { products } = toggleTodo(state, id);
    dispatch({ type: "ADD_PRODUCT", payload: products });
  };

  const handleDelete = (id) => {
    const filteredProducts = state.products.filter((prod) => prod.id !== id);
    dispatch({ type: "ADD_PRODUCT", payload: filteredProducts });
  };

  useEffect(() => {
    localStorage.setItem("my-store", JSON.stringify(state));
  }, [state]);

  const decrementAmount = (id) => {
    function toggleTodo(state, id) {
      return produce(state, (draft) => {
        const product = draft.products.find((prod) => prod.id == id);
        product.amount -= 1;
      });
    }

    const { products } = toggleTodo(state, id);
    dispatch({ type: "ADD_PRODUCT", payload: products });
  };

  useEffect(() => {
    let totalCount = 0;

    state.products.forEach((product) => {
      totalCount = totalCount + product.amount;
    });

    dispatch({ type: "TOTAL_PRODUCT_ADD", payload: totalCount });
  }, [state.products]);
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
        addToCart,
        incrementAmount,
        decrementAmount,
        handleDelete,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
