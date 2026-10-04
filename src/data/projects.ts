/**
 * Projects — each entry generates /work/<slug>/
 * NOTE: these are placeholder case studies. Replace names, copy and images
 * with your real client work before launch.
 */
export const categories = [
  { id: 'all', label: 'All work' },
  { id: 'websites', label: 'Websites' },
  { id: 'apps', label: 'Web Apps' },
  { id: 'uiux', label: 'UI/UX' },
  { id: 'automation', label: 'Automation' },
  { id: 'ai', label: 'AI' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];

export interface Project {
  slug: string;
  title: string;
  client: string;
  year: string;
  sector: string;
  location: string;
  categories: Exclude<CategoryId, 'all'>[];
  summary: string;
  cover: string;
  gallery: [string, string];
  challenge: string;
  approach: string;
  services: string[];
  results: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    slug: 'qasr-residences',
    title: 'Qasr Residences',
    client: 'Qasr Developments',
    year: '2026',
    sector: 'Real estate',
    location: 'Abu Dhabi',
    categories: ['websites', 'uiux'],
    summary: 'A cinematic sales website for a boutique waterfront residential development.',
    cover: '/images/work/qasr-cover.jpg',
    gallery: ['/images/work/qasr-1.jpg', '/images/work/qasr-2.jpg'],
    challenge:
      'Off-plan buyers needed to feel the quality of homes that did not yet exist — and enquire before competitors launched nearby.',
    approach:
      'We built an editorial, image-led experience with scroll-driven floor plans, a bilingual CMS and an enquiry flow connected directly to the sales team’s CRM.',
    services: ['Art direction', 'Website development', 'CRM integration'],
    results: [
      { value: '3.2×', label: 'More qualified enquiries' },
      { value: '0.8s', label: 'Largest contentful paint' },
      { value: 'EN/AR', label: 'Fully bilingual' },
    ],
  },
  {
    slug: 'alderon-capital',
    title: 'Alderon Capital',
    client: 'Alderon Capital',
    year: '2026',
    sector: 'Finance',
    location: 'ADGM',
    categories: ['websites', 'apps'],
    summary: 'A restrained corporate presence and secure investor portal for a private investment firm.',
    cover: '/images/work/alderon-cover.jpg',
    gallery: ['/images/work/alderon-1.jpg', '/images/work/alderon-2.jpg'],
    challenge:
      'Investor reporting lived in emailed PDFs, and the public website did not reflect the firm’s calibre.',
    approach:
      'A quiet, typographic website paired with a role-based portal where investors access statements, documents and performance dashboards securely.',
    services: ['Website design', 'Web application', 'Security & hosting'],
    results: [
      { value: '100%', label: 'Reports delivered digitally' },
      { value: '−70%', label: 'Admin time on reporting' },
      { value: 'SSO', label: 'Secure investor access' },
    ],
  },
  {
    slug: 'mazra-fresh',
    title: 'Mazra Fresh',
    client: 'Mazra Fresh Co.',
    year: '2025',
    sector: 'Food distribution',
    location: 'UAE',
    categories: ['apps', 'automation'],
    summary: 'A B2B ordering platform connecting restaurants directly to farm inventory.',
    cover: '/images/work/mazra-cover.jpg',
    gallery: ['/images/work/mazra-1.jpg', '/images/work/mazra-2.jpg'],
    challenge:
      'Hundreds of daily orders arrived by phone and WhatsApp, causing errors, missed deliveries and slow invoicing.',
    approach:
      'We designed a fast ordering web app with live stock, recurring orders and automated invoicing synced to the accounting system.',
    services: ['Product design', 'Web application', 'Automation'],
    results: [
      { value: '85%', label: 'Orders placed online' },
      { value: '−92%', label: 'Order errors' },
      { value: '4h', label: 'Saved per day' },
    ],
  },
  {
    slug: 'northline-freight',
    title: 'Northline',
    client: 'Northline Freight',
    year: '2025',
    sector: 'Logistics',
    location: 'Abu Dhabi',
    categories: ['automation'],
    summary: 'CRM implementation and end-to-end lead automation for a regional freight forwarder.',
    cover: '/images/work/northline-cover.jpg',
    gallery: ['/images/work/northline-1.jpg', '/images/work/northline-2.jpg'],
    challenge:
      'Quote requests came from five channels and sat in shared inboxes, with no visibility of the pipeline.',
    approach:
      'We unified every channel into one CRM, automated quoting and follow-ups, and built dashboards that give management a live view of revenue.',
    services: ['Process mapping', 'CRM setup', 'Workflow automation'],
    results: [
      { value: '<5m', label: 'First response time' },
      { value: '+41%', label: 'Quote-to-win rate' },
      { value: '1', label: 'Source of truth' },
    ],
  },
  {
    slug: 'saffa-health',
    title: 'Saffa Health',
    client: 'Saffa Health',
    year: '2025',
    sector: 'Healthcare',
    location: 'Abu Dhabi',
    categories: ['uiux', 'apps'],
    summary: 'A calm, accessible booking experience for a multi-specialty outpatient clinic.',
    cover: '/images/work/saffa-cover.jpg',
    gallery: ['/images/work/saffa-1.jpg', '/images/work/saffa-2.jpg'],
    challenge:
      'Patients abandoned the old booking flow halfway through, flooding reception with calls.',
    approach:
      'Research with patients and staff led to a three-step booking journey, a reusable design system and an accessible, bilingual interface.',
    services: ['UX research', 'UI design', 'Design system'],
    results: [
      { value: '+64%', label: 'Completed bookings' },
      { value: 'AA', label: 'WCAG accessibility' },
      { value: '3', label: 'Steps to book' },
    ],
  },
  {
    slug: 'lumen-advisory',
    title: 'Lumen Advisory',
    client: 'Lumen Advisory',
    year: '2026',
    sector: 'Professional services',
    location: 'Dubai',
    categories: ['ai', 'automation'],
    summary: 'A private AI knowledge assistant trained on a decade of advisory documents.',
    cover: '/images/work/lumen-cover.jpg',
    gallery: ['/images/work/lumen-1.jpg', '/images/work/lumen-2.jpg'],
    challenge:
      'Consultants spent hours searching past reports and regulations to answer routine client questions.',
    approach:
      'We built a secure assistant with cited answers from the firm’s own library, role-based access and an evaluation suite to keep responses accurate.',
    services: ['AI strategy', 'Knowledge assistant', 'Integrations'],
    results: [
      { value: '12s', label: 'Average time to answer' },
      { value: '10y', label: 'Of knowledge searchable' },
      { value: '100%', label: 'Answers with sources' },
    ],
  },
];
