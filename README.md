# Nihara D'Aura — Haute Luxury E-Commerce & Salon Booking Platform 👑✨

![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.21-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)

Welcome to **Nihara D'Aura** (`Jewellery & Makeup`), a state-of-the-art, ultra-luxury e-commerce web application and salon booking platform built with modern web standards (React 19, Vite, Tailwind CSS, Node.js, Express, and MongoDB).

---

## 📌 1. Brand Identity & Official Details

- **Brand Name**: Nihara D'Aura
- **Tagline**: Jewellery & Makeup | Haute Luxury
- **Emblem / Seal Logo**: 3D Circular Golden Brush-Frame Emblem Seal with central royal crest branding (`/logo.png`)
- **Official Contact Number**: `+91 92660 59846`
- **Official Contact Email**: `niharikagautam007@gmail.com`
- **Flagship Salon & Corporate Address**: 
  `423 A, 4th Floor, Tower 3, NX One Tower, Greater Noida (West), UP - 201306`

---

## 🎨 2. Design System & Aesthetics

- **Color Palette**:
  - Primary Luxury Accent: Royal Gold (`#C59B27` / `#D4AF37`)
  - Secondary Accent: Deep Amber Gold (`#A87D17` / `#855F14`)
  - Warm Background Base: Soft Ivory/Champagne (`#FBF6EC` -> `#FAF4E8`)
  - Ultra-Luxury Footer Background: Multi-stop Dark Radial Gradient:
    `bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#362F27] via-[#1A1815] to-[#0A0908]`
- **Typography**:
  - Headings: Serif (`font-serif`) for royal elegance
  - Body & UI: Sans-serif with `-webkit-font-smoothing: antialiased`
  - Numbers & Prices: `lining-nums` upright clean Roman numeral formatting
- **Performance & Smoothness**:
  - Hardware GPU Compositing (`will-change: transform`, `transform: translateZ(0)`) on sticky headers, cards, and modal backdrops.
  - Native momentum scrolling (`-webkit-overflow-scrolling: touch`, `overscroll-behavior-y: none`).
  - Automatic `ScrollToTop` reset on route transitions.
  - Async image decoding (`loading="lazy"`, `decoding="async"`).

---

## 🛠️ 3. Technology Stack

### Frontend Stack (`/frontend`)
- **Framework**: React 19 + Vite 8
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v3 + Custom CSS Variables & Micro-animations
- **Icons**: Lucide React (`lucide-react`)
- **State Management**: React Context API (`AuthContext`, `CartContext`, `WishlistContext`, `ToastContext`, `OffersContext`)

### Backend Stack (`/backend`)
- **Runtime**: Node.js + Express (ES Modules)
- **Database / ODM**: MongoDB + Mongoose
- **Architecture**: Modular MVC (Controllers, Services, Models, Routes, Middleware)
- **Real-Time**: Socket.io
- **Security**: JWT Authentication, CORS, Dotenv configuration

---

## 📁 4. Project Directory Structure

```text
Nihara D Aura/
├── frontend/                     # React 19 + Vite Client Application
│   ├── public/                   # Static assets & brand logos
│   ├── src/
│   │   ├── components/           # Reusable UI components (Cart, Navbar, Footer, Cards)
│   │   ├── context/              # Context API state providers
│   │   ├── pages/                # Application routes & views
│   │   ├── services/             # API services & data providers
│   │   ├── App.jsx               # Main App routing tree
│   │   ├── index.css             # Tailwind base & luxury styling tokens
│   │   └── main.jsx              # Vite entrypoint
│   └── package.json
│
├── backend/                      # Node.js + Express API Server
│   ├── src/
│   │   ├── config/               # Database & server configuration
│   │   ├── controllers/          # Request handlers & logic
│   │   ├── middleware/           # Auth & validation middleware
│   │   ├── models/               # Mongoose schemas & data models
│   │   ├── routes/               # API endpoint route definitions
│   │   ├── services/             # Core business logic services
│   │   ├── socket.js             # Socket.io real-time handler
│   │   └── server.js             # Express application entrypoint
│   └── package.json
│
├── project_resources/            # Project documentation & media archives
│   ├── documents/                # PRD PDFs, API specs, database schemas, audits
│   └── media/                    # Showcase videos & Android release APK
│
├── docs/                         # Audit reports & screenshots
├── scripts/                      # Testing & verification utility scripts
├── .gitignore                    # Git rules (protects credentials & large files)
├── README.md                     # Comprehensive project documentation
└── package.json                  # Root monorepo-style workspace scripts
```

---

## 🚀 5. Quick Start & Execution

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### Quick One-Command Setup (Recommended)

From the project root directory:

```bash
# 1. Install dependencies for both frontend and backend
npm run install:all

# 2. Run both backend and frontend concurrently
npm run dev
```

### Manual Individual Setup

#### Step 1: Start Backend Server
```bash
cd backend
npm install
# Set your environment variables in .env (reference .env.example)
npm run dev
```
Backend uses `PORT` from `backend/.env` (default `5000`). The frontend API and socket URLs default to port `3000`, so configure `PORT=3000` locally or point the frontend variables at the backend port.

#### Step 2: Start Frontend Application
```bash
cd frontend
npm install
npm run dev
```
Frontend runs by default at `http://localhost:5173`.

### Admin dashboard and live data

The admin console reads and writes products, categories, services, orders, appointments, coupons, and store settings through authenticated `/api/admin` endpoints. Category descriptions, banners, and subcategories feed the public categories page; category rename updates matching product category references, and a category with products cannot be deleted. Inventory changes require a reason and retain the latest 50 adjustment records per product. Orders support fulfillment status, carrier, tracking reference, and recorded payment status; recording a refund request does not issue a payment-gateway refund. Appointment create/reschedule requests reject overlapping active bookings for the same stylist. Services are managed under separate Makeup and Salon categories; legacy Nails and Jewellery & Styling service records display under Salon without being removed from MongoDB. MongoDB is the source of truth; Socket.IO notifies signed-in admin sessions and refreshes public catalog/service views after successful writes. On a populated database, the first startup runs a versioned, one-time migration that inserts the three new Salon offerings without overwriting existing records; its marker prevents deleted services from being reseeded later.

Before starting the backend, configure `backend/.env` with:

- `MONGO_URI` (or `MONGODB_URI`) pointing to your database
- `JWT_SECRET` containing a unique random secret of at least 32 characters
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` for the administrator sign-in (keep these private and out of Git)
- `CORS_ORIGINS` listing the exact frontend origins, comma-separated
- `PORT=3000` to match the local frontend API/socket defaults, or set `VITE_API_BASE_URL` (include `/api`) and `VITE_SOCKET_URL` to match another port
- In Vercel, set `VITE_API_BASE_URL=https://api.niharadaura.com/api` for the frontend project and redeploy after changing it. If the storefront uses a different domain, add that exact origin to the backend `CORS_ORIGINS`.

Only the email configured in `ADMIN_EMAIL` can authenticate as an administrator; admin sign-in also requires the matching private `ADMIN_PASSWORD`. Admin tokens for other email addresses are rejected by protected APIs and the admin Socket.IO room. The values in `.env.example` are placeholders.

#### Step 3: Production Build
```bash
cd frontend
npm run build
```

---

## 🛍️ 6. Core Features & User Journeys

1. **Haute Jewellery & Beauty Catalog**:
   - Product categories: Kundan Jewellery, Silk Foundations, Scented Candles, Nail Art.
   - Dynamic search, price range filtering, rating sorting.

2. **Bespoke Salon Appointment Booking**:
   - Select service type (Bridal Makeup, Nail Art, Hair Styling).
   - Choose appointment venue: Flagship Salon (Greater Noida West) or Artist-at-Home.
   - Pick date, time slot, and preferred artist.

3. **Shopping Bag & Coupon Discounts**:
   - Slide-over Cart Drawer with real-time subtotal calculation.
   - Promotional codes (`NIHARA10`, `GLOW20`).

4. **Customer Profile & Address Book**:
   - Save multiple delivery addresses.
   - Order history tracking and active booking status.

---

© 2026 **Nihara D'Aura Haute Luxury**. All rights reserved.
