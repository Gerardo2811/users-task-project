import { TaskService } from "../services/tasks-service";
import { Request, Response } from "express";

export class TasksController {
  private tasksService: TaskService;

  constructor() {
    this.tasksService = new TaskService();
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      if (page < 1 || limit < 1) {
        res
          .status(400)
          .json({
            error: "Los valores de 'page' y 'limit' deben ser mayores a 0",
          });
        return;
      }

      const paginatedTasks = await this.tasksService.getAllTasks(page, limit);

      res.status(200).json({
        message: "Tareas obtenidas correctamente",
        data: paginatedTasks,
      });
    } catch (error: any) {
      console.error("Error al obtener tareas:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: "El ID proporcionado no es válido" });
        return;
      }

      const task = await this.tasksService.getTaskById(id);

      if (!task) {
        res
          .status(404)
          .json({ error: "No se encontró la tarea con el ID proporcionado" });
        return;
      }

      res.status(200).json({ message: "Tarea obtenida correctamente", task });
    } catch (error: any) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, userId, state } = req.body;
  
      if (!title || !description || !userId) {
        res
          .status(400)
          .json({
            error: "Todos los campos obligatorios deben ser proporcionados",
          });
        return;
      }
  
      const validStates = ["pendiente", "en_progreso", "completada"];
      if (state && !validStates.includes(state)) {
        res.status(400).json({
          error: "El estado proporcionado no es válido. Debe ser 'pendiente', 'en_progreso' o 'completada'.",
        });
        return;
      }
  
      const task = await this.tasksService.createTask(
        title,
        description,
        userId,
        state
      );
      res.status(201).json({ message: "Tarea creada con éxito", task });
    } catch (error: any) {
      if (error.message.includes("No se encontró el usuario")) {
        res.status(404).json({ error: error.message });
      } else {
        console.error("Error al crear la tarea:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }
  

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, state } = req.body;

      if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "El ID proporcionado no es válido" });
        return;
      }
  
      const validStates = ["pendiente", "en_progreso", "completada"];
      if (state && !validStates.includes(state)) {
        res.status(400).json({
          error:
            "El estado proporcionado no es válido. Debe ser 'pendiente', 'en_progreso' o 'completada'.",
        });
        return;
      }
  
      const updatedTask = await this.tasksService.updateTask(
        Number(id),
        title,
        description,
        state as "pendiente" | "en_progreso" | "completada" 
      );
  
      res
        .status(200)
        .json({ message: "Tarea actualizada con éxito", task: updatedTask });
    } catch (error: any) {
      if (error.message.includes("No se encontró la tarea")) {
        res.status(404).json({ error: error.message });
      } else {
        console.error("Error al actualizar la tarea:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }
  

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "El ID proporcionado no es válido" });
        return;
      }

      const deletedTask = await this.tasksService.deleteTask(Number(id));
      res
        .status(200)
        .json({ message: "Tarea eliminada con éxito", deletedTask });
    } catch (error: any) {
      if (error.message.includes("No se encontró la tarea")) {
        res.status(404).json({ error: error.message });
      } else {
        console.error("Error al eliminar la tarea:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  }
}
