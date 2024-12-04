import prisma from '../prisma';
import bcrypt from 'bcryptjs'

export class AuthService {
  async registerUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.usuario.create({
      data: {
        nombre: name,
        email,
        password: hashedPassword,
      },
    });
  }

  async getUserByEmail(email: string) {
    return prisma.usuario.findUnique({
      where: { email },
    });
  }
}
