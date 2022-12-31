var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* File */
export const byFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image } = req.body;
        const response = { success: 0, file: { url: image } };
        if (!image)
            throw new Error(JSON.stringify(response));
        response.success = 1;
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
/* URL */
export const byURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image } = req.body;
        const response = { success: 0, file: { url: image } };
        if (!image)
            throw new Error(JSON.stringify(response));
        response.success = 1;
        res.status(200).json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
//# sourceMappingURL=image.js.map