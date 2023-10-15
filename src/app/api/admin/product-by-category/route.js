import connectToDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  
    
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const getData = await Product.find({ category: id });
    

    if (getData) {
      return NextResponse.json({
        succes: true,
        data: getData,
      });
    } else {
      console.log(error);
      return NextResponse.json({
        succes: false,
        status: 204,
        message: "no Item Found",
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
