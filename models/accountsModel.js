// Reference
// https://github.com/nextauthjs/next-auth/blob/935c4f2f826089c18f08c3c1a6cd663d77ecd26f/src/adapters/typeorm/models/account.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const accountsSchema = new Schema(
  {
    compoundId: {
      type: String,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    type: { type: String },
    provider: {
      type: String,
    },
    providerAccountId: {
      type: String,
    },
    access_token: {
      type: String,
    },
    token_type: {
      type: String,
    },
    scope: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userAccounts =
  mongoose.models.accounts || mongoose.model("accounts", accountsSchema);

export default userAccounts;
