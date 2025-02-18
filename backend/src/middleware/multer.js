import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage }).fields([
  { name: "avatar", maxCount: 1 },
  { name: "post", maxCount: 3 },
]);

export default upload