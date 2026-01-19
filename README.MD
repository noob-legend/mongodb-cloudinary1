# Photo Upload API (Express + MongoDB + Cloudinary)

Backend REST API sederhana untuk mengelola data foto dengan fitur:

- Upload gambar menggunakan **Multer**
- Penyimpanan gambar ke **Cloudinary**
- Penyimpanan metadata ke **MongoDB**
- CRUD Photo (Create, Read, Update, Delete)

Project ini dibuat untuk memperkuat skill backend Node.js dan menambah jam terbang.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Multer
- Cloudinary
- dotenv

---

## 📂 Struktur Folder

server/
├── config/
│ └── cloudinary.js
├── controllers/
│ └── photoController.js
├── models/
│ └── Photo.js
├── routes/
│ └── photoRoutes.js
├── middleware/
│ └── upload.js
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md

yaml
Salin kode

---

## ⚙️ Environment Variables

Buat file `.env` di root folder `server`:

````env
PORT=5000
MONGO_URI=mongodb://localhost:27017/cloudinary_pertama

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
▶️ Cara Menjalankan Project
bash
Salin kode
npm install
npm start
Server akan berjalan di:

arduino
Salin kode
http://localhost:5000
📌 API Endpoint
Create Photo
bash
Salin kode
POST /api/photos
Form Data:

title (text)

image (file)

Get All Photos
bash
Salin kode
GET /api/photos
Update Photo
bash
Salin kode
PUT /api/photos/:id
Form Data:

title (text, optional)

image (file)

Delete Photo
bash
Salin kode
DELETE /api/photos/:id
📝 Catatan
File gambar tidak disimpan di server, hanya sementara oleh Multer

Semua file disimpan permanen di Cloudinary

Project ini bersifat backend-only (tanpa frontend)

✨ Tujuan Project
Memahami alur upload file di backend

Integrasi Multer → Cloudinary → MongoDB

Membiasakan diri dengan clean code dan REST API

📄 License
MIT

yaml
Salin kode

---

## 🚫 `.gitignore`

```gitignore
# dependencies
node_modules/

# environment variables
.env

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db

# temp uploads (jika pakai diskStorage)
uploads/

# build output
dist/
Kalau mau, langkah berikutnya aku bisa:

✅ Review README kamu seolah-olah code reviewer

✅ Sesuaikan README untuk portfolio GitHub

✅ Tambahkan badge, API docs, atau Postman collection

✅ Naik level ke project pagination + auth + role

Tinggal bilang 👉 lanjut ke mana 🔥







````
