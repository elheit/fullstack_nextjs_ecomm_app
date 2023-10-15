import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";
import React from "react";

const KidsAllProducts = async () => {
  const getAllProducts = await productByCategory("kids");
  return <CommonListing data={getAllProducts && getAllProducts.data} />;
};

export default KidsAllProducts;
