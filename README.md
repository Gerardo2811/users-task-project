
# Users Task Project

## Descripción

Este proyecto es una API RESTful para administrar una lista de tareas asociadas a usuarios. Está desarrollada con **Node.js**, **Express**, **TypeScript**, y utiliza autenticación JWT para proteger los endpoints.

## Requisitos previos

- **Docker** y **Docker Compose** instalados.

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Gerardo2811/users-task-project.git
   cd users-task-project
   ```

2. **Configuración del proyecto:**
   El archivo `.env` ya está incluido en este repositorio para simplificar la configuración y las pruebas del proyecto. No es necesario crear ni configurar uno manualmente en esta ocasión.


3. **Construir y levantar los contenedores con Docker:**
   ```bash
   docker-compose up --build
   ```

4. **Ejecutar migraciones con Prisma:**
   Una vez que los contenedores estén en ejecución, entra al contenedor de la aplicación y ejecuta las migraciones:
   ```bash
   npm run prisma:migrate
   ```

5. **Acceder a la aplicación:**
   La API estará disponible en `http://localhost:80`. ya que se usa Nginx como un servidor proxy entre express

---

## Endpoints

### **Autenticación**
- **POST** `/auth/register`: Registro de usuario.
  - **Body:**
    ```json
    {
      "name": "Nombre del usuario",
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **POST** `/auth/login`: Inicio de sesión.
  - **Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### **Tareas**
Para todos estos endpoint se requiere tomar el token generado en `/auth/login` y colocarlo en `Authorization` como un `Bearer Token`
- **GET** `/tasks`: Obtiene todas las tareas del usuario autenticado.
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer JWT_TOKEN"
    }
    ```

- **POST** `/tasks`: Crea una nueva tarea.
  - **Body:**
    ```json
    {
      "title": "Título de la tarea",
      "description": "Descripción de la tarea",
      "status": "pendiente"
    }
    ```

- **PUT** `/tasks/:id`: Actualiza una tarea específica.
  - **Body:**
    ```json
    {
      "title": "Nuevo título",
      "description": "Nueva descripción",
      "status": "completed"
    }
    ```

- **DELETE** `/tasks/:id`: Elimina una tarea específica.

---

## Comandos Útiles

- **Levantar el proyecto:**
  ```bash
  docker-compose up --build
  ```
- **Detener contenedores:**
  ```bash
  docker-compose down
  ```

---

## Notas

La API no incluye una documentación generada automáticamente. Usa herramientas como Postman para probar los endpoints.
