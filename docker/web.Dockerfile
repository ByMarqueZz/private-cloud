# Usa una imagen base de Node.js para construir la aplicación
FROM node:21-alpine AS build

# Define el directorio de trabajo en el contenedor
WORKDIR /app/client

# Copia el package.json y el package-lock.json (o yarn.lock) a la carpeta de trabajo
COPY client/package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY client/ .

# Construye la aplicación React
RUN npm run build

# Usa una imagen base de nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de la construcción de la aplicación al directorio de nginx
COPY --from=build /app/client/build /usr/share/nginx/html

# Expone el puerto en el que nginx escuchará
EXPOSE 80

# Comando para iniciar nginx en modo primer plano
CMD ["nginx", "-g", "daemon off;"]