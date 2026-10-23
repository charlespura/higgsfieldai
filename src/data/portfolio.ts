// Fictional example content only. Replace these values to personalize the template.
export const profile = {
  firstName: 'Alex',
  lastName: 'Example',
  name: 'Alex Example',
  role: 'Full-Stack Developer & Designer',
  location: 'Example City',
  employer: 'Example Studio',
  jobTitle: 'Example Developer',
  education: {
    degree: 'Example Degree in Computer Science',
    institution: 'Example University',
    specialization: 'Example specialization in software systems',
  },
}

// Reserved example address; replace it before using the form for real inquiries.
export const email = 'hello@example.com'

export type Category = 'All work' | 'Web systems' | 'Mobile & IoT' | 'Creative'
export const categories: Category[] = ['All work', 'Web systems', 'Mobile & IoT', 'Creative']

export const projects = [
  {
    id: 'hotel',
    number: '01',
    name: 'StayFlow Demo',
    subtitle: 'Example hospitality workspace',
    category: 'Mobile & IoT' as Category,
    tags: ['Example web app', 'Mobile concept', 'Connected devices'],
    description: 'A fictional hospitality project demonstrating connected workflows.',
    detail:
      'StayFlow Demo is a fictional case study for this template. It illustrates how a hospitality workspace could connect a web dashboard, a mobile interface, and a device integration. It does not represent a real client or delivered product.',
    focus: [
      'Example staff workflows',
      'Sample web and mobile interfaces',
      'Concept device integration',
    ],
    accent: 'cyan',
    asset: '/assets/project-hotel.webp',
  },
  {
    id: 'space',
    number: '02',
    name: 'Orbit Explorer Demo',
    subtitle: 'Example interactive space portfolio',
    category: 'Creative' as Category,
    tags: ['3D concept', 'Creative development', 'Example portfolio'],
    description: 'A fictional space-themed portfolio concept for creative web development.',
    detail:
      'Orbit Explorer Demo is an illustrative portfolio concept. It demonstrates how an interactive space environment could frame a developer’s work. All project details are sample content.',
    focus: ['Example 3D presentation', 'Concept interactions', 'Sample visual storytelling'],
    accent: 'violet',
    asset: '/assets/project-space.webp',
  },
  {
    id: 'links',
    number: '03',
    name: 'LinkHub Demo',
    subtitle: 'Example personal links platform',
    category: 'Web systems' as Category,
    tags: ['Example web platform', 'Link organization', 'Interface concept'],
    description: 'A fictional links page that demonstrates a focused digital profile.',
    detail:
      'LinkHub Demo is a sample project for presenting a personal links platform. Its interface and feature descriptions are illustrative and do not refer to a real service or client.',
    focus: ['Example link organization', 'Sample profile layout', 'Concept interface design'],
    accent: 'blue',
    asset: '/assets/project-links.webp',
  },
  {
    id: 'client',
    number: '04',
    name: 'Project Desk Demo',
    subtitle: 'Example project operations dashboard',
    category: 'Web systems' as Category,
    tags: ['Example dashboard', 'Task workflows', 'Sample billing'],
    description: 'A fictional dashboard concept for organizing projects and sample invoices.',
    detail:
      'Project Desk Demo is an example business dashboard. It demonstrates task organization and billing workflows. No real client records, payment data, or delivery claims are included.',
    focus: ['Sample project organization', 'Example billing workflow', 'Concept task tracking'],
    accent: 'amber',
    asset: '/assets/project-client.webp',
  },
]

export type Project = (typeof projects)[number]

export const credentials = [
  {
    code: 'AI / 01',
    title: 'Prompt Engineering Basics',
    issuer: 'Example Learning Academy',
    description: 'A fictional learning entry showing how to present AI workflow coursework.',
    type: 'Example AI course',
  },
  {
    code: 'SEC / 02',
    title: 'Web Security Foundations',
    issuer: 'Example Security School',
    description: 'A fictional credential demonstrating a security-focused learning card.',
    type: 'Example security course',
  },
  {
    code: 'DATA / 03',
    title: 'Data Systems Essentials',
    issuer: 'Example Data Institute',
    description: 'A fictional course entry demonstrating a data systems learning summary.',
    type: 'Example data course',
  },
]
