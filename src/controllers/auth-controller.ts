import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { AuthService } from "../services/auth-service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const existingUser = await this.authService.getUserByEmail(email);

      if (existingUser) {
        res.status(400).json({ error: "El email ya está registrado" });
        return;
      }

      if (!email || !password || !name) {
        res.status(400).json({ error: "Todos los campos son obligatorios" });
        return;
      }

      const user = await this.authService.registerUser(name, email, password);
      res.status(201).json({ message: "Usuario registrado con éxito", user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  login(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate(
      "local",
      { session: false },
      (
        err: Error | null,
        user: Express.User | false,
        info?: { message: string }
      ) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .status(401)
            .json({ error: info?.message || "Autenticación fallida" });
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET_KEY as string,
          { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Inicio de sesión exitoso", token });
      }
    )(req, res, next);
  }
}
