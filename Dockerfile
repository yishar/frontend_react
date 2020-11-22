# Obtener la última version de nodejs
FROM node:latest
# Crear y Moverse para el directorio creado anteriormente "app"
RUN mkdir -p /src/app
WORKDIR /src/app
# Agregar el archivo package.json desde mi proyecto para el directorio en el docker
COPY package.json /src/app/
# Installar los paquetes de forma interna
RUN npm install && \
    npm install -g pushstate-server
# Copiar el resto de archivos de la aplicación
COPY . /src/app
# Por último correr el script
RUN npm run build
# Exponer puerto 3000
EXPOSE 3000
# Arrancar despues de iniciar el contenedor
CMD [ "npm", "run", "start:prod" ]