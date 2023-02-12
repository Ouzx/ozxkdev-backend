import { Request, Response } from "express";

export const byFile = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    const response = { success: 0, file: { url: image } };
    if (!image) throw new Error(JSON.stringify(response));
    response.success = 1;
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};
