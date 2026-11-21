# Imagen del portfolio: build estático con Node y servido por nginx.
# Patrón multistage de la bóveda (compilar con Node -> servir con nginx).
# Compatible con arm64: ambas imágenes base son multi-arquitectura.

FROM node:22 AS build

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /opt/app/dist/portfolio/browser/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
