import mongoose from "mongoose";

const configOption = {
  useNewUrlParser: true,
  useunifiedTopology: true,
};

const connectToDB = async () => {
  const connectURL =
    "mongodb+srv://elheit1610:1610331999@cluster0.oqwbniy.mongodb.net/";

  mongoose
    .connect(connectURL, configOption)
    .then(() => console.log("ecomm database success"))
    .catch((err) => console.log("error to connect", err));
};

export default connectToDB;
