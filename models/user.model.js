import mongoose from "mongoose";

const UserModel = mongoose.Schema({
  user: { type: String, trim: true },
  email: { type: String, trim: true },
  password: { type: String, trim: true },
  notes: [
    {
      title: String,
      content: String,
      color: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("User", UserModel);
