// All page copy lives here, taken from the previous portfolio (see legacy/index.html),
// so content can change without touching layout code.
import {
  Boxes,
  Bot,
  BrainCircuit,
  Code2,
  LayoutDashboard,
  Linkedin,
  Mail,
  PenTool,
  Phone,
  Server,
  Share2,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export const PROFILE = {
  firstName: 'Aditya',
  name: 'Aditya Kovvuri',
  fullName: 'Aditya Surya Bhaskar Reddy Kovvuri',
  availability: 'Available for opportunities',
  tagline: 'full-stack developer crafting real-time APIs, AI-powered tools, and scalable microservices',
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

// TODO: swap in your own photo or 3D avatar (a transparent PNG works best).
// Put the file in /public and use a path like '/portrait.png'.
export const HERO_PORTRAIT =
  'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png';

export type BuildTheme = {
  label: string;
  icon: LucideIcon;
};

/** Top marquee row: the "I build..." phrases from the old hero typewriter. */
export const BUILD_THEMES: BuildTheme[] = [
  { label: 'Real-time AI applications', icon: Zap },
  { label: 'Scalable microservices', icon: Boxes },
  { label: 'Interactive dashboards', icon: LayoutDashboard },
  { label: 'GenAI-powered tools', icon: Sparkles },
  { label: 'Agentic AI systems', icon: BrainCircuit },
];

export const BUILD_SUMMARY =
  'I build real-time AI applications, scalable microservices, interactive dashboards, GenAI-powered tools, and agentic AI systems.';

/** Bottom marquee row. */
export const TECH_STACK = [
  'React JS',
  'Next JS',
  'TypeScript',
  'Node.js',
  'Express JS',
  'Django',
  'LangChain',
  'LangGraph',
  'Vertex AI',
  'PostgreSQL',
  'Tailwind CSS',
  'Electron JS',
] as const;

export const ABOUT_IMAGES = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
} as const;

export const ABOUT_TEXT =
  "I'm a full-stack software developer based in Hyderabad, India, building products at the intersection of design and engineering. At YuppTV, I engineer chat streaming APIs and integrate large language models for real-time, AI-enhanced conversations, and I build agentic AI applications with LangChain and LangGraph.";

export const STATS = [
  { value: '2', label: 'Years Experience' },
  { value: '3', label: 'Projects Built' },
  { value: '10', label: 'Technologies' },
] as const;

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  /** Shows a "Current" tag next to the role. */
  current?: boolean;
  highlights: string[];
  tags: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'YuppTV Inc.',
    period: 'Aug 2024 — Present',
    location: 'Hyderabad',
    current: true,
    highlights: [
      'Engineered advanced chat streaming APIs and integrated LLMs (Gemini, ChatGPT, Vertex AI) for real-time AI-enhanced conversational experiences.',
      'Designed highly interactive dashboards and complex UI features using React.js and CSS-in-JS, elevating user engagement with cross-device responsiveness.',
      'Refined CI/CD pipelines with automated testing and deployment scripts, shortening release cycles and reinforcing production stability.',
    ],
    tags: ['React.js', 'Node.js', 'GenAI', 'Vertex AI', 'CI/CD'],
  },
  {
    role: 'Junior Engineer',
    company: 'Phoenix Global',
    period: 'Apr 2024 — Jul 2024',
    location: 'Hyderabad',
    highlights: [
      'Leveraged advanced data analytics to extract actionable insights from complex COVID-19 datasets, enhancing decision-making for stakeholders.',
      'Designed and deployed dynamic dashboards in Tableau and Power BI, increasing executive engagement and data-driven strategy adoption by 30%.',
      'Conducted deep-dive exploratory data analysis to uncover hidden patterns, supporting predictive modeling initiatives.',
    ],
    tags: ['Tableau', 'Power BI', 'Data Analytics', 'Python'],
  },
];

export type SkillGroup = {
  name: string;
  icon: LucideIcon;
  /** Background of the group's icon tile. */
  accent: string;
  /** The featured group gets the tall dark card in the skills grid. */
  featured?: boolean;
  /** Extra proof shown on the featured card. */
  spotlight?: { label: string; items: string[] };
  /** Spans two columns in the skills grid, for long skill lists. */
  wide?: boolean;
  tagline?: string;
  skills: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'Frontend & Databases',
    icon: Code2,
    accent: 'linear-gradient(135deg, #B600A8 0%, #7621B0 100%)',
    wide: true,
    skills: ['React JS', 'Next JS', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Bootstrap', 'Electron JS', 'SQL', 'NoSQL'],
  },
  {
    name: 'Backend & APIs',
    icon: Server,
    accent: 'linear-gradient(135deg, #7621B0 0%, #2E1065 100%)',
    skills: ['Node.js', 'Express JS', 'Django', 'Chat Streaming APIs', 'REST APIs', 'JWT'],
  },
  {
    name: 'GenAI & LLMs',
    icon: BrainCircuit,
    accent: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
    featured: true,
    tagline: 'Passionate about GenAI and agentic applications.',
    // From the YuppTV experience bullet: "integrated LLMs (Gemini, ChatGPT, Vertex AI)".
    spotlight: { label: 'LLMs integrated at YuppTV', items: ['Gemini', 'ChatGPT', 'Vertex AI'] },
    skills: ['Prompt Engineering', 'LLM Integration', 'Fine-tuning', 'AI Model Evaluation', 'LangChain', 'LangGraph'],
  },
  {
    name: 'Tools & DevOps',
    icon: Wrench,
    accent: 'linear-gradient(135deg, #BE4C00 0%, #B600A8 100%)',
    skills: ['Git', 'Jenkins', 'Jira', 'Vertex AI', 'DBeaver', 'Postman', 'Cursor'],
  },
];

/** Which illustration fills the project's gradient panel (see src/components/ProjectVisuals.tsx). */
export type ProjectVisualKind = 'publish' | 'agents' | 'signature';

export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  tech: string[];
  icon: LucideIcon;
  visual: ProjectVisualKind;
  /** Background of the card's visual panel. */
  gradient: string;
  /** Optional link; a "Live Project" button appears when this is set. */
  url?: string;
};

export const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'Social Publish Automation Platform',
    category: 'Full-Stack · GenAI',
    description:
      'AI-assisted publishing tool to automatically post content across YouTube, Facebook, Instagram, LinkedIn, and Twitter from a single dashboard. Features automatic generation of SEO-friendly titles, descriptions, and hashtags using LLMs.',
    features: ['Multi-platform publishing', 'AI-generated SEO content', 'Real-time content feedback'],
    tech: ['React JS', 'Next JS', 'Node.js', 'PostgreSQL'],
    icon: Share2,
    visual: 'publish',
    gradient: 'linear-gradient(135deg, #B600A8 0%, #7621B0 100%)',
  },
  {
    number: '02',
    name: 'Multi-Agent AI Automation Platform',
    category: 'Agentic AI',
    description:
      'A multi-agent AI automation platform capable of handling real-time query processing, workflow orchestration, and contextual knowledge retrieval. Features specialized AI agents for intent analysis, semantic search, and response generation using LangGraph orchestration.',
    features: [
      'RAG with vector search',
      'Multi-agent orchestration',
      'Automated workflow execution',
      'Contextual reasoning & collaboration',
    ],
    tech: ['LangChain', 'LangGraph', 'Node.js', 'React.js', 'OpenAI/Gemini', 'PostgreSQL'],
    icon: Bot,
    visual: 'agents',
    gradient: 'linear-gradient(135deg, #7621B0 0%, #2E1065 100%)',
  },
  {
    number: '03',
    name: 'Signature Authentication System',
    category: 'Computer Vision · ML',
    description:
      'AI-powered signature authentication system leveraging computer vision and machine learning for verifying handwritten signatures. Uses CNN to analyze stroke patterns, angles, and pressure points for reliable forgery detection.',
    features: ['Computer vision analysis', 'CNN-based feature extraction', 'Forgery detection'],
    tech: ['Python', 'OpenCV', 'CNN', 'ML'],
    icon: PenTool,
    visual: 'signature',
    gradient: 'linear-gradient(135deg, #BE4C00 0%, #B600A8 100%)',
  },
];

export type Education = {
  year: string;
  degree: string;
  field?: string;
  school: string;
  scoreLabel: 'CGPA' | 'GPA';
  score: string;
};

export const EDUCATION: Education[] = [
  {
    year: '2024',
    degree: 'Bachelor of Technology',
    field: 'Computer Science',
    school: 'GITAM Deemed University, Visakhapatnam',
    scoreLabel: 'CGPA',
    score: '8.5',
  },
  {
    year: '2020',
    degree: 'Intermediate',
    school: 'Sasi New Jen Junior College, Velivennu, AP',
    scoreLabel: 'GPA',
    score: '9.4',
  },
  {
    year: '2018',
    degree: 'Secondary Education',
    school: 'St. Anns E.M School, Tadepalligudem, AP',
    scoreLabel: 'GPA',
    score: '9.8',
  },
];

export const CONTACT_INTRO =
  "I'm currently open to new opportunities and collaborations. Whether you have a question, a project idea, or just want to say hi — my inbox is always open.";

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'Email', value: 'adithyareddy216@gmail.com', href: 'mailto:adithyareddy216@gmail.com', icon: Mail },
  { label: 'Phone', value: '+91 9381766992', href: 'tel:+919381766992', icon: Phone },
  {
    label: 'LinkedIn',
    value: 'Aditya Reddy Kovvuri',
    href: 'https://linkedin.com/in/aditya-reddy-kovvuri-37a60325a',
    icon: Linkedin,
    external: true,
  },
];
