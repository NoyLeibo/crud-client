# Crud-App

A modern Product Management (CRUD) system built with React, TypeScript, and Vite.
This project was developed as a home assignment and demonstrates a clean SPA architecture, user-friendly UI, and clear separation of concerns.

---

## Overview

This app lets you manage a list of products (Fruits, Vegetables, and Field Crops): add, edit, delete, filter, and search products easily. The UI is responsive and pleasant, with strong typing and organized client-side logic.

---

## Main Features

- **Product list display** with search and category filtering
- **Add new product** (with zod validation)
- **Edit existing product**
- **Delete one or multiple products** (with Undo option by event-bus)
- **Confirmation modals** for sensitive actions
- **Global alert system** for feedback messages
- **Loading spinner** for async actions
- **Responsive, clean design (Sass)**

---

## Product Model

Each product includes the following fields:
- `name` – Product name (required)
- `sku` – Unique identifier (number between 0 and 1000)
- `description` – Description (optional)
- `category` – Category: Fruit / Vegetable / Field Crop
- `marketingDate` – Marketing date (must be at least 7 days ago)
- `isDeleted` – Soft delete flag (internal use)
- `createdAt`, `updatedAt` – Creation/update timestamps

---

## Getting Started

1. **Clone the repo:**
   ```bash
   git clone [your-repo-url](https://github.com/NoyLeibo/crud-client.git)
   cd crud-client
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```
   The app will be available at: [http://localhost:5173](http://localhost:5173)

4. **Build for production**
   ```bash
   npm run build
   ```
   
> **Note:**
> The app expects a backend server running at `http://localhost:3000/` with a compatible REST API.
> (You can change this URL in `src/services/http.service.ts` if needed.)

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Axios
- React Router v7
- Zod (validation)
- Sass

---

## Folder Structure

- `src/cmps/` – UI components
- `src/pages/` – App pages
- `src/services/` – API services, event bus, etc.
- `src/models/` – Types and models
- `src/context/` – Global contexts (Alerts)
- `src/assets/` – Styles (Sass)

---

## Notes

- The code is modular, documented, and easy to extend.
- No sensitive information is included.
- All file and component names are in English and consistent.
- Feedback is welcome!

Good luck and happy reviewing! 🚀
