import express from 'express';
import passport from 'passport';
import authRoutes from './routes/auth-routes';
import tasksRoutes from './routes/tasks-routes';
import './config/passport-strategy';
import "reflect-metadata";

const app = express();

app.use(express.json());

app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/tasks", tasksRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Ocurrió un error interno en el servidor',
  });
});

const startServer = async () => {
  try {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
