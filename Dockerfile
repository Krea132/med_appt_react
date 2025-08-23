# Usa Node.js como base
FROM node:14

# Directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código
COPY . .

# Variables de entorno por defecto (pueden ser sobreescritas al hacer docker run)
# ENV PUBLIC_URL=.
# ENV REACT_APP_PUBLIC_URL=http://localhost:8080
# ENV PORT=3000
# ENV MONGO_URL=mongodb://host.docker.internal:27017/medical_app
# ENV JWT_SECRET=super-secret-local

# # Genera el build de producción
# RUN npm run build

# Expón el puerto
EXPOSE 3000

# Arranca el servidor
CMD ["npm", "start"]