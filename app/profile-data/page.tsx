import { professionalProfile, starExamples, additionalContent } from '@/lib/profile-data';

export default function ProfileDataPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-white mb-6">Professional Profile Data</h1>
        <p className="text-xl text-gray-400 mb-12">Structured professional content organized using STAR methodology</p>

        {/* Profile Summary */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Profile Summary</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{professionalProfile.name}</h3>
              <p className="text-blue-400 font-medium">{professionalProfile.title}</p>
            </div>
            <p className="text-gray-300 leading-relaxed">{professionalProfile.summary}</p>
            
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📧 {professionalProfile.contact.email}</p>
                  <p>💼 {professionalProfile.contact.linkedin}</p>
                  <p>🔗 {professionalProfile.contact.github}</p>
                  <p>📍 {professionalProfile.contact.location}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {professionalProfile.certifications.map((cert, idx) => (
                    <li key={idx}>✓ {cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(professionalProfile.skills).map(([category, skills]) => (
              <div key={category} className="border border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(skills as string[]).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Work Experience</h2>
          <div className="space-y-6">
            {professionalProfile.experiences.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <p>{exp.duration}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                      <span className="text-green-400 font-bold mt-1">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* STAR Examples */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">STAR Methodology Examples</h2>
          <p className="text-gray-400 mb-6">{starExamples.length} detailed examples demonstrating professional competencies using the Situation, Task, Action, Result framework</p>

          <div className="space-y-6">
            {starExamples.map((star, index) => (
              <div key={star.id} className="border border-gray-700 rounded-lg p-6 hover:border-blue-600 transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm font-medium">{star.category}</span>
                    <h3 className="text-lg font-semibold text-white mt-2">Example #{index + 1}</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-900 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-200 mb-2">📍 Situation</h4>
                    <p className="text-gray-300 text-sm">{star.situation}</p>
                  </div>

                  <div className="bg-green-900 rounded-lg p-4">
                    <h4 className="font-semibold text-green-200 mb-2">🎯 Task</h4>
                    <p className="text-gray-300 text-sm">{star.task}</p>
                  </div>

                  <div className="bg-purple-900 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-200 mb-2">⚡ Action</h4>
                    <p className="text-gray-300 text-sm">{star.action}</p>
                  </div>

                  <div className="bg-yellow-900 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-200 mb-2">🏆 Result</h4>
                    <p className="text-gray-300 text-sm">{star.result}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-xs font-medium text-gray-400">Skills:</span>
                    {star.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs">{skill}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-gray-400">Keywords:</span>
                    {star.keywords.map((keyword, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-900 text-blue-200 rounded text-xs">{keyword}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Content */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Additional Profile Content</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalContent.map((content) => (
              <div key={content.id} className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{content.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{content.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Education</h2>
          {professionalProfile.education.map((edu, idx) => (
            <div key={idx} className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
              <p className="text-purple-400 font-medium">{edu.institution}</p>
              <p className="text-gray-400 text-sm mt-1">Graduated {edu.year} • GPA: {edu.gpa}</p>
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-300 mb-2">Relevant Courses:</p>
                <div className="flex flex-wrap gap-2">
                  {edu.relevant_courses.map((course, cidx) => (
                    <span key={cidx} className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm">{course}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Data Statistics */}
        <section className="bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Data Statistics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{starExamples.length}</div>
              <div className="text-gray-300 font-medium">STAR Examples</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">{Object.values(professionalProfile.skills).flat().length}</div>
              <div className="text-gray-300 font-medium">Technical Skills</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{professionalProfile.experiences.length}</div>
              <div className="text-gray-300 font-medium">Work Experiences</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">{additionalContent.length}</div>
              <div className="text-gray-300 font-medium">Content Sections</div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
