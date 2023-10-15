import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id){
        return NextResponse.json({
          succes: false,
          message: "please Login In!",
        });}

      const extractAllCartItems = await Cart.find({ userId: id })
        .populate("productId")
        
      if (extractAllCartItems) {
        return NextResponse.json({
          succes: true,
          data: extractAllCartItems,
        });
      } else {
        return NextResponse.json({
          succes: false,
          message: "there is no products in Cart",
          status: 204,
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
