import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { iUser } from "../models/user.js";

/* Register */
export const register = async (req: Request, res: Response) => {
  try {
    const user = req.body as iUser;

    const userCount = await User.find({
      username: user.username,
    }).countDocuments();

    if (userCount > 0) throw new Error("User already exists");

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const newUser = new User(user);

    const _user = await newUser.save();
    res.status(201).json(_user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

/* Login */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as iUser;
    // use username in the query
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(404).json({ message: "Invalid username or password " });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid username or password " });

    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error("Unknown error J.23");
    const accessToken = jwt.sign({ id: user._id }, secret);

    res.status(200).json({ accessToken, user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

/* Validate Token */
export const validate = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error("Unknown error J.23");
    const decodedData = jwt.verify(token as string, secret);
    const _data = decodedData as { id: string };
    const user = await User.findById(_data.id as string).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};
