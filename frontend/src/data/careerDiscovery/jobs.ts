import type { Job } from '../../types/career';

export const jobs: Job[] = [
  {
    id: 'software-tester',
    title: 'Software Tester / QA Analyst',
    industry: 'Technology',
    level: 'entry',
    salary: { min: 35000, max: 55000 },
    description: 'Test software applications for bugs, issues, and quality problems before they reach users.',

    cognitiveProfile: {
      strengths: ['detailed-work', 'pattern-recognition', 'hyperfocus'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 3,

    typicalDay: '9am: Review new bug reports and test cases. 10am: Run manual tests on new features. 1pm: Document bugs found. 3pm: Retest fixed issues. 4pm: Team standup meeting (15 min).',

    skillsNeeded: ['Attention to detail', 'Problem-solving', 'Basic technical knowledge', 'Documentation'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: false,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: '9-5, flexible hours common',

    growthPath: ['QA Tester', 'Senior QA Analyst', 'QA Lead', 'QA Manager'],
    certifications: ['ISTQB Foundation (optional but helpful)'],

    similar: ['Test Automation Engineer', 'Quality Assurance Analyst', 'Bug Hunter'],

    gettingStarted: [
      'Learn testing basics: Free courses on Coursera, Udemy',
      'Practice: Test open-source projects on GitHub',
      'Get certified: ISTQB Foundation certification',
      'Apply: Entry-level QA roles on Indeed, LinkedIn',
    ],

    tags: ['technical', 'detail-oriented', 'low-social', 'remote-friendly', 'pattern-recognition'],
  },

  {
    id: 'data-entry-specialist',
    title: 'Data Entry Specialist',
    industry: 'Administrative',
    level: 'entry',
    salary: { min: 28000, max: 40000 },
    description: 'Enter, update, and maintain data in computer systems with high accuracy.',

    cognitiveProfile: {
      strengths: ['detailed-work', 'hyperfocus', 'organizing-systematizing'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 6,

    typicalDay: '9am: Review daily data entry tasks. 9:30am: Input data from forms/documents. 12pm: Lunch break. 1pm: Continue data entry work. 3pm: Quality check completed entries. 4:30pm: Prepare tomorrow\'s workload.',

    skillsNeeded: ['Fast typing', 'Attention to detail', 'Basic computer skills', 'Accuracy'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: '9-5, some flexibility',

    growthPath: ['Data Entry Clerk', 'Senior Data Entry Specialist', 'Data Coordinator', 'Database Administrator'],
    certifications: ['Microsoft Office Specialist (helpful)'],

    similar: ['Administrative Assistant', 'Records Clerk', 'Database Coordinator'],

    gettingStarted: [
      'Improve typing speed: Practice on typing.com',
      'Learn Excel basics: Free YouTube tutorials',
      'Build accuracy: Practice data entry on sample datasets',
      'Apply: Temp agencies, remote job boards',
    ],

    tags: ['detail-oriented', 'low-social', 'remote-friendly', 'repetitive', 'structured'],
  },

  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    industry: 'Creative',
    level: 'entry',
    salary: { min: 35000, max: 50000 },
    description: 'Create visual content for websites, marketing materials, social media, and branding.',

    cognitiveProfile: {
      strengths: ['creative-thinking', 'visual-spatial', 'pattern-creation'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 4,

    typicalDay: '9am: Review client briefs. 10am: Design mockups in Figma/Adobe. 12pm: Client feedback meeting (30 min). 1pm: Revisions and refinements. 3pm: Export final files. 4pm: Start new project research.',

    skillsNeeded: ['Adobe Creative Suite', 'Visual design', 'Creativity', 'Client communication'],

    sensoryDemands: {
      noise: 'medium',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 40,
    schedule: 'Flexible, project-based',

    growthPath: ['Junior Designer', 'Graphic Designer', 'Senior Designer', 'Art Director'],
    certifications: ['Adobe Certified Professional (optional)'],

    similar: ['UI Designer', 'Brand Designer', 'Visual Designer'],

    gettingStarted: [
      'Learn design software: Adobe tutorials, YouTube',
      'Build portfolio: Design for friends, nonprofits, mock projects',
      'Study design principles: Free courses on Coursera',
      'Apply: Dribbble, Behance, design agencies',
    ],

    tags: ['creative', 'visual', 'remote-friendly', 'project-based', 'portfolio'],
  },

  {
    id: 'library-assistant',
    title: 'Library Assistant',
    industry: 'Education / Public Service',
    level: 'entry',
    salary: { min: 25000, max: 35000 },
    description: 'Help patrons find books, organize materials, maintain library systems, and support library operations.',

    cognitiveProfile: {
      strengths: ['organizing-systematizing', 'detailed-work', 'teaching-explaining'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 2,

    typicalDay: '9am: Shelve returned books. 10am: Help patrons find materials. 12pm: Organize new arrivals. 2pm: Update catalog system. 4pm: Prepare for story time or programs.',

    skillsNeeded: ['Organization', 'Customer service', 'Computer systems', 'Patience'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 30,
    schedule: 'Part-time available, weekends sometimes required',

    growthPath: ['Library Assistant', 'Library Technician', 'Librarian (with degree)'],
    certifications: ['Library Support Staff Certification (optional)'],

    similar: ['Archives Assistant', 'Museum Assistant', 'Records Coordinator'],

    gettingStarted: [
      'Volunteer at local library',
      'Learn library systems: Ask librarians for training',
      'Get certified: American Library Association programs',
      'Apply: Public libraries, school libraries, universities',
    ],

    tags: ['organized', 'quiet', 'teaching-explaining', 'structured', 'low-stress'],
  },

  {
    id: 'content-writer',
    title: 'Content Writer',
    industry: 'Marketing / Media',
    level: 'entry',
    salary: { min: 35000, max: 50000 },
    description: 'Write blog posts, articles, website copy, social media content, and marketing materials.',

    cognitiveProfile: {
      strengths: ['writing-language', 'creative-thinking', 'problem-solving'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 5,

    typicalDay: '9am: Research topics for blog posts. 10am: Write draft articles. 1pm: Edit and revise. 3pm: Upload to CMS. 4pm: Plan next week\'s content calendar.',

    skillsNeeded: ['Writing', 'Research', 'SEO basics', 'Grammar', 'Creativity'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'Flexible, remote-friendly',

    growthPath: ['Junior Writer', 'Content Writer', 'Senior Writer', 'Content Manager', 'Editor'],
    certifications: ['HubSpot Content Marketing (free)'],

    similar: ['Copywriter', 'Technical Writer', 'Blog Writer', 'SEO Writer'],

    gettingStarted: [
      'Start a blog: Medium, WordPress',
      'Learn SEO: Free HubSpot courses',
      'Build portfolio: Guest posts, freelance on Upwork',
      'Apply: Content agencies, marketing companies, startups',
    ],

    tags: ['writing', 'creative', 'remote-friendly', 'flexible', 'solo-work'],
  },

  {
    id: 'video-editor',
    title: 'Video Editor',
    industry: 'Media / Creative',
    level: 'entry',
    salary: { min: 35000, max: 55000 },
    description: 'Edit video footage for YouTube, social media, marketing, films, or corporate content.',

    cognitiveProfile: {
      strengths: ['creative-thinking', 'visual-spatial', 'hyperfocus', 'detailed-work'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 3,

    typicalDay: '9am: Review raw footage. 10am: Edit in Premiere Pro/Final Cut. 12pm: Add music and effects. 2pm: Client review. 3pm: Revisions. 5pm: Export and deliver files.',

    skillsNeeded: ['Adobe Premiere', 'After Effects', 'Storytelling', 'Attention to detail', 'Creativity'],

    sensoryDemands: {
      noise: 'low',
      lights: 'dim',
      openPlan: false,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'Project-based, flexible hours',

    growthPath: ['Junior Editor', 'Video Editor', 'Senior Editor', 'Post-Production Manager'],
    certifications: ['Adobe Certified Professional (optional)'],

    similar: ['Motion Graphics Designer', 'YouTube Editor', 'Film Editor'],

    gettingStarted: [
      'Learn editing software: YouTube tutorials, Skillshare',
      'Build portfolio: Edit for YouTubers, small businesses',
      'Practice storytelling: Study film editing techniques',
      'Apply: Freelance platforms, creative agencies, media companies',
    ],

    tags: ['creative', 'visual', 'hyperfocus-friendly', 'remote-friendly', 'solo-work'],
  },

  {
    id: 'bookkeeper',
    title: 'Bookkeeper',
    industry: 'Finance / Administrative',
    level: 'entry',
    salary: { min: 35000, max: 50000 },
    description: 'Manage financial records, track expenses, reconcile accounts, and prepare financial reports for businesses.',

    cognitiveProfile: {
      strengths: ['detailed-work', 'organizing-systematizing', 'pattern-recognition'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 4,

    typicalDay: '9am: Review transactions. 10am: Enter expenses in QuickBooks. 11am: Reconcile bank statements. 1pm: Prepare financial reports. 3pm: Invoice clients. 4pm: Follow up on payments.',

    skillsNeeded: ['Math basics', 'Attention to detail', 'QuickBooks', 'Organization', 'Accuracy'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: '9-5, some remote options',

    growthPath: ['Bookkeeper', 'Senior Bookkeeper', 'Accounting Manager', 'CPA (with certification)'],
    certifications: ['Certified Bookkeeper (CB)', 'QuickBooks Certified'],

    similar: ['Accounting Clerk', 'Payroll Specialist', 'Financial Clerk'],

    gettingStarted: [
      'Learn QuickBooks: Free trial + tutorials',
      'Take bookkeeping course: Community college, Coursera',
      'Get certified: American Institute of Professional Bookkeepers',
      'Apply: Small businesses, accounting firms, remote bookkeeping companies',
    ],

    tags: ['detail-oriented', 'organized', 'remote-friendly', 'structured', 'numbers'],
  },

  {
    id: 'research-assistant',
    title: 'Research Assistant',
    industry: 'Education / Science',
    level: 'entry',
    salary: { min: 30000, max: 45000 },
    description: 'Support research projects by collecting data, conducting literature reviews, and analyzing findings.',

    cognitiveProfile: {
      strengths: ['problem-solving', 'detailed-work', 'organizing-systematizing'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 3,

    typicalDay: '9am: Literature review. 11am: Collect and organize data. 1pm: Data entry and analysis. 3pm: Prepare research summaries. 4pm: Team meeting with lead researcher.',

    skillsNeeded: ['Research skills', 'Data analysis', 'Writing', 'Organization', 'Critical thinking'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: '9-5, academic calendar',

    growthPath: ['Research Assistant', 'Senior Research Assistant', 'Research Coordinator', 'Research Scientist (with degree)'],
    certifications: ['Research methodology courses (helpful)'],

    similar: ['Lab Assistant', 'Data Analyst', 'Clinical Research Coordinator'],

    gettingStarted: [
      'Volunteer in university labs',
      'Learn research methods: Free courses online',
      'Develop Excel/data skills',
      'Apply: Universities, research institutes, hospitals',
    ],

    tags: ['research', 'detail-oriented', 'learning', 'quiet', 'structured'],
  },

  {
    id: 'accessibility-specialist',
    title: 'Digital Accessibility Specialist',
    industry: 'Technology / UX',
    level: 'entry',
    salary: { min: 45000, max: 65000 },
    description: 'Test websites and apps for accessibility, ensure compliance with WCAG standards, advocate for inclusive design.',

    cognitiveProfile: {
      strengths: ['detailed-work', 'pattern-recognition', 'teaching-explaining', 'technical-coding'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 2,

    typicalDay: '9am: Audit website for accessibility issues. 11am: Test with screen readers. 1pm: Document findings. 2pm: Collaborate with developers on fixes. 4pm: Create accessibility guidelines.',

    skillsNeeded: ['WCAG standards', 'HTML/CSS basics', 'Screen reader testing', 'Empathy', 'Communication'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 40,
    schedule: 'Flexible, remote common',

    growthPath: ['Accessibility Tester', 'Accessibility Specialist', 'Senior Specialist', 'Accessibility Lead'],
    certifications: ['IAAP Certified Professional in Accessibility Core Competencies (CPACC)'],

    similar: ['UX Researcher', 'Usability Tester', 'Inclusive Design Specialist'],

    gettingStarted: [
      'Learn WCAG: Free W3C resources',
      'Test websites: Practice with free tools (WAVE, aXe)',
      'Get certified: IAAP certification',
      'Apply: Tech companies, agencies, nonprofits',
    ],

    tags: ['technical', 'detail-oriented', 'teaching-explaining', 'remote-friendly', 'meaningful'],
  },

  {
    id: 'technical-support',
    title: 'Technical Support Specialist',
    industry: 'Technology',
    level: 'entry',
    salary: { min: 35000, max: 50000 },
    description: 'Help customers solve technical problems via phone, chat, or email.',

    cognitiveProfile: {
      strengths: ['problem-solving', 'teaching-explaining', 'detailed-work'],
      challenges: ['social-interaction'],
      score: 7,
    },

    aiRiskScore: 4,

    typicalDay: '9am: Answer support tickets. 10am: Troubleshoot customer issues via chat. 12pm: Document common problems. 2pm: Escalate complex issues. 4pm: Update knowledge base.',

    skillsNeeded: ['Tech troubleshooting', 'Customer service', 'Communication', 'Patience', 'Problem-solving'],

    sensoryDemands: {
      noise: 'medium',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'high',
    hoursPerWeek: 40,
    schedule: 'May include evenings/weekends',

    growthPath: ['Tech Support Rep', 'Senior Support Specialist', 'Support Team Lead', 'IT Support Manager'],
    certifications: ['CompTIA A+ (helpful)'],

    similar: ['Customer Support Rep', 'Help Desk Technician', 'IT Support'],

    gettingStarted: [
      'Learn troubleshooting: Practice with friends/family tech issues',
      'Get certified: CompTIA A+ certification',
      'Develop soft skills: Customer service training',
      'Apply: Tech companies, SaaS startups, remote support teams',
    ],

    tags: ['technical', 'teaching-explaining', 'remote-friendly', 'problem-solving', 'customer-facing'],
  },

  {
    id: 'copywriter',
    title: 'Copywriter',
    industry: 'Marketing / Advertising',
    level: 'entry',
    salary: { min: 40000, max: 60000 },
    description: 'Write persuasive copy for ads, websites, emails, and marketing campaigns.',

    cognitiveProfile: {
      strengths: ['writing-language', 'creative-thinking', 'pattern-recognition'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 5,

    typicalDay: '9am: Research target audience. 10am: Write ad copy. 12pm: Brainstorm campaign ideas. 2pm: Revise based on feedback. 4pm: Collaborate with design team.',

    skillsNeeded: ['Persuasive writing', 'Creativity', 'Marketing understanding', 'Editing', 'Storytelling'],

    sensoryDemands: {
      noise: 'medium',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 40,
    schedule: 'Flexible, project-based',

    growthPath: ['Junior Copywriter', 'Copywriter', 'Senior Copywriter', 'Creative Director'],
    certifications: ['Google Ads Certification (helpful)'],

    similar: ['Content Writer', 'Marketing Writer', 'Ad Writer'],

    gettingStarted: [
      'Study great ads: Analyze successful campaigns',
      'Build portfolio: Write spec ads, freelance projects',
      'Learn marketing basics: Free HubSpot courses',
      'Apply: Ad agencies, marketing departments, freelance',
    ],

    tags: ['writing', 'creative', 'marketing', 'remote-friendly', 'persuasive'],
  },

  {
    id: 'ux-researcher',
    title: 'UX Researcher',
    industry: 'Technology / Design',
    level: 'entry',
    salary: { min: 50000, max: 70000 },
    description: 'Study how people use products, conduct user interviews, analyze behavior, improve user experience.',

    cognitiveProfile: {
      strengths: ['problem-solving', 'pattern-recognition', 'teaching-explaining', 'organizing-systematizing'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 2,

    typicalDay: '9am: Plan user research study. 10am: Conduct user interviews. 1pm: Analyze interview transcripts. 3pm: Create research report. 4pm: Present findings to product team.',

    skillsNeeded: ['Research methods', 'User interviews', 'Data analysis', 'Empathy', 'Communication'],

    sensoryDemands: {
      noise: 'medium',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 40,
    schedule: 'Flexible, remote common',

    growthPath: ['UX Research Assistant', 'UX Researcher', 'Senior UX Researcher', 'Research Lead'],
    certifications: ['Nielsen Norman Group UX Certification'],

    similar: ['User Researcher', 'Product Researcher', 'Usability Analyst'],

    gettingStarted: [
      'Learn research methods: Free courses (Coursera, NN/g)',
      'Practice interviews: Volunteer for research studies',
      'Build portfolio: Conduct your own studies',
      'Apply: Tech companies, design agencies, startups',
    ],

    tags: ['research', 'teaching-explaining', 'tech', 'remote-friendly', 'user-focused'],
  },

  {
    id: 'database-admin',
    title: 'Database Administrator',
    industry: 'Technology / IT',
    level: 'mid',
    salary: { min: 55000, max: 85000 },
    description: 'Manage, maintain, and secure databases for organizations.',

    cognitiveProfile: {
      strengths: ['technical-coding', 'organizing-systematizing', 'detailed-work', 'problem-solving'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 3,

    typicalDay: '9am: Monitor database performance. 10am: Optimize queries. 12pm: Backup data. 2pm: Troubleshoot issues. 4pm: Document changes.',

    skillsNeeded: ['SQL', 'Database systems', 'Problem-solving', 'Attention to detail', 'System administration'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'May include on-call support',

    growthPath: ['Junior DBA', 'Database Administrator', 'Senior DBA', 'Database Architect'],
    certifications: ['Oracle Certified Professional', 'Microsoft SQL Server Certification'],

    similar: ['Data Engineer', 'Systems Administrator', 'Database Developer'],

    gettingStarted: [
      'Learn SQL: Free courses (Khan Academy, Codecademy)',
      'Practice: Set up test databases',
      'Get certified: Oracle or Microsoft certifications',
      'Apply: IT departments, tech companies, consulting firms',
    ],

    tags: ['technical', 'detail-oriented', 'remote-friendly', 'problem-solving', 'structured'],
  },

  {
    id: 'animal-care-tech',
    title: 'Animal Care Technician',
    industry: 'Animal Care / Veterinary',
    level: 'entry',
    salary: { min: 25000, max: 35000 },
    description: 'Care for animals in shelters, clinics, or kennels. Feed, clean, monitor health, provide comfort.',

    cognitiveProfile: {
      strengths: ['teaching-explaining', 'detailed-work', 'organizing-systematizing'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 1,

    typicalDay: '8am: Feed animals. 9am: Clean kennels/cages. 11am: Monitor health, administer meds. 1pm: Exercise/playtime. 3pm: Update care logs. 5pm: Evening feeding.',

    skillsNeeded: ['Animal handling', 'Patience', 'Physical stamina', 'Observation', 'Compassion'],

    sensoryDemands: {
      noise: 'high',
      lights: 'standard',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'Early mornings, weekends, holidays',

    growthPath: ['Animal Care Assistant', 'Animal Care Technician', 'Kennel Manager', 'Veterinary Technician (with training)'],
    certifications: ['Veterinary Assistant certification (helpful)'],

    similar: ['Kennel Attendant', 'Shelter Worker', 'Pet Sitter'],

    gettingStarted: [
      'Volunteer at animal shelter',
      'Learn animal behavior: Free online resources',
      'Get certified: Veterinary assistant programs',
      'Apply: Animal shelters, vet clinics, kennels, pet stores',
    ],

    tags: ['animals', 'detailed-work', 'compassion', 'physical', 'meaningful'],
  },

  {
    id: 'social-media-manager',
    title: 'Social Media Manager',
    industry: 'Marketing / Media',
    level: 'entry',
    salary: { min: 35000, max: 50000 },
    description: 'Manage social media accounts, create content, engage with followers, track analytics.',

    cognitiveProfile: {
      strengths: ['creative-thinking', 'writing-language', 'pattern-recognition'],
      challenges: [],
      score: 7,
    },

    aiRiskScore: 5,

    typicalDay: '9am: Check engagement, respond to comments. 10am: Create content (posts, graphics). 12pm: Schedule posts. 2pm: Monitor trends. 4pm: Report analytics.',

    skillsNeeded: ['Social media platforms', 'Content creation', 'Writing', 'Analytics', 'Creativity'],

    sensoryDemands: {
      noise: 'medium',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 40,
    schedule: 'Flexible, some evenings/weekends',

    growthPath: ['Social Media Coordinator', 'Social Media Manager', 'Senior Manager', 'Director of Social Media'],
    certifications: ['Meta Blueprint Certification', 'Hootsuite Certification'],

    similar: ['Community Manager', 'Content Manager', 'Digital Marketing Specialist'],

    gettingStarted: [
      'Practice: Manage personal or volunteer accounts',
      'Learn platforms: Free courses (Meta, Hootsuite)',
      'Build portfolio: Show content examples',
      'Apply: Marketing agencies, brands, startups',
    ],

    tags: ['creative', 'writing', 'remote-friendly', 'trend-focused', 'marketing'],
  },

  {
    id: 'archivist',
    title: 'Archivist / Records Manager',
    industry: 'Information Management',
    level: 'entry',
    salary: { min: 35000, max: 50000 },
    description: 'Preserve and organize historical documents, records, and artifacts for organizations or institutions.',

    cognitiveProfile: {
      strengths: ['organizing-systematizing', 'detailed-work', 'problem-solving'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 2,

    typicalDay: '9am: Catalog new materials. 11am: Digitize old records. 1pm: Research provenance. 3pm: Assist researchers. 4pm: Preserve fragile documents.',

    skillsNeeded: ['Organization', 'Research', 'Attention to detail', 'Database management', 'Historical knowledge'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: '9-5, regular hours',

    growthPath: ['Archives Assistant', 'Archivist', 'Senior Archivist', 'Head of Archives'],
    certifications: ['Certified Archivist (CA) - Academy of Certified Archivists'],

    similar: ['Museum Curator', 'Digital Archivist', 'Records Analyst'],

    gettingStarted: [
      'Volunteer at museums or historical societies',
      'Learn archival principles: Free online courses',
      'Get degree: Master\'s in Library Science with archival focus (for advancement)',
      'Apply: Museums, universities, government agencies, corporations',
    ],

    tags: ['organized', 'detail-oriented', 'quiet', 'research', 'preservation'],
  },

  {
    id: 'proofreader',
    title: 'Proofreader / Editor',
    industry: 'Publishing / Media',
    level: 'entry',
    salary: { min: 30000, max: 45000 },
    description: 'Review written content for grammar, spelling, punctuation, and clarity errors.',

    cognitiveProfile: {
      strengths: ['detailed-work', 'pattern-recognition', 'writing-language'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 6,

    typicalDay: '9am: Review manuscripts. 11am: Mark corrections. 1pm: Verify facts. 3pm: Final quality check. 4pm: Return edited documents.',

    skillsNeeded: ['Grammar expertise', 'Attention to detail', 'Language skills', 'Style guides', 'Concentration'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'Flexible, freelance common',

    growthPath: ['Proofreader', 'Copy Editor', 'Managing Editor', 'Editorial Director'],
    certifications: ['Editorial Freelancers Association courses'],

    similar: ['Copy Editor', 'Content Editor', 'Manuscript Editor'],

    gettingStarted: [
      'Master grammar: Style guides (AP, Chicago)',
      'Practice: Edit for friends, volunteer organizations',
      'Take tests: Proofreading certification courses',
      'Apply: Publishing houses, content agencies, freelance platforms',
    ],

    tags: ['detail-oriented', 'writing', 'remote-friendly', 'solo-work', 'quiet'],
  },

  {
    id: 'landscape-gardener',
    title: 'Landscape Gardener',
    industry: 'Outdoors / Horticulture',
    level: 'entry',
    salary: { min: 28000, max: 40000 },
    description: 'Design, plant, and maintain gardens and outdoor spaces for residential or commercial properties.',

    cognitiveProfile: {
      strengths: ['visual-spatial', 'detailed-work', 'creative-thinking'],
      challenges: [],
      score: 7,
    },

    aiRiskScore: 2,

    typicalDay: '7am: Arrive at job site. 8am: Mow lawns, trim hedges. 10am: Plant flowers/shrubs. 12pm: Mulch garden beds. 2pm: Clean up. 4pm: Travel to next site.',

    skillsNeeded: ['Plant knowledge', 'Physical fitness', 'Design sense', 'Equipment operation', 'Outdoor work tolerance'],

    sensoryDemands: {
      noise: 'medium',
      lights: 'bright',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'Early mornings, seasonal work',

    growthPath: ['Gardener', 'Landscape Designer', 'Landscape Contractor', 'Business Owner'],
    certifications: ['Landscape Industry Certified (optional)'],

    similar: ['Groundskeeper', 'Horticulturist', 'Park Ranger'],

    gettingStarted: [
      'Learn plants: Local nursery courses',
      'Practice: Volunteer in community gardens',
      'Get certified: Professional Landcare Network',
      'Apply: Landscaping companies, golf courses, parks departments',
    ],

    tags: ['outdoors', 'physical', 'creative', 'detailed-work', 'nature'],
  },

  {
    id: 'illustrator',
    title: 'Illustrator',
    industry: 'Creative / Art',
    level: 'entry',
    salary: { min: 30000, max: 50000 },
    description: 'Create illustrations for books, magazines, websites, games, and advertising.',

    cognitiveProfile: {
      strengths: ['creative-thinking', 'visual-spatial', 'pattern-creation'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 4,

    typicalDay: '9am: Read creative brief. 10am: Sketch concepts. 12pm: Create digital illustrations. 3pm: Client revisions. 5pm: Final delivery.',

    skillsNeeded: ['Drawing', 'Digital art tools', 'Creativity', 'Visual storytelling', 'Client communication'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: false,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'Flexible, project-based',

    growthPath: ['Freelance Illustrator', 'Staff Illustrator', 'Senior Illustrator', 'Art Director'],
    certifications: ['None required, portfolio is key'],

    similar: ['Concept Artist', 'Character Designer', 'Children\'s Book Illustrator'],

    gettingStarted: [
      'Practice drawing daily',
      'Learn digital tools: Procreate, Adobe Illustrator',
      'Build portfolio: Personal projects, client work',
      'Apply: Freelance platforms, publishing houses, game studios',
    ],

    tags: ['creative', 'visual', 'remote-friendly', 'artistic', 'solo-work'],
  },

  {
    id: 'podcast-producer',
    title: 'Podcast Producer',
    industry: 'Media / Audio',
    level: 'entry',
    salary: { min: 30000, max: 50000 },
    description: 'Plan, record, edit, and publish podcast episodes. Manage production workflow.',

    cognitiveProfile: {
      strengths: ['creative-thinking', 'organizing-systematizing', 'hyperfocus'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 3,

    typicalDay: '9am: Plan episode topics. 10am: Record interviews. 12pm: Edit audio. 3pm: Add music/effects. 5pm: Upload and schedule.',

    skillsNeeded: ['Audio editing', 'Storytelling', 'Organization', 'Communication', 'Technical skills'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: false,
      remote: true,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 40,
    schedule: 'Flexible, project-based',

    growthPath: ['Podcast Assistant', 'Podcast Producer', 'Senior Producer', 'Audio Director'],
    certifications: ['None required, portfolio and experience matter'],

    similar: ['Audio Editor', 'Radio Producer', 'Content Producer'],

    gettingStarted: [
      'Start your own podcast: Practice with Anchor, Buzzsprout',
      'Learn audio editing: Audacity (free), Adobe Audition',
      'Build portfolio: Produce for others',
      'Apply: Podcast networks, media companies, freelance',
    ],

    tags: ['creative', 'audio', 'remote-friendly', 'storytelling', 'hyperfocus-friendly'],
  },

  {
    id: 'web-developer',
    title: 'Web Developer',
    industry: 'Technology',
    level: 'entry',
    salary: { min: 50000, max: 75000 },
    description: 'Build and maintain websites using HTML, CSS, JavaScript, and other web technologies.',

    cognitiveProfile: {
      strengths: ['technical-coding', 'problem-solving', 'hyperfocus', 'pattern-recognition'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 3,

    typicalDay: '9am: Daily standup. 10am: Write code for new features. 12pm: Debug issues. 2pm: Code review. 4pm: Deploy updates.',

    skillsNeeded: ['HTML/CSS', 'JavaScript', 'Problem-solving', 'Git', 'Web frameworks'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'Flexible, remote common',

    growthPath: ['Junior Developer', 'Web Developer', 'Senior Developer', 'Lead Developer', 'Engineering Manager'],
    certifications: ['None required, portfolio matters most'],

    similar: ['Front-End Developer', 'Full-Stack Developer', 'Software Engineer'],

    gettingStarted: [
      'Learn to code: Free resources (freeCodeCamp, The Odin Project)',
      'Build projects: Personal website, apps',
      'Contribute to open source: GitHub',
      'Apply: Startups, tech companies, agencies',
    ],

    tags: ['technical', 'coding', 'remote-friendly', 'problem-solving', 'hyperfocus-friendly'],
  },

  {
    id: 'museum-educator',
    title: 'Museum Educator',
    industry: 'Education / Culture',
    level: 'entry',
    salary: { min: 30000, max: 45000 },
    description: 'Lead tours, create educational programs, engage visitors with exhibits and collections.',

    cognitiveProfile: {
      strengths: ['teaching-explaining', 'problem-solving', 'creative-thinking'],
      challenges: ['social-interaction'],
      score: 7,
    },

    aiRiskScore: 1,

    typicalDay: '9am: Prepare tour materials. 10am: Lead school group tour. 12pm: Develop new program. 2pm: Lead public tour. 4pm: Evaluate and plan.',

    skillsNeeded: ['Public speaking', 'Teaching', 'Subject knowledge', 'Engagement', 'Creativity'],

    sensoryDemands: {
      noise: 'medium',
      lights: 'standard',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'high',
    hoursPerWeek: 35,
    schedule: 'Weekends often required',

    growthPath: ['Tour Guide', 'Museum Educator', 'Education Manager', 'Curator of Education'],
    certifications: ['Museum Studies certificate (helpful)'],

    similar: ['Docent', 'Interpretive Guide', 'Education Coordinator'],

    gettingStarted: [
      'Volunteer at local museums',
      'Study museum education: Online courses',
      'Develop public speaking skills',
      'Apply: Museums, historical sites, science centers',
    ],

    tags: ['teaching', 'education', 'culture', 'people-facing', 'meaningful'],
  },

  {
    id: 'inventory-specialist',
    title: 'Inventory Specialist',
    industry: 'Logistics / Retail',
    level: 'entry',
    salary: { min: 30000, max: 42000 },
    description: 'Track inventory levels, manage stock, conduct audits, ensure accurate records.',

    cognitiveProfile: {
      strengths: ['organizing-systematizing', 'detailed-work', 'pattern-recognition'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 5,

    typicalDay: '8am: Count inventory. 10am: Update system. 12pm: Process incoming shipments. 2pm: Conduct spot audits. 4pm: Generate reports.',

    skillsNeeded: ['Organization', 'Attention to detail', 'Computer systems', 'Math', 'Physical stamina'],

    sensoryDemands: {
      noise: 'medium',
      lights: 'bright',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: '8-5, some early mornings',

    growthPath: ['Inventory Clerk', 'Inventory Specialist', 'Inventory Manager', 'Supply Chain Manager'],
    certifications: ['Certified in Production and Inventory Management (CPIM) - optional'],

    similar: ['Stock Clerk', 'Warehouse Associate', 'Supply Chain Analyst'],

    gettingStarted: [
      'Learn inventory systems: On-the-job training common',
      'Develop Excel skills',
      'Get certified: APICS certification (advanced)',
      'Apply: Warehouses, retail stores, manufacturing companies',
    ],

    tags: ['organized', 'detail-oriented', 'systematic', 'physical', 'structured'],
  },

  {
    id: 'transcriptionist',
    title: 'Medical/Legal Transcriptionist',
    industry: 'Healthcare / Legal',
    level: 'entry',
    salary: { min: 30000, max: 45000 },
    description: 'Listen to audio recordings and type accurate written transcripts for medical or legal professionals.',

    cognitiveProfile: {
      strengths: ['detailed-work', 'hyperfocus', 'writing-language'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 7,

    typicalDay: '9am: Listen to audio files. 10am: Transcribe dictations. 1pm: Proofread transcripts. 3pm: Submit completed work. 4pm: Quality check.',

    skillsNeeded: ['Fast typing', 'Listening skills', 'Medical/legal terminology', 'Accuracy', 'Grammar'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'Flexible, remote common',

    growthPath: ['Transcriptionist', 'Senior Transcriptionist', 'Editor/QA', 'Transcription Manager'],
    certifications: ['Certified Medical Transcriptionist (CMT)', 'Registered Health Information Technician (RHIT)'],

    similar: ['Court Reporter', 'Closed Captioner', 'Stenographer'],

    gettingStarted: [
      'Improve typing speed: Practice typing (typing.com)',
      'Learn terminology: Medical/legal vocabulary courses',
      'Get certified: AHDI certification for medical',
      'Apply: Transcription companies, hospitals, law firms',
    ],

    tags: ['detail-oriented', 'remote-friendly', 'solo-work', 'hyperfocus-friendly', 'typing'],
  },

  {
    id: 'florist',
    title: 'Florist',
    industry: 'Retail / Creative',
    level: 'entry',
    salary: { min: 25000, max: 38000 },
    description: 'Design and arrange flowers for events, bouquets, and decorations.',

    cognitiveProfile: {
      strengths: ['creative-thinking', 'visual-spatial', 'detailed-work'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 2,

    typicalDay: '8am: Receive flower deliveries. 9am: Prepare flowers (trim, hydrate). 10am: Design arrangements. 1pm: Customer consultations. 3pm: Deliver orders.',

    skillsNeeded: ['Floral design', 'Creativity', 'Customer service', 'Color sense', 'Plant care'],

    sensoryDemands: {
      noise: 'low',
      lights: 'bright',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 40,
    schedule: 'Early mornings, weekends, holidays',

    growthPath: ['Floral Assistant', 'Florist', 'Head Designer', 'Shop Owner'],
    certifications: ['American Institute of Floral Designers (AIFD) - advanced'],

    similar: ['Event Decorator', 'Garden Center Worker', 'Plant Stylist'],

    gettingStarted: [
      'Learn basics: Floral design classes',
      'Practice: Arrange flowers at home',
      'Work at flower shop: Entry-level positions',
      'Apply: Florists, grocery stores, event companies',
    ],

    tags: ['creative', 'detailed-work', 'visual', 'customer-service', 'artistic'],
  },

  {
    id: 'technical-writer',
    title: 'Technical Writer',
    industry: 'Technology / Documentation',
    level: 'entry',
    salary: { min: 45000, max: 65000 },
    description: 'Write user manuals, guides, documentation, and help articles for technical products.',

    cognitiveProfile: {
      strengths: ['writing-language', 'organizing-systematizing', 'detailed-work', 'technical-coding'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 5,

    typicalDay: '9am: Research product features. 11am: Write documentation. 1pm: Create diagrams/screenshots. 3pm: Review with developers. 4pm: Edit and publish.',

    skillsNeeded: ['Clear writing', 'Technical understanding', 'Research', 'Organization', 'Tools (Markdown, etc.)'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: true,
      remote: true,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'Flexible, remote common',

    growthPath: ['Junior Technical Writer', 'Technical Writer', 'Senior Writer', 'Documentation Manager'],
    certifications: ['Society for Technical Communication certification'],

    similar: ['Documentation Specialist', 'Content Developer', 'API Writer'],

    gettingStarted: [
      'Learn documentation tools: GitHub, Markdown, MadCap',
      'Practice: Write tutorials for software you use',
      'Build portfolio: Open-source documentation projects',
      'Apply: Tech companies, software firms, SaaS startups',
    ],

    tags: ['writing', 'technical', 'remote-friendly', 'detailed', 'organized'],
  },

  {
    id: 'event-coordinator',
    title: 'Event Coordinator',
    industry: 'Events / Hospitality',
    level: 'entry',
    salary: { min: 32000, max: 48000 },
    description: 'Plan and coordinate events, manage logistics, vendors, timelines, and details.',

    cognitiveProfile: {
      strengths: ['organizing-systematizing', 'problem-solving', 'detailed-work'],
      challenges: ['emotional-regulation'],
      score: 7,
    },

    aiRiskScore: 2,

    typicalDay: '9am: Check event timelines. 10am: Coordinate with vendors. 12pm: Site visits. 2pm: Client meetings. 4pm: Finalize event details.',

    skillsNeeded: ['Organization', 'Communication', 'Problem-solving', 'Time management', 'Multitasking'],

    sensoryDemands: {
      noise: 'high',
      lights: 'bright',
      openPlan: true,
      remote: false,
    },

    socialDemands: 'high',
    hoursPerWeek: 45,
    schedule: 'Irregular, evenings/weekends during events',

    growthPath: ['Event Assistant', 'Event Coordinator', 'Event Manager', 'Director of Events'],
    certifications: ['Certified Meeting Professional (CMP)'],

    similar: ['Wedding Planner', 'Conference Coordinator', 'Meeting Planner'],

    gettingStarted: [
      'Volunteer to plan events',
      'Learn event software: Eventbrite, Cvent',
      'Get certified: CMP certification',
      'Apply: Hotels, event companies, nonprofits, corporations',
    ],

    tags: ['organizing', 'people-facing', 'fast-paced', 'problem-solving', 'stressful'],
  },

  {
    id: 'jeweler',
    title: 'Jeweler / Jewelry Maker',
    industry: 'Craft / Retail',
    level: 'entry',
    salary: { min: 28000, max: 45000 },
    description: 'Design, create, repair, and sell jewelry pieces.',

    cognitiveProfile: {
      strengths: ['creative-thinking', 'detailed-work', 'visual-spatial', 'hyperfocus'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 2,

    typicalDay: '9am: Design new pieces. 10am: Work with tools (soldering, setting stones). 1pm: Polish finished pieces. 3pm: Repair customer jewelry. 4pm: Inventory and sales.',

    skillsNeeded: ['Fine motor skills', 'Precision', 'Creativity', 'Metalworking', 'Patience'],

    sensoryDemands: {
      noise: 'low',
      lights: 'bright',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: 'Regular hours, retail hours if in shop',

    growthPath: ['Apprentice Jeweler', 'Jeweler', 'Master Jeweler', 'Shop Owner'],
    certifications: ['Gemological Institute of America (GIA) certification'],

    similar: ['Bench Jeweler', 'Goldsmith', 'Watch Repairer'],

    gettingStarted: [
      'Take jewelry-making classes: Local studios, community college',
      'Practice: Make pieces at home',
      'Get certified: GIA courses',
      'Apply: Jewelry stores, repair shops, start own business',
    ],

    tags: ['creative', 'detailed-work', 'detail-oriented', 'hyperfocus-friendly', 'craft'],
  },

  {
    id: 'tutor',
    title: 'Tutor (Academic / Test Prep)',
    industry: 'Education',
    level: 'entry',
    salary: { min: 25000, max: 50000 },
    description: 'Provide one-on-one or small group instruction to students in specific subjects.',

    cognitiveProfile: {
      strengths: ['teaching-explaining', 'teaching-explaining', 'detailed-work', 'teaching-explaining'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 3,

    typicalDay: '3pm: Tutor student #1 (math). 4pm: Tutor student #2 (reading). 5pm: Prepare materials. 6pm: Tutor student #3 (SAT prep). 7pm: Follow-up emails.',

    skillsNeeded: ['Subject expertise', 'Teaching skills', 'Patience', 'Communication', 'Adaptability'],

    sensoryDemands: {
      noise: 'low',
      lights: 'standard',
      openPlan: false,
      remote: true,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 20,
    schedule: 'Afternoons/evenings, flexible',

    growthPath: ['Tutor', 'Senior Tutor', 'Tutoring Center Director', 'Educational Consultant'],
    certifications: ['Subject-specific certifications helpful'],

    similar: ['Teacher', 'Academic Coach', 'Test Prep Instructor'],

    gettingStarted: [
      'Choose your subject: What are you good at?',
      'Practice teaching: Help friends, family',
      'Join platforms: Wyzant, Tutor.com, Varsity Tutors',
      'Apply: Tutoring centers, schools, private clients',
    ],

    tags: ['teaching', 'teaching-explaining', 'flexible', 'remote-friendly', 'meaningful'],
  },

  {
    id: 'lab-technician',
    title: 'Laboratory Technician',
    industry: 'Science / Healthcare',
    level: 'entry',
    salary: { min: 35000, max: 50000 },
    description: 'Conduct tests, operate lab equipment, analyze samples, record data in medical or research labs.',

    cognitiveProfile: {
      strengths: ['detailed-work', 'organizing-systematizing', 'problem-solving', 'technical-coding'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 3,

    typicalDay: '8am: Prepare samples. 9am: Run tests/experiments. 11am: Record data. 1pm: Maintain equipment. 3pm: Analyze results. 4pm: Write reports.',

    skillsNeeded: ['Lab techniques', 'Attention to detail', 'Data recording', 'Equipment operation', 'Safety protocols'],

    sensoryDemands: {
      noise: 'low',
      lights: 'bright',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'minimal',
    hoursPerWeek: 40,
    schedule: '8-5, may include some shifts',

    growthPath: ['Lab Assistant', 'Lab Technician', 'Senior Technician', 'Lab Supervisor'],
    certifications: ['Medical Laboratory Technician (MLT) certification'],

    similar: ['Clinical Lab Technician', 'Research Technician', 'Phlebotomist'],

    gettingStarted: [
      'Get certified: MLT programs (2-year)',
      'Learn lab skills: Community college courses',
      'Volunteer in labs',
      'Apply: Hospitals, research institutes, private labs',
    ],

    tags: ['science', 'detail-oriented', 'technical', 'structured', 'healthcare'],
  },

  {
    id: 'audio-engineer',
    title: 'Audio Engineer',
    industry: 'Media / Music',
    level: 'entry',
    salary: { min: 30000, max: 50000 },
    description: 'Record, mix, and master audio for music, podcasts, films, or live events.',

    cognitiveProfile: {
      strengths: ['technical-coding', 'hyperfocus', 'detailed-work', 'creative-thinking'],
      challenges: [],
      score: 9,
    },

    aiRiskScore: 3,

    typicalDay: '10am: Set up recording session. 11am: Record vocals/instruments. 2pm: Mix tracks. 4pm: Master final audio. 6pm: Deliver files to client.',

    skillsNeeded: ['Audio software (Pro Tools, Logic)', 'Technical knowledge', 'Ear for sound', 'Problem-solving', 'Communication'],

    sensoryDemands: {
      noise: 'high',
      lights: 'dim',
      openPlan: false,
      remote: true,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 40,
    schedule: 'Irregular, evenings common',

    growthPath: ['Assistant Engineer', 'Audio Engineer', 'Senior Engineer', 'Studio Owner'],
    certifications: ['Audio Engineering programs (technical schools)'],

    similar: ['Sound Designer', 'Music Producer', 'Live Sound Engineer'],

    gettingStarted: [
      'Learn audio software: Free tutorials (Pro Tools, Reaper)',
      'Practice: Record friends, local bands',
      'Get training: Audio engineering school',
      'Apply: Recording studios, venues, freelance',
    ],

    tags: ['audio', 'technical', 'creative', 'hyperfocus-friendly', 'music'],
  },

  {
    id: 'pet-groomer',
    title: 'Pet Groomer',
    industry: 'Animal Care',
    level: 'entry',
    salary: { min: 25000, max: 40000 },
    description: 'Bathe, trim, and groom pets. Provide nail trims, ear cleaning, and styling.',

    cognitiveProfile: {
      strengths: ['detailed-work', 'detailed-work', 'detailed-work', 'detailed-work'],
      challenges: [],
      score: 8,
    },

    aiRiskScore: 1,

    typicalDay: '9am: Bathe dogs. 10am: Haircuts and trims. 12pm: Nail trims. 2pm: Detailed grooming. 4pm: Clean tools and workspace.',

    skillsNeeded: ['Animal handling', 'Grooming techniques', 'Patience', 'Physical stamina', 'Customer service'],

    sensoryDemands: {
      noise: 'high',
      lights: 'bright',
      openPlan: false,
      remote: false,
    },

    socialDemands: 'moderate',
    hoursPerWeek: 40,
    schedule: 'Weekdays, some Saturdays',

    growthPath: ['Grooming Assistant', 'Pet Groomer', 'Master Groomer', 'Shop Owner'],
    certifications: ['National Dog Groomers Association of America (NDGAA) certification'],

    similar: ['Mobile Groomer', 'Show Groomer', 'Cat Groomer'],

    gettingStarted: [
      'Take grooming classes: Local pet stores, grooming schools',
      'Apprentice at grooming salon',
      'Get certified: NDGAA program',
      'Apply: Pet stores, grooming salons, mobile grooming services',
    ],

    tags: ['animals', 'detailed-work', 'physical', 'compassion', 'creative'],
  },
];
