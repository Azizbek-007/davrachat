# Ma'lumotlar uchun bazaviy Docker image ni olish
FROM node:14

# Konteyner uchun kerakli papkalar / papkalarni yaratish
RUN mkdir -p /usr/src/app

# Ilovalar uchun papkani ishchi katalog sifatida tanlang
WORKDIR /usr/src/app

# Paketlar kiritiladi
COPY package*.json ./
RUN npm install

# Ilgari ishlab chiqilgan kodlar kiritiladi
COPY . .

# Konteynerni ishga tushirish buyruqlari
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]