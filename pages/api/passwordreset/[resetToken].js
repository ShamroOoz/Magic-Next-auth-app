import User from "../../../models/userModel";
import connectDB from "@/lib/connectDB";
import crypto from "crypto";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return res.end("This is POST Method....");
  }

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.query.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid Token." });
    }
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    user.password = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Password Updated Success",
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong...." });
  }
};

export default connectDB(handler);
