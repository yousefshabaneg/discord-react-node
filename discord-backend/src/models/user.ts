import mongoose, { Document, Model } from "mongoose";
import bcryptjs from "bcryptjs";
import AppError from "../helpers/AppError";
import validator from "validator";

interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

interface UserModel extends Model<IUser> {
  login: (email: string, password: string) => Promise<any>;
}

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide your email address"],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    username: {
      type: String,
      required: [true, "Please provide your username"],
    },
    password: {
      type: String,
      trim: true,
      minLength: 6,
      required: [true, "Please provide a password"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password!, 12);
  next();
});

(userSchema.statics.login = async (email, password) => {
  // check if user is exist.
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("User doest not exist", 404);

  // validate password.
  const checkPassword = await user.correctPassword(password, user.password!);
  if (!checkPassword) throw new AppError("Wrong Password, try again...", 403);

  //delete password
  delete user.password;
  return user;
}),
  (userSchema.methods.correctPassword = async function (
    candidatePassword: string,
    userPassword: string
  ) {
    return await bcryptjs.compare(candidatePassword, userPassword);
  });

userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  delete data.password;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
