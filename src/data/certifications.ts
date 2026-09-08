export interface Certification {
  id: string;
  title: string;
  organization: string;
  date: string;
  imageUrl: string;
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    id: 'cert-6',
    title: 'Study Case Bootcamp Data Analyst with SQL & Python',
    organization: 'DQLab',
    date: '28 Juli 2026',
    imageUrl: '',
  },
  {
    id: 'cert-7',
    title: 'Study Case Bootcamp Machine learning & AI for Beginner',
    organization: 'DQLab',
    date: '28 Juli 2026',
    imageUrl: '',
  },
  {
    id: 'cert-5',
    title: 'Study Case Bootcamp Data Analyst with Excel',
    organization: 'DQLab',
    date: '25 Juli 2026',
    imageUrl: '',
  },
  {
    id: 'cert-3',
    title: 'Belajar Dasar Structured Query Language (SQL)',
    organization: 'Dicoding Indonesia',
    date: '31 Mei 2026',
    imageUrl: '',
  },
  {
    id: 'cert-10',
    title: 'Introduction to Generative AI',
    organization: 'IBM SkillsBuild',
    date: '31 Mei 2026',
    imageUrl: '',
  },
  {
    id: 'cert-8',
    title: 'AI Ethics',
    organization: 'IBM SkillsBuild',
    date: '30 Mei 2026',
    imageUrl: '',
  },
  {
    id: 'cert-2',
    title: 'Belajar Dasar Data Science',
    organization: 'Dicoding Indonesia',
    date: '29 Mei 2026',
    imageUrl: '',
  },
  {
    id: 'cert-9',
    title: 'Introduction to Artificial Intelligence',
    organization: 'IBM SkillsBuild',
    date: '28 Mei 2026',
    imageUrl: '',
  },
  {
    id: 'cert-4',
    title: 'Introduction to Financial Literacy',
    organization: 'Dicoding Indonesia',
    date: '13 Mei 2026',
    imageUrl: '',
  },
  {
    id: 'cert-11',
    title: 'Dasar dan Penggunaan Dasar Generatif AI',
    organization: 'IBM SkillsBuild',
    date: '15 Februari 2026',
    imageUrl: '',
  }
];
