"use client";

import { GlobalContext } from "@/context";
import { deleteProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";

import { useContext } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../ComponentLevelLoader";
import { addToCart } from "@/services/cart";

const ProductButton = ({ item }) => {
  const pathName = usePathname();
  const isAdminView = pathName.includes("admin-view");
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);
  const route = useRouter();

  const handleDeleteProduct = async (item) => {
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await deleteProduct(item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      route.refresh();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleAddToCart = async (getItem) => {
    setComponentLevelLoader({ loading: true, id: getItem._id });

    const res = await addToCart({ userId: user._id, productId: getItem._id });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  };

  return isAdminView ? (
    <>
      <button
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
        onClick={() => {
          setCurrentUpdatedProduct(item);
          route.push("/admin-view/add-product");
        }}
      >
        Update
      </button>
      <button
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
        onClick={() => handleDeleteProduct(item)}
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Delete"
        )}
      </button>
    </>
  ) : (
    <button
      onClick={() => handleAddToCart(item)}
      className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
    >
      {componentLevelLoader &&
      componentLevelLoader.loading &&
      componentLevelLoader.id === item._id ? (
        <ComponentLevelLoader
          text={"Adding to Cart"}
          color={"#ffffff"}
          loading={componentLevelLoader && componentLevelLoader.loading}
        />
      ) : (
        "Add To Cart"
      )}
    </button>
  );
};

export default ProductButton;
