// Development Economics (0388 21 DS 2201)
// Main Application Controller & Reactive UI Router

const App = {
  state: {
    currentView: 'syllabus', // 'syllabus', 'chapter', 'questions', 'handnotes', 'videos', 'calculators', 'model-tests', 'progress'
    activeChapterId: 'ch-1',
    activeQuestionFilter: 'all', // 'all', '2', '5', '10'
    activeDifficultyFilter: 'all', // 'all', 'Easy', 'Medium', 'Hard'
    searchQuery: '',
    darkMode: false,
    activeModelTest: null,
    testTimerInterval: null,
    testTimeRemaining: 0,
    testIsRunning: false
  },

  // PROGRESS TRACKING VIA LOCALSTORAGE
  progress: {
    topicsRead: {},
    handnotesReviewed: {},
    videosWatched: {},
    questionsPracticed: {}
  },

  init: function() {
    this.loadProgress();
    this.initTheme();
    this.bindEvents();
    this.renderSidebar();
    this.navigate('syllabus');
  },

  loadProgress: function() {
    try {
      const saved = localStorage.getItem('dev_econ_progress_0388');
      if (saved) {
        this.progress = JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load progress from localStorage", e);
    }
  },

  saveProgress: function() {
    try {
      localStorage.setItem('dev_econ_progress_0388', JSON.stringify(this.progress));
      this.updateProgressBadge();
    } catch (e) {
      console.warn("Could not save progress to localStorage", e);
    }
  },

  initTheme: function() {
    const isDark = localStorage.getItem('dev_econ_dark_mode') === 'true';
    this.state.darkMode = isDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  toggleTheme: function() {
    this.state.darkMode = !this.state.darkMode;
    localStorage.setItem('dev_econ_dark_mode', this.state.darkMode);
    if (this.state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const themeIcon = document.getElementById('theme-toggle-icon');
    if (themeIcon) {
      themeIcon.innerHTML = this.state.darkMode ? '☀️' : '🌙';
    }
  },

  bindEvents: function() {
    // Global search input
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value.toLowerCase().trim();
        if (this.state.searchQuery.length > 2) {
          this.renderSearchResults();
        } else if (this.state.searchQuery.length === 0) {
          this.navigate(this.state.currentView);
        }
      });
    }

    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }
  },

  navigate: function(view, params = {}) {
    this.state.currentView = view;
    if (params.chapterId) {
      this.state.activeChapterId = params.chapterId;
    }

    // Update active nav highlights
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('bg-blue-800', 'text-white', 'font-semibold'));
    const activeNav = document.getElementById(`nav-${view}`);
    if (activeNav) {
      activeNav.classList.add('bg-blue-800', 'text-white', 'font-semibold');
    }

    const container = document.getElementById('main-content');
    if (!container) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (view) {
      case 'syllabus':
        this.renderSyllabus(container);
        break;
      case 'chapter':
        this.renderChapterReader(container, this.state.activeChapterId);
        break;
      case 'questions':
        this.renderQuestionBank(container);
        break;
      case 'handnotes':
        this.renderHandnotes(container);
        break;
      case 'videos':
        this.renderVideos(container);
        break;
      case 'calculators':
        this.renderCalculators(container);
        break;
      case 'model-tests':
        this.renderModelTests(container);
        break;
      case 'progress':
        this.renderProgressDashboard(container);
        break;
      default:
        this.renderSyllabus(container);
    }

    this.updateProgressBadge();
  },

  // SIDEBAR CHAPTER LIST RENDERING
  renderSidebar: function() {
    const listEl = document.getElementById('sidebar-chapters-list');
    if (!listEl) return;

    let html = `
      <div class="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Section A (Chapters 1-4)</div>
    `;

    CHAPTERS_DATA.slice(0, 4).forEach(ch => {
      const isDone = this.isChapterCompleted(ch.id);
      html += `
        <button onclick="App.navigate('chapter', { chapterId: '${ch.id}' })" 
          class="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between hover:bg-slate-800 transition ${this.state.activeChapterId === ch.id && this.state.currentView === 'chapter' ? 'bg-slate-800 text-blue-400 font-medium' : 'text-slate-300'}">
          <span class="truncate"><span class="font-mono text-xs text-blue-400 mr-1.5">Ch ${ch.number}</span> ${ch.title}</span>
          ${isDone ? '<span class="text-emerald-400 text-xs">✓</span>' : ''}
        </button>
      `;
    });

    html += `
      <div class="px-3 pt-4 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Section B (Chapters 5-8)</div>
    `;

    CHAPTERS_DATA.slice(4).forEach(ch => {
      const isDone = this.isChapterCompleted(ch.id);
      html += `
        <button onclick="App.navigate('chapter', { chapterId: '${ch.id}' })" 
          class="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between hover:bg-slate-800 transition ${this.state.activeChapterId === ch.id && this.state.currentView === 'chapter' ? 'bg-slate-800 text-blue-400 font-medium' : 'text-slate-300'}">
          <span class="truncate"><span class="font-mono text-xs text-teal-400 mr-1.5">Ch ${ch.number}</span> ${ch.title}</span>
          ${isDone ? '<span class="text-emerald-400 text-xs">✓</span>' : ''}
        </button>
      `;
    });

    listEl.innerHTML = html;
  },

  // 1. SYLLABUS VIEW
  renderSyllabus: function(container) {
    const totalTopics = CHAPTERS_DATA.reduce((acc, c) => acc + c.topics.length, 0);
    const overallPct = this.calculateOverallProgress();

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn">
        <!-- Hero Header -->
        <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-8 shadow-xl border border-blue-700/40 relative overflow-hidden">
          <div class="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 font-mono text-9xl select-none font-extrabold">DS2201</div>
          <div class="relative z-10 max-w-3xl space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
              <span>🎓 Department of Development Studies</span>
              <span>•</span>
              <span>${COURSE_META.term}</span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">${COURSE_META.title}</h1>
            <p class="text-blue-200 text-base leading-relaxed">
              Course Code: <span class="font-mono font-bold text-white">${COURSE_META.code}</span> | 
              Status: <span class="text-white">${COURSE_META.status}</span> | 
              Credit: <span class="text-white">${COURSE_META.credit}</span>
            </p>
            <div class="pt-2 flex flex-wrap gap-3">
              <button onclick="App.navigate('chapter', { chapterId: 'ch-1' })" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow transition flex items-center gap-2 text-sm">
                <span>📖 Start Reading Chapters</span>
              </button>
              <button onclick="App.navigate('questions')" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-blue-200 font-semibold rounded-lg border border-slate-700 transition flex items-center gap-2 text-sm">
                <span>📝 Exam Question Bank (2, 5, 10 Marks)</span>
              </button>
              <button onclick="App.navigate('model-tests')" class="px-5 py-2.5 bg-teal-700 hover:bg-teal-600 text-white font-semibold rounded-lg shadow transition flex items-center gap-2 text-sm">
                <span>⏱️ Timed Model Tests</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Progress Overview Bar -->
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-4 w-full sm:w-auto">
            <div class="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg font-mono">
              ${overallPct}%
            </div>
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white">Curriculum Completion Progress</h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">${Object.keys(this.progress.topicsRead).length} of ${totalTopics} topics mastered across 8 chapters</p>
            </div>
          </div>
          <div class="flex gap-2 w-full sm:w-auto justify-end">
            <button onclick="App.navigate('progress')" class="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition">
              View Detailed Analytics →
            </button>
          </div>
        </div>

        <!-- Course Rationale & CLOs -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🎯</span> Course Rationale
            </h2>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              ${COURSE_META.rationale}
            </p>
            <div class="border-t border-slate-100 dark:border-slate-700 pt-4">
              <h3 class="font-semibold text-slate-900 dark:text-white mb-3">Course Learning Outcomes (CLOs)</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${COURSE_META.clos.map(clo => `
                  <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200/80 dark:border-slate-600/50">
                    <span class="inline-block px-2 py-0.5 text-xs font-bold font-mono bg-blue-600 text-white rounded mb-1">${clo.id}</span>
                    <p class="text-xs text-slate-600 dark:text-slate-300">${clo.description}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Exam Structure and Marking Guide -->
          <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📋</span> Exam Question Standards
            </h2>
            <div class="space-y-3 text-sm">
              <div class="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <div class="font-bold text-emerald-800 dark:text-emerald-400">Easy Pattern: 2 Marks</div>
                <div class="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                  1 A4 page equivalent. Conceptual precision, exact mathematical formulas, and Sen/Goulet definitions.
                </div>
              </div>

              <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <div class="font-bold text-blue-800 dark:text-blue-400">Medium Pattern: 5 Marks</div>
                <div class="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  3-4 A4 pages equivalent. Detailed comparative matrices, policy trade-offs, and empirical Bangladesh applications (RMG, district profiles).
                </div>
              </div>

              <div class="p-3 rounded-lg bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800">
                <div class="font-bold text-pink-800 dark:text-pink-400">Hard Pattern: 10 Marks</div>
                <div class="text-xs text-pink-700 dark:text-pink-300 mt-1">
                  Multi-part university class tests (Khulna poverty survey, district income Gini, rural extractive market institutions) with mathematical derivations!
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Two Sections: 8 Chapters Breakdown -->
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Curriculum Chapters Structure</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Section A -->
            <div class="space-y-4">
              <div class="flex items-center justify-between pb-2 border-b border-blue-200 dark:border-blue-800">
                <h3 class="text-lg font-bold text-blue-900 dark:text-blue-300">SECTION A: Theoretical Foundations & Measurement</h3>
                <span class="text-xs font-mono px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">Chapters 1 - 4</span>
              </div>
              <div class="space-y-3">
                ${CHAPTERS_DATA.slice(0, 4).map(ch => this.renderChapterCard(ch)).join('')}
              </div>
            </div>

            <!-- Section B -->
            <div class="space-y-4">
              <div class="flex items-center justify-between pb-2 border-b border-teal-200 dark:border-teal-800">
                <h3 class="text-lg font-bold text-teal-900 dark:text-teal-300">SECTION B: Structural Dynamics, Poverty & Institutions</h3>
                <span class="text-xs font-mono px-2 py-0.5 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded">Chapters 5 - 8</span>
              </div>
              <div class="space-y-3">
                ${CHAPTERS_DATA.slice(4).map(ch => this.renderChapterCard(ch)).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderChapterCard: function(ch) {
    const readCount = ch.topics.filter(t => this.progress.topicsRead[t.id]).length;
    const isDone = readCount === ch.topics.length;
    return `
      <div class="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded ${ch.number <= 4 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300' : 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300'}">Chapter ${ch.number}</span>
              <span class="text-xs font-mono text-slate-500">${ch.clo}</span>
            </div>
            <h4 class="font-bold text-slate-900 dark:text-white text-base">${ch.title}</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${ch.subtitle}</p>
          </div>
          ${isDone ? '<span class="px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold rounded-full">Completed</span>' : ''}
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
          <span class="text-slate-500 dark:text-slate-400">${readCount}/${ch.topics.length} topics read</span>
          <div class="flex gap-2">
            <button onclick="App.navigate('chapter', { chapterId: '${ch.id}' })" class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Read Chapter →
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // 2. CHAPTER TEXTBOOK READER VIEW
  renderChapterReader: function(container, chapterId) {
    const ch = CHAPTERS_DATA.find(c => c.id === chapterId) || CHAPTERS_DATA[0];
    this.state.activeChapterId = ch.id;
    this.renderSidebar(); // refresh active highlight

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <!-- Breadcrumb & Chapter Navigation -->
        <div class="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <button onclick="App.navigate('syllabus')" class="hover:text-blue-600">Course</button>
            <span>/</span>
            <span>${ch.section}</span>
            <span>/</span>
            <span class="font-semibold text-slate-900 dark:text-white">Chapter ${ch.number}</span>
          </div>

          <div class="flex items-center gap-2">
            <select onchange="App.navigate('chapter', { chapterId: this.value })" class="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              ${CHAPTERS_DATA.map(c => `<option value="${c.id}" ${c.id === ch.id ? 'selected' : ''}>Ch ${c.number}: ${c.title}</option>`).join('')}
            </select>
            <button onclick="window.print()" class="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg flex items-center gap-1.5">
              <span>🖨️</span> Print Chapter
            </button>
          </div>
        </div>

        <!-- Chapter Title Banner -->
        <div class="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">Chapter ${ch.number} • ${ch.section}</span>
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">${ch.clo}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">${ch.title}</h1>
          <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300">${ch.subtitle}</p>
          <p class="text-xs sm:text-sm text-slate-500 italic pt-2 border-t border-slate-100 dark:border-slate-700">${ch.overview}</p>
        </div>

        <!-- Quick Jump Subtopics Tabs -->
        <div class="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-700">
          ${ch.topics.map((t, idx) => `
            <a href="#${t.id}" class="whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700">
              § ${idx + 1}. ${t.name}
            </a>
          `).join('')}
          <a href="#ch-handnotes-section" class="whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 hover:bg-amber-100">
            ⚡ Quick Handnotes
          </a>
          <a href="#ch-videos-section" class="whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300 hover:bg-red-100">
            🎥 Curated Videos (${ch.videos.length})
          </a>
        </div>

        <!-- Topics Content: Deep Textbook Style -->
        <div class="space-y-8">
          ${ch.topics.map((topic, idx) => {
            const isRead = !!this.progress.topicsRead[topic.id];
            return `
              <div id="${topic.id}" class="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="text-blue-600 font-mono text-base">${idx + 1}.</span> ${topic.name}
                  </h3>
                  <label class="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer select-none">
                    <input type="checkbox" onchange="App.toggleTopicRead('${topic.id}', this.checked)" ${isRead ? 'checked' : ''} class="w-4 h-4 text-blue-600 rounded">
                    <span>${isRead ? 'Completed' : 'Mark as Read'}</span>
                  </label>
                </div>

                <div class="book-prose">
                  ${this.formatMarkdownText(topic.content)}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Handnotes Section Inside Chapter -->
        <div id="ch-handnotes-section" class="bg-amber-50/60 dark:bg-amber-950/20 rounded-2xl p-6 sm:p-8 border border-amber-200 dark:border-amber-800/60 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <span>⚡</span> High-Yield Handnotes & Revision Summary (Chapter ${ch.number})
            </h3>
            <span class="text-xs font-mono text-amber-700 dark:text-amber-400">Exam Revision Sheet</span>
          </div>
          <ul class="space-y-2.5 text-sm text-slate-800 dark:text-slate-200">
            ${ch.handnotes.map(note => `
              <li class="flex items-start gap-2.5">
                <span class="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span>${note}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Curated Videos for Chapter -->
        <div id="ch-videos-section" class="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🎥</span> Curated Video Lectures for Chapter ${ch.number}
            </h3>
            <span class="text-xs text-slate-500">${ch.videos.length} Lectures Available</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${ch.videos.map(v => `
              <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 space-y-3">
                <div class="flex items-start justify-between gap-2">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">${v.title}</h4>
                  <span class="text-xs font-mono px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">${v.duration}</span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400">${v.description}</p>
                <div class="text-xs text-slate-500 font-medium">Channel: ${v.channel}</div>
                <div class="pt-2 flex items-center justify-between">
                  <a href="https://www.youtube.com/watch?v=${v.youtubeId}" target="_blank" rel="noopener noreferrer" 
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold shadow-sm transition">
                    <span>▶ Watch on YouTube</span>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recommended Academic Books & Readings -->
        <div class="bg-slate-100 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-2">
          <h4 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <span>📚</span> Recommended Academic Readings for Chapter ${ch.number}
          </h4>
          <ul class="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
            ${ch.readings.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>

        <!-- Next / Previous Chapter Navigation -->
        <div class="flex items-center justify-between pt-4">
          ${ch.number > 1 ? `
            <button onclick="App.navigate('chapter', { chapterId: 'ch-${ch.number - 1}' })" class="px-4 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold text-slate-800 dark:text-slate-200">
              ← Previous: Chapter ${ch.number - 1}
            </button>
          ` : '<div></div>'}

          ${ch.number < 8 ? `
            <button onclick="App.navigate('chapter', { chapterId: 'ch-${ch.number + 1}' })" class="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-white shadow">
              Next: Chapter ${ch.number + 1} →
            </button>
          ` : `
            <button onclick="App.navigate('questions')" class="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-white shadow">
              Practice Exam Questions →
            </button>
          `}
        </div>
      </div>
    `;
  },

  // 3. EXAM QUESTION BANK (2, 5, 10 MARKS WITH A4 SIMULATION)
  renderQuestionBank: function(container) {
    const allQuestions = [...QUESTIONS_DATA, ...EXTENDED_PRACTICE_QUESTIONS];

    let filtered = allQuestions;
    if (this.state.activeQuestionFilter !== 'all') {
      const marksNum = parseInt(this.state.activeQuestionFilter);
      filtered = filtered.filter(q => q.marks === marksNum);
    }
    if (this.state.activeDifficultyFilter !== 'all') {
      filtered = filtered.filter(q => q.difficulty === this.state.activeDifficultyFilter);
    }

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <!-- Header -->
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div class="flex items-center justify-between flex-wrap gap-3">
            <div>
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-300">University Exam Question Bank</span>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Critical Analytical Questions & Model Answers</h1>
            </div>
            <div class="text-xs text-slate-500">
              Includes actual test questions (Khulna survey, RMG growth, rural institutions)
            </div>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Every question features comprehensive, high-scoring benchmark answers: 
            <span class="font-semibold text-emerald-700 dark:text-emerald-400">2 Marks (1 A4 page equivalent)</span>, 
            <span class="font-semibold text-blue-700 dark:text-blue-400">5 Marks (3-4 A4 pages equivalent)</span>, and 
            <span class="font-semibold text-pink-700 dark:text-pink-400">10 Marks Multi-part exam questions with step-by-step math</span>.
          </p>

          <!-- Filter Controls -->
          <div class="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <span class="text-xs font-bold text-slate-500">Filter Marks:</span>
            <div class="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-1 bg-slate-50 dark:bg-slate-900 text-xs">
              <button onclick="App.setQuestionFilter('all')" class="px-3 py-1 rounded-md ${this.state.activeQuestionFilter === 'all' ? 'bg-white dark:bg-slate-800 shadow font-bold text-blue-600' : 'text-slate-600 dark:text-slate-400'}">All Marks</button>
              <button onclick="App.setQuestionFilter('2')" class="px-3 py-1 rounded-md ${this.state.activeQuestionFilter === '2' ? 'bg-white dark:bg-slate-800 shadow font-bold text-emerald-600' : 'text-slate-600 dark:text-slate-400'}">2 Marks (Easy)</button>
              <button onclick="App.setQuestionFilter('5')" class="px-3 py-1 rounded-md ${this.state.activeQuestionFilter === '5' ? 'bg-white dark:bg-slate-800 shadow font-bold text-blue-600' : 'text-slate-600 dark:text-slate-400'}">5 Marks (Medium)</button>
              <button onclick="App.setQuestionFilter('10')" class="px-3 py-1 rounded-md ${this.state.activeQuestionFilter === '10' ? 'bg-white dark:bg-slate-800 shadow font-bold text-pink-600' : 'text-slate-600 dark:text-slate-400'}">10 Marks (Hard)</button>
            </div>

            <span class="text-xs font-bold text-slate-500 ml-auto">Showing ${filtered.length} questions</span>
          </div>
        </div>

        <!-- Question Cards List -->
        <div class="space-y-8">
          ${filtered.map(q => this.renderQuestionCard(q)).join('')}
        </div>
      </div>
    `;
  },

  setQuestionFilter: function(marks) {
    this.state.activeQuestionFilter = marks;
    const container = document.getElementById('main-content');
    if (container) this.renderQuestionBank(container);
  },

  renderQuestionCard: function(q) {
    const isPracticed = !!this.progress.questionsPracticed[q.id];
    let badgeClass = 'badge-2marks';
    if (q.marks === 5) badgeClass = 'badge-5marks';
    if (q.marks === 10) badgeClass = 'badge-10marks';

    return `
      <div id="${q.id}" class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <!-- Question Header Bar -->
        <div class="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 space-y-3">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeClass}">
                ${q.marks} Marks • ${q.difficulty}
              </span>
              <span class="text-xs font-mono text-slate-500 dark:text-slate-400">${q.chapterTitle}</span>
              ${q.learningObjective ? `<span class="text-xs font-mono px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300">${q.learningObjective}</span>` : ''}
            </div>
            
            <div class="flex items-center gap-3">
              <span class="text-xs font-mono text-slate-400">${q.pageLengthEquivalent || ''}</span>
              <label class="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" onchange="App.toggleQuestionPracticed('${q.id}', this.checked)" ${isPracticed ? 'checked' : ''} class="w-4 h-4 text-emerald-600 rounded">
                <span>${isPracticed ? 'Mastered' : 'Mark Practiced'}</span>
              </label>
            </div>
          </div>

          <h3 class="text-lg font-bold text-slate-900 dark:text-white leading-snug whitespace-pre-line">
            ${q.question}
          </h3>
        </div>

        <!-- Rubric & Action Bar -->
        <div class="px-6 py-3 bg-slate-100/60 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between flex-wrap gap-3">
          <div class="text-xs text-slate-600 dark:text-slate-400">
            ${q.rubric ? `<span class="font-semibold text-slate-800 dark:text-slate-200">Scoring Rubric: </span>` + Object.entries(q.rubric).map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1')}: ${v}`).join(' | ') : ''}
          </div>
          <div class="flex gap-2">
            <button onclick="App.toggleAnswer('${q.id}')" id="btn-toggle-${q.id}" class="px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition">
              Reveal Benchmark Model Answer
            </button>
            <button onclick="App.printSingleAnswer('${q.id}')" class="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">
              🖨️ Print A4 Answer
            </button>
          </div>
        </div>

        <!-- Collapsible Model Answer (A4 Simulation) -->
        <div id="answer-${q.id}" class="hidden p-6 sm:p-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <div class="a4-simulation relative">
            <div class="a4-page-indicator">A4 Exam Format Solution</div>
            <div class="book-prose">
              ${this.formatMarkdownText(q.modelAnswer)}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  toggleAnswer: function(qId) {
    const el = document.getElementById(`answer-${qId}`);
    const btn = document.getElementById(`btn-toggle-${qId}`);
    if (!el || !btn) return;

    if (el.classList.contains('hidden')) {
      el.classList.remove('hidden');
      btn.innerText = 'Hide Model Answer';
      btn.classList.replace('bg-blue-600', 'bg-slate-700');
    } else {
      el.classList.add('hidden');
      btn.innerText = 'Reveal Benchmark Model Answer';
      btn.classList.replace('bg-slate-700', 'bg-blue-600');
    }
  },

  printSingleAnswer: function(qId) {
    const answerEl = document.getElementById(`answer-${qId}`);
    if (answerEl && answerEl.classList.contains('hidden')) {
      this.toggleAnswer(qId);
    }
    window.print();
  },

  // 4. HANDNOTES & FORMULA SHEET VIEW
  renderHandnotes: function(container) {
    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <div class="bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-amber-700/40 space-y-2">
          <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">High-Yield Revision Vault</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold">Complete Course Handnotes & Formula Cheat-Sheet</h1>
          <p class="text-amber-200 text-sm">Concise, bulleted key takeaways, core equations, and theoretical definitions across all 8 chapters.</p>
          <div class="pt-2">
            <button onclick="window.print()" class="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg text-xs flex items-center gap-2">
              <span>🖨️</span> Print Full Handnotes Pack (A4 PDF)
            </button>
          </div>
        </div>

        <!-- Formula Quick Reference Box -->
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>📐</span> Core Mathematical Formulas Reference
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <div class="font-bold text-blue-600 dark:text-blue-400">Harrod-Domar Growth Equation:</div>
              <div class="text-slate-800 dark:text-slate-200 font-bold text-sm">g = s / c = s / ICOR</div>
              <div class="text-slate-500 text-[11px]">g: Growth Rate, s: Savings Rate, c: ICOR (ΔK / ΔY)</div>
            </div>

            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <div class="font-bold text-teal-600 dark:text-teal-400">Foster-Greer-Thorbecke (FGT) Poverty Index:</div>
              <div class="text-slate-800 dark:text-slate-200 font-bold text-sm">P_α = (1/N) * Σ [(z - y_i) / z]^α</div>
              <div class="text-slate-500 text-[11px]">α=0 (Headcount H), α=1 (Poverty Gap PG), α=2 (Severity P2)</div>
            </div>

            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <div class="font-bold text-purple-600 dark:text-purple-400">Human Development Index (Geometric Mean):</div>
              <div class="text-slate-800 dark:text-slate-200 font-bold text-sm">HDI = (I_Health * I_Education * I_Income)^(1/3)</div>
              <div class="text-slate-500 text-[11px]">Penalizes imbalanced development across dimensions</div>
            </div>

            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <div class="font-bold text-pink-600 dark:text-pink-400">Gini Coefficient (Lorenz Curve Geometry):</div>
              <div class="text-slate-800 dark:text-slate-200 font-bold text-sm">G = Area A / (Area A + Area B) = 2A = 1 - 2B</div>
              <div class="text-slate-500 text-[11px]">0 = Perfect Equality, 1 = Absolute Inequality</div>
            </div>
          </div>
        </div>

        <!-- Chapter by Chapter Handnotes -->
        <div class="space-y-6">
          ${CHAPTERS_DATA.map(ch => `
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Ch ${ch.number}</span>
                  ${ch.title}
                </h3>
                <span class="text-xs text-slate-500">${ch.section}</span>
              </div>
              <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                ${ch.handnotes.map(note => `
                  <li class="flex items-start gap-2.5">
                    <span class="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
                    <span>${note}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 5. CURATED VIDEO HUB VIEW
  renderVideos: function(container) {
    const allVideos = [];
    CHAPTERS_DATA.forEach(ch => {
      ch.videos.forEach(v => {
        allVideos.push({
          ...v,
          chapterNumber: ch.number,
          chapterTitle: ch.title
        });
      });
    });

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300">Curated Video Lecture Hub</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Topic-by-Topic YouTube Video Classes</h1>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            High-yield educational lectures from leading institutions (MIT OpenCourseWare, Marginal Revolution University, Khan Academy, World Bank Institute, and EconplusDal).
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${allVideos.map(v => `
            <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between">
              <div class="p-5 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">Ch ${v.chapterNumber}</span>
                  <span class="text-xs font-mono px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">${v.duration}</span>
                </div>
                <h3 class="font-bold text-slate-900 dark:text-white text-base">${v.title}</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">${v.description}</p>
                <div class="text-xs text-slate-500 font-medium">Channel: ${v.channel}</div>
              </div>

              <div class="p-5 pt-0">
                <a href="https://www.youtube.com/watch?v=${v.youtubeId}" target="_blank" rel="noopener noreferrer" 
                  class="w-full text-center py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg text-xs shadow-sm transition block">
                  Watch on YouTube ↗
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // 6. INTERACTIVE CALCULATORS & EMPIRICAL LAB VIEW
  renderCalculators: function(container) {
    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300">Interactive Economics Lab</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Empirical Calculators & Model Visualizers</h1>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Interactive mathematical tools designed specifically for your exam calculations: Foster-Greer-Thorbecke (FGT) Poverty, Lorenz Curve & Gini Coefficient, Harrod-Domar Growth, and HDI.
          </p>
        </div>

        <!-- TOOL 1: FGT POVERTY CALCULATOR (WITH KHULNA PRESET) -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <div>
              <span class="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">Tool 1: Chapter 6 • Exam Question Preset</span>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Foster-Greer-Thorbecke (FGT) Poverty Index Calculator</h2>
            </div>
            <button onclick="App.runKhulnaPreset()" class="px-3 py-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white rounded-lg shadow-sm">
              Load Khulna Class Test Preset
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Household Incomes (Comma separated, in BDT)</label>
                <input id="fgt-incomes" type="text" value="4000, 5000, 5800, 7500, 10000" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono">
                <span class="text-[11px] text-slate-500">Khulna Exam Survey: Tk 4,000, 5,000, 5,800, 7,500, 10,000</span>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Monthly Poverty Line ($z$ in BDT)</label>
                <input id="fgt-poverty-line" type="number" value="6000" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono">
              </div>

              <button onclick="App.executeFGTCalculation()" class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-sm shadow">
                Calculate Poverty Indices (H, PG, P2)
              </button>
            </div>

            <!-- FGT Results Display -->
            <div id="fgt-results-box" class="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3 font-mono text-xs">
              <div class="text-slate-500 font-sans text-xs italic">Click 'Calculate' or 'Load Khulna Class Test Preset' to view mathematical breakdown.</div>
            </div>
          </div>
        </div>

        <!-- TOOL 2: GINI COEFFICIENT & LORENZ CURVE VISUALIZER -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div class="pb-3 border-b border-slate-100 dark:border-slate-700">
            <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">Tool 2: Chapter 7 • Inequality</span>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Lorenz Curve & Gini Coefficient Simulator</h2>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div class="space-y-4">
              <p class="text-xs text-slate-600 dark:text-slate-400">
                Adjust the income shares (%) captured by each quintile (Q1: Poorest 20% to Q5: Richest 20%). The total will automatically normalize to 100%.
              </p>
              
              <div class="grid grid-cols-5 gap-2 text-center text-xs">
                <div>
                  <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">Q1 (Poorest)</label>
                  <input id="gini-q1" type="number" value="4.5" step="0.5" class="w-full p-2 border rounded font-mono text-center bg-slate-50 dark:bg-slate-900">
                </div>
                <div>
                  <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">Q2</label>
                  <input id="gini-q2" type="number" value="9.0" step="0.5" class="w-full p-2 border rounded font-mono text-center bg-slate-50 dark:bg-slate-900">
                </div>
                <div>
                  <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">Q3</label>
                  <input id="gini-q3" type="number" value="14.5" step="0.5" class="w-full p-2 border rounded font-mono text-center bg-slate-50 dark:bg-slate-900">
                </div>
                <div>
                  <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">Q4</label>
                  <input id="gini-q4" type="number" value="22.0" step="0.5" class="w-full p-2 border rounded font-mono text-center bg-slate-50 dark:bg-slate-900">
                </div>
                <div>
                  <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">Q5 (Richest)</label>
                  <input id="gini-q5" type="number" value="50.0" step="0.5" class="w-full p-2 border rounded font-mono text-center bg-slate-50 dark:bg-slate-900">
                </div>
              </div>

              <div class="flex gap-2">
                <button onclick="App.executeGiniCalculation()" class="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-sm shadow">
                  Compute Gini & Plot Lorenz Curve
                </button>
                <button onclick="App.setBangladeshHiesPreset()" class="whitespace-nowrap px-3 py-2 bg-slate-200 dark:bg-slate-700 text-xs font-semibold rounded-lg">
                  Bangladesh HIES Preset
                </button>
              </div>

              <div id="gini-metrics-box" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border font-mono text-xs space-y-1">
                <div>Gini Coefficient: <span id="val-gini" class="font-bold text-blue-600">0.4550</span></div>
                <div>Kuznets Ratio (Q5 / [Q1+Q2]): <span id="val-kuznets" class="font-bold text-purple-600">3.70</span></div>
                <div>Area A: <span id="val-area-a">0.2275</span> | Area B: <span id="val-area-b">0.2725</span></div>
              </div>
            </div>

            <!-- SVG Lorenz Curve Rendering -->
            <div class="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg id="lorenz-svg" viewBox="0 0 300 300" class="w-64 h-64 overflow-visible">
                <!-- Axes -->
                <line x1="30" y1="270" x2="270" y2="270" stroke="#94a3b8" stroke-width="2" />
                <line x1="30" y1="270" x2="30" y2="30" stroke="#94a3b8" stroke-width="2" />
                
                <!-- 45-degree Line of Perfect Equality -->
                <line x1="30" y1="270" x2="270" y2="30" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4,4" />
                
                <!-- Lorenz Curve Path -->
                <path id="lorenz-path" d="M 30,270 Q 150,260 270,30" fill="none" stroke="#e11d48" stroke-width="3" />
                
                <!-- Axis labels -->
                <text x="110" y="295" font-size="10" fill="#64748b" font-family="sans-serif">Cumulative Pop %</text>
                <text x="-180" y="15" font-size="10" fill="#64748b" font-family="sans-serif" transform="rotate(-90)">Cumulative Income %</text>
              </svg>
              <div class="flex gap-4 text-[11px] mt-2 font-mono">
                <span class="flex items-center gap-1 text-blue-600">-- 45° Line of Equality</span>
                <span class="flex items-center gap-1 text-rose-600">― Lorenz Curve</span>
              </div>
            </div>
          </div>
        </div>

        <!-- TOOL 3: HARROD-DOMAR GROWTH & ICOR CALCULATOR -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div class="pb-3 border-b border-slate-100 dark:border-slate-700">
            <span class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">Tool 3: Chapter 3 • Growth Models</span>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Harrod-Domar & Financing Gap Calculator</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">National Savings Rate ($s$ %)</label>
              <input id="hd-s" type="number" value="22.0" step="0.5" class="w-full p-2 border rounded font-mono bg-slate-50 dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">ICOR ($c$)</label>
              <input id="hd-c" type="number" value="3.8" step="0.1" class="w-full p-2 border rounded font-mono bg-slate-50 dark:bg-slate-900">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target GDP Growth Rate (%)</label>
              <input id="hd-target" type="number" value="7.5" step="0.5" class="w-full p-2 border rounded font-mono bg-slate-50 dark:bg-slate-900">
            </div>
          </div>

          <button onclick="App.executeHDCalculation()" class="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs shadow">
            Compute Growth & Foreign Aid Gap
          </button>

          <div id="hd-results-box" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border font-mono text-xs space-y-1">
            <div>Actual Attainable Growth Rate: <span id="hd-actual-g" class="font-bold text-purple-600">5.79%</span></div>
            <div>Required Investment for Target: <span id="hd-req-s" class="font-bold">28.50% of GDP</span></div>
            <div>Financing Gap to be financed by FDI / Foreign Aid: <span id="hd-gap" class="font-bold text-rose-600">6.50% of GDP</span></div>
          </div>
        </div>
      </div>
    `;

    // Initialize with presets
    setTimeout(() => {
      this.executeFGTCalculation();
      this.executeGiniCalculation();
    }, 50);
  },

  runKhulnaPreset: function() {
    const incomesEl = document.getElementById('fgt-incomes');
    const plEl = document.getElementById('fgt-poverty-line');
    if (incomesEl) incomesEl.value = "4000, 5000, 5800, 7500, 10000";
    if (plEl) plEl.value = "6000";
    this.executeFGTCalculation();
  },

  executeFGTCalculation: function() {
    const incomesStr = document.getElementById('fgt-incomes')?.value || "4000, 5000, 5800, 7500, 10000";
    const pl = parseFloat(document.getElementById('fgt-poverty-line')?.value || "6000");
    const incomes = incomesStr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

    const res = Calculators.calculateFGT(incomes, pl);
    const box = document.getElementById('fgt-results-box');
    if (!res || !box) return;

    box.innerHTML = `
      <div class="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">Mathematical Results (Khulna Dataset):</div>
      <div class="space-y-1.5 pt-1">
        <div>• Total Population ($N$): <span class="font-bold">${res.N}</span></div>
        <div>• Poor Individuals ($q$): <span class="font-bold text-rose-600">${res.q}</span> (Incomes < Tk ${res.povertyLine})</div>
        <div>• <span class="text-blue-600 font-bold">Headcount Ratio ($H = P_0 = q/N$):</span> <span class="font-bold text-sm text-rose-600">${res.headcountPercent}%</span> (${res.headcountRatio.toFixed(3)})</div>
        <div>• <span class="text-teal-600 font-bold">Poverty Gap Index ($P_1$):</span> <span class="font-bold text-sm text-teal-600">${res.povertyGapPercent}%</span> (${res.povertyGap.toFixed(4)})</div>
        <div>• <span class="text-purple-600 font-bold">Squared Poverty Gap / Severity ($P_2$):</span> <span class="font-bold text-sm text-purple-600">${res.severityP2Percent}%</span> (${res.severityP2.toFixed(4)})</div>
        <div>• Income Gap Ratio ($I$): <span class="font-bold">${res.incomeGapRatio}</span></div>
        <div>• <span class="text-emerald-700 font-bold">Total Minimum Monthly Transfer to Eradicate Poverty:</span> <span class="font-bold text-emerald-600">Tk ${res.totalMonetaryShortfall.toLocaleString()}</span></div>
      </div>
      <div class="mt-3 pt-2 border-t text-[11px] text-slate-500">
        Poor Household Breakdown: ${res.poorHouseholds.map(h => `H${h.index}: Tk ${h.income} (Gap: Tk ${h.shortfall})`).join(', ')}
      </div>
    `;
  },

  executeGiniCalculation: function() {
    const q1 = parseFloat(document.getElementById('gini-q1')?.value || "4.5");
    const q2 = parseFloat(document.getElementById('gini-q2')?.value || "9.0");
    const q3 = parseFloat(document.getElementById('gini-q3')?.value || "14.5");
    const q4 = parseFloat(document.getElementById('gini-q4')?.value || "22.0");
    const q5 = parseFloat(document.getElementById('gini-q5')?.value || "50.0");

    const res = Calculators.calculateGini([q1, q2, q3, q4, q5]);
    if (!res) return;

    document.getElementById('val-gini').innerText = res.gini;
    document.getElementById('val-kuznets').innerText = res.kuznetsRatio;
    document.getElementById('val-area-a').innerText = res.areaA;
    document.getElementById('val-area-b').innerText = res.areaB;

    // Update SVG curve
    // Map cumulative pop (0 to 100) -> SVG x (30 to 270)
    // Map cumulative income (0 to 100) -> SVG y (270 to 30) (inverted y)
    const points = res.cumPop.map((pop, i) => {
      const inc = res.cumInc[i];
      const x = 30 + (pop / 100) * 240;
      const y = 270 - (inc / 100) * 240;
      return `${x},${y}`;
    });

    const d = `M ${points.join(' L ')}`;
    const pathEl = document.getElementById('lorenz-path');
    if (pathEl) {
      pathEl.setAttribute('d', d);
    }
  },

  setBangladeshHiesPreset: function() {
    document.getElementById('gini-q1').value = "4.0";
    document.getElementById('gini-q2').value = "8.2";
    document.getElementById('gini-q3').value = "13.0";
    document.getElementById('gini-q4').value = "21.5";
    document.getElementById('gini-q5').value = "53.3";
    this.executeGiniCalculation();
  },

  executeHDCalculation: function() {
    const s = document.getElementById('hd-s')?.value || "22.0";
    const c = document.getElementById('hd-c')?.value || "3.8";
    const target = document.getElementById('hd-target')?.value || "7.5";

    const res = Calculators.calculateHarrodDomar(s, c, target);
    if (!res) return;

    document.getElementById('hd-actual-g').innerText = `${res.actualGrowthRate}%`;
    document.getElementById('hd-req-s').innerText = `${res.requiredSavings}% of GDP`;
    document.getElementById('hd-gap').innerText = `${res.financingGap}% of GDP`;
  },

  // 7. TIMED MODEL TEST SIMULATOR VIEW
  renderModelTests: function(container) {
    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300">Exam Simulation Hall</span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Timed Model Test Simulator</h1>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Replicate the exact exam conditions of your class tests and final semester exam. Practice drafting your answers against the countdown timer, then reveal benchmark solutions!
          </p>
        </div>

        <!-- Available Tests Selection -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${MODEL_TESTS_DATA.map(test => `
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">${test.durationMinutes} Minutes</span>
                  <span class="text-xs font-mono font-bold text-slate-500">${test.totalMarks} Marks</span>
                </div>
                <h3 class="font-bold text-slate-900 dark:text-white text-base">${test.title}</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400">${test.instructions}</p>
                <div class="text-xs text-slate-500 font-mono">${test.questions.length} Analytical Questions</div>
              </div>

              <button onclick="App.startModelTest('${test.id}')" class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs shadow transition">
                Start Timed Test Now →
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Active Test Exam Interface Container -->
        <div id="active-test-container"></div>
      </div>
    `;
  },

  startModelTest: function(testId) {
    const test = MODEL_TESTS_DATA.find(t => t.id === testId);
    if (!test) return;

    this.state.activeModelTest = test;
    this.state.testTimeRemaining = test.durationMinutes * 60;
    this.state.testIsRunning = true;

    // Start countdown timer
    if (this.state.testTimerInterval) clearInterval(this.state.testTimerInterval);
    this.state.testTimerInterval = setInterval(() => {
      if (this.state.testIsRunning && this.state.testTimeRemaining > 0) {
        this.state.testTimeRemaining--;
        this.updateTestTimerDisplay();
      } else if (this.state.testTimeRemaining <= 0) {
        clearInterval(this.state.testTimerInterval);
        alert("Time is up! Please submit your test to review model answers.");
      }
    }, 1000);

    const testContainer = document.getElementById('active-test-container');
    if (!testContainer) return;

    testContainer.innerHTML = `
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border-2 border-blue-500 shadow-xl space-y-6 mt-6">
        <!-- Live Timer Sticky Bar -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700 flex-wrap gap-4">
          <div>
            <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">IN PROGRESS: ${test.title}</span>
            <div class="text-xs text-slate-500">Total Marks: ${test.totalMarks} | ${test.instructions}</div>
          </div>
          <div class="flex items-center gap-3">
            <div class="px-4 py-2 rounded-xl bg-slate-900 text-white font-mono text-xl font-bold flex items-center gap-2">
              <span>⏱️</span>
              <span id="test-timer-digits">00:00</span>
            </div>
            <button onclick="App.toggleTimerPause()" id="btn-timer-pause" class="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-xs font-bold rounded-lg">
              Pause
            </button>
          </div>
        </div>

        <!-- Questions & Interactive Answer Drafting -->
        <div class="space-y-8">
          ${test.questions.map((q, idx) => `
            <div class="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 space-y-4">
              <div class="flex items-start justify-between gap-3">
                <h4 class="font-bold text-slate-900 dark:text-white text-base">
                  <span class="text-blue-600 font-mono">Question ${q.qNum}:</span> (${q.marks} Marks)
                </h4>
              </div>
              <p class="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">${q.text}</p>
              
              <!-- Draft Area -->
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-slate-500">Draft Your Analytical Answer:</label>
                <textarea rows="5" placeholder="Type your answer, formulas, and arguments here for practice..." class="w-full p-3 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500"></textarea>
              </div>

              <!-- Linked Model Answer Reveal -->
              <div class="pt-2">
                <button onclick="App.revealTestModelAnswer('test-ans-${idx}', '${q.linkedQuestionId}')" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  Reveal University Benchmark Solution →
                </button>
                <div id="test-ans-${idx}" class="hidden mt-4 p-4 rounded-xl bg-white dark:bg-slate-900 border text-xs book-prose"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Submit Test Action -->
        <div class="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <button onclick="App.cancelModelTest()" class="text-xs text-rose-600 font-semibold hover:underline">
            Exit Test
          </button>
          <button onclick="App.submitModelTest()" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm shadow">
            Complete & Submit Test
          </button>
        </div>
      </div>
    `;

    this.updateTestTimerDisplay();
    testContainer.scrollIntoView({ behavior: 'smooth' });
  },

  updateTestTimerDisplay: function() {
    const el = document.getElementById('test-timer-digits');
    if (!el) return;
    const mins = Math.floor(this.state.testTimeRemaining / 60);
    const secs = this.state.testTimeRemaining % 60;
    el.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  toggleTimerPause: function() {
    this.state.testIsRunning = !this.state.testIsRunning;
    const btn = document.getElementById('btn-timer-pause');
    if (btn) btn.innerText = this.state.testIsRunning ? 'Pause' : 'Resume';
  },

  revealTestModelAnswer: function(targetId, linkedQId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    if (!target.classList.contains('hidden')) {
      target.classList.add('hidden');
      return;
    }

    const linkedQ = [...QUESTIONS_DATA, ...EXTENDED_PRACTICE_QUESTIONS].find(q => q.id === linkedQId);
    if (linkedQ) {
      target.innerHTML = this.formatMarkdownText(linkedQ.modelAnswer);
      target.classList.remove('hidden');
    }
  },

  cancelModelTest: function() {
    if (confirm("Are you sure you want to exit the current model test?")) {
      clearInterval(this.state.testTimerInterval);
      const container = document.getElementById('active-test-container');
      if (container) container.innerHTML = '';
    }
  },

  submitModelTest: function() {
    clearInterval(this.state.testTimerInterval);
    alert("Test Submitted! All benchmark answers are now available for review below each question.");
    const buttons = document.querySelectorAll('[onclick^="App.revealTestModelAnswer"]');
    buttons.forEach(btn => btn.click());
  },

  // 8. STUDENT PROGRESS DASHBOARD VIEW
  renderProgressDashboard: function(container) {
    const totalTopics = CHAPTERS_DATA.reduce((acc, c) => acc + c.topics.length, 0);
    const readCount = Object.keys(this.progress.topicsRead).length;
    const overallPct = this.calculateOverallProgress();

    const allQuestions = [...QUESTIONS_DATA, ...EXTENDED_PRACTICE_QUESTIONS];
    const practicedCount = Object.keys(this.progress.questionsPracticed).length;
    const questionPct = Math.round((practicedCount / allQuestions.length) * 100);

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <div class="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">Self-Regulation & Mastery</span>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">Student Learning Progress Tracker</h1>
            </div>
            <button onclick="App.resetProgress()" class="px-3 py-1.5 text-xs text-rose-600 border border-rose-200 dark:border-rose-900 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40">
              Reset Progress
            </button>
          </div>

          <!-- Overall Progress Gauge Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div class="p-5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1">
              <div class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Curriculum Topics</div>
              <div class="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">${overallPct}%</div>
              <div class="text-xs text-slate-500">${readCount} of ${totalTopics} topics read</div>
            </div>

            <div class="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Questions Mastered</div>
              <div class="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">${questionPct}%</div>
              <div class="text-xs text-slate-500">${practicedCount} of ${allQuestions.length} exam questions</div>
            </div>

            <div class="p-5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-1">
              <div class="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Course Status</div>
              <div class="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">${overallPct >= 80 ? 'Exam Ready 🌟' : overallPct >= 40 ? 'On Track 📖' : 'Getting Started 🚀'}</div>
              <div class="text-xs text-slate-500">Second Year Second Term</div>
            </div>
          </div>
        </div>

        <!-- Chapter by Chapter Mastery Breakdown -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">Chapter-by-Chapter Learning Mastery</h2>
          
          <div class="space-y-4">
            ${CHAPTERS_DATA.map(ch => {
              const chRead = ch.topics.filter(t => this.progress.topicsRead[t.id]).length;
              const chPct = Math.round((chRead / ch.topics.length) * 100);
              return `
                <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <div class="font-bold text-slate-900 dark:text-white">
                      <span class="font-mono text-blue-600 mr-1.5">Chapter ${ch.number}:</span> ${ch.title}
                    </div>
                    <span class="font-mono text-xs font-bold text-slate-600 dark:text-slate-300">${chPct}% (${chRead}/${ch.topics.length})</span>
                  </div>
                  <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div class="bg-blue-600 h-full rounded-full transition-all duration-300" style="width: ${chPct}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // HELPER METHODS
  toggleTopicRead: function(topicId, isChecked) {
    if (isChecked) {
      this.progress.topicsRead[topicId] = true;
    } else {
      delete this.progress.topicsRead[topicId];
    }
    this.saveProgress();
    this.renderSidebar();
  },

  toggleQuestionPracticed: function(qId, isChecked) {
    if (isChecked) {
      this.progress.questionsPracticed[qId] = true;
    } else {
      delete this.progress.questionsPracticed[qId];
    }
    this.saveProgress();
  },

  isChapterCompleted: function(chapterId) {
    const ch = CHAPTERS_DATA.find(c => c.id === chapterId);
    if (!ch) return false;
    return ch.topics.every(t => this.progress.topicsRead[t.id]);
  },

  calculateOverallProgress: function() {
    const totalTopics = CHAPTERS_DATA.reduce((acc, c) => acc + c.topics.length, 0);
    if (totalTopics === 0) return 0;
    const read = Object.keys(this.progress.topicsRead).length;
    return Math.round((read / totalTopics) * 100);
  },

  updateProgressBadge: function() {
    const badge = document.getElementById('sidebar-progress-badge');
    if (badge) {
      badge.innerText = `${this.calculateOverallProgress()}%`;
    }
  },

  resetProgress: function() {
    if (confirm("Reset all learning progress and checkboxes?")) {
      this.progress = {
        topicsRead: {},
        handnotesReviewed: {},
        videosWatched: {},
        questionsPracticed: {}
      };
      this.saveProgress();
      this.navigate('progress');
    }
  },

  // SIMPLE MARKDOWN FORMATTER FOR TEXTBOOK PROSE
  formatMarkdownText: function(text) {
    if (!text) return '';
    let html = text
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">$1</h4>')
      .replace(/^##### (.*$)/gim, '<h5 class="text-base font-bold text-slate-700 dark:text-slate-200 mt-3 mb-1.5">$1</h5>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/gim, '<code class="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">$1</code>')
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs my-4 overflow-x-auto">$1</pre>')
      .replace(/\n\n/gim, '</p><p class="my-3 leading-relaxed">')
      .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');

    return `<p class="my-2 leading-relaxed">${html}</p>`;
  },

  // SEARCH ACROSS ALL RESOURCES
  renderSearchResults: function() {
    const q = this.state.searchQuery;
    const container = document.getElementById('main-content');
    if (!container) return;

    const matchedTopics = [];
    CHAPTERS_DATA.forEach(ch => {
      ch.topics.forEach(t => {
        if (t.name.toLowerCase().includes(q) || t.content.toLowerCase().includes(q)) {
          matchedTopics.push({ ...t, chapterNumber: ch.number, chapterTitle: ch.title, chapterId: ch.id });
        }
      });
    });

    const allQuestions = [...QUESTIONS_DATA, ...EXTENDED_PRACTICE_QUESTIONS];
    const matchedQuestions = allQuestions.filter(quest => 
      quest.question.toLowerCase().includes(q) || quest.modelAnswer.toLowerCase().includes(q)
    );

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border shadow-sm">
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">Search Results for "${q}"</h2>
          <p class="text-xs text-slate-500 mt-1">Found ${matchedTopics.length} topics and ${matchedQuestions.length} exam questions</p>
        </div>

        <!-- Matched Topics -->
        ${matchedTopics.length > 0 ? `
          <div class="space-y-3">
            <h3 class="font-bold text-slate-700 dark:text-slate-300 text-sm">Textbook Topics:</h3>
            ${matchedTopics.map(t => `
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border shadow-sm flex items-center justify-between">
                <div>
                  <span class="text-xs font-mono text-blue-600 font-bold">Ch ${t.chapterNumber}</span>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">${t.name}</h4>
                  <p class="text-xs text-slate-500">${t.chapterTitle}</p>
                </div>
                <button onclick="App.navigate('chapter', { chapterId: '${t.chapterId}' })" class="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100">
                  Read Topic →
                </button>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Matched Questions -->
        ${matchedQuestions.length > 0 ? `
          <div class="space-y-3">
            <h3 class="font-bold text-slate-700 dark:text-slate-300 text-sm">Exam Questions:</h3>
            ${matchedQuestions.map(mq => `
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border shadow-sm space-y-2">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold px-2 py-0.5 rounded bg-pink-100 text-pink-800">${mq.marks} Marks</span>
                  <span class="text-xs font-mono text-slate-500">${mq.chapterTitle}</span>
                </div>
                <h4 class="font-bold text-slate-900 dark:text-white text-sm">${mq.question}</h4>
                <button onclick="App.navigate('questions')" class="text-xs text-blue-600 font-bold hover:underline">
                  View in Question Bank →
                </button>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${matchedTopics.length === 0 && matchedQuestions.length === 0 ? `
          <div class="p-8 text-center text-slate-500">No content found matching "${q}". Try searching for terms like "Gini", "Harrod-Domar", "Khulna", "RMG", "Solow", or "Institutions".</div>
        ` : ''}
      </div>
    `;
  }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
