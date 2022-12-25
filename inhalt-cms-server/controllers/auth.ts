import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { iUser } from "../models/user.js";

/* Register */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, name, surname, email, password } = req.body as iUser;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      name,
      surname,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(201).json(user);
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
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Invalid Credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid Creadentials" });

    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error("JWT_SECRET is not defined");
    const accessToken = jwt.sign({ id: user._id }, secret);
    const tempUser = {
      username: user.username,
      name: user.name,
      surname: user.surname,
      email: user.email,
    };
    res.status(200).json({ accessToken, user: tempUser });
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
    if (!secret) throw new Error("JWT_SECRET is not defined");
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
