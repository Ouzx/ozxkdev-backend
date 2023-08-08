import dotenv from "dotenv";
dotenv.config();
export const corsSettings = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
};
//# sourceMappingURL=cors.js.map