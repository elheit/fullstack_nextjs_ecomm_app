import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";
import React from "react";

const AdminAllProducts = async () => {
  const allAdminProducts = await getAllAdminProducts();
  return <CommonListing data={allAdminProducts.data} />;
};

export default AdminAllProducts;
