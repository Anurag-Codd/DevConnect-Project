import express from "express";
import { createAndAssignTask, createProject, deleteProject, listMyProjects, updateProjectDetails } from "../controllers/project.js";
import authMiddlware from "../middleware/authorization.js";

const router = express.Router();

router.post("/new-project", authMiddlware, createProject);
router.post("/update-project/:projectId", authMiddlware, updateProjectDetails);
router.delete("/delete-project/:projectId", authMiddlware, deleteProject);
router.post("/new-task", authMiddlware, createAndAssignTask);
// router.post("/new-project", authMiddlware, createProject);
// router.post("/new-project", authMiddlware, createProject);
// router.post("/new-project", authMiddlware, createProject);
router.get("/project-list", authMiddlware, listMyProjects);

export default router;
