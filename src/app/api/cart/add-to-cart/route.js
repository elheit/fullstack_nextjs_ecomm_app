import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const addToCart = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { productId, userId } = data;

      const { error } = addToCart.validate({ productId, userId });

      if (error) {
        return NextResponse.json({
          succes: false,
          message: error.details[0].message,
        });
      }

      const isCurrentCartItemExists = await Cart.find({
        productId: productId,
        userId: userId,
      });
      // add to increase the value of items in cart
      if (isCurrentCartItemExists && isCurrentCartItemExists.length !== 0) {
        const updatedCart = await Cart.findOneAndUpdate(
          {
            _id: isCurrentCartItemExists[0]._id,
          },
          {
            ...data,
            quantity: isCurrentCartItemExists[0].quantity + 1,
          }
        );

        return NextResponse.json({
          succes: true,
          message: "Item increased",
        });
      }

      const saveProductToCart = await Cart.create(data);
     

      if (saveProductToCart) {
        return NextResponse.json({
          succes: true,
          message: "Product is Added to Cart",
        });
      } else {
        return NextResponse.json({
          succes: false,
          message: "Failed to add the product to cart",
        });
      }
    } else {
      return NextResponse.json({
        succes: false,
        message: "You're not authenticated",
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
