import prisma from "../prisma";

export class TaskService {
  async getAllTasks(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const tasks = await prisma.tarea.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalTasks = await prisma.tarea.count();

    return {
      tasks,
      totalTasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
    };
  }

  getTaskById(id: number) {
    return prisma.tarea.findUnique({ where: { id: id } });
  }

  async createTask(
    title: string,
    description: string,
    userId: number,
    state: "pendiente" | "en_progreso" | "completada" = "pendiente"
  ) {
    const existingUser = await prisma.usuario.findUnique({
      where: { id: userId },
    });
  
    if (!existingUser) {
      throw new Error(`No se encontró el usuario con el ID ${userId}`);
    }
  
    return prisma.tarea.create({
      data: {
        titulo: title,
        descripcion: description,
        estado: state,
        usuarioId: userId,
      },
    });
  }
  

  async updateTask(
    id: number,
    title?: string,
    description?: string,
    state?: "pendiente" | "en_progreso" | "completada"
  ) {
    const existingTask = await prisma.tarea.findUnique({
      where: { id: id },
    });
  
    if (!existingTask) {
      throw new Error(`No se encontró la tarea con el ID ${id}`);
    }
  
    return prisma.tarea.update({
      data: {
        ...(title && { titulo: title }),
        ...(description && { descripcion: description }),
        ...(state && { estado: state }),
        updatedAt: new Date(),
      },
      where: { id: id },
    });
  }
  
  async deleteTask(id: number) {
    const existingTask = await prisma.tarea.findUnique({where: {id: id}});

    if (!existingTask) {
      throw new Error(`No se encontró la tarea con el ID ${id}`);
    }

    return prisma.tarea.delete({ where: { id: id } });
  }
}
