# Etapa 1: BUILD
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm install --production

# Etapa 2: RUNTIME (Imagen final optimizada)
FROM node:18-alpine
WORKDIR /app

# Copia las dependencias instaladas en la etapa 'build'
COPY --from=build /app/node_modules ./node_modules

# Copia todo el código fuente
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]
