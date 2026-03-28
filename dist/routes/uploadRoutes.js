import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { uploadFileHandler } from "../controllers/uploadController.js";
const router = Router();
const uploadFolder = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadFolder),
    filename: (_req, file, cb) => {
        const sanitized = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "-");
        const uniqueName = `${Date.now()}-${sanitized}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });
router.post("/", upload.single("file"), uploadFileHandler);
export default router;
