"use client";

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import ComponentLevelLoader from "../ComponentLevelLoader";
import { useRouter } from "next/navigation";

const CartModal = () => {
  const {
    showCartModal,
    setComponentLevelLoader,
    componentLevelLoader,
    setShowCartModal,
    user,
    cartItems,
    setCartItems,
  } = useContext(GlobalContext);
  const route = useRouter();
  const extractAllCartItems = async () => {
    const res = await getAllCartItems(user?._id);

    if (res.succes) {
      setCartItems(res.data);

      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }
  };
  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  const handleDeleteCartItem = async (getCartItemID) => {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    setComponentLevelLoader({ loading: false, id: "" });

    if (res.succes) {
      extractAllCartItems();
    }
  };
  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="my-6 divide-y divide-gray-300">
            {cartItems.map((item) => (
              <li key={item._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    className="h-full w-full object-cover object-center"
                    alt="Cart Item"
                    src={item && item.productId && item.productId.imageUrl}
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>{item && item.productId && item.productId.name} </a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      $
                      {item &&
                        item.productId &&
                        item.productId.price * item.quantity}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Quantity : {item && item.productId && item.quantity}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      onClick={() => handleDeleteCartItem(item._id)}
                      className="font-medium text-yellow-600 sm:order-2"
                      type="button"
                    >
                      {componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id === item._id ? (
                        <ComponentLevelLoader
                          text={"Removing"}
                          color={"#000000"}
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            onClick={() => {
              route.push("/cart");
              setShowCartModal(false);
            }}
            type="button"
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Go To Cart
          </button>
          <button
            disabled={cartItems && cartItems.length === 0}
            type="button"
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
          >
            CheckOut
          </button>
        </Fragment>
      }
    />
  );
};

export default CartModal;
