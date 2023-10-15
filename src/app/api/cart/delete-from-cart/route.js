import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          succes: false,
          message: "Cart Id is required",
        });
      }

      const deleteCartItem = await Cart.findByIdAndDelete(id);

      if (deleteCartItem) {
        return NextResponse.json({
          succes: true,
          message: "Cart item deleted Succes",
        });
      } else {
        return NextResponse.json({
          succes: false,
          message: "Failed to Delete Cart Item",
          status: 204,
        });
      }
    } else {
      return NextResponse.json({
        succes: false,
        message: "you're not auth",
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
