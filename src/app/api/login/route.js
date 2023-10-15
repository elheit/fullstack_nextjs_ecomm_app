import connectToDB from "@/database";
import { compare } from "bcryptjs";
import Joi from "joi";
import User from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { email, password } = await req.json(); 

  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const checkuser = await User.findOne({ email });
    if (!checkuser) {
      return NextResponse.json({
        succes: false,
        message: "Account Not Found with This email",
      });
    }
    const checkPassword = await compare(password, checkuser.password);

    if (!checkPassword) {
      return NextResponse.json({
        succes: false,
        message: "Password Inccorect",
      });
    }

    const token = jwt.sign(
      {
        id: checkuser._id,
        email: checkuser?.email,
        role: checkuser?.role,
      },
      "default_secret_key",
      { expiresIn: "1d" }
    );
    const finalData = {
      token,
      User: {
        email: checkuser.email,
        name: checkuser.name,
        _id: checkuser._id,
        role: checkuser.role,
      },
    };

    return NextResponse.json({
      success: true,
      message: "Login successfull!",
      finalData,
    });
  } catch (e) {
    console.log("Error while logging In. Please try again");

    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
