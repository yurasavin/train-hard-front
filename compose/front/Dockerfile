FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /www/dist
COPY ./compose/nginx/conf.d /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]