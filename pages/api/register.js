import User from "../../models/userModel";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.end("This is Post Method....");
  }

  let { email, password } = req.body;

  const uri = process.env.MONGODB_URI;
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to MongoDB");
    }
  );

  try {
    const user = await User.findOne({ email: email });
    if (user)
      return res.status(403).json({ error: "The email already exists." });
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      password: passwordHash,
    });
    await newUser.save();
    return res.json({ msg: "Sign up Success", data: newUser });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err.message });
  }
};
