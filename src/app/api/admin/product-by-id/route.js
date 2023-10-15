import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");
    if (!productId) {
      return NextResponse.json({
        succes: false,
        status: 400,
        message: "ProductId not Found",
      });
    }

    const getData = await Product.find({ _id: productId });
    

    if (getData && getData.length) {
      return NextResponse.json({
        succes: true,
        data: getData[0],
      });
    } else {
      return NextResponse.json({
        succes: false,
        status: 204,
        message: "no Product Found",
      });
    }
  } catch (err) {
    console.log("error in new user regstritaion");

    return NextResponse.json({
      succes: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
