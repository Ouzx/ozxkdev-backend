import { Request, Response } from "express";

/* File */
export const byFile = async (req: Request, res: Response) => {
  try {
    const { file } = req;
    if (!file) throw new Error("Unknown error J.1");
    res.status(200).json({ file });
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};
