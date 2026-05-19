# 🏫 Campus Intelligence System (CIS)

> A unified digital platform to manage everyone who enters and exits Sairam College of Engineering — students, hostel boarders, visitors, guest faculty — with real-time tracking.

---

## 📦 Modules

| Module | Description |
|--------|-------------|
| 🚶 Visitor Management | Track walk-in visitors with QR pass |
| 🖐️ Biometric Login/Logout | Fingerprint tracking at hostel + college gate |
| 🎫 Hostel Gate Pass | Digital permission system for hostel students |
| 🏛️ Hall Booking | Conflict-free seminar hall booking |
| 📊 Admin Dashboard | Live campus occupancy and reports |
| 🔔 Smart Alerts | Auto-alerts for missing students, late returns |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| ORM | Drizzle ORM |
| Database | PostgreSQL (Supabase) |
| Auth | NextAuth.js |
| Notifications | Twilio (SMS), Firebase FCM |
| QR Code | qrcode npm package |

---

## 📁 Project Structure

```
campus-intelligence-system/
├── backend/
│   └── src/
│       ├── routes/          # API route handlers
│       ├── services/        # Business logic
│       ├── middleware/       # Auth middleware
│       └── utils/           # Helper functions
├── frontend/
│   └── src/
│       ├── app/             # Next.js pages
│       ├── components/      # UI components
│       └── lib/             # Utilities
├── shared/
│   ├── schema.ts            # Drizzle ORM schema (ALL tables)
│   └── db.ts                # DB connection + queries
├── drizzle.config.ts        # Drizzle configuration
├── .env.example             # Environment variables template
└── package.json             # Dependencies
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/campus-intelligence-system.git
cd campus-intelligence-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env
# Fill in your DATABASE_URL and other values
```

### 4. Push database schema
```bash
npm run db:migrate
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Team

**Smart Coders** — Sairam College of Engineering, VTU
- ISE Department, 4th Semester

---

## 📄 License

MIT License
