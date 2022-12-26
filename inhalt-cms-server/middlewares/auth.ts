import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    const decoded = jwt.verify(token, secret);
    const _data = decoded as { id: string };
    const user = await User.findById(_data.id as string).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.body.user = user;
    // console.log(req.body.user);

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};
