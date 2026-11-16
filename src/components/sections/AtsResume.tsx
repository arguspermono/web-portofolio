import { certifications } from '../../data/certifications';
import { education, experiences } from '../../data/experience';
import { skills } from '../../data/skills';

const contactLinks = [
  {
    label: import.meta.env.VITE_EMAIL || 'aryabaguspermono@gmail.com',
    href: `mailto:${import.meta.env.VITE_EMAIL || 'aryabaguspermono@gmail.com'}`,
  },
  {
    label: import.meta.env.VITE_LINKEDIN || 'linkedin.com/in/arya-bagus',
    href: import.meta.env.VITE_LINKEDIN || 'https://www.linkedin.com/in/arya-bagus/',
  },
  {
    label: import.meta.env.VITE_GITHUB || 'github.com/arguspermono',
    href: import.meta.env.VITE_GITHUB || 'https://github.com/arguspermono',
  },
];

const featuredProjects = [
  {
    name: 'MediaPENS',
    role: 'Backend Developer',
    detail: 'Developed and maintained backend functionality and data management for a campus media platform.',
    stack: 'Laravel, PHP, MySQL, Vue.js',
  },
  {
    name: 'ENT Crews Website',
    role: 'Webmaster / Backend Developer',
    detail: 'Built an organization profile website presenting ENT activities, creative work, teams, and members.',
    stack: 'Laravel, PHP, MySQL, React',
  },
  {
    name: 'MemoSpace',
    role: 'Mobile Developer',
    detail: 'Developed a Flutter notes app with rich-text editing, OCR text extraction, local storage, and reminders.',
    stack: 'Flutter, Dart, SQLite, Google ML Kit',
  },
];

export function AtsResume({ previewScale = 1 }: { previewScale?: number }) {
  const orderedExperiences = [...experiences].reverse();

  return (
    <article
      className="ats-resume-page box-border h-[297mm] w-[210mm] shrink-0 overflow-hidden bg-white px-[12mm] py-[10mm] font-[Arial,Helvetica,sans-serif] text-[9pt] font-normal leading-[1.12] text-black"
      style={{
        transform: previewScale === 1 ? undefined : `scale(${previewScale})`,
        transformOrigin: 'top left',
      }}
      aria-label="A4 resume"
    >
      <style type="text/css" media="print">
        {`
          @page { size: A4 portrait; margin: 0; }
          .ats-resume-page { break-after: avoid; page-break-after: avoid; }
          .ats-resume-section { break-inside: avoid; page-break-inside: avoid; }
        `}
      </style>

      <header className="ats-resume-section mb-[4mm] text-center">
        <h1 className="mb-[1mm] text-[20pt] font-bold uppercase leading-none tracking-wide text-black">
          Arya Bagus Permono
        </h1>
        <p className="mb-[1mm] text-[9pt] leading-tight">Multimedia Engineering Technologist | Surabaya, Indonesia</p>
        <p className="text-[8pt] leading-tight">
          {contactLinks.map((contact, index) => (
            <span key={contact.href}>
              {index > 0 && ' | '}
              <a className="break-all text-black no-underline" href={contact.href}>
                {contact.label}
              </a>
            </span>
          ))}
        </p>
      </header>

      <section className="ats-resume-section mb-[2.5mm]">
        <h2 className="mb-[1mm] border-b border-black pb-[0.5mm] text-[10pt] font-bold uppercase leading-tight text-black">
          Professional Summary
        </h2>
        <p className="text-[9pt] leading-[1.12]">
          Multimedia Engineering Technology student at Politeknik Elektronika Negeri Surabaya with experience in
          backend development, web platforms, and Flutter applications. Team leader and webmaster at EEPIS News
          and Network Team, with additional work in 3D multimedia and an interest in data science and applied AI.
        </p>
      </section>

      <section className="ats-resume-section mb-[2.5mm]">
        <h2 className="mb-[1mm] border-b border-black pb-[0.5mm] text-[10pt] font-bold uppercase leading-tight text-black">
          Experience
        </h2>
        {orderedExperiences.map((experience) => (
          <div key={experience.id} className="mb-[1.5mm] last:mb-0">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[9pt] font-bold leading-tight text-black">{experience.role}</h3>
              <span className="shrink-0 text-[8pt] leading-tight">
                {experience.startDate} – {experience.endDate}
              </span>
            </div>
            <p className="mb-[0.5mm] text-[8pt] italic leading-tight">{experience.company}</p>
            <ul className="list-disc pl-[4mm] text-[8pt] leading-[1.1]">
              {experience.responsibilities.map((responsibility) => (
                <li key={responsibility} className="pl-[0.5mm]">{responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="ats-resume-section mb-[2.5mm]">
        <h2 className="mb-[1mm] border-b border-black pb-[0.5mm] text-[10pt] font-bold uppercase leading-tight text-black">
          Selected Projects
        </h2>
        {featuredProjects.map((project) => (
          <div key={project.name} className="mb-[1mm] last:mb-0">
            <p className="text-[8pt] leading-tight">
              <strong>{project.name}</strong> | {project.role} — {project.detail}
            </p>
            <p className="text-[7.5pt] leading-tight text-neutral-700">Technologies: {project.stack}</p>
          </div>
        ))}
      </section>

      <section className="ats-resume-section mb-[2.5mm]">
        <h2 className="mb-[1mm] border-b border-black pb-[0.5mm] text-[10pt] font-bold uppercase leading-tight text-black">
          Education
        </h2>
        {education.map((item) => (
          <div key={item.institution} className="mb-[1.5mm] last:mb-0">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[9pt] font-bold leading-tight text-black">{item.degree}</h3>
              <span className="shrink-0 text-[8pt] leading-tight">
                {item.startDate} – {item.endDate}
              </span>
            </div>
            <p className="text-[8pt] italic leading-tight">{item.institution}</p>
            <p className="text-[7.5pt] leading-tight">{item.details.join(' • ')}</p>
          </div>
        ))}
      </section>

      <section className="ats-resume-section mb-[2.5mm]">
        <h2 className="mb-[1mm] border-b border-black pb-[0.5mm] text-[10pt] font-bold uppercase leading-tight text-black">
          Skills
        </h2>
        <p className="text-[8pt] leading-[1.12]">
          {skills.map((category, index) => (
            <span key={category.title}>
              {index > 0 && ' | '}
              <strong>{category.title}:</strong> {category.skills.join(', ')}
            </span>
          ))}
        </p>
      </section>

      <section className="ats-resume-section">
        <h2 className="mb-[1mm] border-b border-black pb-[0.5mm] text-[10pt] font-bold uppercase leading-tight text-black">
          Certifications
        </h2>
        <ul className="list-disc pl-[4mm] text-[7.5pt] leading-[1.1]">
          {certifications.slice(0, 6).map((certification) => (
            <li key={certification.id} className="pl-[0.5mm]">
              {certification.title} — {certification.organization} ({certification.date})
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
