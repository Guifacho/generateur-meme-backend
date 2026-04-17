# 1. Image de base
FROM node:20-alpine AS builder

WORKDIR /app

# 2. Installation des dépendances
COPY package*.json ./
RUN npm install

# 3. Copie du code source
COPY . .



# 4. Build de l'application NestJS
RUN npm run build

# 5. Image de production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# On s'assure que le dossier uploads existe dans le conteneur
RUN mkdir -p uploads

EXPOSE 3000
CMD ["node", "dist/main"]