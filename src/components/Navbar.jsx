"use client";

import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import { GlobalContext } from "@/context";
import CommonModal from "./CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "./CartModal";

//const isAdminView = false;

const NavItems = ({ isModalView = false, isAdminView, route }) => (
  <div
    className={`items-center justify-between w-full md:flex md:w-auto
    ${isModalView ? "" : "hidden"}`}
    id="NavItem"
  >
    <ul
      className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg
     md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
       isModalView ? "" : "border border-gray-100"
     }`}
    >
      {isAdminView
        ? adminNavOptions.map((item) => (
            <li
              className="cursor-pointer block py-2 pl-3 pr-4 text-gary-900 rounded md:p-0"
              key={item.id}
              onClick={() => route.push(item.path)}
            >
              {item.label}
            </li>
          ))
        : navOptions.map((item) => (
            <li
              key={item.id}
              onClick={() => route.push(item.path)}
              className="cursor-pointer block py-2 pl-3 pr-4 text-gary-900 rounded md:p-0"
            >
              {item.label}
            </li>
          ))}
    </ul>
  </div>
);

const Navbar = () => {
  const {
    showNavModal,
    setShowNavModal,
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  const pathName = usePathname();
  const route = useRouter();

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    ) {
      setCurrentUpdatedProduct(null);
    }
  }, [pathName]);

  const handleLogout = () => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    route.push("/");
  };
  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          <div
            onClick={() => route.push("/")}
            className="flex items-center cursor-pointer"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Ecommerce
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                  Account
                </button>
                <button
                  onClick={() => setShowCartModal(true)}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Cart
                </button>
              </Fragment>
            ) : null}
            {user?.role === "Admin" ? (
              isAdminView ? (
                <button
                  onClick={() => route.push("/")}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Client View
                </button>
              ) : (
                <button
                  onClick={() => route.push("/admin-view")}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Admin View
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                onClick={() => route.push("/login")}
              >
                Login
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => {
                showNavModal ? setShowNavModal(false) : setShowNavModal(true);
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems isAdminView={isAdminView} route={route} />
        </div>
      </nav>
      <CommonModal
        show={showNavModal}
        mainContent={
          <NavItems
            isModalView={true}
            route={route}
            isAdminView={isAdminView}
          />
        }
        setShow={setShowNavModal}
        showModalTitle={false}
      />
      {showCartModal && <CartModal />}
    </>
  );
};

export default Navbar;
