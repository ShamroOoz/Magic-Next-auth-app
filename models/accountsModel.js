// Reference
// https://github.com/nextauthjs/next-auth/blob/935c4f2f826089c18f08c3c1a6cd663d77ecd26f/src/adapters/typeorm/models/account.js
//https://github.com/nextauthjs/next-auth/issues/296#issuecomment-647113363
//https://github.com/nextauthjs/next-auth/issues/230#issuecomment-1036440563
import mongoose from "mongoose";
const { Schema } = mongoose;

const accountsSchema = new Schema(
  {
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
    expires_at: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const userAccounts =
  mongoose.models.accounts || mongoose.model("accounts", accountsSchema);

export default userAccounts;
