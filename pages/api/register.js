import User from "../../models/userModel";
import bcrypt from "bcrypt";
import connectDB from "@/lib/connectDB";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.end("This is Post Method....");
  }

  let { email, password } = req.body;

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

export default connectDB(handler);
