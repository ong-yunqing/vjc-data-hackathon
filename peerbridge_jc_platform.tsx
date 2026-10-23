import React, { useState, useMemo } from 'react';
import {
  Users,
  BookOpen,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Paperclip,
  Send,
  FileText,
  Image as ImageIcon,
  Download,
  Eye,
  Clock,
  ArrowRight,
  Search,
  Lock,
  Unlock,
  Sparkles,
  Filter,
  Plus,
  X,
  GraduationCap,
  Folder,
  UploadCloud,
  Info,
  RefreshCw,
  MessageSquare,
  Sliders,
  Zap,
  UserCheck,
  Layers
} from 'lucide-react';

// ==========================================
// MOCK DATA & CONSTANTS
// ==========================================

const SCHOOLS = [
  'Raffles Institution (RI)',
  'Hwa Chong Institution (HCI)',
  'National JC (NJC)',
  'Victoria JC (VJC)',
  'Nanyang JC (NYJC)',
  'Anglo-Chinese JC (ACJC)'
];

const SUBJECTS = [
  'H2 Mathematics',
  'H2 Physics',
  'H2 Chemistry',
  'H2 Economics',
  'H2 Biology'
];

const INITIAL_STUDENTS = [
  {
    id: 'std_1',
    name: 'Ethan Tan',
    school: 'Raffles Institution (RI)',
    level: 'J2',
    role: 'Tutor',
    subject: 'H2 Mathematics',
    rawScore: 88,
    letterGrade: 'A',
    slots: ['Mon 16:00-18:00', 'Wed 15:00-17:00'],
    focus: 'Vectors, Complex Numbers & Integration',
    avatarBg: 'bg-indigo-600',
    bio: 'Scored 88% in Prelims. Eager to help peers master H2 Math vectors and integration techniques.'
  },
  {
    id: 'std_2',
    name: 'Chloe Lim',
    school: 'Hwa Chong Institution (HCI)',
    level: 'J2',
    role: 'Tutee',
    subject: 'H2 Mathematics',
    rawScore: 54,
    letterGrade: 'C',
    slots: ['Wed 15:00-17:00', 'Sat 10:00-12:00'],
    focus: 'Integration & Complex Numbers',
    avatarBg: 'bg-rose-600',
    bio: 'Looking for a patient peer tutor to go through timed drill questions and proving strategies.'
  },
  {
    id: 'std_3',
    name: 'Marcus Ng',
    school: 'Raffles Institution (RI)',
    level: 'J1',
    role: 'Tutee',
    subject: 'H2 Mathematics',
    rawScore: 48,
    letterGrade: 'E',
    slots: ['Mon 16:00-18:00', 'Thu 16:00-18:00'],
    focus: 'Functions, Graphing & Calculus Basics',
    avatarBg: 'bg-amber-600',
    bio: 'J1 student adjusting to H2 pace. Needs foundational guidance on graph transformations.'
  },
  {
    id: 'std_4',
    name: 'Mei Ling Wong',
    school: 'Raffles Institution (RI)',
    level: 'J1',
    role: 'Tutor',
    subject: 'H2 Mathematics',
    rawScore: 89,
    letterGrade: 'A',
    slots: ['Mon 16:00-18:00', 'Thu 16:00-18:00'],
    focus: 'Functions, AP/GP & Sequences',
    avatarBg: 'bg-emerald-600',
    bio: 'J1 Math Olympiad participant. Passionate about helping RI J1 batchmates excel in H2 Math.'
  },
  {
    id: 'std_5',
    name: 'Priya Sundram',
    school: 'Nanyang JC (NYJC)',
    level: 'J1',
    role: 'Tutor',
    subject: 'H2 Mathematics',
    rawScore: 85,
    letterGrade: 'A',
    slots: ['Tue 15:30-17:30', 'Thu 16:00-18:00'],
    focus: 'Pure Math & Graphing',
    avatarBg: 'bg-purple-600',
    bio: 'Top scorer in NYJC CT1. Enjoys breaking down algebra and calculus concepts into simple steps.'
  },
  {
    id: 'std_6',
    name: 'Joshua Lee',
    school: 'Victoria JC (VJC)',
    level: 'J1',
    role: 'Tutee',
    subject: 'H2 Physics',
    rawScore: 42,
    letterGrade: 'S',
    slots: ['Fri 15:00-17:00', 'Sat 10:00-12:00'],
    focus: 'Dynamics, Work Energy & Gravitation',
    avatarBg: 'bg-cyan-600',
    bio: 'Struggling with free body diagrams and energy conservation principles in H2 Physics.'
  },
  {
    id: 'std_7',
    name: 'Sarah Chen',
    school: 'Victoria JC (VJC)',
    level: 'J2',
    role: 'Tutor',
    subject: 'H2 Physics',
    rawScore: 91,
    letterGrade: 'A',
    slots: ['Fri 15:00-17:00', 'Sun 14:00-16:00'],
    focus: 'Superposition, Electromagnetism & Quantum Physics',
    avatarBg: 'bg-teal-600',
    bio: 'VJC Physics Lead. Experienced in breakdown of past A-Level paper trick questions.'
  },
  {
    id: 'std_8',
    name: 'Xavier Toh',
    school: 'Hwa Chong Institution (HCI)',
    level: 'J2',
    role: 'Tutor',
    subject: 'H2 Economics',
    rawScore: 82,
    letterGrade: 'A',
    slots: ['Wed 15:00-17:00', 'Fri 16:00-18:00'],
    focus: 'Macroeconomic Policies & Essay Structuring',
    avatarBg: 'bg-blue-600',
    bio: 'Econs distinction scorer specializing in evaluation techniques and CSQ case studies.'
  }
];

const INITIAL_MESSAGES = {
  'std_1-std_2': [
    {
      id: 'm1',
      senderId: 'std_1',
      senderName: 'Ethan Tan',
      text: "Hi Chloe! Great to connect. I saw you're working through complex numbers and integration.",
      timestamp: '14:20',
      roleBadge: 'Tutor (RI)'
    },
    {
      id: 'm2',
      senderId: 'std_2',
      senderName: 'Chloe Lim',
      text: 'Hey Ethan! Yes, loci in complex numbers and integration by parts are giving me trouble.',
      timestamp: '14:22',
      roleBadge: 'Tutee (HCI)'
    },
    {
      id: 'm3',
      senderId: 'std_1',
      senderName: 'Ethan Tan',
      text: 'No worries! Here is a summary cheat sheet I compiled for RI internal prelim revision.',
      timestamp: '14:25',
      roleBadge: 'Tutor (RI)',
      file: {
        id: 'f1',
        name: 'H2_Math_Complex_Loci_Cheatsheet.pdf',
        type: 'pdf',
        size: '1.8 MB',
        category: 'Formula Sheet',
        url: '#'
      }
    }
  ],
  'std_4-std_3': [
    {
      id: 'm4',
      senderId: 'std_4',
      senderName: 'Mei Ling Wong',
      text: 'Hi Marcus! Welcome to our RI J1 peer tutoring circle. How can I help with graph transformations?',
      timestamp: '10:00',
      roleBadge: 'Tutor (RI J1)'
    },
    {
      id: 'm5',
      senderId: 'std_3',
      senderName: 'Marcus Ng',
      text: 'Hey Mei Ling! Thanks so much. I get confused with the order of transformations when horizontal scaling is involved.',
      timestamp: '10:05',
      roleBadge: 'Tutee (RI J1)'
    }
  ]
};

const INITIAL_NEW_STUDENT_FORM = {
  name: '',
  school: SCHOOLS[0],
  level: 'J1',
  role: 'Tutee',
  subject: SUBJECTS[0],
  rawScore: 60,
  slots: ['Mon 16:00-18:00'],
  focus: ''
};

// ==========================================
// CORE MATCHING RULES ENGINE
// ==========================================

function evaluatePairEligibility(tutor, tutee, isPostJuly) {
  const reasons = [];
  let isSeniorityValid = true;
  let isSchoolValid = true;
  let isSubjectValid = true;
  let isSlotValid = true;
  let isScoreValid = true;

  // Self match check
  if (tutor.id === tutee.id) {
    return {
      eligible: false,
      isSeniorityValid: false,
      isSchoolValid: false,
      isSubjectValid: false,
      isSlotValid: false,
      isScoreValid: false,
      sharedSlots: [],
      scoreGap: 0,
      reasons: ['Cannot match student with self'],
      isCrossJC: false
    };
  }

  // 1. Role Check
  const canTutor = tutor.role === 'Tutor' || tutor.role === 'Both';
  const canTutee = tutee.role === 'Tutee' || tutee.role === 'Both';
  if (!canTutor || !canTutee) {
    reasons.push('Invalid roles: Requires Tutor to Tutee pairing');
  }

  // 2. Seniority Rule: J1 Tutor CANNOT teach J2 Tutee
  if (tutor.level === 'J1' && tutee.level === 'J2') {
    isSeniorityValid = false;
    reasons.push('Seniority Violation: J1 Tutor cannot tutor a J2 Tutee');
  }

  // 3. School Boundary Rule:
  // - J1 Matching Rule (STRICT): J1 student (tutor or tutee) MUST ONLY match within same school (Pre & Post July)
  // - J2 Matching Rule: Cross-JC allowed ONLY for J2-to-J2 pairs, and ONLY after July (Aug 1st+)
  const isJ1Involved = tutor.level === 'J1' || tutee.level === 'J1';
  const isSameSchool = tutor.school === tutee.school;

  if (isJ1Involved) {
    if (!isSameSchool) {
      isSchoolValid = false;
      reasons.push('Strict J1 Boundary: J1 students must strictly remain within the same JC at all times');
    }
  } else {
    // Both are J2
    if (!isSameSchool && !isPostJuly) {
      isSchoolValid = false;
      reasons.push('J2 Cross-JC Restricted: Cross-JC matching for J2s is locked until August 1st');
    }
  }

  // 4. Subject Match Rule
  if (tutor.subject !== tutee.subject) {
    isSubjectValid = false;
    reasons.push(`Subject Mismatch: ${tutor.subject} vs ${tutee.subject}`);
  }

  // 5. Slot Overlap Rule
  const sharedSlots = (tutor.slots || []).filter(s => (tutee.slots || []).includes(s));
  if (sharedSlots.length === 0) {
    isSlotValid = false;
    reasons.push('No overlapping schedule time slots');
  }

  // 6. Score Differential Rule
  const scoreGap = tutor.rawScore - tutee.rawScore;
  if (scoreGap <= 0) {
    isScoreValid = false;
    reasons.push(`Score Gap Invalid: Tutor (${tutor.rawScore}%) must have higher mark than Tutee (${tutee.rawScore}%)`);
  }

  const eligible =
    canTutor &&
    canTutee &&
    isSeniorityValid &&
    isSchoolValid &&
    isSubjectValid &&
    isSlotValid &&
    isScoreValid;

  return {
    eligible,
    isSeniorityValid,
    isSchoolValid,
    isSubjectValid,
    isSlotValid,
    isScoreValid,
    sharedSlots,
    scoreGap,
    reasons,
    isCrossJC: tutor.school !== tutee.school
  };
}

function runGreedyMatchingAlgorithm(students, isPostJuly) {
  const tutors = students.filter(s => s.role === 'Tutor' || s.role === 'Both');
  const tutees = students.filter(s => s.role === 'Tutee' || s.role === 'Both');

  const matches = [];
  const matchedStudentIds = new Set();

  // Create candidate pairs with evaluation metrics
  const candidatePairs = [];

  for (const tutee of tutees) {
    for (const tutor of tutors) {
      if (tutor.id === tutee.id) continue;
      const evalResult = evaluatePairEligibility(tutor, tutee, isPostJuly);
      if (evalResult.eligible) {
        candidatePairs.push({
          tutor,
          tutee,
          evalResult,
          scoreGap: evalResult.scoreGap
        });
      }
    }
  }

  // Sort candidate pairs by score gap descending (best academic fit first)
  candidatePairs.sort((a, b) => b.scoreGap - a.scoreGap);

  // Greedy selection (ensures each student is matched at most once across all pairs)
  for (const pair of candidatePairs) {
    if (!matchedStudentIds.has(pair.tutor.id) && !matchedStudentIds.has(pair.tutee.id)) {
      matches.push({
        id: `match_${pair.tutor.id}_${pair.tutee.id}`,
        tutor: pair.tutor,
        tutee: pair.tutee,
        subject: pair.tutor.subject,
        sharedSlot: pair.evalResult.sharedSlots[0],
        allSharedSlots: pair.evalResult.sharedSlots,
        scoreGap: pair.scoreGap,
        isCrossJC: pair.evalResult.isCrossJC,
        matchedAt: new Date().toLocaleDateString('en-SG', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      matchedStudentIds.add(pair.tutor.id);
      matchedStudentIds.add(pair.tutee.id);
    }
  }

  return matches;
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  // Global State
  const [activeView, setActiveView] = useState('student'); // 'student' | 'admin'
  const [simulationDate, setSimulationDate] = useState('2026-08-15'); // Post-July default
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [activeStudentId, setActiveStudentId] = useState('std_1'); // Default Ethan Tan
  const [studentSubTab, setStudentSubTab] = useState('dashboard'); // 'dashboard' | 'workspace'
  const [adminSubTab, setAdminSubTab] = useState('matches'); // 'matches' | 'matrix' | 'roster'

  // Chat & File Vault State
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Matrix Filter State
  const [matrixFilterSchool, setMatrixFilterSchool] = useState('All');
  const [matrixFilterStatus, setMatrixFilterStatus] = useState('All');

  // New Student Modal State
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState(INITIAL_NEW_STUDENT_FORM);

  // Timezone-safe date check for simulation date (August 1st or later is Post-July)
  const isPostJuly = useMemo(() => {
    const [, month] = simulationDate.split('-').map(Number);
    return month >= 8;
  }, [simulationDate]);

  // Formed Matches based on simulation date & current students
  const activeMatches = useMemo(() => {
    return runGreedyMatchingAlgorithm(students, isPostJuly);
  }, [students, isPostJuly]);

  // Current logged in student
  const currentStudent = useMemo(() => {
    return students.find(s => s.id === activeStudentId) || students[0];
  }, [students, activeStudentId]);

  // Current match for active student
  const activeStudentMatch = useMemo(() => {
    return activeMatches.find(
      m => m.tutor.id === activeStudentId || m.tutee.id === activeStudentId
    );
  }, [activeMatches, activeStudentId]);

  // Matched peer student info for chat
  const matchedPeer = useMemo(() => {
    if (!activeStudentMatch) return null;
    return activeStudentMatch.tutor.id === activeStudentId
      ? activeStudentMatch.tutee
      : activeStudentMatch.tutor;
  }, [activeStudentMatch, activeStudentId]);

  // Generate unique chat key
  const chatKey = useMemo(() => {
    if (!matchedPeer) return 'default';
    const ids = [currentStudent.id, matchedPeer.id].sort();
    return `${ids[0]}-${ids[1]}`;
  }, [currentStudent, matchedPeer]);

  // Chat message list
  const activeChatMessages = useMemo(() => {
    return messages[chatKey] || [
      {
        id: 'system_welcome',
        senderId: 'system',
        senderName: 'PeerBridge System',
        text: `Consultation session connected for ${activeStudentMatch?.subject || 'Peer Tutoring'}. Remember to maintain academic integrity and supportive collaboration.`,
        timestamp: 'Just now',
        roleBadge: 'System'
      }
    ];
  }, [messages, chatKey, activeStudentMatch]);

  // Resource Vault File Collection
  const vaultFiles = useMemo(() => {
    const list = [];
    Object.values(messages).forEach(msgList => {
      msgList.forEach(m => {
        if (m.file) {
          list.push({ ...m.file, uploadedBy: m.senderName, timestamp: m.timestamp });
        }
      });
    });
    return list;
  }, [messages]);

  // Helper to calculate Letter Grade from raw percentage
  const calculateGrade = (score) => {
    if (score >= 70) return 'A';
    if (score >= 60) return 'B';
    if (score >= 55) return 'C';
    if (score >= 50) return 'D';
    if (score >= 45) return 'E';
    if (score >= 40) return 'S';
    return 'U';
  };

  // Handler to send message
  const handleSendMessage = (customFile = null, textOverride = null) => {
    const textToSend = textOverride !== null ? textOverride : chatInput.trim();
    if (!textToSend && !customFile) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentStudent.id,
      senderName: currentStudent.name,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      roleBadge: `${currentStudent.role} (${currentStudent.school.split(' ')[0]})`,
      file: customFile
    };

    setMessages(prev => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), newMessage]
    }));

    setChatInput('');
  };

  // Preset material button action
  const handleSendPresetMaterial = (type) => {
    let preset = null;
    if (type === 'formula') {
      preset = {
        id: `file_${Date.now()}`,
        name: `${currentStudent.subject.replace(' ', '_')}_Core_Formulae.pdf`,
        type: 'pdf',
        size: '1.2 MB',
        category: 'Formula Sheet',
        url: '#'
      };
      handleSendMessage(preset, `Here is the official ${currentStudent.subject} essential formula reference.`);
    } else if (type === 'diagram') {
      preset = {
        id: `file_${Date.now()}`,
        name: 'Concept_Diagram_Proof.png',
        type: 'image',
        size: '840 KB',
        category: 'Question Diagram',
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80'
      };
      handleSendMessage(preset, 'Annotated structural diagram highlighting the key steps.');
    } else if (type === 'solution') {
      preset = {
        id: `file_${Date.now()}`,
        name: 'Prelim_Worked_Solutions_StepByStep.pdf',
        type: 'pdf',
        size: '2.4 MB',
        category: 'Worked Solution',
        url: '#'
      };
      handleSendMessage(preset, 'Detailed step-by-step worked solution set with marker tips.');
    }
  };

  // Profile Form Edit Handler
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedSubject = formData.get('subject');
    const updatedRole = formData.get('role');
    const updatedFocus = formData.get('focus');

    setStudents(prev =>
      prev.map(s => {
        if (s.id === currentStudent.id) {
          return {
            ...s,
            subject: updatedSubject,
            role: updatedRole,
            focus: updatedFocus
          };
        }
        return s;
      })
    );
  };

  // Add Student Handler
  const handleAddStudent = (e) => {
    e.preventDefault();
    const letterGrade = calculateGrade(newStudentForm.rawScore);
    const createdStudent = {
      id: `std_${Date.now()}`,
      ...newStudentForm,
      letterGrade,
      avatarBg: 'bg-indigo-700',
      bio: newStudentForm.focus || 'Newly registered student in PeerBridge system.'
    };

    setStudents(prev => [...prev, createdStudent]);
    setNewStudentForm(INITIAL_NEW_STUDENT_FORM);
    setShowAddStudentModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* ========================================== */}
      {/* GLOBAL TOP NAVIGATION & CONTROL BAR         */}
      {/* ========================================== */}
      <header className="bg-slate-950/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                  PeerBridge JC
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Singapore H1/H2
                </span>
              </div>
              <p className="text-xs text-slate-400">JC Peer Consultation & Matching Platform</p>
            </div>
          </div>

          {/* Simulation Date Controls & Matching Rule Indicators */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2 px-2 py-1 bg-slate-800/80 rounded-lg">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-slate-400 font-medium">Simulated Date:</span>
              <select
                value={simulationDate}
                onChange={(e) => setSimulationDate(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-slate-200 rounded px-2 py-0.5 text-xs font-semibold focus:ring-1 focus:ring-indigo-500 outline-none"
              >
                <option value="2026-05-15">May 15, 2026 (Pre-July)</option>
                <option value="2026-08-15">Aug 15, 2026 (Post-July)</option>
              </select>
            </div>

            {/* Status Badges */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium border transition-all ${
              isPostJuly 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {isPostJuly ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
              <span>J2 Cross-JC: {isPostJuly ? 'ACTIVE (Post-July)' : 'LOCKED (Pre-July)'}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30" title="J1 students are strictly matched within the same JC at all times">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>J1 Same-School: STRICT ALWAYS</span>
            </div>
          </div>

          {/* View Switcher Tabs (Student vs Admin) */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveView('student')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'student'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              Student View
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeView === 'admin'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Administrator View
            </button>
          </div>

        </div>
      </header>

      {/* Global Privacy Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/50 px-4 py-2 text-center text-xs text-indigo-300 flex items-center justify-center gap-2">
        <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
        <span>
          <strong>Privacy Safeguard Active:</strong> Raw numerical marks are strictly protected and visible only to Administrators. Students view letter grades (A–U) to promote supportive peer learning.
        </span>
      </div>

      {/* ========================================== */}
      {/* MAIN VIEW CONTENT AREA                      */}
      {/* ========================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ------------------------------------------ */}
        {/* VIEW 1: STUDENT VIEW                       */}
        {/* ------------------------------------------ */}
        {activeView === 'student' && (
          <div className="space-y-6">

            {/* Persona Quick Switcher Bar */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Student Persona Quick Switcher:
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Current Session: <strong className="text-indigo-300">{currentStudent.name}</strong> ({currentStudent.school.split(' ')[0]} - {currentStudent.level})
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {students.map((std) => {
                  const isActive = std.id === activeStudentId;
                  return (
                    <button
                      key={std.id}
                      onClick={() => setActiveStudentId(std.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                        isActive
                          ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500'
                          : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className={`h-6 w-6 rounded-full ${std.avatarBg} text-white flex items-center justify-center font-bold text-[10px]`}>
                        {std.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold leading-tight">{std.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {std.school.split(' ')[0]} • {std.level}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Student Sub-Tab Navigation */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
              <button
                onClick={() => setStudentSubTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  studentSubTab === 'dashboard'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                Dashboard & Match
              </button>

              <button
                onClick={() => setStudentSubTab('workspace')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all relative ${
                  studentSubTab === 'workspace'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Peer Workspace & Chat
                {activeStudentMatch && (
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                )}
              </button>
            </div>

            {/* SUB-TAB 1: STUDENT DASHBOARD */}
            {studentSubTab === 'dashboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Student Profile Overview & Request Form */}
                <div className="space-y-6">
                  
                  {/* Persona Card */}
                  <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/60 shadow-lg space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-xl ${currentStudent.avatarBg} text-white flex items-center justify-center text-lg font-bold shadow-inner`}>
                          {currentStudent.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-slate-100">{currentStudent.name}</h2>
                          <p className="text-xs text-indigo-300 font-medium">{currentStudent.school}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-700 text-slate-300">
                              {currentStudent.level}
                            </span>
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Role: {currentStudent.role}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Confidential Grade Badge (Letter Grade ONLY) */}
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Letter Grade</div>
                        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-lg font-extrabold inline-block mt-0.5">
                          Grade {currentStudent.letterGrade}
                        </div>
                        <div className="text-[9px] text-slate-500 mt-1 flex items-center justify-end gap-1">
                          <Lock className="h-2.5 w-2.5" /> Marks hidden
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 italic">
                      "{currentStudent.bio}"
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-700/50 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Enrolled Subject:</span>
                        <strong className="text-slate-200">{currentStudent.subject}</strong>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Focus Area:</span>
                        <span className="text-slate-300 font-medium text-right max-w-[180px] truncate">{currentStudent.focus}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Available Slots:</span>
                        <div className="text-right">
                          {currentStudent.slots.map((s, idx) => (
                            <span key={idx} className="block text-indigo-300 font-medium">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Registration / Request Editor */}
                  <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/60 shadow-lg">
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-3">
                      <Sliders className="h-4 w-4 text-indigo-400" />
                      Update Peer Consultation Request
                    </h3>

                    <form key={currentStudent.id} onSubmit={handleUpdateProfile} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1">Target Subject</label>
                        <select
                          name="subject"
                          defaultValue={currentStudent.subject}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          {SUBJECTS.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Requested Consultation Role</label>
                        <select
                          name="role"
                          defaultValue={currentStudent.role}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="Tutee">Tutee (Seeking Guidance)</option>
                          <option value="Tutor">Tutor (Offering Support)</option>
                          <option value="Both">Both (Reciprocal Consultation)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">Specific Topics & Weak Areas</label>
                        <textarea
                          name="focus"
                          rows={2}
                          defaultValue={currentStudent.focus}
                          placeholder="e.g. Vectors proving, integration by parts..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Save Preferences & Re-Match
                      </button>
                    </form>
                  </div>

                </div>

                {/* Right 2 Columns: Assigned Match Status Card & Rules Status */}
                <div className="lg:col-span-2 space-y-6">

                  {/* MATCH STATUS CARD */}
                  <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/60 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-extrabold text-slate-100">
                            Peer Consultation Match Status
                          </h2>
                          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            {currentStudent.subject}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Evaluated under current simulated date: {simulationDate} ({isPostJuly ? 'Post-July' : 'Pre-July'})
                        </p>
                      </div>

                      {activeStudentMatch ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Match Formed
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          Pending Match
                        </span>
                      )}
                    </div>

                    {activeStudentMatch ? (
                      <div className="pt-6 space-y-6">
                        {/* Matched Peer Card Details */}
                        <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className={`h-14 w-14 rounded-2xl ${matchedPeer.avatarBg} text-white flex items-center justify-center text-xl font-bold shadow-lg`}>
                                {matchedPeer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                                  Your Assigned {activeStudentMatch.tutor.id === currentStudent.id ? 'Tutee' : 'Peer Tutor'}
                                </div>
                                <h3 className="text-xl font-bold text-slate-100">{matchedPeer.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-medium text-slate-300">
                                    {matchedPeer.school}
                                  </span>
                                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">
                                    {matchedPeer.level}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col items-start sm:items-end gap-1">
                              {/* Match Type Badge */}
                              <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                                activeStudentMatch.isCrossJC
                                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                              }`}>
                                {activeStudentMatch.isCrossJC ? '🌐 Cross-JC Match (J2 Post-July)' : '🏫 Same-JC Match'}
                              </div>

                              <div className="text-[11px] text-slate-400">
                                Letter Grade: <span className="font-bold text-slate-200">Grade {matchedPeer.letterGrade}</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                              <span className="text-slate-400 block mb-0.5">Overlapping Time Slot:</span>
                              <strong className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                                <Calendar className="h-3.5 w-3.5" />
                                {activeStudentMatch.sharedSlot}
                              </strong>
                            </div>

                            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                              <span className="text-slate-400 block mb-0.5">Focus Notes:</span>
                              <span className="text-slate-200 font-medium truncate block">
                                {matchedPeer.focus}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={() => setStudentSubTab('workspace')}
                              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                            >
                              <MessageSquare className="h-4 w-4" />
                              Open Peer Workspace & Chat
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                      </div>
                    ) : (
                      /* Pending / No Match Explanation */
                      <div className="py-12 text-center space-y-4">
                        <div className="h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-slate-800 text-amber-400">
                          <AlertCircle className="h-8 w-8" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-200">No Eligible Peer Match Found Currently</h3>
                          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                            {currentStudent.level === 'J1' ? (
                              <span>
                                As a <strong>J1 student</strong>, you are strictly matched only with students in <strong>{currentStudent.school}</strong>. No available same-JC tutor/tutee currently shares overlapping schedule slots or target subjects.
                              </span>
                            ) : !isPostJuly ? (
                              <span>
                                As a <strong>J2 student before August 1st</strong>, cross-JC matching is restricted. Cross-JC pairing will unlock automatically when the simulation date passes August 1st.
                              </span>
                            ) : (
                              <span>
                                No registered peer matches your target subject (<strong>{currentStudent.subject}</strong>) with compatible schedule slots.
                              </span>
                            )}
                          </p>
                        </div>

                        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
                          <div className="font-semibold text-slate-300">Why am I unassigned?</div>
                          <ul className="list-disc list-inside text-slate-400 space-y-1">
                            <li>J1 students must strictly remain same-JC (Pre & Post July).</li>
                            <li>Seniority Rule: J1 Tutors cannot teach J2 Tutees.</li>
                            <li>Tutor raw mark must exceed tutee mark.</li>
                            <li>At least 1 overlapping time slot required.</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* MATCHING RULE HIGHLIGHT CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/60 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div className="text-xs">
                        <h4 className="font-bold text-slate-200">Strict J1 School Boundary</h4>
                        <p className="text-slate-400 mt-0.5">
                          J1 students (tutor or tutee) are strictly matched <strong>only within their own school</strong> at all times, preserving cohort alignment.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/60 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="text-xs">
                        <h4 className="font-bold text-slate-200">Post-July J2 Cross-JC Lock</h4>
                        <p className="text-slate-400 mt-0.5">
                          J2-to-J2 cross-school matching unlocks on <strong>August 1st</strong> to prepare for Prelims and A-Level revision across JCs.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* SUB-TAB 2: PEER WORKSPACE & CHAT */}
            {studentSubTab === 'workspace' && (
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[680px] relative">
                
                {/* Chat Left Sidebar */}
                <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-700/60 bg-slate-900/90 flex flex-col">
                  <div className="p-4 border-b border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-200">Peer Consultations</h3>
                      <button
                        onClick={() => setIsVaultOpen(true)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all"
                      >
                        <Folder className="h-3.5 w-3.5" />
                        Vault ({vaultFiles.length})
                      </button>
                    </div>

                    <div className="relative">
                      <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Active Contact List */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {matchedPeer ? (
                      <button className="w-full text-left p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-slate-200 space-y-1 transition-all">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white">{matchedPeer.name}</span>
                          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            Active Match
                          </span>
                        </div>
                        <div className="text-[11px] text-indigo-300 truncate">
                          {matchedPeer.school.split(' ')[0]} • {matchedPeer.level} • {currentStudent.subject}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate pt-1 border-t border-slate-800/80">
                          Last active: Mon 16:00 slot
                        </div>
                      </button>
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-500 italic">
                        No active match assigned yet.
                      </div>
                    )}

                    {/* Helper Chat Bot */}
                    <button className="w-full text-left p-3 rounded-xl bg-slate-950/50 hover:bg-slate-800/50 border border-slate-800 text-slate-300 space-y-1 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-indigo-300 flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                          PeerBridge AI Assistant
                        </span>
                        <span className="text-[9px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded">Bot</span>
                      </div>
                      <p className="text-[10px] text-slate-400 truncate">Ask for syllabus formula summaries or study tips...</p>
                    </button>
                  </div>

                  {/* User Profile Mini Footer */}
                  <div className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-lg ${currentStudent.avatarBg} text-white flex items-center justify-center font-bold text-xs`}>
                        {currentStudent.name[0]}
                      </div>
                      <div className="truncate max-w-[120px]">
                        <div className="font-bold text-slate-200 truncate">{currentStudent.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{currentStudent.school.split(' ')[0]}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold border border-emerald-500/20">
                      Grade {currentStudent.letterGrade}
                    </span>
                  </div>
                </div>

                {/* Main Chat Thread Area */}
                <div 
                  className="flex-1 flex flex-col bg-slate-950/40 relative"
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const file = e.dataTransfer.files[0];
                      const droppedFile = {
                        id: `file_${Date.now()}`,
                        name: file.name,
                        type: file.type.includes('image') ? 'image' : 'pdf',
                        size: `${(file.size / 1024).toFixed(0)} KB`,
                        category: 'Uploaded Material',
                        url: '#'
                      };
                      handleSendMessage(droppedFile, `Shared document: ${file.name}`);
                    }
                  }}
                >
                  
                  {/* Drag and Drop Overlay */}
                  {isDragging && (
                    <div className="absolute inset-0 bg-indigo-600/30 backdrop-blur-sm border-2 border-dashed border-indigo-400 z-30 flex flex-col items-center justify-center text-white space-y-2 pointer-events-none">
                      <UploadCloud className="h-12 w-12 animate-bounce text-indigo-200" />
                      <p className="font-bold text-sm">Drop study notes, PNG diagrams or PDFs to share instantly</p>
                    </div>
                  )}

                  {/* Chat Header */}
                  {matchedPeer ? (
                    <div className="p-4 bg-slate-900/90 border-b border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-xl ${matchedPeer.avatarBg} text-white flex items-center justify-center font-bold shadow-md`}>
                          {matchedPeer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-slate-100">{matchedPeer.name}</h3>
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                              activeStudentMatch.isCrossJC 
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            }`}>
                              {activeStudentMatch.isCrossJC ? 'Cross-JC' : 'Same-JC'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            {matchedPeer.school} • {matchedPeer.level} • Slot: <strong className="text-emerald-400">{activeStudentMatch.sharedSlot}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsVaultOpen(true)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5"
                        >
                          <Folder className="h-3.5 w-3.5 text-indigo-400" />
                          Shared Vault
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-900/90 border-b border-slate-700/60 text-slate-400 text-xs font-semibold">
                      No active peer thread selected.
                    </div>
                  )}

                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {activeChatMessages.map((msg) => {
                      const isMe = msg.senderId === currentStudent.id;
                      const isSystem = msg.senderId === 'system';

                      if (isSystem) {
                        return (
                          <div key={msg.id} className="text-center my-3">
                            <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-400 inline-flex items-center gap-1.5">
                              <Info className="h-3 w-3 text-indigo-400" />
                              {msg.text}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
                        >
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                            <span className="font-semibold text-slate-300">{msg.senderName}</span>
                            <span className="bg-slate-800 px-1.5 py-0.2 rounded text-[9px] text-slate-400">{msg.roleBadge}</span>
                            <span>{msg.timestamp}</span>
                          </div>

                          <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-2 shadow-md ${
                            isMe
                              ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none'
                              : 'bg-slate-800 text-slate-100 border border-slate-700/80 rounded-tl-none'
                          }`}>
                            <p className="leading-relaxed">{msg.text}</p>

                            {/* File Attachment Card in Message */}
                            {msg.file && (
                              <div className="mt-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
                                    {msg.file.type === 'image' ? <ImageIcon className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                                  </div>
                                  <div className="truncate">
                                    <div className="font-semibold text-slate-200 truncate">{msg.file.name}</div>
                                    <div className="text-[10px] text-slate-400">{msg.file.size} • {msg.file.category}</div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => setPreviewFile(msg.file)}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                                    title="Preview File"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </button>
                                  <a
                                    href="#download"
                                    onClick={(e) => { e.preventDefault(); alert(`Downloading simulated material: ${msg.file.name}`); }}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-indigo-200"
                                    title="Download File"
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Preset Material Toolbar */}
                  <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider shrink-0">
                      Quick Materials:
                    </span>
                    <button
                      onClick={() => handleSendPresetMaterial('formula')}
                      className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 whitespace-nowrap transition-all flex items-center gap-1.5"
                    >
                      <Plus className="h-3 w-3" /> Formula Sheet PDF
                    </button>
                    <button
                      onClick={() => handleSendPresetMaterial('diagram')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap transition-all flex items-center gap-1.5"
                    >
                      <Plus className="h-3 w-3" /> Question Diagram PNG
                    </button>
                    <button
                      onClick={() => handleSendPresetMaterial('solution')}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap transition-all flex items-center gap-1.5"
                    >
                      <Plus className="h-3 w-3" /> Worked Solution PDF
                    </button>
                  </div>

                  {/* Input Controls */}
                  <div className="p-3 bg-slate-900 border-t border-slate-700/60">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex items-center gap-2"
                    >
                      <label className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer border border-slate-700 transition-all shrink-0">
                        <Paperclip className="h-4 w-4" />
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const f = e.target.files[0];
                              const userFile = {
                                id: `file_${Date.now()}`,
                                name: f.name,
                                type: f.type.includes('image') ? 'image' : 'pdf',
                                size: `${(f.size / 1024).toFixed(0)} KB`,
                                category: 'Uploaded Attachment',
                                url: '#'
                              };
                              handleSendMessage(userFile, `Uploaded attachment: ${f.name}`);
                            }
                          }}
                        />
                      </label>

                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={matchedPeer ? `Message ${matchedPeer.name} regarding ${currentStudent.subject}...` : 'No active match to chat with...'}
                        disabled={!matchedPeer}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                      />

                      <button
                        type="submit"
                        disabled={!matchedPeer || !chatInput.trim()}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 shrink-0"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Send
                      </button>
                    </form>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------ */}
        {/* VIEW 2: ADMINISTRATOR VIEW                 */}
        {/* ------------------------------------------ */}
        {activeView === 'admin' && (
          <div className="space-y-6">

            {/* Admin Header Banner */}
            <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/60 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-indigo-400" />
                  <h2 className="text-xl font-extrabold text-slate-100">Administrator Management Portal</h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Full privileged visibility: View confidential raw marks, matching algorithm results, and rule diagnostic matrix.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Student Profile
                </button>
              </div>
            </div>

            {/* Admin Sub-Tabs Switcher */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setAdminSubTab('matches')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs transition-all ${
                  adminSubTab === 'matches'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                Matching Engine ({activeMatches.length} Matches)
              </button>

              <button
                onClick={() => setAdminSubTab('matrix')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs transition-all ${
                  adminSubTab === 'matrix'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                Eligibility Diagnostics Matrix
              </button>

              <button
                onClick={() => setAdminSubTab('roster')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs transition-all ${
                  adminSubTab === 'roster'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                Candidate Roster ({students.length})
              </button>
            </div>

            {/* SUB-TAB 1: MATCHING ENGINE RESULTS */}
            {adminSubTab === 'matches' && (
              <div className="space-y-6">

                {/* Algorithmic Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/60 shadow-md">
                    <div className="text-xs text-slate-400 font-medium">Total Registered Candidates</div>
                    <div className="text-2xl font-extrabold text-slate-100 mt-1">{students.length}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Across 6 Junior Colleges</div>
                  </div>

                  <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/60 shadow-md">
                    <div className="text-xs text-slate-400 font-medium">Formed Matches</div>
                    <div className="text-2xl font-extrabold text-emerald-400 mt-1">{activeMatches.length}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Priority greedy optimization</div>
                  </div>

                  <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/60 shadow-md">
                    <div className="text-xs text-slate-400 font-medium">Cross-JC Matches (J2)</div>
                    <div className="text-2xl font-extrabold text-purple-400 mt-1">
                      {activeMatches.filter(m => m.isCrossJC).length}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {isPostJuly ? 'Active (Post-July Unlocked)' : '0 (Locked Pre-July)'}
                    </div>
                  </div>

                  <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/60 shadow-md">
                    <div className="text-xs text-slate-400 font-medium">J1 Same-JC Strict Matches</div>
                    <div className="text-2xl font-extrabold text-blue-400 mt-1">
                      {activeMatches.filter(m => m.tutor.level === 'J1' || m.tutee.level === 'J1').length}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">100% same-school compliance</div>
                  </div>
                </div>

                {/* Formed Pairing Cards Table */}
                <div className="bg-slate-800/90 rounded-2xl border border-slate-700/60 shadow-xl overflow-hidden">
                  <div className="p-4 bg-slate-900/90 border-b border-slate-700/60 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-200">Active Formed Peer Pairings</h3>
                      <p className="text-xs text-slate-400">Greedy priority optimized by academic gap & time slot compatibility</p>
                    </div>

                    <div className="text-xs font-semibold px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-lg border border-indigo-500/20">
                      Simulated Date: {simulationDate}
                    </div>
                  </div>

                  {activeMatches.length > 0 ? (
                    <div className="divide-y divide-slate-800">
                      {activeMatches.map((m) => (
                        <div key={m.id} className="p-4 hover:bg-slate-700/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                          
                          {/* Tutor details */}
                          <div className="flex items-center gap-3 w-full md:w-5/12">
                            <div className={`h-10 w-10 rounded-xl ${m.tutor.avatarBg} text-white flex items-center justify-center font-bold`}>
                              {m.tutor.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-bold text-slate-100 flex items-center gap-2">
                                {m.tutor.name}
                                <span className="px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 text-[10px] rounded border border-emerald-500/20">
                                  Tutor ({m.tutor.level})
                                </span>
                              </div>
                              <div className="text-slate-400 text-[11px]">
                                {m.tutor.school} • Raw Score: <strong className="text-amber-300">{m.tutor.rawScore}%</strong> (Grade {m.tutor.letterGrade})
                              </div>
                            </div>
                          </div>

                          {/* Arrow connector with score gap */}
                          <div className="flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                              Gap: +{m.scoreGap}% pts
                            </span>
                            <ArrowRight className="h-4 w-4 text-indigo-400 my-1 hidden md:block" />
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              m.isCrossJC
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            }`}>
                              {m.isCrossJC ? 'Cross-JC Match' : 'Same-JC Match'}
                            </span>
                          </div>

                          {/* Tutee details */}
                          <div className="flex items-center gap-3 w-full md:w-5/12 justify-start md:justify-end text-left md:text-right">
                            <div className="order-2 md:order-1">
                              <div className="font-bold text-slate-100 flex items-center justify-start md:justify-end gap-2">
                                <span className="px-1.5 py-0.2 bg-indigo-500/10 text-indigo-300 text-[10px] rounded border border-indigo-500/20">
                                  Tutee ({m.tutee.level})
                                </span>
                                {m.tutee.name}
                              </div>
                              <div className="text-slate-400 text-[11px]">
                                {m.tutee.school} • Raw Score: <strong className="text-amber-300">{m.tutee.rawScore}%</strong> (Grade {m.tutee.letterGrade})
                              </div>
                            </div>
                            <div className={`h-10 w-10 rounded-xl ${m.tutee.avatarBg} text-white flex items-center justify-center font-bold order-1 md:order-2 shrink-0`}>
                              {m.tutee.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      No active matches formed under current parameters.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* SUB-TAB 2: ELIGIBILITY DIAGNOSTICS MATRIX */}
            {adminSubTab === 'matrix' && (
              <div className="space-y-4">
                
                {/* Diagnostics Filter Control Bar */}
                <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-indigo-400" />
                    <span className="font-bold text-slate-200">Diagnostics Matrix Evaluator</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div>
                      <span className="text-slate-400 mr-2">Filter School:</span>
                      <select
                        value={matrixFilterSchool}
                        onChange={(e) => setMatrixFilterSchool(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs"
                      >
                        <option value="All">All Schools</option>
                        {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <span className="text-slate-400 mr-2">Filter Outcome:</span>
                      <select
                        value={matrixFilterStatus}
                        onChange={(e) => setMatrixFilterStatus(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs"
                      >
                        <option value="All">All Pairs</option>
                        <option value="Eligible">Eligible Only</option>
                        <option value="Ineligible">Ineligible Only</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Matrix Evaluation Grid */}
                <div className="bg-slate-800/90 rounded-2xl border border-slate-700/60 shadow-xl overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-700/60">
                        <th className="p-3 font-semibold">Tutor Candidate</th>
                        <th className="p-3 font-semibold">Tutee Candidate</th>
                        <th className="p-3 font-semibold">Seniority Check</th>
                        <th className="p-3 font-semibold">School Boundary Check</th>
                        <th className="p-3 font-semibold">Subject & Slot</th>
                        <th className="p-3 font-semibold">Score Gap</th>
                        <th className="p-3 font-semibold text-right">Final Decision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {(() => {
                        const pairs = [];
                        const tutors = students.filter(s => s.role === 'Tutor' || s.role === 'Both');
                        const tutees = students.filter(s => s.role === 'Tutee' || s.role === 'Both');

                        tutors.forEach(tutor => {
                          tutees.forEach(tutee => {
                            if (tutor.id === tutee.id) return;

                            if (matrixFilterSchool !== 'All' && tutor.school !== matrixFilterSchool && tutee.school !== matrixFilterSchool) {
                              return;
                            }

                            const evalRes = evaluatePairEligibility(tutor, tutee, isPostJuly);

                            if (matrixFilterStatus === 'Eligible' && !evalRes.eligible) return;
                            if (matrixFilterStatus === 'Ineligible' && evalRes.eligible) return;

                            pairs.push({ tutor, tutee, evalRes });
                          });
                        });

                        if (pairs.length === 0) {
                          return (
                            <tr>
                              <td colSpan={7} className="p-6 text-center text-slate-500 italic">
                                No candidate pairs match selected filter criteria.
                              </td>
                            </tr>
                          );
                        }

                        return pairs.map(({ tutor, tutee, evalRes }) => (
                          <tr key={`${tutor.id}-${tutee.id}`} className="hover:bg-slate-700/30 transition-all">
                            <td className="p-3">
                              <div className="font-bold text-slate-100">{tutor.name}</div>
                              <div className="text-[10px] text-slate-400">{tutor.school.split(' ')[0]} ({tutor.level})</div>
                            </td>

                            <td className="p-3">
                              <div className="font-bold text-slate-100">{tutee.name}</div>
                              <div className="text-[10px] text-slate-400">{tutee.school.split(' ')[0]} ({tutee.level})</div>
                            </td>

                            {/* Seniority Check */}
                            <td className="p-3">
                              {evalRes.isSeniorityValid ? (
                                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                                  <CheckCircle2 className="h-3.5 w-3.5" /> Pass
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-rose-400 font-semibold" title="J1 Tutor cannot teach J2 Tutee">
                                  <XCircle className="h-3.5 w-3.5" /> J1 Tutor Violation
                                </span>
                              )}
                            </td>

                            {/* School Boundary Check */}
                            <td className="p-3">
                              {evalRes.isSchoolValid ? (
                                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  {evalRes.isCrossJC ? 'Cross-JC (J2 Post-July)' : 'Same-JC'}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
                                  <XCircle className="h-3.5 w-3.5" />
                                  {(tutor.level === 'J1' || tutee.level === 'J1') ? 'J1 Strict Same-JC' : 'J2 Pre-July Locked'}
                                </span>
                              )}
                            </td>

                            {/* Subject & Slot */}
                            <td className="p-3">
                              <div className={evalRes.isSubjectValid ? 'text-slate-200' : 'text-rose-400 font-semibold'}>
                                {tutor.subject === tutee.subject ? tutor.subject : 'Mismatch'}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {evalRes.sharedSlots.length > 0 ? `Shared: ${evalRes.sharedSlots[0]}` : 'No Slot Overlap'}
                              </div>
                            </td>

                            {/* Score Gap */}
                            <td className="p-3">
                              {evalRes.scoreGap > 0 ? (
                                <span className="text-emerald-400 font-bold">+{evalRes.scoreGap}% pts</span>
                              ) : (
                                <span className="text-rose-400 font-bold">{evalRes.scoreGap}% pts</span>
                              )}
                            </td>

                            {/* Final Outcome */}
                            <td className="p-3 text-right">
                              {evalRes.eligible ? (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  ELIGIBLE
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30" title={evalRes.reasons.join(', ')}>
                                  REJECTED
                                </span>
                              )}
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* SUB-TAB 3: CANDIDATE ROSTER */}
            {adminSubTab === 'roster' && (
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700/60 shadow-xl overflow-hidden space-y-4 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="font-bold text-sm text-slate-200">
                    Confidential Student Roster (Privileged View)
                  </h3>
                  <div className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                    🔒 Raw marks visible ONLY in Administrator Mode
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-700/60">
                        <th className="p-3 font-semibold">Student Name</th>
                        <th className="p-3 font-semibold">Junior College</th>
                        <th className="p-3 font-semibold">Level</th>
                        <th className="p-3 font-semibold">Role</th>
                        <th className="p-3 font-semibold">Subject</th>
                        <th className="p-3 font-semibold">Confidential Raw Mark</th>
                        <th className="p-3 font-semibold">Public Letter Grade</th>
                        <th className="p-3 font-semibold text-right">Available Slots</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {students.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-700/30 transition-all">
                          <td className="p-3 font-bold text-slate-100 flex items-center gap-2">
                            <div className={`h-6 w-6 rounded-full ${s.avatarBg} text-white flex items-center justify-center font-bold text-[10px]`}>
                              {s.name[0]}
                            </div>
                            {s.name}
                          </td>
                          <td className="p-3 text-slate-300">{s.school}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-700">
                              {s.level}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                              {s.role}
                            </span>
                          </td>
                          <td className="p-3 font-medium text-slate-200">{s.subject}</td>
                          <td className="p-3 font-extrabold text-amber-300">
                            {s.rawScore}%
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              Grade {s.letterGrade}
                            </span>
                          </td>
                          <td className="p-3 text-right text-[11px] text-indigo-300">
                            {s.slots.join(' | ')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* ========================================== */}
      {/* MODAL: SHARED RESOURCE VAULT DRAWER        */}
      {/* ========================================== */}
      {isVaultOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-700 h-full p-6 space-y-6 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-indigo-400" />
                <h3 className="font-bold text-base text-slate-100">Shared Resource Vault</h3>
              </div>
              <button
                onClick={() => setIsVaultOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Repository of all revision formula sheets, worked solutions, and question diagrams shared in peer consultation sessions.
            </p>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {vaultFiles.length > 0 ? (
                vaultFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 bg-slate-800/90 rounded-xl border border-slate-700/80 space-y-2 hover:border-indigo-500/50 transition-all text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
                          {file.type === 'image' ? <ImageIcon className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-slate-200 truncate">{file.name}</div>
                          <div className="text-[10px] text-slate-400">Category: {file.category}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                        {file.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[10px] text-slate-400">
                      <span>Shared by {file.uploadedBy} ({file.timestamp})</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPreviewFile(file)}
                          className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Eye className="h-3 w-3" /> Preview
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-xs text-slate-500 py-10">
                  No materials uploaded in this vault yet.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsVaultOpen(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
              >
                Close Resource Vault
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: INTERACTIVE FILE PREVIEW LIGHTBOX   */}
      {/* ========================================== */}
      {previewFile && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-400" />
                <h3 className="font-bold text-sm text-slate-100 truncate max-w-md">
                  {previewFile.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-slate-950 rounded-xl p-8 border border-slate-800 flex flex-col items-center justify-center min-h-[260px] text-center space-y-4">
              {previewFile.type === 'image' && previewFile.url !== '#' ? (
                <img
                  src={previewFile.url}
                  alt={previewFile.name}
                  className="max-h-64 rounded-lg object-contain shadow-lg"
                />
              ) : (
                <div className="space-y-3">
                  <div className="h-16 w-16 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/30">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">{previewFile.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Simulated Document Viewer • Size: {previewFile.size} • Category: {previewFile.category}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-slate-400">Status: Verified Peer Material</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Downloading ${previewFile.name}...`)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Download className="h-3.5 w-3.5" /> Download File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL: ADD STUDENT FORM (ADMIN ONLY)       */}
      {/* ========================================== */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <Plus className="h-5 w-5 text-indigo-400" />
                Register New Candidate
              </h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Full Student Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Darren Lim"
                  value={newStudentForm.name}
                  onChange={e => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Junior College</label>
                  <select
                    value={newStudentForm.school}
                    onChange={e => setNewStudentForm({ ...newStudentForm, school: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none"
                  >
                    {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Level</label>
                  <select
                    value={newStudentForm.level}
                    onChange={e => setNewStudentForm({ ...newStudentForm, level: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none"
                  >
                    <option value="J1">J1</option>
                    <option value="J2">J2</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Role</label>
                  <select
                    value={newStudentForm.role}
                    onChange={e => setNewStudentForm({ ...newStudentForm, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none"
                  >
                    <option value="Tutee">Tutee</option>
                    <option value="Tutor">Tutor</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Subject</label>
                  <select
                    value={newStudentForm.subject}
                    onChange={e => setNewStudentForm({ ...newStudentForm, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none"
                  >
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Raw Test Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newStudentForm.rawScore}
                  onChange={e => setNewStudentForm({ ...newStudentForm, rawScore: parseInt(e.target.value, 10) || 0 })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Focus Topics / Bio Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Needs help with Integration & Calculus"
                  value={newStudentForm.focus}
                  onChange={e => setNewStudentForm({ ...newStudentForm, focus: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Save Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        PeerBridge JC Peer Consultation Platform • Aligned with MOE JC Peer Learning Standards & Confidentiality Policies
      </footer>

    </div>
  );
}
