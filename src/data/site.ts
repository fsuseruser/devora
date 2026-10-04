/**
 * ─────────────────────────────────────────────────────────────
 *  DEVORA & Co. — one-file site configuration
 *  Edit company details, navigation, contact info and homepage
 *  copy here. Projects live in ./projects.ts, services in ./services.ts.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: 'DEVORA & Co.',
  shortName: 'DEVORA',
  tagline: 'Beyond the Ordinary.',
  url: 'https://devora.co', // ← change to your real domain
  description:
    'DEVORA & Co. is an Abu Dhabi digital studio designing and developing premium websites, web applications and custom business systems for modern companies.',
  email: 'hello@devora.co',
  phone: '+971 52 807 4947',
  whatsapp: '971528074947', // digits only, used for wa.me link
  address: {
    line1: 'Al Maryah Island',
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
  },
  /** Form handler URL (e.g. Formspree, Basin, Web3Forms). Leave empty to fall back to an email draft. */
  formEndpoint: '',
  hours: 'Sun – Thu · 9:00 – 18:00 GST',
  timezone: 'Asia/Dubai',
  founded: 2024,
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
  ],
  nav: [
    { label: 'Work', href: '/work/' },
    { label: 'Services', href: '/services/' },
    { label: 'Studio', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
  /** Homepage hero — the three frames that re-compose on scroll */
  hero: {
    eyebrow: 'Digital studio · Abu Dhabi',
    lines: ['Beyond', 'the ordinary.'],
    intro:
      'We design and engineer premium websites, web applications and business systems for companies that refuse to look — or work — like everyone else.',
    frames: {
      left: { src: '/images/site/hero-left.jpg', alt: 'Light falling across a stone wall' },
      center: { src: '/images/site/hero-center.jpg', alt: 'Glass facade at dusk' },
      right: { src: '/images/site/hero-right.jpg', alt: 'The DEVORA orbit' },
    },
  },
  statement:
    'Every pixel, every interaction and every line of code is considered — so your digital presence feels as deliberate as the business behind it.',
  /** Replace with your own verified figures as the studio grows */
  stats: [
    { value: '06', label: 'Core disciplines under one roof' },
    { value: '100%', label: 'Custom-built — no off-the-shelf themes' },
    { value: '<1s', label: 'Target load time on every build' },
    { value: '24h', label: 'Support response window' },
  ],
  process: [
    {
      n: '01',
      title: 'Discover',
      text: 'Workshops, audits and research to understand your business, your users and what success really looks like.',
      image: '/images/site/process-1.jpg',
    },
    {
      n: '02',
      title: 'Design',
      text: 'Strategy becomes structure. We craft interfaces, systems and prototypes you can see, test and refine.',
      image: '/images/site/process-2.jpg',
    },
    {
      n: '03',
      title: 'Develop',
      text: 'Clean, performant engineering — integrated with the tools your team already relies on.',
      image: '/images/site/process-3.jpg',
    },
    {
      n: '04',
      title: 'Evolve',
      text: 'Launch is the start. We measure, maintain and improve so your platform keeps getting better.',
      image: '/images/site/process-4.jpg',
    },
  ],
  principles: [
    { title: 'Craft over templates', text: 'Every build is designed from first principles around your brand and your customers.' },
    { title: 'Performance is design', text: 'Fast, accessible and search-ready by default — because beauty that loads slowly isn’t beautiful.' },
    { title: 'Systems, not pages', text: 'We build foundations your team can grow: components, CMS and automations that scale.' },
    { title: 'Partners, not vendors', text: 'Direct access to the people designing and building your product, from kickoff to long after launch.' },
  ],
};

export type Site = typeof site;
