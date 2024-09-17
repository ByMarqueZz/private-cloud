# Usa una imagen base de Node.js
FROM node:18

# Define el directorio de trabajo en el contenedor
WORKDIR /app/server

# Copia el package.json y el package-lock.json (o yarn.lock) a la carpeta de trabajo
COPY server/package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY server/ .

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]