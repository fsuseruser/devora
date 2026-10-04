/** Services — each entry generates /services/<slug>/ */
export interface Service {
  slug: string;
  n: string;
  title: string;
  short: string;
  intro: string;
  image: string;
  deliverables: string[];
  outcomes: { title: string; text: string }[];
  stack: string[];
  category: string; // links to project filter
}

export const services: Service[] = [
  {
    slug: 'website-design-development',
    n: '01',
    title: 'Website Design & Development',
    short: 'Editorial, high-performance websites that make your brand impossible to ignore.',
    intro:
      'Your website is the first room a client walks into. We design and build bespoke, lightning-fast sites with refined motion, flawless responsiveness and a CMS your team will actually enjoy using.',
    image: '/images/services/web.jpg',
    deliverables: ['Brand-led art direction', 'Responsive design system', 'Custom front-end development', 'Headless CMS setup', 'Bilingual English / Arabic (RTL)', 'SEO & analytics foundations'],
    outcomes: [
      { title: 'Presence', text: 'A site that positions you as the premium choice in your market.' },
      { title: 'Performance', text: 'Core Web Vitals in the green and pages that load in under a second.' },
      { title: 'Ownership', text: 'Your team edits content confidently, without calling a developer.' },
    ],
    stack: ['Astro', 'Next.js', 'Tailwind CSS', 'Sanity', 'Webflow', 'Vercel'],
    category: 'websites',
  },
  {
    slug: 'custom-web-applications',
    n: '02',
    title: 'Custom Web Applications',
    short: 'Portals, platforms and internal tools engineered around how your business really works.',
    intro:
      'When off-the-shelf software forces you to bend, we build the tool that fits. Client portals, booking platforms, dashboards and internal systems — secure, scalable and designed for everyday use.',
    image: '/images/services/apps.jpg',
    deliverables: ['Product discovery & scoping', 'Architecture & data modelling', 'Full-stack development', 'Authentication & roles', 'Payment & API integrations', 'Cloud deployment & monitoring'],
    outcomes: [
      { title: 'Efficiency', text: 'Replace spreadsheets and manual steps with one reliable system.' },
      { title: 'Scale', text: 'Infrastructure that grows with your users without rebuilding.' },
      { title: 'Insight', text: 'Live data and reporting that make decisions obvious.' },
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Stripe', 'AWS'],
    category: 'apps',
  },
  {
    slug: 'ui-ux-design',
    n: '03',
    title: 'UI/UX Design',
    short: 'Research-led interfaces and design systems that feel effortless to use.',
    intro:
      'Great products feel obvious. We map journeys, test assumptions and craft interfaces with precise typography, clear hierarchy and thoughtful interaction — delivered as scalable design systems.',
    image: '/images/services/uiux.jpg',
    deliverables: ['User research & interviews', 'Information architecture', 'Wireframes & prototypes', 'High-fidelity UI', 'Design systems in Figma', 'Usability testing'],
    outcomes: [
      { title: 'Clarity', text: 'Users find what they need without thinking about it.' },
      { title: 'Consistency', text: 'One system of components across every screen and product.' },
      { title: 'Conversion', text: 'Fewer drop-offs and more completed journeys.' },
    ],
    stack: ['Figma', 'FigJam', 'Maze', 'Framer', 'Lottie', 'Storybook'],
    category: 'uiux',
  },
  {
    slug: 'business-automation-crm',
    n: '04',
    title: 'Business Automation & CRM Integration',
    short: 'Connected systems that remove busywork and keep every lead moving.',
    intro:
      'We connect your website, CRM, finance and messaging tools into workflows that run themselves — so leads are captured, followed up and converted without anything slipping through.',
    image: '/images/services/automation.jpg',
    deliverables: ['Process mapping', 'CRM setup & migration', 'Workflow automation', 'WhatsApp & email integration', 'Custom API connectors', 'Team training & documentation'],
    outcomes: [
      { title: 'Time back', text: 'Hours of repetitive admin removed every single week.' },
      { title: 'Visibility', text: 'One source of truth for every client and deal.' },
      { title: 'Speed', text: 'Instant responses that win business while competitors reply tomorrow.' },
    ],
    stack: ['HubSpot', 'Zoho', 'Salesforce', 'Make', 'n8n', 'Zapier'],
    category: 'automation',
  },
  {
    slug: 'ai-digital-solutions',
    n: '05',
    title: 'AI & Digital Solutions',
    short: 'Practical AI — assistants, search and automation that earn their place.',
    intro:
      'We design AI features with a clear business case: knowledge assistants trained on your content, intelligent document handling, smart search and customer-facing agents — built responsibly and integrated securely.',
    image: '/images/services/ai.jpg',
    deliverables: ['AI opportunity workshop', 'Knowledge assistants & chat', 'Document extraction', 'Semantic search', 'AI-powered workflows', 'Evaluation & guardrails'],
    outcomes: [
      { title: 'Answers', text: 'Staff and customers get accurate answers in seconds.' },
      { title: 'Leverage', text: 'Small teams operate with the capacity of large ones.' },
      { title: 'Confidence', text: 'Measured, monitored AI with your data kept private.' },
    ],
    stack: ['Claude', 'OpenAI', 'LangChain', 'Pinecone', 'Python', 'Vercel AI SDK'],
    category: 'ai',
  },
  {
    slug: 'maintenance-support',
    n: '06',
    title: 'Website Maintenance & Support',
    short: 'Proactive care plans that keep your platform fast, secure and evolving.',
    intro:
      'Technology never stands still. Our care plans cover updates, security, backups, performance tuning and continuous improvements — with a dedicated team that already knows your product.',
    image: '/images/services/support.jpg',
    deliverables: ['Security & dependency updates', 'Daily backups', 'Uptime monitoring', 'Performance optimisation', 'Content & feature updates', 'Monthly reporting'],
    outcomes: [
      { title: 'Peace of mind', text: 'Issues caught and fixed before your customers notice.' },
      { title: 'Momentum', text: 'Your site improves every month instead of ageing.' },
      { title: 'Partnership', text: 'A team on call that knows your business inside out.' },
    ],
    stack: ['Cloudflare', 'Vercel', 'GitHub', 'Sentry', 'Better Stack', 'GA4'],
    category: 'websites',
  },
];
