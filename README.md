# Hackthon_Group_15

This is a simple **Next.js** project built during a hackathon within a limited time frame (approximately 3–4 hours). The goal was rapid prototyping rather than production-ready design.

## Tech Stack

- Next.js
- TypeScript
- SQLite
- Prisma

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Naman-Panicker/Hackthon_Group_15.git
   cd Hackthon_Group_15
   ```
2. Install Dependencies - npm install
3. Create a .env file in project root and paste - DATABASE_URL = "db://connection:string"

## Database Seeding

The project includes a prisma/seed.ts file.

The seed script reads the database connection string from DATABASE_URL

Any SQLite database provided via this URL will be seeded with dummy data

Intended only for quick local testing and development


4. Run Project Using - ```npm run dev```

