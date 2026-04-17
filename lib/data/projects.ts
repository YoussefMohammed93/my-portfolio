export interface Project {
  name: string;
  tags: string[];
  stack: string[];
  description: string;
  github?: string;
  demo: string;
  image: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "V-Quiz",
    tags: ["Fullstack", "AI", "EdTech"],
    stack: [
      "Next.js",
      "TypeScript",
      "Convex",
      "Clerk",
      "Gemini AI",
      "Tailwind CSS",
    ],
    description:
      "AI-powered learning platform that transforms any topic into chat-native quizzes, flashcards, and study sessions instantly using Google Gemini.",
    github: "https://github.com/YoussefMohammed93/V-QUIZ",
    demo: "https://v-quiz-demo.vercel.app",
    image: "/v-quiz.png",
    featured: true,
  },
  {
    name: "Tasawoq - E-Commerce",
    tags: ["Fullstack", "E-Commerce"],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Convex",
      "Clerk",
      "Stripe",
      "dnd-kit",
      "Leaflet",
    ],
    description:
      "Tasawoq is a full-featured e-commerce web application with product filtering, a shopping cart, Stripe-powered checkout, PDF invoice generation, interactive delivery maps, and a drag-and-drop admin dashboard.",
    demo: "https://tasawoq.netlify.app",
    image: "/tasawoq.png",
    featured: true,
  },
  {
    name: "Linkup",
    tags: ["Fullstack", "Social Media"],
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    description:
      "Social media platform with user authentication, post creation, real-time updates, and fully responsive design.",
    github: "https://github.com/YoussefMohammed93/Linkup",
    demo: "https://linkup-pi.vercel.app",
    image: "/linkup.png",
  },
  {
    name: "Taskmate",
    tags: ["Fullstack", "Productivity"],
    stack: ["React.js", "Next.js", "TypeScript"],
    description:
      "Comprehensive task management app featuring CRUD operations, real-time updates, and user authentication. Optimized for productivity across all devices.",
    github: "https://github.com/YoussefMohammed93/Taskmate",
    demo: "https://taskmate-delta.vercel.app",
    image: "/taskmate.png",
  },
  {
    name: "Frontend Hub",
    tags: ["Frontend", "Education"],
    stack: ["React.js", "Next.js", "TypeScript", "Convex"],
    description:
      "Developer learning platform with organized technical content and accessibility-focused design for developers of all skill levels.",
    github: "https://github.com/YoussefMohammed93/Frontend-Hub",
    demo: "https://frontend-hub-xi.vercel.app",
    image: "/frontendhub.png",
  },
  {
    name: "Notion Clone",
    tags: ["Fullstack", "Productivity"],
    stack: ["Next.js", "TypeScript", "Convex", "Tailwind CSS"],
    description:
      "Notion clone application allowing users to create, edit, and delete notes, notebooks, and tags. Features real-time updates, user authentication, and responsive design.",
    github: "https://github.com/YoussefMohammed93/Notion-Clone",
    demo: "https://notion-clone-matrix.vercel.app",
    image: "/notion.png",
  },
];
