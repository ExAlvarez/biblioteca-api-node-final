# Biblioteca API (Node.js)

API REST básica para gestión de libros. Incluye endpoints CRUD, healthcheck, Docker y CI/CD con GitHub Actions.

## Comandos principales

```bash
npm install    # Instala dependencias
npm test       # Ejecuta los tests
npm start      # Inicia el servidor en http://localhost:3000
docker-compose up --build  # Ejecuta la app en contenedor
```

Endpoints principales:
- GET /health
- GET /libros
- GET /libros/:id
- POST /libros
- PUT /libros/:id
- PATCH /libros/:id
- DELETE /libros/:id
