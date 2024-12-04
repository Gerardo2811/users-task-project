import { Router } from "express";
import { TasksController } from "../controllers/tasks-controller";
import { authenticateToken } from "../middleware/authenticate-token";

const tasksController = new TasksController();

const router = Router();

router.get("/", authenticateToken, (req, res) =>
  tasksController.getAllTasks(req, res)
);
router.get("/:id", authenticateToken, (req, res) =>
  tasksController.getTaskById(req, res)
);
router.post("/", authenticateToken, async (req, res) => {
  await tasksController.createTask(req, res);
});
router.patch("/:id", authenticateToken, async (req, res) => {
  await tasksController.updateTask(req, res);
});
router.delete("/:id", authenticateToken, async (req, res) => {
  await tasksController.deleteTask(req, res);
});

export default router;
