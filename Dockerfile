# Asosiy ima'gimizni tanlaymiz
FROM node:18

# Ish kunimizni joylash uchun direktoriya yaratamiz
WORKDIR /app

# Kerakli modullarni kochirib olish
COPY package*.json ./
RUN npm install

# Qolgan barcha fayllarni konteynerga ko'chirib olish
COPY . .

# Portni ochamiz
EXPOSE 3000

# Ishga tushuramiz
CMD ["npm", "run", "start:prod"]
