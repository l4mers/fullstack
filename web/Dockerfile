FROM node:17-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
#ARG hemsidan
#ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
RUN npm run build
#EXPOSE 8080
#ARG REACT_APP_API_BASE_URL
#ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

RUN npm run build
#CMD ["npm", "run", "dev"]

FROM nginx:1.24.0-alpine

COPY --from=build /app/dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]

#FROM nginx:1.24.0-alpine
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*

#COPY --from=build /src/build .
#EXPOSE 8080
#CMD ["npm", "run", "dev"]
#ENTRYPOINT ["nginx", "-g", "deamon off;"]