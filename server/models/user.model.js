import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required."],
    },
    email: {
      type: String,
      required: [true, "email is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required."],
    },
    age: {
      type: Number,
      required: [true, "age is required."],
      min: [10, "age must be minimum 10."],
    },
  },
  { timestamps: true }
);

// encrypting the password
userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  try {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.methods.comparePassword = async function validatePassword(
  pswd,
  pswdDB
) {
  return await bcrypt.compare(pswd, pswdDB);
};

export const UserModel = mongoose.model("User", userSchema);
