import { AppError } from "../utils/errors.js";
export const uploadFileHandler = async (req, res) => {
    const file = req.file;
    if (!file)
        throw new AppError("File upload failed", 400);
    const url = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    res.status(201).json({ url });
};
