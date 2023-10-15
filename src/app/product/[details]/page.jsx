import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";

const ProductDetails = async ({ params }) => {
  const productDetailsData = await productById(params.details);
  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
};

export default ProductDetails;
