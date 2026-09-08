import React from 'react';
import { experiences, education } from '../../data/experience';
import { skills } from '../../data/skills';
import { certifications } from '../../data/certifications';

export function AtsResume() {
  return (
    <div className="font-sans font-medium text-black bg-white max-w-[800px] mx-auto text-sm leading-normal p-8">
      <style type="text/css" media="print">
        {`
          @page { size: auto;  margin: 0mm; }
        `}
      </style>
      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">Arya Bagus</h1>
        <p className="text-base mb-1">Surabaya, Indonesia</p>
        <p className="text-sm">
          <a href="mailto:aryabagus@example.com" className="text-black no-underline hover:underline">Email</a> •{' '}
          <a href="https://linkedin.com/in/aryabagus" className="text-black no-underline hover:underline">LinkedIn</a> •{' '}
          <a href="https://github.com/aryabagus" className="text-black no-underline hover:underline">GitHub</a>
        </p>
      </div>

      {/* SUMMARY (Optional, can be removed or modified) */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-2 pb-1">Professional Summary</h2>
        <p>
          I'm a Multimedia Engineering Technology student with experience in web and mobile development, 
          and a growing interest in data science, machine learning, and artificial intelligence. 
          Dedicated to building digital experiences through code and creativity.
        </p>
      </div>

      {/* EXPERIENCE */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-3 pb-1">Experience</h2>
        {experiences.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-base">{exp.role}</h3>
              <span className="text-sm font-semibold whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
            </div>
            <div className="italic mb-2">{exp.company}</div>
            <ul className="list-disc list-inside space-y-1">
              {exp.responsibilities.map((resp, index) => (
                <li key={index} className="pl-2 -indent-2 ml-2">{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-3 pb-1">Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-base">{edu.degree}</h3>
              <span className="text-sm font-semibold whitespace-nowrap">{edu.startDate} - {edu.endDate}</span>
            </div>
            <div className="italic mb-2">{edu.institution}</div>
            <ul className="list-disc list-inside space-y-1">
              {edu.details.map((detail, index) => (
                <li key={index} className="pl-2 -indent-2 ml-2">{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SKILLS */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-3 pb-1">Skills</h2>
        <div className="space-y-2">
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
        <div>
          <h2 className="text-lg font-bold uppercase border-b-2 border-black mb-3 pb-1">Certifications & Awards</h2>
          <ul className="list-disc list-inside space-y-1">
            {certifications.map((cert) => (
              <li key={cert.id} className="pl-2 -indent-2 ml-2">
                <span className="font-bold">{cert.title}</span> - {cert.issuer} ({cert.date})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
