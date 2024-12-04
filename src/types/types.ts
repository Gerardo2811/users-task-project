export interface User {
  id: number;
  email: string;
  password: string;
  nombre: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  nombre: string;
  token: string;
}
export interface Task {
  id: number;
  title: string;
  description: string;
  status: "pendiente" | "en_progreso" | "completada";
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
}


export interface AppUser {
    id: number;
    email: string;
    nombre: string;
  }

declare global {
    namespace Express {
      interface User extends AppUser {}
    }
  }
