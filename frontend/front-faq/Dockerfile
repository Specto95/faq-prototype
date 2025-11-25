FROM node:20-slim AS builder
WORKDIR /app

COPY package.json package-lock.json* .
RUN npm install

COPY . .
RUN npm run build

#IMPORTANT PARA QUE EL BUILD SEA STANDALONE (MENOS PESADO)
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# COPIAR SOLO LOS ARCHIVOS NECESARIOS PARA EJECUTAR LA APP
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
