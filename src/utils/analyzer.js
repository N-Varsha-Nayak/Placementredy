// Lightweight heuristic analyzer for JD text

const CATEGORIES = {
  core: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
  languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
  web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
  data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
  testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest'],
};

function normalize(text = '') {
  return text.replace(/[\W_]+/g, ' ').toLowerCase();
}

export function extractSkills(jdText = '') {
  const result = {};
  const normalized = normalize(jdText);

  Object.keys(CATEGORIES).forEach((cat) => {
    result[cat] = [];
    CATEGORIES[cat].forEach((kw) => {
      // normalize keyword to alphanumeric token for matching
      const token = kw.toLowerCase().replace(/[^a-z0-9]+/gi, ' ').trim();
      if (!token) return;
      // check if any token word is present in normalized text
      const words = token.split(/\s+/);
      const found = words.some((w) => normalized.includes(w));
      if (found) result[cat].push(kw);
    });
  });

  const any = Object.values(result).some((arr) => arr.length > 0);
  if (!any) {
    result.general = ['General fresher stack'];
  }

  return result;
}

function pickN(arr, n) {
  return arr.slice(0, n);
}

export function generateChecklist(skillsByCat) {
  // Template rounds with adaptive items
  const rounds = [
    { name: 'Round 1: Aptitude / Basics', items: [] },
    { name: 'Round 2: DSA + Core CS', items: [] },
    { name: 'Round 3: Tech interview (projects + stack)', items: [] },
    { name: 'Round 4: Managerial / HR', items: [] },
  ];

  // Round 1 - basics
  rounds[0].items = [
    'Practice numerical and logical reasoning problems',
    'Brush up on basic math and time management',
    'Review core programming constructs (loops, arrays, strings)',
    'Solve 5 short coding puzzles under time limit',
    'Read common aptitude question patterns',
  ];

  // Round 2 - dsa/core
  const coreSkills = skillsByCat.core || [];
  rounds[1].items = [
    'Revise arrays, strings, and linked lists',
    'Practice sorting and searching algorithms',
    'Work on 10 medium DSA problems (recursion, DP)',
    'Review OOP design and common patterns',
    'Study DBMS fundamentals (normalization, joins)',
  ];
  if (coreSkills.includes('OS')) rounds[1].items.push('Review process scheduling and memory management');
  if (coreSkills.includes('Networks')) rounds[1].items.push('Review TCP/IP basics and HTTP');

  // Round 3 - tech/projects
  const stack = [].concat(
    skillsByCat.web || [],
    skillsByCat.languages || [],
    skillsByCat.data || [],
    skillsByCat.cloud || []
  );
  const projectItems = [
    'Prepare 2-3 project talking points (architecture, challenges)',
    'Align resume bullets with the stack mentioned in JD',
    'Be ready to explain system trade-offs and design decisions',
    'Review framework-specific concepts for your stack',
  ];
  rounds[2].items = rounds[2].items = pickN(projectItems.concat(stack.map(s => `Revise ${s}`)), 6);

  // Round 4 - HR
  rounds[3].items = [
    'Prepare STAR stories for behavioral questions',
    'Have clear motivations and role expectations',
    'Discuss strengths, weaknesses, and learnings',
    'Prepare questions to ask the interviewer',
    'Align career goals with company mission',
  ];

  return rounds;
}

export function generatePlan(skillsByCat) {
  const plan = [
    { day: 1, title: 'Basics & Foundation', tasks: ['Math fundamentals', 'Syntax review', 'Simple problems'] },
    { day: 2, title: 'Core CS', tasks: ['Data structures review', 'Complexity analysis'] },
    { day: 3, title: 'DSA Intensive', tasks: ['Array/Strings problems', 'Binary search, two pointers'] },
    { day: 4, title: 'DSA Intensive', tasks: ['Trees & Graphs practice', 'Greedy & DP'] },
    { day: 5, title: 'Project & Resume', tasks: ['Align resume with JD', 'Prepare project talking points'] },
    { day: 6, title: 'Mock Interviews', tasks: ['Simulate interview', 'Review feedback'] },
    { day: 7, title: 'Revision', tasks: ['Revise weak areas', 'Plan next steps'] },
  ];

  // adapt plan: if React present, add frontend revision day
  const web = skillsByCat.web || [];
  if (web.length > 0) {
    plan[4].tasks.unshift('Frontend concepts: React lifecycle & hooks');
  }

  const data = skillsByCat.data || [];
  if (data.length > 0) {
    plan[3].tasks.push('Practice SQL queries and joins');
  }

  return plan;
}

export function generateQuestions(skillsByCat) {
  const questions = [];
  const add = (q) => { if (questions.length < 10) questions.push(q); };

  // Core
  if ((skillsByCat.core || []).includes('DSA')) add('How would you optimize search in sorted data?');
  if ((skillsByCat.core || []).includes('OOP')) add('Explain SOLID principles and give examples.');

  // Languages
  if ((skillsByCat.languages || []).includes('Java')) add('Explain the Java memory model and garbage collection basics.');
  if ((skillsByCat.languages || []).includes('Python')) add('What are Python list comprehensions and when to use them?');

  // Web
  if ((skillsByCat.web || []).includes('React')) add('Explain state management options in React and trade-offs.');
  if ((skillsByCat.web || []).includes('Node.js')) add('How do you handle concurrency in Node.js?');

  // Data
  if ((skillsByCat.data || []).includes('SQL')) add('Explain indexing and when it helps.');
  if ((skillsByCat.data || []).includes('MongoDB')) add('Describe differences between SQL and NoSQL databases.');

  // Cloud
  if ((skillsByCat.cloud || []).includes('Docker')) add('How would you containerize an application and manage configuration?');
  if ((skillsByCat.cloud || []).includes('AWS')) add('Which AWS services would you use for a scalable web application?');

  // Testing
  if ((skillsByCat.testing || []).includes('Selenium')) add('How do you design end-to-end tests for a web application?');

  // Fill up generic questions if under 10
  const generic = [
    'Describe a challenging bug you fixed and how you approached it.',
    'How do you prioritize tasks under tight deadlines?',
    'Explain a system you designed and the trade-offs you made.',
  ];
  generic.forEach((g) => add(g));

  // ensure length 10
  while (questions.length < 10) questions.push('Prepare to discuss your projects and technical decisions.');

  return questions.slice(0, 10);
}

export function computeReadiness(skillsByCat, company = '', role = '', jdText = '') {
  let score = 35;
  const categoriesPresent = Object.keys(CATEGORIES).filter(cat => (skillsByCat[cat] || []).length > 0).length;
  score += Math.min(categoriesPresent * 5, 30);
  if (company && company.trim().length > 0) score += 10;
  if (role && role.trim().length > 0) score += 10;
  if ((jdText || '').length > 800) score += 10;
  return Math.min(score, 100);
}

// LocalStorage helpers
const STORAGE_KEY = 'placement_history_v1';

export function saveHistory(entry) {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  list.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function getHistoryItem(id) {
  const list = getHistory();
  return list.find((i) => i.id === id) || null;
}

export function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
}

export function updateHistoryEntry(updated) {
  const list = getHistory();
  const idx = list.findIndex((i) => i.id === updated.id);
  if (idx === -1) return false;
  list[idx] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return true;
}
