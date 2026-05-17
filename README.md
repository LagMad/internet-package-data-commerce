# Cara menjalankan Program

### 1. Pastikan Node.js sudah terinstall
```bash
node -v
```
Pastikan versi Node.js minimal v22.14.0

### 2. Buatlah file .env
.env file berisi:

NEXT_PUBLIC_API_URL="http://localhost:3000"

### 3. Install dependencies

```bash
npm install
```

### 4. Run JSON Server
```bash
npx json-server db.json
```
pastikan berjalan di port 3000

### 5. Run Development Server
Dengan json-server masih berjalan, buka terminal baru lalu jalankan perintah berikut:

```bash
npm run dev
```

### 6. Buka Browser
buka alamat localhost:3001 di browser Anda


# Waktu pengerjaan
Total pengerjaan : ~12 jam

### Rincian:
- Main UI dan functions : ~8 jam

Sabtu, 16 Mei 2026, 16:30 - 20:30 
Sabtu, 16 Mei 2026, 22:00 - Minggu, 17 Mei 2026, 02:00 WIB

- Poles UI: ~4 jam

Minggu, 17 Mei 2026, 13:30 - 17:30 WIB

# Deployment

Di-deploy di Vercel: https://internet-package-data-commerce.vercel.app/

### Notes:

JSON Server tidak di-deploy, jadi harus di-run secara manual pada localhost