import photo from '../assets/photo.png';

// PLACEHOLDER VALUES: replace with the owner's real details (ticket 06).
// The same name, title and bio must appear identically on LinkedIn and GitHub.
export const site = {
  name: 'Firstname Lastname',
  jobTitle: 'Product engineer',
  positioningLine: 'Product engineer building production AI agents. Rails conference speaker.',
  // Plain entity sentence: Home opens with it, and it is echoed in the meta description and JSON-LD.
  entitySentence:
    'Firstname Lastname is a product engineer building production AI agents, a longtime Rails developer and conference speaker.',
  bio: 'Placeholder bio. Two or three sentences about what I build, what I have shipped, and where I have spoken go here.',
  photo,
  photoAlt: 'Portrait of Firstname Lastname',
  email: 'hello@example.com',
  linkedin: 'https://www.linkedin.com/in/placeholder',
  github: 'https://github.com/placeholder',
  calendarUrl: undefined as string | undefined,
  // Profile URLs the owner controls; at least LinkedIn and GitHub.
  sameAs: ['https://www.linkedin.com/in/placeholder', 'https://github.com/placeholder'],
  // Add alternateName in JSON-LD only once a handle exists.
  handle: undefined as string | undefined,
};

export const pageTitle = (page: string) => `${page} - ${site.name}`;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Resume', href: '/resume' },
  { label: 'Projects', href: '/projects' },
  { label: 'Talks', href: '/talks' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;
