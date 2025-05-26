'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Cloud, Upload, X, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { format } from 'date-fns';

const categories = [
  {
    id: 'introduction',
    title: 'Introduction',
    description: 'Let us know more about you to help optimize your Wizard'
  },
  {
    id: 'personal-achievements',
    title: 'Personal Achievements',
    description: 'Showcase your personal achievements to potential employees'
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'Select and showcase your skills to potential employers'
  },
  {
    id: 'community-engagement',
    title: 'Community Engagement',
    description: 'Add your community engagement and volunteering experience to enrich profile'
  },
  {
    id: 'rehabilitative-programs',
    title: 'Rehabilitative Programs',
    description: 'Select the rehabilitative programs you have completed to enrich profile'
  },
  {
    id: 'microcredentials',
    title: 'Microcredentials and Certifications',
    description: 'Add your microcredentials and certificates to highlight your expertise'
  },
  {
    id: 'mentors',
    title: 'Mentors & Recommendations',
    description: 'Add your Mentors and any recommendation you might have received'
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Share your education profile with us at Restorative Records'
  },
  {
    id: 'employment-history',
    title: 'Employment History',
    description: 'Have you worked with a past employer before we would like to know them'
  },
  {
    id: 'hobbies',
    title: 'Hobbies & Interests',
    description: 'Tell us what you like doing in your free time and your interests'
  }
];

const languages = [
  'Arabic', 'Bengali', 'Chinese (Mandarin)', 'Chinese (Cantonese)', 'French', 
  'German', 'Hindi', 'Indonesian', 'Italian', 'Japanese', 'Korean', 'Portuguese',
  'Russian', 'Spanish', 'Swahili', 'Tamil', 'Turkish', 'Urdu', 'Vietnamese'
];

const awardTypes = [
  'Academic Excellence',
  'Community Service',
  'Leadership',
  'Professional Achievement',
  'Skills Development',
  'Sports Achievement',
  'Volunteer Recognition',
  'Other'
];

const softSkills = [
  'Communication',
  'Teamwork',
  'Problem Solving',
  'Time Management',
  'Leadership',
  'Adaptability',
  'Critical Thinking',
  'Emotional Intelligence',
  'Conflict Resolution',
  'Work Ethic'
];

const hardSkills = [
  'Computer Proficiency',
  'Data Analysis',
  'Project Management',
  'Technical Writing',
  'Research',
  'Quality Control',
  'Equipment Operation',
  'Software Proficiency',
  'Customer Service Systems',
  'Administrative Tools'
];

const communityEngagementTypes = [
  'Volunteer Work',
  'Community Service',
  'Mentoring',
  'Leadership Roles',
  'Advocacy',
  'Environmental Initiatives',
  'Social Support',
  'Educational Programs',
  'Cultural Activities',
  'Other'
];

interface Award {
  type: string;
  name: string;
  organization: string;
  date: string;
  file?: File;
  filePreview?: string;
  narrative?: string;
}

interface SkillsData {
  softSkills: string[];
  hardSkills: string[];
  otherSkills: string;
  file?: File;
  filePreview?: string;
  narrative?: string;
}

interface CommunityEngagement {
  type: string;
  role: string;
  organization: string;
  website?: string;
  details: string;
  file?: File;
  filePreview?: string;
}

interface RehabilitativeProgram {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

interface Credential {
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  file?: File;
  filePreview?: string;
  narrative?: string;
}

interface Mentor {
  linkedinProfile: string;
  name: string;
  company: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  narrative?: string;
}

interface Education {
  school: string;
  location: string;
  degree: string;
  field: string;
  currentlyEnrolled: boolean;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
  file?: File;
  filePreview?: string;
}

interface Employment {
  title: string;
  type: string;
  company: string;
  location: string;
  incarcerated: boolean;
  currentlyWorking: boolean;
  startDate: string;
  endDate: string;
  description: string;
  file?: File;
  filePreview?: string;
}

const employmentTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Temporary',
  'Volunteer',
  'Other',
];

const rehabilitativePrograms: RehabilitativeProgram[] = [
  {
    id: 'substance-use',
    name: 'Substance Use Disorder Treatment',
    description: 'Counseling, therapy, support groups, 12-step programs, harm reduction strategies',
    completed: false
  },
  {
    id: 'mental-health',
    name: 'Mental Health Services',
    description: 'Counseling, therapy, medication management, trauma-informed care',
    completed: false
  },
  {
    id: 'employment',
    name: 'Employment and Work Programs',
    description: 'Job training, vocational education, internships, entrepreneurial programs',
    completed: false
  },
  {
    id: 'restorative-justice',
    name: 'Restorative Justice Programs',
    description: 'Mediation, conflict resolution, victim conferencing, circle sentencing',
    completed: false
  },
  {
    id: 'life-skills',
    name: 'Life Skills Training',
    description: 'Financial literacy, job interview tips, financial management, communication skills',
    completed: false
  },
  {
    id: 'community-service',
    name: 'Community Service',
    description: 'Volunteer work, community outreach programs, neighborhood cleanup efforts',
    completed: false
  },
  {
    id: 'family-reintegration',
    name: 'Family and Community Reintegration Programs',
    description: 'Family therapy, social reintegration, mentoring programs',
    completed: false
  },
  {
    id: 'parenting',
    name: 'Parenting Classes',
    description: 'Child development education, discipline strategies, communication techniques with children',
    completed: false
  },
  {
    id: 'health-wellness',
    name: 'Health and Wellness Programs',
    description: 'Physical fitness, nutrition education, stress management, yoga or mindfulness practices',
    completed: false
  },
  {
    id: 'faith-based',
    name: 'Faith-Based Initiatives',
    description: 'Religious counseling, spiritual healing programs, faith-based support groups',
    completed: false
  },
  {
    id: 'peer-support',
    name: 'Peer Support Groups',
    description: 'Mutual aid groups, alumni networks, sponsor programs',
    completed: false
  },
  {
    id: 'arts-recreation',
    name: 'Arts and Recreation Programs',
    description: 'Art therapy, music therapy',
    completed: false
  },
  {
    id: 'housing',
    name: 'Housing Assistance Programs',
    description: 'Transitional housing programs, supportive housing, independent living skills training',
    completed: false
  },
  {
    id: 'legal',
    name: 'Legal Compliance',
    description: 'Legal aid, parole compliance programs, court-mandated interventions',
    completed: false
  },
  {
    id: 'personal-development',
    name: 'Personal Development Activities',
    description: 'Self-improvement courses, personal hobbies, mindfulness or meditation practices',
    completed: false
  },
  {
    id: 'veteran',
    name: 'Veteran Services',
    description: 'Services tailored to the needs of veterans, including therapy, support groups, and vocational training',
    completed: false
  },
  {
    id: 'domestic-violence',
    name: 'Domestic Violence Intervention Programs',
    description: 'Programs designed to address and prevent domestic violence, including therapy and education',
    completed: false
  },
  {
    id: 'sex-offender',
    name: 'Sex Offender Treatment Programs',
    description: 'Therapy and education programs specifically designed for individuals convicted of sex offenses',
    completed: false
  },
  {
    id: 'medical',
    name: 'Medical and Physical Health Care',
    description: 'Screening procedures, diagnosis, treatment, and rehabilitation services tailored to individual\'s diverse healthcare needs, promoting optimal health and well being',
    completed: false
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Specify other rehabilitative programs',
    completed: false
  }
];

const generalHobbies = [
  'Reading', 'Traveling', 'Music', 'Art', 'Cooking', 'Gardening', 'Photography', 'Writing', 'Crafts', 'Technology', 'Gaming', 'Movies', 'Theater', 'Dancing', 'Volunteering', 'Other'
];
const sportsHobbies = [
  'Soccer', 'Basketball', 'Baseball', 'Tennis', 'Golf', 'Swimming', 'Cycling', 'Running', 'Yoga', 'Martial Arts', 'Hiking', 'Skiing', 'Surfing', 'Other'
];

export default function RestorativeRecord() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('introduction');
  const [occupations, setOccupations] = useState<string[]>([]);
  const [narrative, setNarrative] = useState('');
  const [englishProficiency, setEnglishProficiency] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [achievementsStatement, setAchievementsStatement] = useState('');
  const [awards, setAwards] = useState<Award[]>([]);
  const [skillsData, setSkillsData] = useState<SkillsData>({
    softSkills: [],
    hardSkills: [],
    otherSkills: '',
    narrative: '',
  });
  const [communityEngagements, setCommunityEngagements] = useState<CommunityEngagement[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<{ id: string; narrative: string }[]>([]);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [employmentHistory, setEmploymentHistory] = useState<Employment[]>([]);
  const [hobbies, setHobbies] = useState<{ general: string[]; sports: string[]; other: string; file?: File; filePreview?: string; narrative?: string }>({ general: [], sports: [], other: '', narrative: '' });
  
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const skillsFileInputRef = useRef<HTMLInputElement>(null);
  const communityFileInputRef = useRef<HTMLInputElement>(null);
  const credentialFileInputRef = useRef<HTMLInputElement>(null);
  const educationFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const employmentFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hobbiesFileInputRef = useRef<HTMLInputElement>(null);

  const [generalInput, setGeneralInput] = useState('');
  const [showGeneralDropdown, setShowGeneralDropdown] = useState(false);
  const [sportsInput, setSportsInput] = useState('');
  const [showSportsDropdown, setShowSportsDropdown] = useState(false);

  const generalInputRef = useRef<HTMLInputElement>(null);
  const generalDropdownRef = useRef<HTMLDivElement>(null);
  const sportsInputRef = useRef<HTMLInputElement>(null);
  const sportsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editParam = searchParams.get('edit');
    if (editParam && categories.some(c => c.id === editParam)) {
      setActiveCategory(editParam);
    }
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        generalInputRef.current &&
        generalDropdownRef.current &&
        !generalInputRef.current.contains(event.target as Node) &&
        !generalDropdownRef.current.contains(event.target as Node)
      ) {
        setShowGeneralDropdown(false);
      }
      if (
        sportsInputRef.current &&
        sportsDropdownRef.current &&
        !sportsInputRef.current.contains(event.target as Node) &&
        !sportsDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSportsDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddOccupation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && occupations.length < 10) {
      const value = e.currentTarget.value.trim();
      if (value && !occupations.includes(value)) {
        setOccupations([...occupations, value]);
        e.currentTarget.value = '';
      }
    }
  };

  const handleAddLanguage = (language: string) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleAddAward = () => {
    setAwards([...awards, { type: '', name: '', organization: '', date: '', narrative: '' }]);
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF) and PDF files are allowed');
      return;
    }

    const newAwards = [...awards];
    newAwards[index] = {
      ...newAwards[index],
      file,
      filePreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    };
    setAwards(newAwards);
  };

  const handleRemoveFile = (index: number) => {
    const newAwards = [...awards];
    if (newAwards[index].filePreview) {
      URL.revokeObjectURL(newAwards[index].filePreview!);
    }
    newAwards[index] = {
      ...newAwards[index],
      file: undefined,
      filePreview: undefined
    };
    setAwards(newAwards);
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = '';
    }
  };

  const handleRemoveAward = (index: number) => {
    const newAwards = [...awards];
    if (newAwards[index].filePreview) {
      URL.revokeObjectURL(newAwards[index].filePreview!);
    }
    newAwards.splice(index, 1);
    setAwards(newAwards);
  };

  const handleSkillsFileChange = (file: File | null) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF) and PDF files are allowed');
      return;
    }

    setSkillsData({
      ...skillsData,
      file,
      filePreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    });
  };

  const handleRemoveSkillsFile = () => {
    if (skillsData.filePreview) {
      URL.revokeObjectURL(skillsData.filePreview);
    }
    setSkillsData({
      ...skillsData,
      file: undefined,
      filePreview: undefined
    });
    if (skillsFileInputRef.current) {
      skillsFileInputRef.current.value = '';
    }
  };

  const handleAddCommunityEngagement = () => {
    setCommunityEngagements([
      ...communityEngagements,
      { type: '', role: '', organization: '', details: '' }
    ]);
  };

  const handleCommunityFileChange = (index: number, file: File | null) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF) and PDF files are allowed');
      return;
    }

    const newEngagements = [...communityEngagements];
    newEngagements[index] = {
      ...newEngagements[index],
      file,
      filePreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    };
    setCommunityEngagements(newEngagements);
  };

  const handleRemoveCommunityFile = (index: number) => {
    const newEngagements = [...communityEngagements];
    if (newEngagements[index].filePreview) {
      URL.revokeObjectURL(newEngagements[index].filePreview!);
    }
    newEngagements[index] = {
      ...newEngagements[index],
      file: undefined,
      filePreview: undefined
    };
    setCommunityEngagements(newEngagements);
  };

  const handleRemoveCommunityEngagement = (index: number) => {
    const newEngagements = [...communityEngagements];
    if (newEngagements[index].filePreview) {
      URL.revokeObjectURL(newEngagements[index].filePreview!);
    }
    newEngagements.splice(index, 1);
    setCommunityEngagements(newEngagements);
  };

  const handleProgramChange = (programId: string, checked: boolean) => {
    setSelectedPrograms(prev => {
      if (checked) {
        return [...prev, { id: programId, narrative: '' }];
      } else {
        return prev.filter(p => p.id !== programId);
      }
    });
  };

  const handleAddCredential = () => {
    setCredentials([...credentials, {
      name: '',
      organization: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      narrative: ''
    }]);
  };

  const handleCredentialFileChange = (index: number, file: File | null) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF) and PDF files are allowed');
      return;
    }

    const newCredentials = [...credentials];
    newCredentials[index] = {
      ...newCredentials[index],
      file,
      filePreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    };
    setCredentials(newCredentials);
  };

  const handleRemoveCredentialFile = (index: number) => {
    const newCredentials = [...credentials];
    if (newCredentials[index].filePreview) {
      URL.revokeObjectURL(newCredentials[index].filePreview!);
    }
    newCredentials[index] = {
      ...newCredentials[index],
      file: undefined,
      filePreview: undefined
    };
    setCredentials(newCredentials);
  };

  const handleRemoveCredential = (index: number) => {
    const newCredentials = [...credentials];
    if (newCredentials[index].filePreview) {
      URL.revokeObjectURL(newCredentials[index].filePreview!);
    }
    newCredentials.splice(index, 1);
    setCredentials(newCredentials);
  };

  const handleAddMentor = () => {
    setMentors([...mentors, {
      linkedinProfile: '',
      name: '',
      company: '',
      title: '',
      email: '',
      phone: '',
      website: '',
      narrative: ''
    }]);
  };

  const handleRemoveMentor = (index: number) => {
    const newMentors = [...mentors];
    newMentors.splice(index, 1);
    setMentors(newMentors);
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        school: '',
        location: '',
        degree: '',
        field: '',
        currentlyEnrolled: false,
        startDate: '',
        endDate: '',
        grade: '',
        description: '',
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    const newEducation = [...education];
    if (newEducation[index].filePreview) {
      URL.revokeObjectURL(newEducation[index].filePreview!);
    }
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  const handleEducationChange = (index: number, field: keyof Education, value: any) => {
    const newEducation = [...education];
    (newEducation[index][field] as any) = value;
    setEducation(newEducation);
  };

  const handleEducationFileChange = (index: number, file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF) and PDF files are allowed');
      return;
    }
    const newEducation = [...education];
    newEducation[index] = {
      ...newEducation[index],
      file,
      filePreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    };
    setEducation(newEducation);
  };

  const handleRemoveEducationFile = (index: number) => {
    const newEducation = [...education];
    if (newEducation[index].filePreview) {
      URL.revokeObjectURL(newEducation[index].filePreview!);
    }
    newEducation[index] = {
      ...newEducation[index],
      file: undefined,
      filePreview: undefined,
    };
    setEducation(newEducation);
    if (educationFileInputRefs.current[index]) {
      educationFileInputRefs.current[index]!.value = '';
    }
  };

  const handleAddEmployment = () => {
    setEmploymentHistory([
      ...employmentHistory,
      {
        title: '',
        type: '',
        company: '',
        location: '',
        incarcerated: false,
        currentlyWorking: false,
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleRemoveEmployment = (index: number) => {
    const newEmployment = [...employmentHistory];
    if (newEmployment[index].filePreview) {
      URL.revokeObjectURL(newEmployment[index].filePreview!);
    }
    newEmployment.splice(index, 1);
    setEmploymentHistory(newEmployment);
  };

  const handleEmploymentChange = (index: number, field: keyof Employment, value: any) => {
    const newEmployment = [...employmentHistory];
    (newEmployment[index][field] as any) = value;
    setEmploymentHistory(newEmployment);
  };

  const handleEmploymentFileChange = (index: number, file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF) and PDF files are allowed');
      return;
    }
    const newEmployment = [...employmentHistory];
    newEmployment[index] = {
      ...newEmployment[index],
      file,
      filePreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    };
    setEmploymentHistory(newEmployment);
  };

  const handleRemoveEmploymentFile = (index: number) => {
    const newEmployment = [...employmentHistory];
    if (newEmployment[index].filePreview) {
      URL.revokeObjectURL(newEmployment[index].filePreview!);
    }
    newEmployment[index] = {
      ...newEmployment[index],
      file: undefined,
      filePreview: undefined,
    };
    setEmploymentHistory(newEmployment);
    if (employmentFileInputRefs.current[index]) {
      employmentFileInputRefs.current[index]!.value = '';
    }
  };

  const handleHobbiesChange = (field: 'general' | 'sports' | 'other' | 'narrative', value: any) => {
    setHobbies(prev => ({ ...prev, [field]: value }));
  };

  const handleHobbiesFileChange = (file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF) and PDF files are allowed');
      return;
    }
    setHobbies(prev => ({
      ...prev,
      file,
      filePreview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));
  };

  const handleRemoveHobbiesFile = () => {
    if (hobbies.filePreview) {
      URL.revokeObjectURL(hobbies.filePreview);
    }
    setHobbies(prev => ({ ...prev, file: undefined, filePreview: undefined }));
    if (hobbiesFileInputRef.current) {
      hobbiesFileInputRef.current.value = '';
    }
  };

  const handleNext = () => {
    if (activeCategory === 'introduction') {
      setActiveCategory('personal-achievements');
    } else if (activeCategory === 'personal-achievements') {
      setActiveCategory('skills');
    } else if (activeCategory === 'skills') {
      setActiveCategory('community-engagement');
    } else if (activeCategory === 'community-engagement') {
      setActiveCategory('rehabilitative-programs');
    } else if (activeCategory === 'rehabilitative-programs') {
      setActiveCategory('microcredentials');
    } else if (activeCategory === 'microcredentials') {
      setActiveCategory('mentors');
    } else if (activeCategory === 'mentors') {
      setActiveCategory('education');
    } else if (activeCategory === 'education') {
      setActiveCategory('employment-history');
    } else if (activeCategory === 'employment-history') {
      setActiveCategory('hobbies');
    }
    // No next after hobbies
  };

  const handlePrevious = () => {
    if (activeCategory === 'personal-achievements') {
      setActiveCategory('introduction');
    } else if (activeCategory === 'skills') {
      setActiveCategory('personal-achievements');
    } else if (activeCategory === 'community-engagement') {
      setActiveCategory('skills');
    } else if (activeCategory === 'rehabilitative-programs') {
      setActiveCategory('community-engagement');
    } else if (activeCategory === 'microcredentials') {
      setActiveCategory('rehabilitative-programs');
    } else if (activeCategory === 'mentors') {
      setActiveCategory('microcredentials');
    } else if (activeCategory === 'education') {
      setActiveCategory('mentors');
    } else if (activeCategory === 'employment-history') {
      setActiveCategory('education');
    } else if (activeCategory === 'hobbies') {
      setActiveCategory('employment-history');
    }
    // No previous before introduction
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'introduction':
        return (
          <div className="space-y-8">
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-700 text-base">
                Welcome to the Introduction section. Here, you can share your preferred occupations, personal narrative, and language proficiency. This information helps us understand your background and aspirations, setting the foundation for your restorative record.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Preferred Occupation</Label>
                <Input
                  placeholder="Type here and press Enter to add an occupation"
                  className="border-gray-200 bg-white"
                  onKeyDown={handleAddOccupation}
                />
                {occupations.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {occupations.map((occupation, index) => (
                      <div
                        key={index}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                      >
                        {occupation}
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  You can add 10 occupations of your choice
                </p>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-700">Personal Narrative</Label>
                <Textarea
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  placeholder="Your personal narrative"
                  className="min-h-[200px] border-gray-200 bg-white"
                  maxLength={700}
                />
                <div className="text-right text-sm text-gray-500">
                  {narrative.length}/700 characters
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-700">Language</Label>
                <div className="space-y-4">
                  <p className="text-sm text-red-500">English Proficiency *</p>
                  <RadioGroup
                    value={englishProficiency}
                    onValueChange={setEnglishProficiency}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bilingual" id="bilingual" />
                      <Label htmlFor="bilingual" className="text-gray-700">Bilingual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id="advanced" />
                      <Label htmlFor="advanced" className="text-gray-700">Advanced Proficiency</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <Label htmlFor="intermediate" className="text-gray-700">Intermediate Proficiency</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="basic" id="basic" />
                      <Label htmlFor="basic" className="text-gray-700">Basic Proficiency</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="limited" id="limited" />
                      <Label htmlFor="limited" className="text-gray-700">Limited Proficiency</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none" className="text-gray-700">No Proficiency</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Other Languages</Label>
                  <Select onValueChange={handleAddLanguage}>
                    <SelectTrigger className="border-gray-200 bg-white">
                      <SelectValue placeholder="Select a language..." />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedLanguages.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {selectedLanguages.map((language, index) => (
                        <div
                          key={index}
                          className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                        >
                          {language}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'personal-achievements':
        return (
          <div className="space-y-8">
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-700 text-base">
                Your personal achievements tell a powerful story about your journey and growth. Include any milestones, awards, or recognitions you've earned—whether before, during, or after incarceration. These experiences highlight your resilience, dedication, and the positive impact you've made.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-gray-700">Award or Recognition</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddAward}
                  className="border-gray-200"
                >
                  ADD AWARD OR RECOGNITION
                </Button>
              </div>

              {awards.map((award, index) => (
                <div key={index} className="relative space-y-4 rounded-lg border border-gray-200 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-500"
                    onClick={() => handleRemoveAward(index)}
                  >
                    <X className="h-5 w-5" />
                  </Button>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Award Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={award.type}
                      onValueChange={(value) => {
                        const newAwards = [...awards];
                        newAwards[index].type = value;
                        setAwards(newAwards);
                      }}
                    >
                      <SelectTrigger className="border-gray-200 bg-white">
                        <SelectValue placeholder="Select award type from the options" />
                      </SelectTrigger>
                      <SelectContent>
                        {awardTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Name of Award <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={award.name}
                      onChange={(e) => {
                        const newAwards = [...awards];
                        newAwards[index].name = e.target.value;
                        setAwards(newAwards);
                      }}
                      placeholder="Enter name of Award"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Award Organization <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={award.organization}
                      onChange={(e) => {
                        const newAwards = [...awards];
                        newAwards[index].organization = e.target.value;
                        setAwards(newAwards);
                      }}
                      placeholder="Enter Award Organization name"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Date Awarded <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      value={award.date}
                      onChange={(e) => {
                        const newAwards = [...awards];
                        newAwards[index].date = e.target.value;
                        setAwards(newAwards);
                      }}
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Upload optional supporting file (image or pdf)
                    </Label>
                    <input
                      type="file"
                      ref={el => fileInputRefs.current[index] = el}
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                    />
                    
                    {!award.file ? (
                      <div
                        className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100"
                        onClick={() => fileInputRefs.current[index]?.click()}
                      >
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">
                            Images or PDF (max 2MB)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-4">
                          {award.filePreview ? (
                            <div className="relative">
                              <img
                                src={award.filePreview}
                                alt="Preview"
                                className="h-20 w-20 rounded object-cover"
                              />
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                                onClick={() => window.open(award.filePreview, '_blank')}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-100">
                                <p className="text-sm text-gray-500">PDF</p>
                              </div>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                                onClick={() => window.open(URL.createObjectURL(award.file!), '_blank')}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {award.file.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {(award.file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Narrative</Label>
                    <Textarea
                      value={award.narrative || ''}
                      onChange={e => {
                        const newAwards = [...awards];
                        newAwards[index].narrative = e.target.value;
                        setAwards(newAwards);
                      }}
                      placeholder="Provide a narrative about this achievement or recognition. Describe its significance, your role, and what it means to you."
                      className="min-h-[100px] border-gray-200 bg-white"
                      maxLength={500}
                    />
                    <div className="text-right text-sm text-gray-500">
                      {(award.narrative ? award.narrative.length : 0)}/500 characters
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8">
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-700 text-base">
                Your skills—both hard and soft—are a key part of your story. List any abilities, talents, or expertise you've developed through work, education, volunteering, or personal experience. Don't forget to include skills gained during incarceration or through self-study. These show your readiness and value to future employers.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700">
                  Soft Skills <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => {
                    if (!skillsData.softSkills.includes(value)) {
                      setSkillsData({
                        ...skillsData,
                        softSkills: [...skillsData.softSkills, value]
                      });
                    }
                  }}
                >
                  <SelectTrigger className="border-gray-200 bg-white">
                    <SelectValue placeholder="Select your Soft Skills from the options below" />
                  </SelectTrigger>
                  <SelectContent>
                    {softSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {skillsData.softSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skillsData.softSkills.map((skill, index) =>
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                      >
                        {skill}
                        <button
                          onClick={() => {
                            setSkillsData({
                              ...skillsData,
                              softSkills: skillsData.softSkills.filter((_, i) => i !== index)
                            });
                          }}
                          className="ml-1 text-primary hover:text-primary/80"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">
                  Hard Skills <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => {
                    if (!skillsData.hardSkills.includes(value)) {
                      setSkillsData({
                        ...skillsData,
                        hardSkills: [...skillsData.hardSkills, value]
                      });
                    }
                  }}
                >
                  <SelectTrigger className="border-gray-200 bg-white">
                    <SelectValue placeholder="Select your Hard Skills from the options below" />
                  </SelectTrigger>
                  <SelectContent>
                    {hardSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {skillsData.hardSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skillsData.hardSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                      >
                        {skill}
                        <button
                          onClick={() => {
                            setSkillsData({
                              ...skillsData,
                              hardSkills: skillsData.hardSkills.filter((_, i) => i !== index)
                            });
                          }}
                          className="ml-1 text-primary hover:text-primary/80"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Other Skills</Label>
                <Textarea
                  value={skillsData.otherSkills}
                  onChange={(e) => setSkillsData({
                    ...skillsData,
                    otherSkills: e.target.value
                  })}
                  placeholder="List any additional skills not covered above"
                  className="min-h-[100px] border-gray-200 bg-white"
                  maxLength={500}
                />
                <div className="text-right text-sm text-gray-500">
                  {skillsData.otherSkills.length}/500 characters
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">
                  Upload optional supporting file (image or pdf)
                </Label>
                <input
                  type="file"
                  ref={skillsFileInputRef}
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={(e) => handleSkillsFileChange(e.target.files?.[0] || null)}
                />
                
                {!skillsData.file ? (
                  <div
                    className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100"
                    onClick={() => skillsFileInputRef.current?.click()}
                  >
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        Images or PDF (max 5MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-4">
                      {skillsData.filePreview ? (
                        <div className="relative">
                          <img
                            src={skillsData.filePreview}
                            alt="Preview"
                            className="h-20 w-20 rounded object-cover"
                          />
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                            onClick={() => window.open(skillsData.filePreview, '_blank')}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-100">
                            <p className="text-sm text-gray-500">PDF</p>
                          </div>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                            onClick={() => window.open(URL.createObjectURL(skillsData.file!), '_blank')}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {skillsData.file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(skillsData.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={handleRemoveSkillsFile}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Narrative</Label>
                <Textarea
                  value={skillsData.narrative || ''}
                  onChange={e => setSkillsData({ ...skillsData, narrative: e.target.value })}
                  placeholder="Provide a narrative about your skills. Describe how you developed them, their significance, and how they have helped you."
                  className="min-h-[100px] border-gray-200 bg-white"
                  maxLength={500}
                />
                <div className="text-right text-sm text-gray-500">
                  {(skillsData.narrative ? skillsData.narrative.length : 0)}/500 characters
                </div>
              </div>
            </div>
          </div>
        );

      case 'community-engagement':
        return (
          <div className="space-y-8">
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-700 text-base">
                Community engagement and volunteering show your commitment to giving back and being part of something bigger than yourself. List any volunteer work, advocacy, or community service—before, during, or after incarceration. These experiences highlight your values, teamwork, and positive impact.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-gray-700">Community Engagement</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddCommunityEngagement}
                  className="border-gray-200"
                >
                  ADD COMMUNITY ENGAGEMENT
                </Button>
              </div>

              {communityEngagements.map((engagement, index) => (
                <div key={index} className="relative space-y-4 rounded-lg border border-gray-200 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-500"
                    onClick={() => handleRemoveCommunityEngagement(index)}
                  >
                    <X className="h-5 w-5" />
                  </Button>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Community Engagement Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={engagement.type}
                      onValueChange={(value) => {
                        const newEngagements = [...communityEngagements];
                        newEngagements[index].type = value;
                        setCommunityEngagements(newEngagements);
                      }}
                    >
                      <SelectTrigger className="border-gray-200 bg-white">
                        <SelectValue placeholder="Select Community Engagement type from the options" />
                      </SelectTrigger>
                      <SelectContent>
                        {communityEngagementTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Engagement role <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={engagement.role}
                      onChange={(e) => {
                        const newEngagements = [...communityEngagements];
                        newEngagements[index].role = e.target.value;
                        setCommunityEngagements(newEngagements);
                      }}
                      placeholder="Enter your engagement role"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Organization or Event name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={engagement.organization}
                      onChange={(e) => {
                        const newEngagements = [...communityEngagements];
                        newEngagements[index].organization = e.target.value;
                        setCommunityEngagements(newEngagements);
                      }}
                      placeholder="Enter your organization or event name"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Organization or Event website
                    </Label>
                    <Input
                      value={engagement.website}
                      onChange={(e) => {
                        const newEngagements = [...communityEngagements];
                        newEngagements[index].website = e.target.value;
                        setCommunityEngagements(newEngagements);
                      }}
                      placeholder="Enter your organization or event website (optional)"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Involvement details <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      value={engagement.details}
                      onChange={(e) => {
                        const newEngagements = [...communityEngagements];
                        newEngagements[index].details = e.target.value;
                        setCommunityEngagements(newEngagements);
                      }}
                      placeholder="Define in your words how you contributed or participated in this engagement and what that means to you"
                      className="min-h-[100px] border-gray-200 bg-white"
                      maxLength={500}
                    />
                    <div className="text-right text-sm text-gray-500">
                      {engagement.details.length}/500 characters
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Upload optional supporting file (image or pdf)
                    </Label>
                    <input
                      type="file"
                      ref={communityFileInputRef}
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleCommunityFileChange(index, e.target.files?.[0] || null)}
                    />
                    
                    {!engagement.file ? (
                      <div
                        className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100"
                        onClick={() => communityFileInputRef.current?.click()}
                      >
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">
                            Images or PDF (max 5MB)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-4">
                          {engagement.filePreview ? (
                            <div className="relative">
                              <img
                                src={engagement.filePreview}
                                alt="Preview"
                                className="h-20 w-20 rounded object-cover"
                              />
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                                onClick={() => window.open(engagement.filePreview, '_blank')}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-100">
                                <p className="text-sm text-gray-500">PDF</p>
                              </div>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                                onClick={() => window.open(URL.createObjectURL(engagement.file!), '_blank')}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {engagement.file.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {(engagement.file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => handleRemoveCommunityFile(index)}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'rehabilitative-programs':
        return (
          <div className="space-y-8">
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-700 text-base">
                Listing your participation in rehabilitative programs highlights your resilience, growth, and commitment to positive change. Include any programs you completed before, during, or after incarceration—these experiences show your dedication to self-improvement and your readiness for new opportunities.
              </p>
            </div>
            <div className="space-y-4">
              <Label className="text-gray-700">
                Select the Rehabilitative Programs you have completed
              </Label>
              <div className="grid gap-4">
                {rehabilitativePrograms.map((program) => {
                  const selected = selectedPrograms.find(p => p.id === program.id);
                  return (
                    <div key={program.id} className="flex flex-col space-y-2 rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id={program.id}
                          checked={!!selected}
                          onCheckedChange={(checked) => handleProgramChange(program.id, checked as boolean)}
                        />
                        <div className="space-y-1">
                          <label
                            htmlFor={program.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {program.name}
                          </label>
                          <p className="text-sm text-gray-500">
                            {program.description}
                          </p>
                        </div>
                      </div>
                      {selected && (
                        <div className="mt-2 space-y-2">
                          <Label className="text-gray-700">Narrative</Label>
                          <Textarea
                            value={selected.narrative}
                            onChange={e => {
                              setSelectedPrograms(prev => prev.map(p =>
                                p.id === program.id ? { ...p, narrative: e.target.value } : p
                              ));
                            }}
                            placeholder="Provide a narrative about your experience in this program. Describe what you learned, how it impacted you, and its significance."
                            className="min-h-[100px] border-gray-200 bg-white"
                            maxLength={500}
                          />
                          <div className="text-right text-sm text-gray-500">
                            {selected.narrative.length}/500 characters
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'microcredentials':
        return (
          <div className="space-y-8">
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-700 text-base">
                Microcredentials, certifications, and licenses are valuable proof of your skills and commitment to learning. Include any certificates, training, or credentials you've earned—whether through formal education, online courses, or programs completed during incarceration or reentry. These achievements help show your expertise and dedication.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-gray-700">Microcredential / Certification</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddCredential}
                  className="border-gray-200"
                >
                  ADD MICROCREDENTIAL OR CERTIFICATE
                </Button>
              </div>

              {credentials.map((credential, index) => (
                <div key={index} className="relative space-y-4 rounded-lg border border-gray-200 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-500"
                    onClick={() => handleRemoveCredential(index)}
                  >
                    <X className="h-5 w-5" />
                  </Button>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Certification or Microcredential name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={credential.name}
                      onChange={(e) => {
                        const newCredentials = [...credentials];
                        newCredentials[index].name = e.target.value;
                        setCredentials(newCredentials);
                      }}
                      placeholder="Enter certification or microcredential name"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Issuing organization <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={credential.organization}
                      onChange={(e) => {
                        const newCredentials = [...credentials];
                        newCredentials[index].organization = e.target.value;
                        setCredentials(newCredentials);
                      }}
                      placeholder="Enter name of issuing organization"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-gray-700">
                        Issuing Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="date"
                        value={credential.issueDate}
                        onChange={(e) => {
                          const newCredentials = [...credentials];
                          newCredentials[index].issueDate = e.target.value;
                          setCredentials(newCredentials);
                        }}
                        className="border-gray-200 bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700">
                        Expiry Date
                      </Label>
                      <Input
                        type="date"
                        value={credential.expiryDate}
                        onChange={(e) => {
                          const newCredentials = [...credentials];
                          newCredentials[index].expiryDate = e.target.value;
                          setCredentials(newCredentials);
                        }}
                        className="border-gray-200 bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Credential ID
                    </Label>
                    <Input
                      value={credential.credentialId}
                      onChange={(e) => {
                        const newCredentials = [...credentials];
                        newCredentials[index].credentialId = e.target.value;
                        setCredentials(newCredentials);
                      }}
                      placeholder="Enter credential ID of the issuing organization"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Credential URL
                    </Label>
                    <Input
                      value={credential.credentialUrl}
                      onChange={(e) => {
                        const newCredentials = [...credentials];
                        newCredentials[index].credentialUrl = e.target.value;
                        setCredentials(newCredentials);
                      }}
                      placeholder="Enter credential URL of the issuing organization"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Narrative
                    </Label>
                    <Textarea
                      value={credential.narrative || ''}
                      onChange={(e) => {
                        const newCredentials = [...credentials];
                        newCredentials[index].narrative = e.target.value;
                        setCredentials(newCredentials);
                      }}
                      placeholder="Describe what this certification means to you and how it has helped in your journey"
                      className="border-gray-200 bg-white min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Upload optional supporting file (image or pdf)
                    </Label>
                    <input
                      type="file"
                      ref={credentialFileInputRef}
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={(e) => handleCredentialFileChange(index, e.target.files?.[0] || null)}
                    />
                    
                    {!credential.file ? (
                      <div
                        className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100"
                        onClick={() => credentialFileInputRef.current?.click()}
                      >
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">
                            Images or PDF (max 5MB)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-4">
                          {credential.filePreview ? (
                            <div className="relative">
                              <img
                                src={credential.filePreview}
                                alt="Preview"
                                className="h-20 w-20 rounded object-cover"
                              />
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                                onClick={() => window.open(credential.filePreview, '_blank')}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-100">
                                <p className="text-sm text-gray-500">PDF</p>
                              </div>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                                onClick={() => window.open(URL.createObjectURL(credential.file!), '_blank')}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {credential.file.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {(credential.file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => handleRemoveCredentialFile(index)}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'mentors':
        return (
          <div className="space-y-8">
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-700 text-base">
                Mentors and recommendations can make a big difference in your journey. List anyone who has supported, guided, or advocated for you—whether personally, professionally, or during your time in a program. Their support helps show your growth, character, and readiness for new opportunities.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                List mentors or advisors who have guided you to amplify your credibility and open doors to new opportunities.
              </p>

              <div className="flex items-center justify-between">
                <Label className="text-gray-700">Mentor Information</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddMentor}
                  className="border-gray-200"
                >
                  ADD MENTOR
                </Button>
              </div>

              {mentors.map((mentor, index) => (
                <div key={index} className="relative space-y-4 rounded-lg border border-gray-200 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-500"
                    onClick={() => handleRemoveMentor(index)}
                  >
                    <X className="h-5 w-5" />
                  </Button>

                  <div className="space-y-2">
                    <Label className="text-gray-700">LinkedIn Profile</Label>
                    <Input
                      value={mentor.linkedinProfile}
                      onChange={(e) => {
                        const newMentors = [...mentors];
                        newMentors[index].linkedinProfile = e.target.value;
                        setMentors(newMentors);
                      }}
                      placeholder="https://www.linkedin.com/in/mentor-profile"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Name of Mentor <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={mentor.name}
                      onChange={(e) => {
                        const newMentors = [...mentors];
                        newMentors[index].name = e.target.value;
                        setMentors(newMentors);
                      }}
                      placeholder="Enter mentor's full name"
                      className="border-gray-200 bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Company <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={mentor.company}
                      onChange={(e) => {
                        const newMentors = [...mentors];
                        newMentors[index].company = e.target.value;
                        setMentors(newMentors);
                      }}
                      placeholder="Enter company name"
                      className="border-gray-200 bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">
                      Title/Position <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={mentor.title}
                      onChange={(e) => {
                        const newMentors = [...mentors];
                        newMentors[index].title = e.target.value;
                        setMentors(newMentors);
                      }}
                      placeholder="Enter mentor's title or position"
                      className="border-gray-200 bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Email address</Label>
                    <Input
                      type="email"
                      value={mentor.email}
                      onChange={(e) => {
                        const newMentors = [...mentors];
                        newMentors[index].email = e.target.value;
                        setMentors(newMentors);
                      }}
                      placeholder="mentor@example.com"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Phone number</Label>
                    <Input
                      type="tel"
                      value={mentor.phone}
                      onChange={(e) => {
                        const newMentors = [...mentors];
                        newMentors[index].phone = e.target.value;
                        setMentors(newMentors);
                      }}
                      placeholder="(000) 000-0000"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Website</Label>
                    <Input
                      type="url"
                      value={mentor.website}
                      onChange={(e) => {
                        const newMentors = [...mentors];
                        newMentors[index].website = e.target.value;
                        setMentors(newMentors);
                      }}
                      placeholder="https://example.com"
                      className="border-gray-200 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Narrative</Label>
                    <Textarea
                      value={mentor.narrative || ''}
                      onChange={e => {
                        const newMentors = [...mentors];
                        newMentors[index].narrative = e.target.value;
                        setMentors(newMentors);
                      }}
                      placeholder="Describe how this mentor supported you, what you learned from them, or why their recommendation is meaningful."
                      className="min-h-[100px] border-gray-200 bg-white"
                      maxLength={500}
                    />
                    <div className="text-right text-sm text-gray-500">
                      {(mentor.narrative ? mentor.narrative.length : 0)}/500 characters
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-8">
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-700 text-base">
                No matter the level—high school, GED, associate's degree, all the way up to a PhD—every educational experience helps tell your story and shows the progress you've made.<br />
                Be sure to include any education you completed while incarcerated or through an alternative-to-incarceration program—these experiences demonstrate your commitment to growth and learning in challenging circumstances.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-gray-700">Education</Label>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddEducation}
                className="border-gray-200"
              >
                ADD EDUCATION
              </Button>
            </div>
            {education.map((edu, index) => (
              <div key={index} className="relative space-y-4 rounded-lg border border-gray-200 p-4 mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-500"
                  onClick={() => handleRemoveEducation(index)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="space-y-2">
                  <Label className="text-gray-700">School's Name *</Label>
                  <Input
                    value={edu.school}
                    onChange={e => handleEducationChange(index, 'school', e.target.value)}
                    placeholder="Enter the name of your school"
                    className="border-gray-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">School's location</Label>
                  <Input
                    value={edu.location}
                    onChange={e => handleEducationChange(index, 'location', e.target.value)}
                    placeholder="Enter your school's location"
                    className="border-gray-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={e => handleEducationChange(index, 'degree', e.target.value)}
                    placeholder="Enter the degree you obtained"
                    className="border-gray-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={e => handleEducationChange(index, 'field', e.target.value)}
                    placeholder="Enter your field of study"
                    className="border-gray-200 bg-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={edu.currentlyEnrolled}
                    onCheckedChange={checked => handleEducationChange(index, 'currentlyEnrolled', checked)}
                    id={`currentlyEnrolled-${index}`}
                  />
                  <Label htmlFor={`currentlyEnrolled-${index}`} className="text-gray-700">I am currently enrolled here</Label>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Start Date</Label>
                  <Input
                    value={edu.startDate}
                    onChange={e => handleEducationChange(index, 'startDate', e.target.value)}
                    placeholder="MM/DD/YYYY"
                    className="border-gray-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">End Date</Label>
                  <Input
                    value={edu.endDate}
                    onChange={e => handleEducationChange(index, 'endDate', e.target.value)}
                    placeholder="MM/DD/YYYY"
                    className="border-gray-200 bg-white"
                    disabled={edu.currentlyEnrolled}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Grade</Label>
                  <Input
                    value={edu.grade}
                    onChange={e => handleEducationChange(index, 'grade', e.target.value)}
                    placeholder="Enter your grade"
                    className="border-gray-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Description of the experience</Label>
                  <Textarea
                    value={edu.description}
                    onChange={e => handleEducationChange(index, 'description', e.target.value)}
                    placeholder="Summarize your education, degrees, and relevant coursework. Highlight how your academic experience prepares you to contribute to the organization's goals"
                    className="min-h-[100px] border-gray-200 bg-white"
                    maxLength={700}
                  />
                  <div className="text-right text-sm text-gray-500">
                    {edu.description.length}/700 characters
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Upload optional supporting file (image or pdf)</Label>
                  <input
                    type="file"
                    ref={el => educationFileInputRefs.current[index] = el}
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={e => handleEducationFileChange(index, e.target.files?.[0] || null)}
                  />
                  {!edu.file ? (
                    <div
                      className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100"
                      onClick={() => educationFileInputRefs.current[index]?.click()}
                      onDrop={e => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleEducationFileChange(index, e.dataTransfer.files[0]);
                        }
                      }}
                      onDragOver={e => e.preventDefault()}
                    >
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                          Images or PDF (max 5MB)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center gap-4">
                        {edu.filePreview ? (
                          <div className="relative">
                            <img
                              src={edu.filePreview}
                              alt="Preview"
                              className="h-20 w-20 rounded object-cover"
                            />
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                              onClick={() => window.open(edu.filePreview, '_blank')}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-100">
                              <p className="text-sm text-gray-500">PDF</p>
                            </div>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                              onClick={() => window.open(URL.createObjectURL(edu.file!), '_blank')}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {edu.file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(edu.file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => handleRemoveEducationFile(index)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'employment-history':
        return (
          <div className="space-y-8">
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <p className="text-gray-700 text-base">
                Your employment history is a powerful part of your story. Include all jobs, internships, and volunteer work—whether before, during, or after incarceration. Every role, no matter how big or small, demonstrates your skills, growth, and commitment to moving forward.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-gray-700">Employment</Label>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddEmployment}
                className="border-gray-200"
              >
                ADD ANOTHER EMPLOYMENT HISTORY EXPERIENCE
              </Button>
            </div>
            {employmentHistory.map((job, index) => (
              <div key={index} className="relative space-y-4 rounded-lg border border-gray-200 p-4 mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-500"
                  onClick={() => handleRemoveEmployment(index)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <div className="space-y-2">
                  <Label className="text-gray-700">Employment Title *</Label>
                  <Input
                    value={job.title}
                    onChange={e => handleEmploymentChange(index, 'title', e.target.value)}
                    placeholder="Enter your employment title"
                    className="border-gray-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Employment Type</Label>
                  <Select
                    value={job.type}
                    onValueChange={value => handleEmploymentChange(index, 'type', value)}
                  >
                    <SelectTrigger className="border-gray-200 bg-white">
                      <SelectValue placeholder="Select Employment type from the options" />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Company name *</Label>
                  <Input
                    value={job.company}
                    onChange={e => handleEmploymentChange(index, 'company', e.target.value)}
                    placeholder="Enter your company name"
                    className="border-gray-200 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Company location</Label>
                  <Input
                    value={job.location}
                    onChange={e => handleEmploymentChange(index, 'location', e.target.value)}
                    placeholder="Enter your company location"
                    className="border-gray-200 bg-white"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={job.incarcerated}
                      onCheckedChange={checked => handleEmploymentChange(index, 'incarcerated', checked)}
                      id={`incarcerated-${index}`}
                    />
                    <Label htmlFor={`incarcerated-${index}`} className="text-gray-700">I was employed in this role while I was incarcerated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={job.currentlyWorking}
                      onCheckedChange={checked => handleEmploymentChange(index, 'currentlyWorking', checked)}
                      id={`currentlyWorking-${index}`}
                    />
                    <Label htmlFor={`currentlyWorking-${index}`} className="text-gray-700">I am currently working in this role</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={
                          `w-full justify-start text-left font-normal border-gray-200 bg-white ${!job.startDate ? 'text-muted-foreground' : ''}`
                        }
                      >
                        {job.startDate ? format(new Date(job.startDate), 'MM/dd/yyyy') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={job.startDate ? new Date(job.startDate) : undefined}
                        onSelect={date => {
                          handleEmploymentChange(index, 'startDate', date ? date.toISOString().split('T')[0] : '');
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={
                          `w-full justify-start text-left font-normal border-gray-200 bg-white ${!job.endDate ? 'text-muted-foreground' : ''}`
                        }
                        disabled={job.currentlyWorking}
                      >
                        {job.endDate ? format(new Date(job.endDate), 'MM/dd/yyyy') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={job.endDate ? new Date(job.endDate) : undefined}
                        onSelect={date => {
                          handleEmploymentChange(index, 'endDate', date ? date.toISOString().split('T')[0] : '');
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Description of your role</Label>
                  <Textarea
                    value={job.description}
                    onChange={e => handleEmploymentChange(index, 'description', e.target.value)}
                    placeholder="Describe your role, responsibilities, and achievements"
                    className="min-h-[100px] border-gray-200 bg-white"
                    maxLength={700}
                  />
                  <div className="text-right text-sm text-gray-500">
                    {job.description.length}/700 characters
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-700">Upload optional supporting file (image or pdf)</Label>
                  <input
                    type="file"
                    ref={el => employmentFileInputRefs.current[index] = el}
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={e => handleEmploymentFileChange(index, e.target.files?.[0] || null)}
                  />
                  {!job.file ? (
                    <div
                      className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100"
                      onClick={() => employmentFileInputRefs.current[index]?.click()}
                      onDrop={e => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleEmploymentFileChange(index, e.dataTransfer.files[0]);
                        }
                      }}
                      onDragOver={e => e.preventDefault()}
                    >
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                          Images or PDF (max 5MB)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center gap-4">
                        {job.filePreview ? (
                          <div className="relative">
                            <img
                              src={job.filePreview}
                              alt="Preview"
                              className="h-20 w-20 rounded object-cover"
                            />
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                              onClick={() => window.open(job.filePreview, '_blank')}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-100">
                              <p className="text-sm text-gray-500">PDF</p>
                            </div>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                              onClick={() => window.open(URL.createObjectURL(job.file!), '_blank')}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {job.file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(job.file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => handleRemoveEmploymentFile(index)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'hobbies':
        return (
          <div className="max-w-3xl mx-auto space-y-8 border border-gray-200 rounded-lg p-8">
            <p className="text-sm text-gray-500 mb-4">
              Your interests speak volumes about you. Listing your hobbies and leisure activities provides a fuller picture of your personality, enriching your profile and making it more engaging.
            </p>
            {/* General Hobbies Multi-Select Chips */}
            <div className="space-y-2">
              <Label className="text-gray-700">General</Label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type or select..."
                  className="border border-gray-200 bg-white rounded px-3 py-2 w-full"
                  onFocus={() => setShowGeneralDropdown(true)}
                  onChange={e => setGeneralInput(e.target.value)}
                  value={generalInput}
                  ref={generalInputRef}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && generalInput.trim()) {
                      const val = generalInput.trim();
                      if (val && !hobbies.general.includes(val)) {
                        handleHobbiesChange('general', [...hobbies.general, val]);
                        setGeneralInput('');
                        setShowGeneralDropdown(true);
                        setTimeout(() => generalInputRef.current?.focus(), 0);
                      }
                    } else if (e.key === 'ArrowDown') {
                      setShowGeneralDropdown(true);
                    }
                  }}
                  autoComplete="off"
                />
                {showGeneralDropdown && (
                  <div ref={generalDropdownRef} className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow max-h-48 overflow-y-auto">
                    {generalHobbies.filter(hobby =>
                      hobby.toLowerCase().includes(generalInput.toLowerCase()) && !hobbies.general.includes(hobby)
                    ).map(hobby => (
                      <div
                        key={hobby}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onMouseDown={e => {
                          e.preventDefault();
                          handleHobbiesChange('general', [...hobbies.general, hobby]);
                          setGeneralInput('');
                          setShowGeneralDropdown(true);
                          setTimeout(() => generalInputRef.current?.focus(), 0);
                        }}
                      >
                        {hobby}
                      </div>
                    ))}
                    {generalHobbies.filter(hobby =>
                      hobby.toLowerCase().includes(generalInput.toLowerCase()) && !hobbies.general.includes(hobby)
                    ).length === 0 && (
                      <div className="px-3 py-2 text-gray-400">No options</div>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {hobbies.general.map((hobby, idx) => (
                    <span key={idx} className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                      {hobby}
                      <button
                        className="ml-2 text-primary hover:text-primary/80"
                        onClick={() => handleHobbiesChange('general', hobbies.general.filter((_, i) => i !== idx))}
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Sports Hobbies Multi-Select Chips */}
            <div className="space-y-2">
              <Label className="text-gray-700">Sports</Label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type or select..."
                  className="border border-gray-200 bg-white rounded px-3 py-2 w-full"
                  onFocus={() => setShowSportsDropdown(true)}
                  onChange={e => setSportsInput(e.target.value)}
                  value={sportsInput}
                  ref={sportsInputRef}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && sportsInput.trim()) {
                      const val = sportsInput.trim();
                      if (val && !hobbies.sports.includes(val)) {
                        handleHobbiesChange('sports', [...hobbies.sports, val]);
                        setSportsInput('');
                        setShowSportsDropdown(true);
                        setTimeout(() => sportsInputRef.current?.focus(), 0);
                      }
                    } else if (e.key === 'ArrowDown') {
                      setShowSportsDropdown(true);
                    }
                  }}
                  autoComplete="off"
                />
                {showSportsDropdown && (
                  <div ref={sportsDropdownRef} className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded shadow max-h-48 overflow-y-auto">
                    {sportsHobbies.filter(hobby =>
                      hobby.toLowerCase().includes(sportsInput.toLowerCase()) && !hobbies.sports.includes(hobby)
                    ).map(hobby => (
                      <div
                        key={hobby}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onMouseDown={e => {
                          e.preventDefault();
                          handleHobbiesChange('sports', [...hobbies.sports, hobby]);
                          setSportsInput('');
                          setShowSportsDropdown(true);
                          setTimeout(() => sportsInputRef.current?.focus(), 0);
                        }}
                      >
                        {hobby}
                      </div>
                    ))}
                    {sportsHobbies.filter(hobby =>
                      hobby.toLowerCase().includes(sportsInput.toLowerCase()) && !hobbies.sports.includes(hobby)
                    ).length === 0 && (
                      <div className="px-3 py-2 text-gray-400">No options</div>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {hobbies.sports.map((hobby, idx) => (
                    <span key={idx} className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                      {hobby}
                      <button
                        className="ml-2 text-primary hover:text-primary/80"
                        onClick={() => handleHobbiesChange('sports', hobbies.sports.filter((_, i) => i !== idx))}
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Other Hobbies & Interests */}
            <div className="space-y-4">
              <Label className="text-gray-700">Other Hobbies & Interests</Label>
              <Textarea
                value={hobbies.other}
                onChange={e => handleHobbiesChange('other', e.target.value)}
                placeholder="List any additional hobbies or interests"
                className="min-h-[80px] border-gray-200 bg-white"
                maxLength={300}
              />
              <div className="text-right text-sm text-gray-500">
                {hobbies.other.length}/300 characters
              </div>
              <Label className="text-gray-700">Hobbies Narrative</Label>
              <Textarea
                value={hobbies.narrative || ''}
                onChange={e => handleHobbiesChange('narrative', e.target.value)}
                placeholder="Describe what your hobbies and interests mean to you, how they have shaped your journey, or how they help you grow."
                className="min-h-[100px] border-gray-200 bg-white"
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500">
                {(hobbies.narrative ? hobbies.narrative.length : 0)}/500 characters
              </div>
            </div>
            {/* File Upload (unchanged) */}
            <div className="space-y-2">
              <Label className="text-gray-700">Upload optional supporting file (image or pdf)</Label>
              <input
                type="file"
                ref={hobbiesFileInputRef}
                className="hidden"
                accept="image/*,.pdf"
                onChange={e => handleHobbiesFileChange(e.target.files?.[0] || null)}
              />
              {!hobbies.file ? (
                <div
                  className="flex flex-col sm:flex-row items-center gap-2 justify-between rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 px-4 py-4 cursor-pointer"
                  onClick={() => hobbiesFileInputRef.current?.click()}
                  onDrop={e => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleHobbiesFileChange(e.dataTransfer.files[0]);
                    }
                  }}
                  onDragOver={e => e.preventDefault()}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Upload className="h-6 w-6 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 font-medium">Drag and drop a file here or</div>
                    </div>
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={e => {
                        e.stopPropagation();
                        hobbiesFileInputRef.current?.click();
                      }}
                    >
                      <Upload className="mr-2 h-4 w-4" />UPLOAD
                    </Button>
                  </div>
                  <div className="text-xs text-gray-400 w-full text-right mt-1">Max file size: 5mb</div>
                </div>
              ) : (
                <div className="relative rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center gap-4">
                    {hobbies.filePreview ? (
                      <div className="relative">
                        <img
                          src={hobbies.filePreview}
                          alt="Preview"
                          className="h-20 w-20 rounded object-cover"
                        />
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                          onClick={() => window.open(hobbies.filePreview, '_blank')}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-100">
                          <p className="text-sm text-gray-500">PDF</p>
                        </div>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white shadow-md hover:bg-gray-100"
                          onClick={() => window.open(URL.createObjectURL(hobbies.file!), '_blank')}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {hobbies.file?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(hobbies.file?.size ? hobbies.file.size / 1024 : 0).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={handleRemoveHobbiesFile}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-72 border-r border-gray-200 bg-gray-50 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Progress</h2>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div className="h-full w-[70%] rounded-full bg-primary" />
          </div>
        </div>

        <nav className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full rounded-lg p-3 text-left transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="text-sm font-medium">{category.title}</div>
              <div className="mt-1 text-xs text-gray-500">
                {category.description}
              </div>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {categories.find((c) => c.id === activeCategory)?.title}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Cloud className="h-4 w-4" />
              <span>Saved to Cloud</span>
            </div>
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50" onClick={() => router.push('/restorative-record/my-restorative-record')}>
              MY RESTORATIVE RECORD
            </Button>
          </div>
        </div>

        {renderContent()}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            className="border-gray-200 text-gray-700"
            onClick={handlePrevious}
            disabled={activeCategory === 'introduction'}
          >
            PREVIOUS
          </Button>
          <Button 
            className="bg-primary text-white hover:bg-primary/90"
            onClick={handleNext}
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
}