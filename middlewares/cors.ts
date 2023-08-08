import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export const corsSettings = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.header("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "*");

	next();
};
