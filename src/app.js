const express = require('express');
const Sentry = require('@sentry/node'); // Módulo de monitoreo
const app = express();
const librosRoutes = require('./routes/libros');

// 1. Inicializa Sentry ANTES de cualquier middleware o ruta
Sentry.init({
  dsn: process.env.SENTRY_DSN, // DSN cargado desde la variable de entorno
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// Middleware de Sentry para request tracing
app.use(Sentry.Handlers.requestHandler());

app.use(express.json());

app.get('/health', (req, res) => res.send('OK'));
app.use('/libros', librosRoutes);

// 2. El manejador de errores de Sentry DEBE ir DESPUÉS de tus rutas
app.use(Sentry.Handlers.errorHandler());

// Manejador de errores general opcional
app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}
