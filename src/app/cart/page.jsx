"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

const Cart = () => {
  const {
    user,
    cartItems,
    setComponentLevelLoader,
    componentLevelLoader,
    setCartItems,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);
  const extractAllCartItems = async () => {
    setPageLevelLoader(true);
    const res = await getAllCartItems(user?._id);

    if (res.succes) {
      setCartItems(res.data);
      setPageLevelLoader(false);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }
  };
  const handleDeleteCartItem = async (getCartItemID) => {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    setComponentLevelLoader({ loading: false, id: "" });

    if (res.succes) {
      extractAllCartItems();
    }
  };
  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);
  if (pageLevelLoader)
    return (
      <div className="w-full  min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  return (
    <CommonCart
      componentLevelLoader={componentLevelLoader}
      handleDeleteCartItem={handleDeleteCartItem}
      cartItem={cartItems}
    />
  );
};

export default Cart;
