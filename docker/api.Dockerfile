# Usa una imagen base de Node.js
FROM node:21-alpine

# Define el directorio de trabajo en el contenedor
WORKDIR /app/server

# Copia el package.json y el package-lock.json (o yarn.lock) a la carpeta de trabajo
COPY server/package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Instala pm2 globalmente
RUN npm install -g pm2

# Copia el resto de los archivos del proyecto al contenedor
COPY server/ .

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Usa pm2 para iniciar la aplicación
CMD ["pm2-runtime", "private_cloud.js"]
