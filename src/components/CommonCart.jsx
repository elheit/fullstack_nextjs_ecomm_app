"use client";

import ComponentLevelLoader from "./ComponentLevelLoader";

const CommonCart = ({
  cartItem = [],
  handleDeleteCartItem,
  componentLevelLoader,
}) => {
  return (
    <section className="h-screen bg-gray-100 ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow ">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {cartItem && cartItem.length ? (
                  <ul className="-my-8 ">
                    {cartItem.map((item) => (
                      <li
                        key={item._id}
                        className="flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0 ">
                          <img
                            src={
                              item && item.productId && item.productId.imageUrl
                            }
                            alt="Cart image"
                            className="h-24 w-25 max-w-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-4">
                              <p className="text-base font-semibold text-gary-900">
                                {item && item.productId && item.productId.name}
                              </p>
                            </div>
                            <div className=" mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gary-950 sm:order-1 sm:ml-8 sm:text-right">
                                $
                                {item &&
                                  item.productId &&
                                  item.productId.price * item.quantity}
                              </p>
                              <p className="shrink-0 w-20 text-base font-semibold text-gary-950 sm:order-1 sm:ml-8 sm:text-right">
                                Quantity:{item && item.quantity}
                              </p>
                              <button
                                onClick={() => handleDeleteCartItem(item._id)}
                                type="button"
                                className="font-medium text-yellow-700 sm:order-2"
                              >
                                {componentLevelLoader &&
                                componentLevelLoader.loading &&
                                componentLevelLoader.id === item._id ? (
                                  <ComponentLevelLoader
                                    text={"Removing"}
                                    color={
                                      "rgb(161 98 7 / var(--tw-text-opacity))"
                                    }
                                    loading={
                                      componentLevelLoader &&
                                      componentLevelLoader.loading
                                    }
                                  />
                                ) : (
                                  "Remove"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-lg ">Your Cart is empty !</h1>
                )}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between ">
                  <p className="text-sm text-gray-400 "> Subtotal:</p>
                  <p className="text-lg text-black font-semibold">
                    $
                    {cartItem && cartItem.length
                      ? cartItem.reduce(
                          (total, item) =>
                            item.productId.price * item.quantity + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="flex items-center justify-between ">
                  <p className="text-sm text-gray-400 "> Shipping:</p>
                  <p className="text-lg text-black font-semibold">$0</p>
                </div>
                <div className="flex items-center justify-between ">
                  <p className="text-sm text-gray-400 "> Total:</p>
                  <p className="text-lg text-black font-semibold">
                    $
                    {cartItem && cartItem.length
                      ? cartItem.reduce(
                          (total, item) =>
                            item.productId.price * item.quantity + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="mt-5 text-center ">
                  <button
                    disabled={!(cartItem && cartItem.length)}
                    className="group inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide disabled:opacity-50"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonCart;
