import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);
    if (isAuthUser?.role === "Admin") {
      const extractdata = await req.json();
      const {
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      } = extractdata;
      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      });

      if (error) {
        return NextResponse.json({
          succes: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractdata);
      if (newlyCreatedProduct) {
        return NextResponse.json({
          succes: true,
          message: "Product Added Success ",
        });
      } else {
        return NextResponse.json({
          succes: false,
          message: "failed to add the product",
        });
      }
    } else {
      return NextResponse.json({
        succes: false,
        message: "you're not autorized",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      succes: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
