import type { Experience, Education } from '../types';

export const experiences: Experience[] = [
  {
    id: 'pv-globalindo',
    role: 'Backend Developer',
    company: 'PT. Prima Visi Globalindo',
    startDate: 'Jan 2022',
    endDate: 'Jun 2023',
    responsibilities: [
      'Developed a simple website using frameworks and programming languages learned during the internship.',
      'Learned and explored the implementation of ERP systems in website development.',
      'Simulated the implementation of a Document Management System (DMS) as part of a website project.'
    ]
  },
  {
    id: 'ent-leader',
    role: 'Team Leader',
    company: 'EEPIS News and Network Team (ENT), Politeknik Elektronika Negeri Surabaya',
    startDate: 'Nov 2025',
    endDate: 'Present',
    responsibilities: [
      'Lead and oversee the team\'s operations in news coverage, content production, and editing.',
      'Make strategic decisions and ensure programs are carried out according to organizational goals.',
      'Monitor and evaluate team performance to improve quality, productivity, and effectiveness.'
    ]
  },
  {
    id: 'ent-webmaster',
    role: 'Webmaster / Backend Developer',
    company: 'EEPIS News and Network Team (ENT), Politeknik Elektronika Negeri Surabaya',
    startDate: 'Sep 2024',
    endDate: 'Present',
    responsibilities: [
      'Develop and maintain backend functionality and data management for the organization\'s website.',
      'Collaborate with the team in developing a microservice-based architecture for the campus media website and organization profile.',
      'Coordinate with team members and provide regular weekly progress updates.'
    ]
  }
];

export const education: Education[] = [
  {
    id: 'pens',
    degree: 'Bachelor of Applied Science in Multimedia Engineering Technology',
    institution: 'Politeknik Elektronika Negeri Surabaya (PENS)',
    startDate: 'Jul 2024',
    endDate: 'Expected Oct 2028',
    details: [
      'Multimedia Engineering',
      'Web Development',
      'Data Science',
      'Machine Learning',
      'Artificial Intelligence',
      'Selected as Team Leader of EEPIS News and Network Team (ENT), 2025–2026'
    ]
  },
  {
    id: 'smkn2',
    degree: 'Software Engineering',
    institution: 'SMKN 2 Surabaya',
    startDate: 'Jul 2021',
    endDate: 'May 2024',
    details: [
      'Software Development',
      'Web Development',
      'Robotics',
      '1st Place — Industrial Layout Design Competition 2022, Universitas Muhammadiyah Surabaya'
    ]
  }
];
