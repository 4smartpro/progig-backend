FROM node:18 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install || true

COPY . .

RUN npm run build

# Change ownership of the 'dist' folder to 'azureuser'
RUN chown -R azureuser:azureuser dist

# Switch to 'azureuser'
USER azureuser


FROM node:18 As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]

