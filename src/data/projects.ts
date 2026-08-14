import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'mediapens',
    slug: 'mediapens',
    title: 'MediaPENS',
    description: 'A campus media platform developed to deliver news, information, and digital content from Politeknik Elektronika Negeri Surabaya to the campus community.',
    role: 'Backend Developer',
    technologies: ['Vue.js', 'Tailwind CSS', 'Laravel', 'PHP', 'MySQL', 'Git'],
    category: 'Web Development',
    imageUrl: '',
    githubUrl: 'https://github.com/Webmaster-ENT/backend-mediapens',
    liveUrl: 'https://media.ent.pens.ac.id/',
    keyFeatures: [
      'Backend system for managing and delivering dynamic media content.',
      'Developed and maintained backend functionality and data management for the MediaPENS platform.',
      'Collaborated with the development team in designing and implementing the application\'s backend architecture.',
      'Supported content management and data flow between the backend and frontend.'
    ]
  },
  {
    id: 'ent-crews',
    slug: 'ent-crews-website',
    title: 'ENT Crews Website',
    description: 'An organization profile website for EEPIS News and Network Team (ENT), designed to introduce the organization, showcase its activities and creative work, and provide information about its teams and members.',
    role: 'Webmaster / Backend Developer',
    technologies: ['React.js', 'Tailwind CSS', 'Laravel', 'PHP', 'MySQL', 'Git'],
    category: 'Web Development',
    imageUrl: '',
    githubUrl: 'https://github.com/Webmaster-ENT/ent-web-laravel',
    liveUrl: 'https://ent.pens.ac.id/',
    keyFeatures: [
      'Organization profile and introduction.',
      'Showcase of ENT activities, content, and creative work.',
      'Information about ENT teams and members.',
      'Responsive interface for accessing organizational information across devices.'
    ]
  },
  {
    id: 'webcut',
    slug: 'webcut',
    title: 'WebCut',
    description: 'A web-based video platform that combines video streaming with browser-based video editing, inspired by modern tools such as CapCut. The platform allows users to upload, stream, and perform basic video editing directly in the browser, with FFmpeg handling video processing on the backend.',
    role: 'Full-Stack Developer',
    technologies: ['Laravel Blade', 'Tailwind CSS', 'DaisyUI', 'Laravel', 'PHP', 'FFmpeg', 'Git'],
    category: 'Multimedia / Video Platform',
    imageUrl: '',
    githubUrl: 'https://github.com/arguspermono/web-webcut',
    keyFeatures: [
      'Video upload and streaming functionality.',
      'Browser-based video editing for basic video manipulation.',
      'FFmpeg integration for server-side video processing.',
      'Backend workflows for handling video uploads and processing.',
      'Integration between the frontend interface and backend video processing workflows.'
    ]
  },
  {
    id: 'jejaknusa',
    slug: 'jejaknusa',
    title: 'JejakNusa',
    description: 'A frontend-only tourism website showcasing destinations across the Indonesian archipelago. Built with a focus on responsive design, visual presentation, and interactive user experiences, JejakNusa highlights the beauty and diversity of Indonesian travel destinations across different devices.',
    role: 'Frontend Developer / Main Programmer',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    category: 'Web Development / Tourism',
    imageUrl: '',
    githubUrl: 'https://github.com/arguspermono/frontend-web-jejaknusa',
    liveUrl: 'https://arguspermono.github.io/frontend-web-jejaknusa',
    keyFeatures: [
      'Responsive tourism website designed for desktop and mobile devices.',
      'Interactive components and navigation using JavaScript.',
      'Destination showcase highlighting tourism spots across Indonesia.',
      'Responsive layouts implemented with Tailwind CSS.',
      'Frontend architecture focused on maintainability and consistent UI design.'
    ]
  },
  {
    id: 'memospace',
    slug: 'memospace',
    title: 'MemoSpace',
    description: 'A mobile organizational notes application built with Flutter to help users manage ideas, tasks, and important information in a structured and efficient way. MemoSpace combines rich text editing, OCR-based text extraction, and reminder notifications to provide a flexible and productivity-focused note-taking experience.',
    role: 'Mobile Developer / Backend & Feature Developer',
    technologies: ['Flutter', 'Dart', 'SQLite', 'Google ML Kit', 'Flutter Quill', 'Local Notifications'],
    category: 'Mobile Development / Productivity',
    imageUrl: '',
    keyFeatures: [
      'Create and organize notes with a rich text editor.',
      'Extract text from images using OCR with Google ML Kit.',
      'Store notes and application data locally using SQLite.',
      'Set local reminder notifications for tasks and important notes.',
      'Integrated multiple features into a cohesive cross-platform Flutter application.'
    ]
  },
  {
    id: 'waktu-jaga',
    slug: 'waktu-jaga',
    title: 'Waktu Jaga',
    description: 'A horror-comedy 3D animation project created in Blender, following a group of students who secretly enter an abandoned hospital and encounter a mysterious guardian spirit known as \'Pak Jaga\'. The project combines an eerie atmosphere with comedic storytelling to create a distinctive contrast between horror and humor.',
    role: '3D Artist / Character Artist',
    technologies: ['Blender', 'Mixamo'],
    category: '3D / Animation / Multimedia',
    imageUrl: '',
    liveUrl: 'https://youtu.be/kMyN6wCc6BM?si=cT_9r6DOmQgaaoct',
    keyFeatures: [
      'Designed and developed Dodi, one of the main characters, including his distinctive red-haired appearance.',
      'Contributed to the development and composition of the final ending scene.',
      'Applied 3D modeling and character design techniques using Blender.',
      'Contributed to cinematic scene composition and visual storytelling.',
      'Explored the combination of horror atmosphere and comedic storytelling through 3D animation.'
    ]
  }
];
