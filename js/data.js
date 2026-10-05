/* ==========================================================================
   DATA — edit this file to change site content. No HTML editing required.
   ========================================================================== */

const PROFILE = {
  name: "Lingesh Kumar M",
  title: "Generative AI & Machine Learning Developer",
  location: "Bengaluru, Karnataka, India",
  email: "lingeshkumar400@gmail.com",
  phone: "+91 9611074891",
  linkedin: "https://linkedin.com/in/lingeshkumar24",
  github: "https://github.com/Lingeshkumar24-code",
  leetcode: "https://leetcode.com/u/lingeshkumar24/",
  hackerrank: "https://hackerrank.com/profile/klingeshMCA25",
  resumePath: "public/resume/resume.pdf",
  avatarPath: "public/images/avatar.png",
  introVideoPath: "public/videos/lingesh-intro.mp4",
};

const STATS = [
  { value: "MCA", label: "Generative AI", isNumber: false },
  { value: "8.6", label: "CGPA", isNumber: false },
  { value: "88.86", label: "% in BCA", isNumber: true, suffix: "%" },
  { value: "9", label: "AI / ML Projects", isNumber: true, suffix: "+" },
];

const EDUCATION = [
  {
    degree: "MCA — Generative AI Specialization",
    place: "Alliance University, Bengaluru",
    meta: "CGPA: 8.6",
  },
  {
    degree: "BCA",
    place: "K.L.E. S. Nijalingappa College, Bengaluru City University",
    meta: "88.86%",
  },
];

/* ---------------------------------------------------------------------- */
/* LEO 2.0                                                                  */
/* ---------------------------------------------------------------------- */

const LEO_PIPELINE = [
  "VOICE / TEXT",
  "INTENT",
  "CONTEXT / ATTENTION",
  "PLANNING",
  "TOOL SELECTION",
  "PERMISSION",
  "MODEL REASONING",
  "EXECUTION",
  "OBSERVATION",
  "VERIFICATION",
  "RECOVERY",
  "MEMORY",
  "RESPONSE / TTS",
];

const LEO_FEATURES = [
  {
    title: "Autonomous Agent Loop",
    tag: "CORE",
    desc: "A continuous cycle that lets LEO act on multi-step instructions rather than answer once and stop.",
    steps: ["Plan", "Execute", "Observe", "Verify", "Recover", "Report"],
  },
  {
    title: "Multi-Agent Architecture",
    tag: "ARCHITECTURE",
    desc: "Specialized agent roles collaborate through an orchestration layer instead of one model doing everything.",
    steps: ["Planner", "Coder", "Researcher", "Browser Agent", "Vision Agent", "Computer Control Agent", "Verifier / Critic"],
  },
  {
    title: "Agent Tool Calling",
    tag: "REASONING",
    desc: "Every action passes through an explicit reasoning → permission → verification chain before it runs.",
    steps: ["AI Reasoning", "Tool Selection", "Permission Check", "Tool Execution", "Observation", "Verification"],
  },
  {
    title: "Computer Control",
    tag: "SYSTEM",
    desc: "LEO interacts directly with Windows to carry out instructions as on-screen actions.",
    steps: ["Open apps", "Close apps", "Type text", "Click", "Hotkeys", "Screenshots", "Volume / Mute", "Brightness", "Lock", "Emergency stop"],
  },
  {
    title: "Vision / Screen Understanding",
    tag: "PERCEPTION",
    desc: "LEO reads the screen it is working on, not just the instructions it is given.",
    steps: ["Screenshots", "OCR", "Visual interpretation", "Screen monitoring"],
  },
  {
    title: "Browser Automation",
    tag: "WEB",
    desc: "Playwright-driven browser control lets LEO complete web-based workflows on its own.",
    steps: ["Playwright", "Navigation", "Form interaction", "Web workflows"],
  },
  {
    title: "Autonomous Coding",
    tag: "ENGINEERING",
    desc: "A structured debug loop designed for autonomous coding and self-correction.",
    steps: ["Inspect", "Plan", "Implement", "Run", "Observe error", "Diagnose", "Fix", "Test", "Verify"],
  },
  {
    title: "Filesystem Automation",
    tag: "SYSTEM",
    desc: "Safe, permissioned file operations guarded by safe-path checks.",
    steps: ["Find", "Read", "Create", "Move", "Rename", "Delete"],
  },
  {
    title: "Document Automation",
    tag: "PRODUCTIVITY",
    desc: "Generates and edits real office documents using Python document libraries.",
    steps: ["DOCX", "XLSX", "PPTX", "PDF"],
  },
  {
    title: "Research",
    tag: "KNOWLEDGE",
    desc: "AI-assisted research workflows for gathering and synthesizing information.",
    steps: ["Query", "Retrieve", "Synthesize", "Report"],
  },
  {
    title: "Gmail Integration",
    tag: "INTEGRATION",
    desc: "Connects to Gmail through OAuth to read and act on email as part of a workflow.",
    steps: ["OAuth", "Read", "Draft", "Send"],
  },
  {
    title: "WhatsApp Web Automation",
    tag: "INTEGRATION",
    desc: "Automates WhatsApp Web in-browser — not the official WhatsApp Business API.",
    steps: ["Browser session", "Read", "Compose", "Send"],
  },
  {
    title: "Memory / Context / Attention",
    tag: "CORE",
    desc: "Maintains task context across steps so longer, multi-turn workflows stay coherent.",
    steps: ["Short-term context", "Task state", "Long-term memory"],
  },
  {
    title: "Voice",
    tag: "PERCEPTION",
    desc: "Speech in, speech out — across English and four Indian languages, including code-mixed speech.",
    steps: ["Faster-Whisper", "Speech-to-text", "Text-to-speech", "English", "Tamil", "Kannada", "Hindi", "Telugu", "Code-mixed speech"],
  },
  {
    title: "LAN Calling",
    tag: "COMMUNICATION",
    desc: "Real-time LAN / browser-based calling over WebRTC — not mobile PSTN calling.",
    steps: ["WebRTC", "aiortc", "LAN / browser calling"],
  },
  {
    title: "Permissions / Safety",
    tag: "SAFETY",
    desc: "Every action is scoped to a risk tier and logged, with a hard stop always available.",
    steps: ["Observe", "Normal", "Privileged", "High risk"],
    notes: ["Permission checks", "Session token", "Host/Origin validation", "X-LEO-Token", "Pairing validation", "Safe-trash", "Emergency stop", "Audit logs", "Secret redaction"],
  },
  {
    title: "Mission System",
    tag: "ORCHESTRATION",
    desc: "Every instruction becomes a tracked mission that moves through a defined state machine.",
    steps: ["Pending", "Planning", "Running", "Waiting", "Observing", "Verifying", "Recovering", "Failed", "Cancelled", "Completed"],
  },
];

const LEO_MODELS = [
  { role: "Main Agent", model: "NVIDIA Nemotron 3 Ultra", via: "OpenRouter" },
  { role: "Coding Agent", model: "Poolside Laguna S 2.1", via: "OpenRouter" },
  { role: "Vision / Supporting Model", model: "Qwen 3.8 27B", via: "OpenAI-compatible" },
  { role: "Local", model: "Qwen 2.5 3B", via: "Ollama (on-device)" },
];

const LEO_PROVIDERS = ["OpenRouter", "Ollama", "OpenAI-Compatible", "Groq"];

const LEO_TECH = [
  "Python", "OpenRouter", "Ollama", "OpenAI-Compatible APIs", "Groq", "FastAPI",
  "Playwright", "PyAutoGUI", "Pillow", "PyTesseract", "Faster-Whisper", "pyttsx3",
  "WebRTC", "aiortc", "python-docx", "openpyxl", "python-pptx", "pypdf",
];

const LEO_FINETUNE_PIPELINE = ["Local Model", "Dataset", "QLoRA / PEFT", "Fine-tuning", "Friendly assistant behavior", "Local inference"];

/* ---------------------------------------------------------------------- */
/* PROJECTS                                                                 */
/* ---------------------------------------------------------------------- */

const PROJECTS = [
  {
    num: "01",
    title: "F1 AI Race Engineer",
    subtitle: "AI-powered Formula 1 race strategy intelligence",
    desc: "An AI race-engineer system combining telemetry analysis, machine learning, RAG and a stateful LangGraph agent to provide context-aware race strategy guidance.",
    problem: "Race strategy depends on reading live telemetry against regulations and history faster than a human can cross-reference them mid-race.",
    approach: "A LangGraph agent orchestrates ML predictions and retrieval together, so strategy calls are grounded in both data and documented precedent.",
    architecture: ["React", "FastAPI", "LangGraph", "LLM", "Tools", "ML Models / RAG / Data"],
    ml: [
      { name: "Random Forest Regressor", use: "Tire-life prediction" },
      { name: "XGBoost Classifier", use: "Pit-stop window prediction" },
    ],
    rag: ["FIA regulations", "Historical race reports", "ChromaDB", "Embeddings", "Retriever"],
    features: ["Telemetry calculations", "Tire degradation prediction", "Pit-stop window prediction", "FIA regulation retrieval", "Historical race-report retrieval", "Stateful LangGraph agent", "ChromaDB RAG", "React dashboard", "FastAPI backend"],
    tech: ["Python", "FastAPI", "React", "LangGraph", "Groq", "ChromaDB", "XGBoost", "Random Forest", "SQLite"],
    github: "https://github.com/Lingeshkumar24-code/F1-AI-Race",
    demo: null,
  },
  {
    num: "02",
    title: "VeriDoc AI",
    subtitle: "Document intelligence · translation · summarization",
    desc: "An intelligent document analysis application that extracts, processes, translates and summarizes PDF, DOCX and TXT documents.",
    problem: "Long documents in mixed formats are slow to read, translate and summarize one at a time.",
    approach: "A single pipeline extracts text from any of the three formats, then runs translation, summarization and key-point extraction in parallel, chunked batches.",
    architecture: ["Upload", "Text extraction", "Chunked / parallel processing", "Translate · Summarize · Key points", "FastAPI REST API"],
    features: ["PDF, DOCX & TXT upload", "Full text extraction", "Editable extracted text", "Word & character count", "Translation", "Summarization", "Key-point extraction", "Chunked, parallel processing", "Clipboard copy", "Browser text-to-speech", "Multilingual Indian-language support", "Health endpoint"],
    endpoints: ["/health", "/api/languages", "/api/upload", "/api/translate", "/api/summarize", "/api/key-points"],
    tech: ["FastAPI", "Groq", "Python", "HTML", "CSS", "JavaScript", "asyncio"],
    github: "https://github.com/Lingeshkumar24-code/veridoc",
    demo: null,
  },
  {
    num: "03",
    title: "BhashaVoice AI",
    subtitle: "From voice to intelligence — built for India",
    desc: "A multilingual AI voice-assistant pipeline designed for Indian languages and code-mixed speech.",
    problem: "Most voice assistants are built English-first and break down on Indian code-mixed speech like \u201cfan on karo\u201d or \u201clight off pannunga.\u201d",
    approach: "A full speech pipeline — ASR through NLP to TTS — built to support five Indian languages and code-switching between them.",
    architecture: ["Speech", "Preprocessing", "ASR", "NLP", "Intent classification", "NER", "Dialogue management", "LLM", "Translation", "TTS"],
    languages: ["English", "Tamil", "Telugu", "Kannada", "Malayalam", "Hindi"],
    codeMixedExamples: ["\u201cFan on karo\u201d", "\u201cLight off pannunga\u201d"],
    status: [
      { part: "ASR", state: "Implemented" },
      { part: "LLM", state: "Implemented" },
      { part: "Translation", state: "Implemented" },
      { part: "TTS", state: "Implemented" },
      { part: "Intent classifier", state: "Fallback / training available" },
      { part: "NER", state: "Fallback / training available" },
      { part: "Evaluation", state: "Training/evaluation pipeline available" },
    ],
    tech: ["React", "FastAPI", "Python", "Groq", "Web Speech API", "gTTS", "Google Translate", "Hugging Face Transformers", "IndicBERT architecture"],
    github: "https://github.com/Lingeshkumar24-code/Bhasha_Ai",
    demo: null,
  },
  {
    num: "04",
    title: "AI Health Appointment Navigator",
    subtitle: "Symptom → specialty → hospital → doctor → appointment",
    desc: "An AI-powered healthcare appointment recommendation application that maps symptoms to medical specialties, discovers nearby hospitals and recommends doctors from a local database.",
    problem: "Finding the right kind of doctor nearby usually means guessing a specialty, then searching separately for a hospital and an appointment slot.",
    approach: "One workflow carries the user from symptoms to a bookable appointment, using open map data for location and a local database for doctor matching.",
    architecture: ["User input", "Symptom → specialty", "Nearby hospitals", "Doctor matching", "Appointment persistence"],
    features: ["Symptom-to-specialty classification", "Nearby hospital discovery", "Doctor recommendation", "Appointment recording", "Location-based search", "Responsive web interface"],
    tech: ["FastAPI", "Python", "SQLAlchemy", "SQLite", "OpenStreetMap", "Nominatim", "REST API"],
    github: "https://github.com/Lingeshkumar24-code/AI-Health-Appointment-Navigator",
    demo: null,
    disclaimer: "A routing and discovery tool, not a medical diagnostic system.",
  },
  {
    num: "05",
    title: "Calories Tracker",
    subtitle: "Django web application",
    desc: "A Django-based web application built with Python and SQLite.",
    problem: "A straightforward record-keeping tool for tracking daily food intake.",
    approach: "Standard Django models and views backed by SQLite for persistence.",
    architecture: ["Django views", "Django models", "SQLite"],
    features: ["Entry tracking", "Django admin-backed data model"],
    tech: ["Django", "Python", "SQLite"],
    github: "https://github.com/Lingeshkumar24-code/calories-track",
    demo: null,
  },
  {
    num: "06",
    title: "Toll Plaza RL",
    subtitle: "Reinforcement learning for traffic flow",
    desc: "An RL simulation for intelligent toll-plaza lane dispatch focused on reducing vehicle waiting time.",
    problem: "Vehicles at a toll plaza queue unevenly across manual and ETC lanes, driving up average wait time.",
    approach: "An agent learns a lane-dispatch policy against a simulated environment using two classic RL algorithms.",
    architecture: ["Environment", "State: capped queue length per lane", "Action: lane choice", "Reward: negative total queue length"],
    environment: ["Car", "Motorcycle", "Truck", "Bus", "Manual booths", "ETC lanes", "Poisson arrivals"],
    algorithms: ["Q-Learning", "SARSA"],
    exploration: ["Epsilon-greedy", "Decaying epsilon"],
    features: ["Training logs", "Q-table export", "Learning curves", "Average-wait analysis", "Browser simulation", "Matplotlib visualization"],
    tech: ["Python", "Reinforcement Learning", "Matplotlib", "NumPy"],
    github: "https://github.com/Lingeshkumar24-code/Toll_Plaza_RL",
    demo: null,
  },
  {
    num: "07",
    title: "InterviewIQ AI",
    subtitle: "AI-powered interview preparation platform",
    desc: "An AI-powered interview preparation platform that generates questions, evaluates candidate responses and provides analytics and reports.",
    problem: "Interview prep rarely comes with objective, structured feedback on where a candidate actually stands.",
    approach: "Role-aware question generation paired with scored evaluation across four dimensions, closing with a downloadable report.",
    architecture: ["Login", "Select role", "Resume upload", "AI questions", "Answer", "AI evaluation", "Dashboard", "PDF report", "Career suggestions"],
    evaluation: ["Technical", "Communication", "Problem solving", "Confidence", "Final score"],
    tech: ["React", "Vite", "Tailwind", "Framer Motion", "Recharts", "FastAPI", "SQLAlchemy", "Pydantic", "PostgreSQL", "JWT", "bcrypt", "Groq", "Docker", "Render"],
    github: "https://github.com/Lingeshkumar24-code/interview-ai",
    demo: "https://interview-ai-2-odxg.onrender.com/",
  },
  {
    num: "08",
    title: "AI Interview Coach",
    subtitle: "Local LLM technical interview simulator",
    desc: "A technical interview simulator using an open-source local LLM to generate role-specific interview sessions and evaluate candidate responses.",
    problem: "Practicing technical interviews with a cloud LLM means recurring cost and no control over the model.",
    approach: "A locally hosted Qwen3 8B model via Ollama runs the full session — question generation, evaluation and reporting — with no external API calls.",
    architecture: ["Role selection", "Experience level", "Difficulty selection", "5 role-specific questions", "Candidate answers", "AI evaluation", "Readiness report"],
    core: ["Qwen3 8B", "Ollama"],
    features: ["Role selection", "Experience level", "Difficulty selection", "Exactly 5 role-specific questions", "Candidate answers", "AI evaluation", "Readiness report", "Skill radar chart", "Session analytics", "Resume upload", "Resume personalization"],
    evaluation: ["Technical accuracy", "Depth of knowledge", "Communication clarity", "Problem solving"],
    tech: ["React", "Vite", "Tailwind", "Framer Motion", "React Router", "Recharts", "Axios", "FastAPI", "Python", "SQLAlchemy", "Alembic", "PostgreSQL", "Ollama", "Qwen3 8B", "Docker"],
    github: "https://github.com/Lingeshkumar24-code/ai-interview-coach",
    demo: null,
  },
  {
    num: "09",
    title: "AI Interview Assistant",
    subtitle: "Resume-based mock interview generator (earlier project)",
    desc: "A Flask-based application that parses PDF resumes and generates role-specific technical and HR interview questions, with an interactive mock-interview experience.",
    problem: "An earlier exploration of the same problem InterviewIQ and AI Interview Coach later tackled more fully — kept here as a separate, earlier build rather than merged into either.",
    approach: "Resume parsing feeds directly into question generation, producing a lightweight end-to-end mock-interview flow.",
    architecture: ["PDF resume parsing", "Role-specific question generation", "Mock interview", "Response evaluation"],
    features: ["PDF resume parsing", "Role-specific questions", "Technical questions", "HR questions", "Interactive mock interview", "Candidate response evaluation"],
    tech: ["Python", "Flask", "LLMs"],
    github: "https://github.com/Lingeshkumar24-code/-Interview-AI--based-on-Resume",
    demo: null,
  },
];

/* ---------------------------------------------------------------------- */
/* SKILLS                                                                   */
/* ---------------------------------------------------------------------- */

const SKILL_CATEGORIES = [
  { title: "Languages", items: ["Python", "Java", "JavaScript", "SQL", "HTML5", "CSS3"] },
  { title: "AI / ML", items: ["Generative AI", "LLMs", "LangGraph", "RAG", "ChromaDB", "NLP", "Speech Processing", "XGBoost", "Scikit-learn"] },
  { title: "Frameworks / Tools", items: ["FastAPI", "Flask", "React", "Git", "GitHub", "Docker", "REST APIs", "Jupyter Notebook"] },
  { title: "Databases", items: ["Firebase Realtime Database", "MySQL", "SQLite"] },
  { title: "From shipped projects", items: ["Ollama", "OpenRouter", "Groq", "Playwright", "WebRTC", "Three.js", "GSAP", "Tailwind CSS"] },
];

const SKILL_CONSTELLATION = [
  { tag: "AI", related: "LEO 2.0, F1 AI Race Engineer, BhashaVoice AI" },
  { tag: "LLM", related: "LEO 2.0, VeriDoc AI, InterviewIQ AI" },
  { tag: "RAG", related: "F1 AI Race Engineer, LEO 2.0" },
  { tag: "AGENTS", related: "LEO 2.0 multi-agent architecture" },
  { tag: "NLP", related: "VeriDoc AI, BhashaVoice AI" },
  { tag: "ML", related: "F1 AI Race Engineer, Toll Plaza RL" },
  { tag: "RL", related: "Toll Plaza RL" },
  { tag: "FULL STACK", related: "InterviewIQ AI, AI Health Navigator" },
  { tag: "VOICE", related: "LEO 2.0, BhashaVoice AI" },
  { tag: "AUTOMATION", related: "LEO 2.0 computer control & browser automation" },
];

/* ---------------------------------------------------------------------- */
/* CERTIFICATIONS                                                           */
/* ---------------------------------------------------------------------- */

const CERTIFICATIONS = [
  { issuer: "DeepLearning.AI", title: "Generative AI for Everyone" },
  { issuer: "DeepLearning.AI", title: "Neural Networks" },
  { issuer: "DeepLearning.AI", title: "NLP with Classification and Vector Spaces" },
  { issuer: "University of Alberta", title: "Fundamentals of Reinforcement Learning" },
  { issuer: "IBM", title: "Data Analysis with Python" },
  { issuer: "University of Pennsylvania", title: "Data Analysis Using Python" },
  { issuer: "DeepLearning.AI", title: "Applied Statistics for Data Analytics" },
  { issuer: "EDUCBA", title: "Machine Learning with Python & Statistics" },
  { issuer: "Meta", title: "Intro to Front-End Development & Databases" },
  { issuer: "IBM", title: "Java Programming for Beginners" },
  { issuer: "Packt", title: "Advanced Data Structures & Algorithms" },
  { issuer: "Microsoft", title: "User Interface Design and Prototyping" },
];

/* ---------------------------------------------------------------------- */
/* GITHUB                                                                   */
/* ---------------------------------------------------------------------- */

const GITHUB_REPOS = [
  { name: "Leo2.o", url: "https://github.com/Lingeshkumar24-code/Leo2.o" },
  { name: "F1-AI-Race", url: "https://github.com/Lingeshkumar24-code/F1-AI-Race" },
  { name: "veridoc", url: "https://github.com/Lingeshkumar24-code/veridoc" },
  { name: "Bhasha_Ai", url: "https://github.com/Lingeshkumar24-code/Bhasha_Ai" },
  { name: "AI-Health-Appointment-Navigator", url: "https://github.com/Lingeshkumar24-code/AI-Health-Appointment-Navigator" },
  { name: "calories-track", url: "https://github.com/Lingeshkumar24-code/calories-track" },
  { name: "Toll_Plaza_RL", url: "https://github.com/Lingeshkumar24-code/Toll_Plaza_RL" },
  { name: "interview-ai", url: "https://github.com/Lingeshkumar24-code/interview-ai" },
  { name: "ai-interview-coach", url: "https://github.com/Lingeshkumar24-code/ai-interview-coach" },
  { name: "-Interview-AI--based-on-Resume", url: "https://github.com/Lingeshkumar24-code/-Interview-AI--based-on-Resume" },
];
