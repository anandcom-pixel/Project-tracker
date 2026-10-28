# ProjectTracker 🚀

A modern, lightweight, single-page React (Vite + Tailwind CSS) web application designed to manage and track software development projects, their current statuses, remaining work items, and technology stacks.

![ProjectTracker UI](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/kanban.svg)

---

## ✨ Features

- 📊 **Dashboard Overview Metrics**:
  - Live metric cards showing counts for **Total Projects**, **Completed**, **In Progress**, and **Not Started**.
  - Sprint delivery & completion progress bar.
  - Interactive metric cards: click any card to instantly filter projects by that status.

- 🔍 **Dynamic Search & Filtering**:
  - Real-time search across project names, descriptions, categories, remaining work items, and tech stack tags (e.g. `Kotlin`, `React`, `Docker`).
  - Filter by status (`All`, `Completed`, `In Progress`, `Not Started`).
  - Filter by category (`Mobile App`, `Web App`, `SaaS`, `CLI Tool`, etc.).
  - Sort by Last Updated (Newest/Oldest), Project Name (A–Z / Z–A), or Status Priority.
  - Active filter indicators with one-click "Reset Filters" action.

- 🗂️ **Dual View Layouts**:
  - **Cards Grid View**: Rich card layout with color-coded status badges (Green for Completed, Amber for In Progress, Slate for Not Started), tech stack tags, and expandable remaining work checklist.
  - **Table View**: Dense, scannable table view with expandable detail rows for fast desktop management.

- ⚡ **Quick Status Toggle**:
  - Change project status directly from the card or table row dropdown (e.g., transition an item from "In Progress" to "Completed") with optimistic UI updates and toast feedback.

- 📝 **Add / Edit Project Modal**:
  - Comprehensive form to create or edit projects.
  - Interactive technology stack tag input with quick suggestion chips (React, Tailwind, Kotlin, TypeScript, etc.).
  - Remaining work / next steps textarea with helper button to automatically format bullet points.
  - Custom category support.

- 💾 **Local Storage Persistence**:
  - Automatically loads and synchronizes changes to browser `localStorage`.
  - Includes a "Reset to Starter Projects" option to restore original demo data anytime.

- 📤 **Export & Import JSON**:
  - **Export JSON**: One-click download of all projects as a timestamped JSON backup file (`projecttracker-backup-YYYY-MM-DD.json`).
  - **Import JSON**: Restore or load projects from any valid JSON file with automatic schema validation.

- 🌓 **Dark & Light Mode**:
  - Sleek modern dark mode by default with instant toggle to light mode, persisted across sessions.

---

## 📦 Initial Pre-Populated Projects

1. **Pocket Catalog** (`Mobile App`, `Completed`) — Built in Android Studio using Kotlin and Jetpack Compose. Inventory management app.
2. **FreeIt** (`Mobile App`, `Completed`) — Resale WebView application published on the Google Play Store, targeting Android 16.
3. **Artsit** (`Mobile App`, `Completed`) — WebView application published on the Google Play Store for art portfolio/showcasing.
4. **CartoonCam** (`Mobile App`, `In Progress`) — Camera filters optimization, UI polish, and bug fixes on image saving.
5. **FloraWise** (`Web App`, `In Progress`) — Plant identification database integration is pending; UI layout needs responsive fixes.
6. **ExamPrep** (`Web App`, `In Progress`) — Quiz engine backend sync incomplete; question bank import utility needed.
7. **DevPulse SaaS** (`SaaS`, `Not Started`) — Cloud developer metrics and sprint velocity platform.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Persistence**: Browser `localStorage` + JSON Import/Export API

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+ recommended) and **npm** installed.

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd project-tracker

# Install dependencies
npm install
```

### 3. Development Server
Start the local development server with instant HMR:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Production Build
```bash
# Compile and bundle assets for production
npm run build

# Preview the production build locally
npm run preview
```

### 5. Linting
```bash
npm run lint
```

---

## 🌐 Deploying to Vercel via GitHub

This project is zero-config and 100% ready for instant deployment on [Vercel](https://vercel.com):

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ProjectTracker React Vite app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/project-tracker.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Select your GitHub repository `project-tracker`.
   - Vercel will automatically detect **Vite**:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **Deploy**.

Your application will be live with a production HTTPS URL in seconds!

---

## 📄 License
MIT License. Free to use for personal and commercial projects.
