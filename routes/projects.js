const express = require("express")
const { body, validationResult, query } = require("express-validator")
const Project = require("../models/Project")
const auth = require("../middleware/auth")
const router = express.Router()

// Get all projects with filtering, sorting, and pagination
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
    query("category").optional().isIn(["Full-Stack", "Frontend", "Backend", "Mobile", "Desktop"]),
    query("featured").optional().isBoolean(),
    query("search").optional().isLength({ min: 1, max: 100 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const page = Number.parseInt(req.query.page) || 1
      const limit = Number.parseInt(req.query.limit) || 10
      const skip = (page - 1) * limit

      // Build filter object
      const filter = {}
      if (req.query.category) filter.category = req.query.category
      if (req.query.featured !== undefined) filter.featured = req.query.featured === "true"
      if (req.query.search) {
        filter.$text = { $search: req.query.search }
      }

      // Build sort object
      const sort = {}
      if (req.query.sort) {
        const sortField = req.query.sort.startsWith("-") ? req.query.sort.slice(1) : req.query.sort
        const sortOrder = req.query.sort.startsWith("-") ? -1 : 1
        sort[sortField] = sortOrder
      } else {
        sort.createdAt = -1 // Default sort by newest
      }

      const projects = await Project.find(filter).sort(sort).skip(skip).limit(limit).select("-__v")

      const total = await Project.countDocuments(filter)
      const totalPages = Math.ceil(total / limit)

      res.json({
        projects,
        pagination: {
          currentPage: page,
          totalPages,
          totalProjects: total,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      })
    } catch (error) {
      console.error("Error fetching projects:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Get featured projects
router.get("/featured", async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 }).limit(6).select("-__v")

    res.json({ projects })
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single project by slug
router.get("/:slug", async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug }).select("-__v")

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // Increment views
    project.views += 1
    await project.save()

    res.json({ project })
  } catch (error) {
    console.error("Error fetching project:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new project (Admin only)
router.post(
  "/",
  auth,
  [
    body("title")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Title is required and must be less than 100 characters"),
    body("description")
      .trim()
      .isLength({ min: 1, max: 500 })
      .withMessage("Description is required and must be less than 500 characters"),
    body("longDescription").trim().isLength({ min: 1 }).withMessage("Long description is required"),
    body("image").isURL().withMessage("Valid image URL is required"),
    body("technologies").isArray({ min: 1 }).withMessage("At least one technology is required"),
    body("category")
      .isIn(["Full-Stack", "Frontend", "Backend", "Mobile", "Desktop"])
      .withMessage("Valid category is required"),
    body("githubUrl").isURL().withMessage("Valid GitHub URL is required"),
    body("liveUrl").isURL().withMessage("Valid live URL is required"),
    body("startDate").isISO8601().withMessage("Valid start date is required"),
    body("duration").trim().isLength({ min: 1 }).withMessage("Duration is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const project = new Project(req.body)
      await project.save()

      res.status(201).json({
        message: "Project created successfully",
        project,
      })
    } catch (error) {
      console.error("Error creating project:", error)
      if (error.code === 11000) {
        return res.status(400).json({ message: "Project with this title already exists" })
      }
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Update project (Admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select(
      "-__v",
    )

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json({
      message: "Project updated successfully",
      project,
    })
  } catch (error) {
    console.error("Error updating project:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete project (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    res.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("Error deleting project:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Like project
router.post("/:id/like", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    project.likes += 1
    await project.save()

    res.json({
      message: "Project liked successfully",
      likes: project.likes,
    })
  } catch (error) {
    console.error("Error liking project:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
