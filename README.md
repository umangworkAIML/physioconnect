# PhysioConnect Ahmedabad

> Ahmedabad's premier physiotherapy platform. Book certified therapists, discover clinics, get online consultations, join Physio Dance sessions, and shop recovery products.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or cloud)
- npm or yarn

### 1. Install Dependencies
```bash
cd physioconnect
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local` and update values:
```bash
cp .env.example .env.local
```

Required variables:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — A secure random string for JWT signing
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — Razorpay API keys
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — Google Maps API key

### 3. Set Up Database
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with demo data
npx tsx prisma/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@physioconnect.in | admin123 |
| Patient | priya@example.com | patient123 |
| Therapist | sarah@physioconnect.in | therapist123 |

---

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4, Custom Design System |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM v7 |
| Auth | JWT (httpOnly cookies) |
| Payments | Razorpay |
| Maps | Google Maps API |

---

## 📁 Project Structure

```
physioconnect/
├── prisma/
│   ├── schema.prisma          # Database schema (13 models)
│   └── seed.ts                # Demo data seeder
├── src/
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Design system
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── therapists/         # Therapist listing & detail
│   │   ├── clinics/            # Clinic discovery + maps
│   │   ├── consultation/       # Online consultation booking
│   │   ├── physio-dance/       # Video therapy gallery
│   │   ├── shop/               # E-commerce (list, detail, cart, checkout)
│   │   ├── dashboard/          # Patient dashboard
│   │   ├── admin/              # Admin panel
│   │   └── api/                # All API routes
│   ├── components/
│   │   └── layout/             # Navbar, Footer
│   ├── context/
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── CartContext.tsx      # Shopping cart state
│   └── lib/
│       ├── prisma.ts           # Prisma client singleton
│       ├── auth.ts             # JWT helpers
│       ├── razorpay.ts         # Razorpay config
│       └── utils.ts            # Utilities & constants
└── .env.example                # Environment template
```

---

## ✨ Features

### 🏠 Home Visit Booking
- Browse certified physiotherapists with filters (specialization, rating, price)
- View detailed profiles with reviews and availability
- Book home visits, clinic visits, or online sessions
- Date & time slot selection

### 🗺 Clinic Discovery
- Interactive map showing nearby clinics (Google Maps)
- Search by name, area, or service
- View clinic details, ratings, and timings

### 💻 Online Consultation
- Video consultation booking with available therapists
- Secure meeting link generation
- Schedule management

### 💃 Physio Dance
- Video-guided therapeutic dance sessions
- Filter by category (Back Pain, Knee, etc.) and difficulty
- Instructor profiles and view counts

### 🛒 E-commerce Store
- Product catalog with categories (Pain Relief, Massage Guns, Slippers, etc.)
- Product detail pages with features
- Shopping cart with localStorage persistence
- Checkout with Razorpay payment integration

### 📊 Dashboard
- Patient: View bookings, orders, quick actions
- Admin: Platform stats, manage therapists/products/clinics/bookings

---

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy

### Database Setup (Production)

**Option 1: Neon (Recommended, Free Tier)**
1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

**Option 2: Supabase**
1. Create project at [supabase.com](https://supabase.com)
2. Go to Settings > Database > Connection string
3. Copy to `DATABASE_URL`

### After Database Connection
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### Razorpay Setup
1. Create account at [razorpay.com](https://razorpay.com)
2. Get API keys from Dashboard > Settings > API Keys
3. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

### Google Maps Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable Maps JavaScript API and Places API
3. Create API key and restrict to your domain
4. Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

---

## 📝 API Reference

### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current user
- `POST /api/auth/logout` — Logout

### Therapists
- `GET /api/therapists` — List (with filters)
- `GET /api/therapists/[id]` — Detail

### Bookings
- `POST /api/bookings` — Create booking
- `GET /api/bookings` — User's bookings

### Clinics
- `GET /api/clinics` — List clinics

### Products
- `GET /api/products` — List (with filters)
- `GET /api/products/[slug]` — Detail

### Orders
- `POST /api/orders` — Create order
- `GET /api/orders` — User's orders

### Payments
- `POST /api/payments` — Create Razorpay order
- `PUT /api/payments` — Verify payment

### Consultations
- `POST /api/consultations` — Schedule
- `GET /api/consultations` — User's consultations

### Physio Dance
- `GET /api/physio-dance` — List videos

### Admin
- `GET /api/admin/dashboard` — Dashboard stats

---

Made with ❤️ by **Umxng**
