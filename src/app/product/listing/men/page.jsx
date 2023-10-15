import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";
import React from "react";

const MenAllProducts = async () => {
  const getAllProducts = await productByCategory("men");
  
  return <CommonListing data={getAllProducts && getAllProducts.data} />;
};

export default MenAllProducts;
