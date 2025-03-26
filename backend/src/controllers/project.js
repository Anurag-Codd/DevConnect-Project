import Project from "../models/project.model.js";
import Task from "../models/task.model.js";

export const createProject = async (req, res) => {
  const userId = req.id;
  const { title, description, techStack, github_repo } = req.body;

  if (!title || !description || !techStack || !github_repo) {
    return res
      .status(400)
      .json({ message: "All fields are required to create a project." });
  }

  const transformTechStack = techStack
    ?.split(",")
    .map((item) => item.trim().toUpperCase());
  try {
    const project = await Project.create({
      admin: userId,
      title,
      description,
      techStack: transformTechStack,
      githubRepo: github_repo,
    });

    console.log(project);

    return res
      .status(201)
      .json({ message: "Project created successfully", project });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProjectDetails = async (req, res) => {
  const userId = req.id;
  const { projectId } = req.params;
  const { title, description, techStack, github } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.admin !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    if (!title && !description && !techStack && !github) {
      return res
        .status(400)
        .json({ message: "Provide at least one field to update" });
    }
    const transformTechStack = techStack
      ?.split(",")
      .map((tech) => tech.trim().toUpperCase());

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        title,
        description,
        techStack: transformTechStack,
        githubRepo: github,
      },
      { new: true }
    );

    return res.status(201).json({ message: "project updated", updatedProject });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const deleteProject = async (req, res) => {
  const userId = req.id;
  const { projectId } = req.params;

  try {
    const project = await Project.findOne({ _id: projectId, admin: userId });

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized" });
    }

    await Project.findByIdAndDelete(projectId);

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const createAndAssignTask = async (req, res) => {
  const userId = req.id;
  const { projectId } = req.params;
  const { content, assignedTo } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project || project.admin !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized or invalid project" });
    }

    if (!content || !assignedTo) {
      return res
        .status(400)
        .json({ message: "Task content and assignee required" });
    }

    const newTask = await Task.create({ content, assignedTo });

    project.tasks.push(newTask._id);
    await project.save();

    return res
      .status(201)
      .json({ message: "Task created & assigned", newTask });
  } catch (error) {
    console.error("Error creating task:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// export const updateTask = async (req, res) => {};

// export const deleteTask = async (req, res) => {};

// export const taskQueryChat = async (req, res) => {};

export const listMyProjects = async (req, res) => {
  const userId = req.id;
  try {
    const ProjectAdmin = await Project.find({ admin: userId })
      .populate("admin members tasks")
      .lean();
    const ProjectMember = await Project.find({ members: userId })
      .populate("admin members tasks")
      .lean();

    res.status(200).json({
      message: "projects data fetched successfully",
      admin: ProjectAdmin || [],
      member: ProjectMember || [],
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
