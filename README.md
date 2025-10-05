

# 🌐  Personal Portfolio Website

## 🔗 Live Demo

Frontend: [https://dev-arafat-islam.vercel.app](https://dev-arafat-islam.vercel.app)
Backend: [Backend API Link] (আপনার API লিঙ্ক এখানে যুক্ত করুন)

---

## 📌 Project Overview

This is a personal portfolio website designed to showcase **my skills, work experience, projects, and blogs**. It includes both public-facing sections for visitors and private management features for the portfolio owner.

**Core Features:**

* **Authentication & Authorization:** Secure JWT-based login for the portfolio owner to access private dashboard features.
* **Dashboard:** Centralized dashboard for managing blogs, projects, and personal content.
* **Blog Management:** Full CRUD functionality for blogs (Owner only). Visitors can view all blogs and individual blog pages.
* **About Me Section:** Static personal info, skills, and work experience (Public).
* **Projects Showcase:** Section for personal projects with details and live links (Public).
* **Responsive UI & Polished UX** for smooth browsing on all devices.

---

## 🧰 Technology Stack

**Frontend:**

* Next.js + TypeScript
* Tailwind CSS (Responsive Utility Classes)
* React Hot Toast for notifications

**Backend:**

* Node.js + Express.js
* PostgreSQL + Prisma ORM (or MongoDB + Mongoose)
* JWT Authentication + bcrypt for secure password handling

**Optional Enhancements:**

* Rich Text Editor for blogs/projects (React Quill)
* Interactive UI: Carousels, Cards, Skeletons, Smooth Transitions
* Lazy-loading for heavy assets
* Accessibility-compliant components

---

## 📂 Features

### Public Pages (No Login Required)

* **All Blogs Page:** Uses ISR to fetch new content dynamically.
* **Individual Blog Pages:** Uses `getStaticPaths` + `revalidate` for dynamic content generation.
* **About Me Section:** Static content fetched via SSG for fast performance.
* **Projects Showcase:** Dynamic project listings with thumbnails, live links, descriptions, and features. ISR implemented.

### Private Pages (Portfolio Owner Only)

* **Authentication:** JWT-based login with secure bcrypt-hashed password.
* **Dashboard:** Owner-only page to manage blogs, projects, and personal content.
* **Admin User:** Seeded during backend setup to allow owner login.

### Bonus Features

* Rich Text Editor (React Quill) for formatting content.
* Error handling with proper validations, success/error feedback via toast alerts.
* Polished UX with skeleton loaders, transitions, and accessibility compliance.

---

## ⚡ Setup Instructions

### Backend

1. Clone the backend repository:

   ```bash
   git clone [backend repo link]
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Configure `.env`:

   ```env
   DATABASE_URL=[Your Database URL]
   JWT_SECRET=[Your JWT Secret]
   ```
4. Run the backend:

   ```bash
   npm run dev
   ```
5. Seed the admin user:

   ```bash
   npm run seed
   ```

### Frontend

1. Clone the frontend repository:

   ```bash
   git clone [frontend repo link]
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Configure `.env`:

   ```env
   NEXT_PUBLIC_API_URL=[Your Backend URL]
   ```
4. Run the frontend:

   ```bash
   npm run dev
   ```
5. Visit [http://localhost:3000](http://localhost:3000) to see the site.

---

## 👤 Admin Credentials (For Testing)

* Email: [admin@example.com](mailto:admin@example.com)
* Password: Admin@123

---

## ✅ Additional Notes

* Proper form validation and error handling implemented.
* Blog and project content can be dynamically managed from the dashboard.
* Fully responsive UI with modern design practices.

---

## 📹 Demo Video

Watch a full walkthrough: [Demo Video Link]


