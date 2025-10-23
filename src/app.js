// src/app.js - VERSIÓN FINAL CORREGIDA
const express = require('express');
const app = express();
const librosRoutes = require('./routes/libros');

// 1. Declarar Sentry y Tracing (Fuera de cualquier 'if' para evitar 'not defined')
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

// Solo inicializa Sentry si la variable de entorno SENTRY_DSN está presente
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }), // Ahora Tracing está definido
    ],
    tracesSampleRate: 1.0,
  });

  // Middlewares de Sentry para Request/Tracing (DEBEN ir ANTES de las rutas)
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

app.use(express.json());

// Ruta de prueba de error
app.get('/error-test', (req, res) => {
  throw new Error("¡Error forzado de Sentry!");
});

app.get('/health', (req, res) => res.send('OK'));
app.use('/libros', librosRoutes);


// 4. Middlewares de Manejo de Errores (DEBEN ir ANTES del 'module.exports')

// Sentry solo se usa aquí si fue inicializado arriba
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Middleware genérico final para 404/otros errores no atrapados
app.use((req, res, next) => {
  res.status(404).send("Ruta no encontrada");
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}