// Data: projects and skills for Gayatri Kashyap's portfolio

export interface Project {
  id: string
  number: string
  icon: string
  title: string
  description: string
  tags: { label: string; color?: string }[]
  role: string
  period: string
}

export const projects: Project[] = [
  {
    id: 'taqa',
    number: '01',
    icon: '⚡',
    title: 'TAQA Platform',
    description:
      'A comprehensive energy-management and asset-lifecycle platform built for enterprise scale. Features real-time dashboards, RBAC-based access control, JWT-secured APIs, and multi-tenant architecture — serving operational teams across the energy sector.',
    tags: [
      { label: 'React' },
      { label: 'TypeScript' },
      { label: 'Node.js', color: 'blue' },
      { label: 'Express', color: 'blue' },
      { label: 'PostgreSQL', color: 'teal' },
      { label: 'JWT / OAuth2', color: 'pink' },
      { label: 'RBAC', color: 'pink' },
    ],
    role: 'Full-Stack Developer',
    period: '2024',
  },
  {
    id: 'workraze',
    number: '02',
    icon: '🚀',
    title: 'WorkRaze',
    description:
      'A modern workforce and project management SaaS platform. Includes sprint planning, task tracking, team analytics, and a notification engine — built with a Next.js frontend and a scalable REST backend secured with OAuth2.',
    tags: [
      { label: 'Next.js' },
      { label: 'React' },
      { label: 'Node.js', color: 'blue' },
      { label: 'MongoDB', color: 'teal' },
      { label: 'Docker', color: 'blue' },
      { label: 'REST API', color: 'pink' },
      { label: 'OAuth2', color: 'pink' },
    ],
    role: 'Full-Stack Developer',
    period: '2024',
  },
]

export interface SkillCategory {
  id: string
  icon: string
  title: string
  skills: string[]
  accentVar: string
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    icon: '{ }',
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'SQL'],
    accentVar: '--purple-400',
  },
  {
    id: 'frameworks',
    icon: '⚛️',
    title: 'Frameworks',
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'],
    accentVar: '--blue-400',
  },
  {
    id: 'tools',
    icon: '🛠',
    title: 'Tools & Databases',
    skills: ['MongoDB', 'PostgreSQL', 'Docker', 'Git', 'Postman'],
    accentVar: '--teal-400',
  },
  {
    id: 'concepts',
    icon: '💡',
    title: 'Concepts',
    skills: ['REST API', 'JWT / OAuth2',],
    accentVar: '--pink-400',
  },
]
