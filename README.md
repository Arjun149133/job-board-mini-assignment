# 🚀 Full-Stack Job-Board-Mini Project (Turborepo + Bun)

This is a full-stack Job-Board-Mini project built using **Turborepo** with the following components:

- **Frontend:** Next.js (in `apps/frontend`)
- **Backend:** Express.js (in `apps/backend`)
- **Shared Packages:**
  - `store`: Prisma ORM setup
  - `types`: Shared TypeScript types

---

## 📁 Project Structure

```

/
├── apps/
│ ├── frontend/ # Next.js frontend
│ └── backend/ # Express backend
├── packages/
│ ├── store/ # Prisma schema, client, seed script
│ └── types/ # Shared TypeScript types
├── .env # Root environment variables
├── turbo.json # Turborepo configuration
└── bun.lockb

```

---

## 🛠️ Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- PostgreSQL (local or remote)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies with Bun

```bash
bun install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# .env
JWT_SECRET=yoursecret
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
```

---

## 🧬 Prisma Setup & Seeding

### 4. Generate Prisma Client

```bash
bun run --filter=store prisma generate
```

### 5. Push Prisma schema to the database

```bash
bun run --filter=store prisma db push
```

### 6. Seed the database

```bash
bun run --filter=store ts-node prisma/seed.ts
```

> Ensure that the `seed.ts` file is located at `packages/store/prisma/seed.ts`.

---

## 🧾 Running the Apps

### Run Backend (Express)

```bash
bun run --filter=backend dev
```

Runs the Express server (usually on `http://localhost:4000`)

### Run Frontend (Next.js)

```bash
bun run --filter=frontend dev
```

Runs the Next.js frontend on `http://localhost:3000`
Runs the Backend on `http://localhost:8080`

---

## 🧰 Scripts Summary

```bash
bun dev                        # Run all apps (if configured in turbo.json)
bun run build                  # Build all apps/packages
bun run lint                   # Lint all apps/packages
bun run --filter=backend dev   # Start backend server
bun run --filter=frontend dev  # Start frontend dev server
bun run --filter=store prisma  # Run Prisma commands
```

---

## 📦 Tech Stack

- 🧵 Turborepo (Monorepo management)
- ⚡ Bun (fast package manager & runtime)
- 🌐 Next.js (Frontend)
- 🔥 Express.js (Backend)
- 🧬 Prisma (ORM for PostgreSQL)
- 🐘 PostgreSQL (Database)
- 🟨 TypeScript (Shared types via `packages/types`)
- 🧪 tsx (for running `seed.ts`)

---

## 🙌 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---
