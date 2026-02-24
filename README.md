Berikut versi **FULL README** yang bisa langsung kamu copy–paste ke `README.md` tanpa edit lagi.

---

# Ekajaya Helpdesk IT

Aplikasi web internal untuk manajemen tiket gangguan IT di lingkungan Ekajaya Group.

Sistem ini dibuat menggunakan:

* React (Vite)
* Supabase (Authentication + Database + RLS)
* TailwindCSS
* Role-based Access Control (Admin & User)

---

# Fitur Utama

## 1. Authentication

Sistem menggunakan Supabase Auth.

Fitur:

* Login Email & Password
* Login dengan Google (OAuth)
* Register akun baru
* Session otomatis tersimpan oleh Supabase

Role sistem:

* user
* admin

Role disimpan di database (table: profiles).

---

## 2. Dashboard

Menampilkan:

* Informasi user yang sedang login
* Ringkasan statistik tiket
* Navigasi cepat ke halaman tiket

Data user dan role diambil langsung dari database (bukan dari localStorage).

---

## 3. Ticket System

User dapat:

* Membuat tiket baru
* Melihat tiket miliknya
* Melihat detail tiket

Admin dapat:

* Melihat semua tiket
* Mengakses diskusi internal
* Mengelola sistem

Struktur tiket:

* Title
* Description
* Status (open / closed)
* Priority (low / medium / high)
* Created at
* Updated at

---

## 4. Internal Discussion (Admin Only)

Digunakan untuk diskusi internal tim IT terkait tiket.

* Hanya admin yang bisa mengakses
* Dilindungi menggunakan RLS Supabase

---

## 5. Pengumuman IT

Admin dapat membuat pengumuman internal.
User dapat melihat pengumuman.

---

# Struktur Database

## Enum Role

create type user_role as enum ('user', 'admin');

---

## Table: profiles

* id (uuid, primary key, reference auth.users)
* full_name (text)
* department (text)
* role (user_role, default 'user')
* created_at (timestamp)

---

## Table: tickets

* id (uuid)
* user_id (uuid, reference profiles)
* title (text)
* description (text)
* status (open / closed)
* priority (low / medium / high)
* created_at
* updated_at

---

## Table: internal_discussions

* id (uuid)
* ticket_id (uuid)
* user_id (uuid)
* message (text)
* created_at

---

# Security (Row Level Security)

RLS aktif pada:

* profiles
* tickets
* internal_discussions

Policy utama:

User:

* Hanya bisa melihat profile sendiri
* Hanya bisa melihat tiket sendiri
* Hanya bisa membuat tiket miliknya

Admin:

* Akses penuh ke tickets
* Akses penuh ke internal discussions

---

# Setup Project

## 1. Clone Repository

git clone <repository-url>
cd ekajayahelpdeskit

---

## 2. Install Dependencies

npm install

---

## 3. Setup Environment

Buat file `.env` di root project:

VITE_SUPABASE_URL=[https://YOUR_PROJECT.supabase.co](https://YOUR_PROJECT.supabase.co)
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLIC_ANON_KEY

Jangan gunakan tanda `< >`.

---

## 4. Jalankan Project

npm run dev

Buka:
[http://localhost:5173](http://localhost:5173)

---

# Setup Supabase

## 1. Buat Project Baru di Supabase

Masuk ke:
[https://supabase.com](https://supabase.com)

Buat project baru.

---

## 2. Jalankan SQL Migration

Masuk ke:
Supabase Dashboard → SQL Editor

Paste seluruh script SQL schema (profiles, tickets, RLS, trigger).

Klik Run.

---

## 3. Enable Google Login (Opsional)

Supabase Dashboard → Authentication → Providers → Google

Aktifkan Google provider.
Tambahkan redirect URL:

[http://localhost:5173](http://localhost:5173)

---

# Cara Menjadikan Admin Pertama

1. Register akun
2. Masuk ke Supabase → Table Editor → profiles
3. Update role:

update profiles
set role = 'admin'
where id = 'USER_UUID';

Logout dan login ulang.

---

# Struktur Folder Frontend

src/
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Tickets.jsx
│   ├── TicketDetail.jsx
│   ├── InternalDiscussion.jsx
│   ├── Announcements.jsx
│   └── Settings.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── AppLayout.jsx
│   ├── Modal.jsx
│   ├── Card.jsx
│   └── ErrorBoundary.jsx
│
├── lib/
│   └── supabase.js

---

# Arsitektur Sistem

User Login → Supabase Auth
↓
Session tersimpan
↓
Dashboard fetch profile dari table profiles
↓
Role menentukan akses fitur

Semua akses dikontrol oleh RLS di database.

---

# Status Project

Versi: Internal Beta
Environment: Development
Deployment: Belum Production

---
