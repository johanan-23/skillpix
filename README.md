# Skillpix Platform

Skillpix is a modern web platform designed to bridge the gap between learning and earning. It offers a comprehensive suite of features for users to learn, practice, and showcase their skills, as well as connect with opportunities in the job market.

## Features

- **User Authentication**: Secure login and registration system.
- **Project Marketplace**: Connects learners with real-world projects and employers.
- **Learning Modules**: Structured tutorials and resources for upskilling.
- **Community & Support**: Forums, FAQs, and support channels.
- **Responsive UI**: Modern, accessible, and mobile-friendly design.
- **Dark/Light Theme Support**: Seamless theme switching for user comfort.
- **Social Integration**: Connect with Skillpix on Twitter, Instagram, LinkedIn, and YouTube.

## Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS & shadcn/ui
- **Database**: Drizzle ORM & Neon Postgres
- **Authentication**: Better Auth
- **TypeScript**: For type safety and maintainability

## Project Structure

- `app/` - Main application pages and components
- `components/` - Reusable UI components
- `db/` - Database schema and access
- `lib/` - Utility libraries (mail, social links, etc.)
- `public/` - Static assets (images, icons, etc.)
- `styles/` - Global and transition styles
- `utils/` - Authentication and client utilities

## Getting Started

1. **Install dependencies**
   ```sh
   pnpm install
   ```
2. **Configure environment variables**
   - Copy `.env.example` to `.env.local` and update values as needed.
3. **Run the development server**
   ```sh
   pnpm dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) to view the app.**

## Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run linter
- `generate` - drizzle-kit generate DB schema and push to Neon,
- `studio` - drizzle-kit studio for visualizing DB

**Skillpix Platform**
**From Learning to Earning.**
**Made with ❤️ in India.**