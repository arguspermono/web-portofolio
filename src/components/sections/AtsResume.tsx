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

function ResumePage({
  pageNumber,
  previewScale,
  children,
}: {
  pageNumber: number;
  previewScale: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="ats-resume-page-frame"
      style={{
        width: `${210 * previewScale}mm`,
        height: `${297 * previewScale}mm`,
      }}
    >
      <article
        className="ats-resume-page box-border h-[297mm] w-[210mm] bg-white px-[12mm] py-[10mm] text-[9pt] font-normal leading-[1.25] text-black"
        style={{
          transform: previewScale === 1 ? undefined : `scale(${previewScale})`,
          transformOrigin: 'top left',
        }}
        aria-label={`A4 resume page ${pageNumber}`}
      >
        {children}
      </article>
    </div>
  );
}

export function AtsResume({ previewScale = 1 }: { previewScale?: number }) {
  const orderedExperiences = [...experiences].reverse();

  return (
    <div
      className="ats-resume-document"
      style={{
        width: `${210 * previewScale}mm`,
      }}
    >
      <style type="text/css" media="print">
        {`
          @page { size: A4 portrait; margin: 0; }
          .ats-resume-document { display: block !important; width: 210mm !important; }
          .ats-resume-page-frame {
            width: 210mm !important;
            height: 297mm !important;
            break-after: page;
            page-break-after: always;
          }
          .ats-resume-page-frame:last-child {
            break-after: auto;
            page-break-after: auto;
          }
          .ats-resume-page { transform: none !important; }
          .ats-resume-section { break-inside: avoid; page-break-inside: avoid; }
        `}
      </style>

      <ResumePage pageNumber={1} previewScale={previewScale}>
        <header className="ats-resume-section mb-[4mm] text-center">
          <h1 className="mb-[1.5mm] text-[18pt] font-bold uppercase leading-none tracking-wide text-black">
            Arya Bagus Permono
          </h1>
          <p className="mb-[1mm] text-[9pt] leading-tight">
            Multimedia Engineering Technologist | Surabaya, Indonesia
          </p>
          <p className="text-[8.5pt] leading-[1.25]">
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

        <section className="ats-resume-section mb-[3mm]">
          <h2 className="ats-resume-heading">Professional Summary</h2>
          <p className="ats-resume-body">
            Multimedia Engineering Technology student at Politeknik Elektronika Negeri Surabaya with experience in
            backend development, web platforms, and Flutter applications. Team leader and webmaster at EEPIS News
            and Network Team, with additional work in 3D multimedia and an interest in data science and applied AI.
          </p>
        </section>

        <section className="ats-resume-section">
          <h2 className="ats-resume-heading">Experience</h2>
          {orderedExperiences.map((experience) => (
            <div key={experience.id} className="mb-[2.5mm] last:mb-0">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[9.5pt] font-bold leading-tight text-black">{experience.role}</h3>
                <span className="shrink-0 text-[8.5pt] leading-tight">
                  {experience.startDate} – {experience.endDate}
                </span>
              </div>
              <p className="mb-[0.7mm] text-[8.5pt] italic leading-tight">{experience.company}</p>
              <ul className="list-disc pl-[4mm] text-[9pt] leading-[1.25]">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="pl-[0.5mm]">{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="ats-resume-section mb-[3mm] mt-[3mm]">
          <h2 className="ats-resume-heading">Selected Projects</h2>
          {featuredProjects.map((project) => (
            <div key={project.name} className="mb-[2mm] last:mb-0">
              <p className="ats-resume-body">
                <strong>{project.name}</strong> | {project.role} — {project.detail}
              </p>
              <p className="text-[8.5pt] leading-[1.2] text-neutral-700">
                Technologies: {project.stack}
              </p>
            </div>
          ))}
        </section>

        <section className="ats-resume-section mb-[3mm]">
          <h2 className="ats-resume-heading">Education</h2>
          {education.map((item) => (
            <div key={item.institution} className="mb-[2.5mm] last:mb-0">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[9.5pt] font-bold leading-tight text-black">{item.degree}</h3>
                <span className="shrink-0 text-[8.5pt] leading-tight">
                  {item.startDate} – {item.endDate}
                </span>
              </div>
              <p className="text-[8.5pt] italic leading-tight">{item.institution}</p>
              <p className="text-[9pt] leading-[1.25]">{item.details.join(' • ')}</p>
            </div>
          ))}
        </section>

        <section className="ats-resume-section mb-[3mm]">
          <h2 className="ats-resume-heading">Skills</h2>
          <p className="ats-resume-body">
            {skills.map((category, index) => (
              <span key={category.title}>
                {index > 0 && ' | '}
                <strong>{category.title}:</strong> {category.skills.join(', ')}
              </span>
            ))}
          </p>
        </section>

        <section className="ats-resume-section">
          <h2 className="ats-resume-heading">Certifications</h2>
          <ul className="list-disc pl-[4mm] text-[9pt] leading-[1.25]">
            {certifications.slice(0, 6).map((certification) => (
              <li key={certification.id} className="pl-[0.5mm]">
                {certification.title} — {certification.organization} ({certification.date})
              </li>
            ))}
          </ul>
        </section>
      </ResumePage>
    </div>
  );
}
