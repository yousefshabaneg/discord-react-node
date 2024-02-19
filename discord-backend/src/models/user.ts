import mongoose, { Document, Model } from "mongoose";
import bcryptjs from "bcryptjs";
import AppError from "../helpers/AppError";
import validator from "validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import custom from "../helpers/custom";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  correctPassword(candidatePassword: string): Promise<boolean>;
  generateToken(): Promise<string>;
  select(): any;
}

interface UserModel extends Model<IUser> {
  login: (email: string, password: string) => Promise<any>;
  verifyToken: (token: string) => Promise<JwtPayload>;
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

userSchema.statics.login = async (email, password) => {
  // check if user is exist.
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("User doest not exist", 404);

  // validate password.
  const checkPassword = await user.correctPassword(password);
  if (!checkPassword) throw new AppError("Wrong Password, try again...", 403);

  //delete password
  delete user.password;
  return user;
};

userSchema.methods.correctPassword = async function (
  candidatePassword: string
) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = async function () {
  const user = { email: this.email, id: this._id, _id: this._id };

  const token = jwt.sign({ user }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
  return token;
};

userSchema.statics.verifyToken = async function (token): Promise<JwtPayload> {
  if (!token) throw new AppError("Error: Token is required", 400);
  const decodedToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
  if (!decodedToken.user)
    throw new AppError("Error: User doest not exist", 404);

  return decodedToken;
};

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
