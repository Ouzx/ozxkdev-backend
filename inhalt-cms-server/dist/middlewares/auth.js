import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        if (token.startsWith("Bearer "))
            token = token.slice(7, token.length).trimLeft();
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("JWT_SECRET is not defined");
        const decoded = jwt.verify(token, secret);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
};
