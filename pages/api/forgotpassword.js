import User from "../../models/userModel";
import connectDB from "@/lib/connectDB";
import nodemailer from "nodemailer";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.end("This is Post Method....");
  }

  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ error: "User not exists." });
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const message = user.getResetPasswordToken();

    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        resetPasswordToken: user.resetPasswordToken,
        resetPasswordExpire: user.resetPasswordExpire,
      }
    );

    const transporter = nodemailer.createTransport({
      service: process.env.GOOGLE_EMAIL_SERVER_HOST,
      auth: {
        user: process.env.GOOGLE_EMAIL_FROM,
        pass: process.env.GOOGLE_EMAIL_SERVER_PASSWORD,
      },
      secure: true,
    });

    try {
      await transporter.sendMail({
        from: `"⚡ Magic NextAuth" ${process.env.EMAIL_FROM}`,
        to: user.email,
        subject: "Password Reset Request 🎉",
        html: message,
      });

      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      console.log(error);
      await User.findByIdAndUpdate(
        { _id: user._id },
        {
          resetPasswordToken: undefined,
          resetPasswordExpire: undefined,
        }
      );
      return res.status(500).json({ error: "Email could not be sent" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Email could not be sent" });
  }
};

export default connectDB(handler);
