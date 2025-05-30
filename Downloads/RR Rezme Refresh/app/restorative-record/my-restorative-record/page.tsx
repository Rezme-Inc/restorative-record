'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Printer, Share2, Settings, Mail, Facebook, Instagram, Twitter, Linkedin, Github, Globe, Youtube, Handshake } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ShareDialog } from '@/components/ui/ShareDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Mock data structure (replace with real data/context later)
const userProfile = {
  name: 'Sam Finn',
  avatar: '/avatar.png',
  about: 'A committed ex-offender from San Francisco. I discovered my calling for software development while participating in Tech for Good... (truncated)',
  awards: [
    {
      type: 'Academic Excellence',
      name: "Dean's List",
      organization: 'City College of San Francisco',
      date: '2019-05-15',
      file: { name: 'deanslist.pdf', size: 102400, type: 'application/pdf' },
      filePreview: '',
      narrative: 'This award recognized my academic achievement and commitment to excellence during my studies.',
    }
  ],
  skills: {
    softSkills: ['Communication', 'Teamwork'],
    hardSkills: ['Data Analysis', 'Technical Writing'],
    otherSkills: 'Fluent in Spanish',
    file: { name: 'skills-certificate.pdf', size: 51200, type: 'application/pdf' },
    filePreview: '',
    narrative: 'This is a narrative for the skills section.',
  },
  communityEngagement: [
    {
      type: 'Volunteer Work',
      role: 'Mentor',
      organization: 'Code for Change',
      website: 'https://codeforchange.org',
      details: 'Mentored youth in coding basics.',
      file: { name: 'volunteer.jpg', size: 20480, type: 'image/jpeg' },
      filePreview: '',
    }
  ],
  rehabilitativePrograms: [
    {
      id: 'mindfulness',
      name: 'Mindfulness Coaching',
      description: 'Completed mindfulness and wellness program.',
      completed: true,
      narrative: 'This program helped me learn to manage stress and improve my mental health.'
    }
  ],
  certifications: [
    {
      name: 'Certificate of Ethical Conduct',
      organization: 'Tech for Good',
      issueDate: '2021-06-01',
      expiryDate: '2024-06-01',
      credentialId: '12345',
      credentialUrl: 'https://certs.techforgood.org/12345',
      file: { name: 'ethics-cert.pdf', size: 30720, type: 'application/pdf' },
      filePreview: '',
      narrative: 'This is a narrative for the certification.',
    }
  ],
  mentors: [
    {
      linkedinProfile: 'https://linkedin.com/in/markwalsh',
      name: 'Mark Walsh',
      company: 'Tech for Good',
      title: 'Mentor',
      email: 'mark@example.com',
      phone: '555-123-4567',
      website: 'https://markwalsh.com',
      narrative: 'Mark provided invaluable guidance and support during my transition, helping me develop both technical and soft skills.'
    }
  ],
  employmentHistory: [
    {
      title: 'Software Engineer',
      type: 'Full-time',
      company: 'Tech for Good',
      location: 'San Francisco, CA',
      incarcerated: false,
      currentlyWorking: true,
      startDate: '2020-06-01',
      endDate: '',
      description: 'Worked on social impact projects.',
      file: { name: 'employment-proof.pdf', size: 40960, type: 'application/pdf' },
      filePreview: '',
    }
  ],
  hobbies: {
    general: ['Reading', 'Music'],
    sports: ['Soccer'],
    other: 'Chess, Cooking',
    file: { name: 'hobbies-photo.jpg', size: 10240, type: 'image/jpeg' },
    filePreview: '',
    narrative: 'This is a narrative for the hobbies section.',
  },
  education: [
    {
      school: 'City College of San Francisco',
      location: 'San Francisco, CA',
      degree: 'A.S. Software Engineering',
      field: 'Software Engineering',
      currentlyEnrolled: false,
      startDate: '2018-08-20',
      endDate: '2020-05-15',
      grade: '3.8 GPA',
      description: 'Completed degree while incarcerated. Focused on software engineering and personal development.',
      file: { name: 'transcript.pdf', size: 204800, type: 'application/pdf' },
      filePreview: '',
    }
  ],
  socialLinks: {
    facebook: 'https://facebook.com/samfinn',
    instagram: 'https://instagram.com/samfinn',
    twitter: 'https://twitter.com/samfinn',
    linkedin: 'https://linkedin.com/in/samfinn',
    github: 'https://github.com/samfinn',
    website: 'https://samfinn.com',
    youtube: 'https://youtube.com/samfinn',
    handshake: 'https://handshake.com/samfinn',
  },
};

export default function MyRestorativeRecord() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalSubmitted, setLegalSubmitted] = useState(false);
  const [legalForm, setLegalForm] = useState({
    name: '',
    email: '',
    location: '',
    phone: '',
    employers: '',
    description: '',
  });

  // Example employer info (replace with real data as needed)
  const employer = {
    name: 'Acme Corp',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Anonymous_emblem.svg',
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedImage = localStorage.getItem('profileImage');
      setProfileImage(savedImage);
    }
  }, []);

  const handlePrint = () => window.print();
  const handleEdit = (section: string) => {
    router.push(`/restorative-record?edit=${section}`);
  };

  const recordUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img src={profileImage || userProfile.avatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
            <div className="text-sm text-gray-500">MY RESTORATIVE RECORD</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrint}><Printer className="w-4 h-4 mr-2" />Print</Button>
          <Button onClick={() => setShareOpen(true)}><Share2 className="w-4 h-4 mr-2" />Share</Button>
          <Button onClick={() => router.push('/dashboard')}><Settings className="w-4 h-4 mr-2" />Settings</Button>
          <Button onClick={() => setLegalOpen(true)}><Mail className="w-4 h-4 mr-2" />Legal Assistance</Button>
        </div>
      </div>
      <ShareDialog open={shareOpen} onOpenChange={setShareOpen} employer={employer} recordUrl={recordUrl} />
      <Dialog open={legalOpen} onOpenChange={setLegalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get Legal Help</DialogTitle>
            <DialogDescription>
              If you believe you have experienced employment discrimination or have questions about fair chance hiring laws, you can use this form to contact a legal team in your jurisdiction. Your information will be sent to the appropriate legal professionals who handle employment discrimination and fair chance hiring issues.
            </DialogDescription>
          </DialogHeader>
          {legalSubmitted ? (
            <div className="py-8 text-center text-green-600 font-semibold">Thank you, your request has been sent!</div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={e => {
                e.preventDefault();
                setLegalSubmitted(true);
              }}
            >
              <Input
                required
                placeholder="Your Name"
                value={legalForm.name}
                onChange={e => setLegalForm(f => ({ ...f, name: e.target.value }))}
              />
              <Input
                required
                type="email"
                placeholder="Your Email"
                value={legalForm.email}
                onChange={e => setLegalForm(f => ({ ...f, email: e.target.value }))}
              />
              <Input
                required
                placeholder="Location (City, State)"
                value={legalForm.location}
                onChange={e => setLegalForm(f => ({ ...f, location: e.target.value }))}
              />
              <Input
                placeholder="Phone (optional)"
                value={legalForm.phone}
                onChange={e => setLegalForm(f => ({ ...f, phone: e.target.value }))}
              />
              <Input
                required
                placeholder="Employer(s) that have run background checks (comma separated)"
                value={legalForm.employers}
                onChange={e => setLegalForm(f => ({ ...f, employers: e.target.value }))}
              />
              <Textarea
                required
                placeholder="Describe your issue or question"
                value={legalForm.description}
                onChange={e => setLegalForm(f => ({ ...f, description: e.target.value }))}
              />
              <DialogFooter>
                <Button type="submit">Submit</Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* About Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">About</h2>
          <Button size="icon" onClick={() => handleEdit('about')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <p className="text-gray-700 whitespace-pre-line">{userProfile.about}</p>
      </section>

      {/* Social Media Links Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Social Media</h2>
          <Button size="icon" onClick={() => handleEdit('introduction')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {userProfile.socialLinks?.facebook && (
            <a href={userProfile.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <Facebook className="w-6 h-6" />
            </a>
          )}
          {userProfile.socialLinks?.instagram && (
            <a href={userProfile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <Instagram className="w-6 h-6" />
            </a>
          )}
          {userProfile.socialLinks?.twitter && (
            <a href={userProfile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <Twitter className="w-6 h-6" />
            </a>
          )}
          {userProfile.socialLinks?.linkedin && (
            <a href={userProfile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          {userProfile.socialLinks?.github && (
            <a href={userProfile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <Github className="w-6 h-6" />
            </a>
          )}
          {userProfile.socialLinks?.website && (
            <a href={userProfile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <Globe className="w-6 h-6" />
            </a>
          )}
          {userProfile.socialLinks?.youtube && (
            <a href={userProfile.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <Youtube className="w-6 h-6" />
            </a>
          )}
          {userProfile.socialLinks?.handshake && (
            <a href={userProfile.socialLinks.handshake} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              <Handshake className="w-6 h-6" />
            </a>
          )}
        </div>
      </section>

      {/* Personal Achievements / Awards Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Personal Achievements & Awards</h2>
          <Button size="icon" onClick={() => handleEdit('awards')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-6">
          {userProfile.awards && userProfile.awards.map((award, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 p-4 bg-white">
              <div className="font-semibold text-gray-900 text-base mb-1">{award.name}</div>
              <div className="text-gray-700 mb-1">Type: {award.type}</div>
              <div className="text-gray-700 mb-1">Organization: {award.organization}</div>
              <div className="text-gray-500 mb-1">Date: {award.date}</div>
              {award.narrative && (
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Narrative:</span> <span className="text-gray-700">{award.narrative}</span>
                </div>
              )}
              {award.file && (
                <div className="mt-2 flex items-center gap-4">
                  {award.filePreview && award.file.type && award.file.type.startsWith('image/') ? (
                    <img src={award.filePreview} alt="Award Upload" className="h-20 w-20 rounded object-cover border" />
                  ) : award.file.name ? (
                    <a href={award.filePreview || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{award.file.name}</a>
                  ) : null}
                  <span className="text-xs text-gray-400">{(award.file.size / 1024).toFixed(1)} KB</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
          <Button size="icon" onClick={() => handleEdit('skills')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <div className="mb-2">
          <div className="mb-1 font-medium text-gray-700">Soft Skills:</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {userProfile.skills.softSkills.map((skill, idx) => (
              <span key={idx} className="bg-red-100 text-red-700 rounded-full px-3 py-1 text-sm">{skill}</span>
            ))}
          </div>
          <div className="mb-1 font-medium text-gray-700">Hard Skills:</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {userProfile.skills.hardSkills.map((skill, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm">{skill}</span>
            ))}
          </div>
          {userProfile.skills.otherSkills && <div className="mb-1 text-gray-700">Other: {userProfile.skills.otherSkills}</div>}
          {userProfile.skills.narrative && (
            <div className="mb-1">
              <span className="font-medium text-gray-700">Narrative:</span> <span className="text-gray-700">{userProfile.skills.narrative}</span>
            </div>
          )}
          {userProfile.skills.file && (
            <div className="mt-2 flex items-center gap-4">
              {userProfile.skills.filePreview && userProfile.skills.file.type && userProfile.skills.file.type.startsWith('image/') ? (
                <img src={userProfile.skills.filePreview} alt="Skills Upload" className="h-20 w-20 rounded object-cover border" />
              ) : userProfile.skills.file.name ? (
                <a href={userProfile.skills.filePreview || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{userProfile.skills.file.name}</a>
              ) : null}
              <span className="text-xs text-gray-400">{(userProfile.skills.file.size / 1024).toFixed(1)} KB</span>
            </div>
          )}
        </div>
      </section>

      {/* Community Engagement Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Community Engagement</h2>
          <Button size="icon" onClick={() => handleEdit('communityEngagement')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-6">
          {userProfile.communityEngagement && userProfile.communityEngagement.map((eng, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 p-4 bg-white">
              <div className="font-semibold text-gray-900 text-base mb-1">{eng.organization}</div>
              <div className="text-gray-700 mb-1">Type: {eng.type}</div>
              <div className="text-gray-700 mb-1">Role: {eng.role}</div>
              {eng.website && <div className="text-blue-700 mb-1"><a href={eng.website} target="_blank" rel="noopener noreferrer">{eng.website}</a></div>}
              <div className="text-gray-700 mb-1">Details: {eng.details}</div>
              {eng.file && (
                <div className="mt-2 flex items-center gap-4">
                  {eng.filePreview && eng.file.type && eng.file.type.startsWith('image/') ? (
                    <img src={eng.filePreview} alt="Engagement Upload" className="h-20 w-20 rounded object-cover border" />
                  ) : eng.file.name ? (
                    <a href={eng.filePreview || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{eng.file.name}</a>
                  ) : null}
                  <span className="text-xs text-gray-400">{(eng.file.size / 1024).toFixed(1)} KB</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Rehabilitative Programs Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Rehabilitative Programs</h2>
          <Button size="icon" onClick={() => handleEdit('rehabilitativePrograms')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-6">
          {userProfile.rehabilitativePrograms && userProfile.rehabilitativePrograms.map((program, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 p-4 bg-white">
              <div className="font-semibold text-gray-900 text-base mb-1">{program.name}</div>
              <div className="text-gray-700 mb-1">{program.description}</div>
              {program.narrative && (
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Narrative:</span> <span className="text-gray-700">{program.narrative}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certifications and Licenses Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Certifications and Licenses</h2>
          <Button size="icon" onClick={() => handleEdit('certifications')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-6">
          {userProfile.certifications && userProfile.certifications.map((cert, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 p-4 bg-white">
              <div className="font-semibold text-gray-900 text-base mb-1">{cert.name}</div>
              <div className="text-gray-700 mb-1">Organization: {cert.organization}</div>
              <div className="text-gray-700 mb-1">Issue Date: {cert.issueDate}</div>
              <div className="text-gray-700 mb-1">Expiry Date: {cert.expiryDate}</div>
              <div className="text-gray-700 mb-1">Credential ID: {cert.credentialId}</div>
              {cert.credentialUrl && <div className="text-blue-700 mb-1"><a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">{cert.credentialUrl}</a></div>}
              {cert.narrative && (
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Narrative:</span> <span className="text-gray-700">{cert.narrative}</span>
                </div>
              )}
              {cert.file && (
                <div className="mt-2 flex items-center gap-4">
                  {cert.filePreview && cert.file.type && cert.file.type.startsWith('image/') ? (
                    <img src={cert.filePreview} alt="Certification Upload" className="h-20 w-20 rounded object-cover border" />
                  ) : cert.file.name ? (
                    <a href={cert.filePreview || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{cert.file.name}</a>
                  ) : null}
                  <span className="text-xs text-gray-400">{(cert.file.size / 1024).toFixed(1)} KB</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Mentors Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Mentors</h2>
          <Button size="icon" onClick={() => handleEdit('mentors')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-6">
          {userProfile.mentors && userProfile.mentors.map((mentor, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 p-4 bg-white">
              <div className="font-semibold text-gray-900 text-base mb-1">{mentor.name}</div>
              <div className="text-gray-700 mb-1">Title: {mentor.title}</div>
              <div className="text-gray-700 mb-1">Company: {mentor.company}</div>
              {mentor.linkedinProfile && <div className="text-blue-700 mb-1"><a href={mentor.linkedinProfile} target="_blank" rel="noopener noreferrer">{mentor.linkedinProfile}</a></div>}
              {mentor.email && <div className="text-gray-700 mb-1">Email: {mentor.email}</div>}
              {mentor.phone && <div className="text-gray-700 mb-1">Phone: {mentor.phone}</div>}
              {mentor.website && <div className="text-blue-700 mb-1"><a href={mentor.website} target="_blank" rel="noopener noreferrer">{mentor.website}</a></div>}
              {mentor.narrative && (
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Narrative:</span> <span className="text-gray-700">{mentor.narrative}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Employment History Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Employment History</h2>
          <Button size="icon" onClick={() => handleEdit('employmentHistory')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-6">
          {userProfile.employmentHistory && userProfile.employmentHistory.map((job, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 p-4 bg-white">
              <div className="font-semibold text-gray-900 text-base mb-1">{job.title}</div>
              <div className="text-gray-700 mb-1">Company: {job.company}</div>
              <div className="text-gray-700 mb-1">Type: {job.type}</div>
              <div className="text-gray-700 mb-1">Location: {job.location}</div>
              <div className="text-gray-700 mb-1">
                {job.startDate} - {job.currentlyWorking ? 'Present' : job.endDate}
              </div>
              {job.incarcerated && <div className="text-gray-700 mb-1">Worked while incarcerated</div>}
              {job.description && (
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Description:</span> <span className="text-gray-700">{job.description}</span>
                </div>
              )}
              {job.file && (
                <div className="mt-2 flex items-center gap-4">
                  {job.filePreview && job.file.type && job.file.type.startsWith('image/') ? (
                    <img src={job.filePreview} alt="Employment Upload" className="h-20 w-20 rounded object-cover border" />
                  ) : job.file.name ? (
                    <a href={job.filePreview || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{job.file.name}</a>
                  ) : null}
                  <span className="text-xs text-gray-400">{(job.file.size / 1024).toFixed(1)} KB</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Hobbies & Interests Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Hobbies & Interests</h2>
          <Button size="icon" onClick={() => handleEdit('hobbies')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <div className="rounded-lg border border-gray-200 p-4 bg-white">
          <div className="mb-2 font-medium text-gray-700">General:</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {userProfile.hobbies.general.map((hobby, idx) => (
              <span key={idx} className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">{hobby}</span>
            ))}
          </div>
          <div className="mb-2 font-medium text-gray-700">Sports:</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {userProfile.hobbies.sports.map((hobby, idx) => (
              <span key={idx} className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1 text-sm">{hobby}</span>
            ))}
          </div>
          {userProfile.hobbies.other && <div className="mb-2 text-gray-700">Other: {userProfile.hobbies.other}</div>}
          {userProfile.hobbies.narrative && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Narrative:</span> <span className="text-gray-700">{userProfile.hobbies.narrative}</span>
            </div>
          )}
          {userProfile.hobbies.file && (
            <div className="mt-2 flex items-center gap-4">
              {userProfile.hobbies.filePreview && userProfile.hobbies.file.type && userProfile.hobbies.file.type.startsWith('image/') ? (
                <img src={userProfile.hobbies.filePreview} alt="Hobbies Upload" className="h-20 w-20 rounded object-cover border" />
              ) : userProfile.hobbies.file.name ? (
                <a href={userProfile.hobbies.filePreview || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{userProfile.hobbies.file.name}</a>
              ) : null}
              <span className="text-xs text-gray-400">{(userProfile.hobbies.file.size / 1024).toFixed(1)} KB</span>
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Education</h2>
          <Button size="icon" onClick={() => handleEdit('education')}><Pencil className="w-4 h-4" /></Button>
        </div>
        <div className="space-y-6">
          {userProfile.education && userProfile.education.map((edu, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 p-4 bg-white">
              <div className="font-semibold text-gray-900 text-base mb-1">{edu.school}</div>
              <div className="text-gray-700 mb-1">Degree: {edu.degree}</div>
              <div className="text-gray-700 mb-1">Field: {edu.field}</div>
              <div className="text-gray-700 mb-1">Location: {edu.location}</div>
              <div className="text-gray-700 mb-1">Grade: {edu.grade}</div>
              <div className="text-gray-700 mb-1">
                {edu.startDate} - {edu.currentlyEnrolled ? 'Present' : edu.endDate}
              </div>
              {edu.description && (
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Description:</span> <span className="text-gray-700">{edu.description}</span>
                </div>
              )}
              {edu.file && (
                <div className="mt-2 flex items-center gap-4">
                  {edu.filePreview && edu.file.type && edu.file.type.startsWith('image/') ? (
                    <img src={edu.filePreview} alt="Education Upload" className="h-20 w-20 rounded object-cover border" />
                  ) : edu.file.name ? (
                    <a href={edu.filePreview || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{edu.file.name}</a>
                  ) : null}
                  <span className="text-xs text-gray-400">{(edu.file.size / 1024).toFixed(1)} KB</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 