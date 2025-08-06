# Usa Node.js como base
FROM node:14

# Crea directorio de trabajo
WORKDIR /usr/src/app

# Copia dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el proyecto
COPY . .

# Expón el puerto 3000 (Express)
EXPOSE 3000

# Arranca el servidor (que sirve también frontend)
CMD ["npm", "start"]
