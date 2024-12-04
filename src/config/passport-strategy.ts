import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import prisma from "../prisma";
import { AppUser } from "src/types/types";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const user = await prisma.usuario.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: "Credenciales incorrectas" });
        }

        const userWithoutPassword = {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
        };
        return done(null, userWithoutPassword);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!user) {
      return done(null, false);
    }

    const appUser: AppUser = {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
    };

    done(null, appUser);
  } catch (error) {
    done(error);
  }
});

export default passport;
