import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(token, "default_secret_key");

    if (extractAuthUserInfo) return extractAuthUserInfo;
  } catch (e) {
    console.log(e);
  }

  console.log(token);
};

export default AuthUser;
