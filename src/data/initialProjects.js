export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    name: "Pocket Catalog",
    category: "Mobile App",
    status: "Completed",
    description: "Built in Android Studio using Kotlin and Jetpack Compose. Inventory management app.",
    remainingWork: "• Production release live on internal track\n• Future enhancements: Barcode scanner accessory integration\n• Automated cloud sync backup",
    techStack: ["Kotlin", "Jetpack Compose", "Android Studio", "Room DB", "Coroutines"],
    lastUpdated: "2026-09-15"
  },
  {
    id: "proj-2",
    name: "FreeIt",
    category: "Mobile App",
    status: "Completed",
    description: "Resale WebView application published on the Google Play Store, targeting Android 16.",
    remainingWork: "• Production release live in Google Play Store\n• Monitor user crashlytics and Play Console performance metrics\n• Prepare seasonal UI themes",
    techStack: ["Android", "WebView", "Google Play Store", "JavaScript", "Tailwind CSS"],
    lastUpdated: "2026-10-02"
  },
  {
    id: "proj-3",
    name: "Artsit",
    category: "Mobile App",
    status: "Completed",
    description: "WebView application published on the Google Play Store for art portfolio/showcasing.",
    remainingWork: "• Live in store with positive early ratings\n• Plan v2.0 high-resolution pinch-to-zoom image viewer\n• Artist contact sheet integration",
    techStack: ["Android", "WebView", "CSS3", "Google Play Store", "HTML5"],
    lastUpdated: "2026-10-18"
  },
  {
    id: "proj-4",
    name: "CartoonCam",
    category: "Mobile App",
    status: "In Progress",
    description: "Needs camera filters optimization, UI polish, and bug fixes on image saving.",
    remainingWork: "• Optimize real-time OpenGL camera shader filters for 60fps\n• Fix background image saving thread lock crash\n• Polish gallery thumbnail preview grid UI\n• Add shutter sound toggle in settings",
    techStack: ["Kotlin", "CameraX", "OpenGL ES", "Material 3", "Android Studio"],
    lastUpdated: "2026-10-25"
  },
  {
    id: "proj-5",
    name: "FloraWise",
    category: "Web App",
    status: "In Progress",
    description: "Plant identification database integration is pending; UI layout needs responsive fixes.",
    remainingWork: "• Integrate PlantNet / botanical taxonomy REST API\n• Resolve responsive grid layout overflow on mobile screens\n• Implement offline caching for saved plants\n• Add light/dark theme preference toggle",
    techStack: ["React", "Tailwind CSS", "Vite", "Node.js", "REST API"],
    lastUpdated: "2026-10-27"
  },
  {
    id: "proj-6",
    name: "ExamPrep",
    category: "Web App",
    status: "In Progress",
    description: "Quiz engine backend sync incomplete; question bank import utility needed.",
    remainingWork: "• Finalize background sync worker for offline quiz submission\n• Build CSV/JSON question bank batch importer tool\n• Add student performance analytics chart\n• Implement timed quiz test runner modal",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma"],
    lastUpdated: "2026-10-28"
  },
  {
    id: "proj-7",
    name: "DevPulse SaaS",
    category: "SaaS",
    status: "Not Started",
    description: "Cloud developer metrics and sprint velocity intelligence platform for engineering teams.",
    remainingWork: "• Finalize product specification and wireframes\n• Evaluate GitHub / GitLab OAuth API webhooks\n• Scaffold serverless REST API endpoints\n• Design multi-tenant database schema",
    techStack: ["React", "FastAPI", "PostgreSQL", "Docker", "Tailwind CSS"],
    lastUpdated: "2026-10-20"
  }
];

export const CATEGORIES = [
  "Mobile App",
  "Web App",
  "SaaS",
  "Desktop App",
  "CLI Tool",
  "Library / Package",
  "Other"
];

export const STATUS_CONFIG = {
  "Completed": {
    label: "Completed",
    color: "emerald",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dotBg: "bg-emerald-600",
    cardBorder: "hover:border-emerald-300"
  },
  "In Progress": {
    label: "In Progress",
    color: "amber",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-200",
    dotBg: "bg-amber-600",
    cardBorder: "hover:border-amber-300"
  },
  "Not Started": {
    label: "Not Started",
    color: "slate",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
    dotBg: "bg-slate-500",
    cardBorder: "hover:border-slate-300"
  }
};

export const COMMON_TECH_TAGS = [
  "React", "Tailwind CSS", "Kotlin", "TypeScript", "JavaScript",
  "Node.js", "Next.js", "Jetpack Compose", "Android Studio", "Python",
  "FastAPI", "PostgreSQL", "MongoDB", "Docker", "Vite", "CameraX",
  "WebView", "Google Play Store", "GraphQL", "Supabase", "Firebase"
];
