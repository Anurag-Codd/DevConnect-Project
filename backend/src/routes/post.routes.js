import express from "express";
import {
  addComment,
  addDislike,
  addLike,
  allPost,
  createPost,
  deletePost,
  removeComment,
} from "../controllers/post.js";
import upload from "../middleware/multer.js";
import authMiddlware from "../middleware/authorization.js";

const router = express.Router();

router.get("/all-post",authMiddlware, allPost);
router.post("/create-post", upload.single("asset"),authMiddlware, createPost);
router.delete("/delete-post/:id",authMiddlware, deletePost);
router.get("/like/:id",authMiddlware, addLike);
router.get("/dislike/:id",authMiddlware, addDislike);
router.post("/add-comment",authMiddlware, addComment);
router.delete("/remove-comment",authMiddlware, removeComment);

export default router;
