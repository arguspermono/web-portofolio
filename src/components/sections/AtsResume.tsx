import React from 'react';
import { experiences, education } from '../../data/experience';
import { skills } from '../../data/skills';
import { certifications } from '../../data/certifications';

export function AtsResume() {
  return (
    <div className="font-[Arial,Helvetica,sans-serif] font-medium text-black bg-white max-w-[210mm] mx-auto text-[11pt] leading-[1.15] p-[0.65in] print:p-0">
      <style type="text/css" media="print">
        {`
          @page { size: A4 portrait; margin: 0.65in; }
          /* Extra safeguards for print formatting */
          h2 { break-after: avoid; page-break-after: avoid; }
          .avoid-break { break-inside: avoid; page-break-inside: avoid; }
        `}
      </style>
      {/* HEADER */}
      <div className="text-center mb-[12px] avoid-break">
        <h1 className="text-[22pt] font-bold uppercase tracking-wider mb-[4px]">Arya Bagus Permono</h1>
        <p className="text-[11pt] mb-[2px]">Surabaya, Indonesia</p>
        <p className="text-[11pt]">
          <a href={`mailto:${import.meta.env.VITE_EMAIL}`} className="text-black no-underline hover:underline">{import.meta.env.VITE_EMAIL}</a> •{' '}
          <a href={import.meta.env.VITE_LINKEDIN} className="text-black no-underline hover:underline">{import.meta.env.VITE_LINKEDIN}</a> •{' '}
          <a href={import.meta.env.VITE_GITHUB} className="text-black no-underline hover:underline">{import.meta.env.VITE_GITHUB}</a>
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mb-[12px] avoid-break">
        <h2 className="text-[13pt] font-bold uppercase border-b-[1.5px] border-black mb-[4px] pb-[2px] break-after-avoid">Professional Summary</h2>
        <p className="text-justify">
          I'm a Multimedia Engineering Technology student with experience in web and mobile development, 
          and a growing interest in data science, machine learning, and artificial intelligence. 
          Dedicated to building digital experiences through code and creativity.
        </p>
      </div>

      {/* EXPERIENCE */}
      <div className="mb-[12px]">
        <h2 className="text-[13pt] font-bold uppercase border-b-[1.5px] border-black mb-[4px] pb-[2px] break-after-avoid">Experience</h2>
        {experiences.map((exp) => (
          <div key={exp.id} className="mb-[10px] avoid-break">
            <div className="flex justify-between items-baseline mb-[2px]">
              <h3 className="font-bold text-[11pt]">{exp.role}</h3>
              <span className="text-[11pt] whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
            </div>
            <div className="italic mb-[4px]">{exp.company}</div>
            <ul className="list-disc list-outside ml-4 space-y-[2px]">
              {exp.responsibilities.map((resp, index) => (
                <li key={index} className="pl-1">{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div className="mb-[12px]">
        <h2 className="text-[13pt] font-bold uppercase border-b-[1.5px] border-black mb-[4px] pb-[2px] break-after-avoid">Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-[10px] avoid-break">
            <div className="flex justify-between items-baseline mb-[2px]">
              <h3 className="font-bold text-[11pt]">{edu.degree}</h3>
              <span className="text-[11pt] whitespace-nowrap">{edu.startDate} - {edu.endDate}</span>
            </div>
            <div className="italic mb-[4px]">{edu.institution}</div>
            <ul className="list-disc list-outside ml-4 space-y-[2px]">
              {edu.details.map((detail, index) => (
                <li key={index} className="pl-1">{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SKILLS */}
      <div className="mb-[12px] avoid-break">
        <h2 className="text-[13pt] font-bold uppercase border-b-[1.5px] border-black mb-[4px] pb-[2px] break-after-avoid">Skills</h2>
        <div className="space-y-[2px]">
          {skills.map((skillGroup, index) => (
            <div key={index}>
              <span className="font-bold">{skillGroup.title}: </span>
              <span>{skillGroup.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <div className="avoid-break mb-[12px]">
          <h2 className="text-[13pt] font-bold uppercase border-b-[1.5px] border-black mb-[4px] pb-[2px] break-after-avoid">Certifications & Awards</h2>
          <ul className="list-disc list-outside ml-4 space-y-[2px]">
            {certifications.map((cert) => (
              <li key={cert.id} className="pl-1">
                <span className="font-bold">{cert.title}</span> - {cert.issuer} ({cert.date})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
