import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "Admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Id not Found",
        });
      }
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: "Deleted Succes",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Delete Failed",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You're not authontiqated as a admin",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
