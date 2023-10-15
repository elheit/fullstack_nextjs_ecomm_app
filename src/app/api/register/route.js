import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();
  const { name, email, password, role } = await req.json();

  //validate schema

  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    console.log(error);
    return NextResponse.json({
      succes: false,
      message: error.details[0].message,
    });
  }

  try {
    //check if user is exist
    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return NextResponse.json({
        succes: false,
        message: "user is already Exist ",
      });
    } else {
      const hashPassword = await hash(password, 12);
      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });
      console.log(newlyCreatedUser)
      if (newlyCreatedUser) {
        return NextResponse.json({
          succes: true,
          message: "Account Created Successefuly ",
        })
      }
    }
  } catch (err) {
    console.log("error in new user regstritaion");

    return NextResponse.json({
      succes: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
