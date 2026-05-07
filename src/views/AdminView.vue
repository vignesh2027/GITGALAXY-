<template>
  <div class="relative min-h-screen overflow-auto bg-space-black" style="background:#030609">
    <div class="fixed inset-0 pointer-events-none"
         style="background: radial-gradient(ellipse at 30% 20%, rgba(123,97,255,0.08), transparent 60%)" />

    <div class="relative z-10 pt-20 pb-16 px-6 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p class="font-terminal text-xs text-plasma-purple tracking-widest mb-1 animate-pulse-neon">── MISSION CONTROL ──</p>
          <h1 class="font-orbitron text-3xl font-black gradient-text">ADMIN PANEL</h1>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 rounded-full bg-github-green animate-pulse" />
          <span class="font-terminal text-xs text-github-green">SYSTEM ONLINE</span>
        </div>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div v-for="s in adminStats" :key="s.label" class="glass-card p-4 text-center">
          <p class="font-orbitron text-xl font-bold" :class="s.color">{{ s.value }}</p>
          <p class="text-white/40 text-xs font-terminal mt-1">{{ s.label }}</p>
        </div>
      </div>

      <!-- Tab nav -->
      <div class="flex gap-2 mb-6 border-b border-white/10 pb-3 overflow-x-auto">
        <button v-for="tab in tabs" :key="tab"
                class="px-4 py-2 rounded-t-lg text-sm font-space font-medium whitespace-nowrap transition-all"
                :class="activeTab === tab
                  ? 'text-plasma-purple border-b-2 border-plasma-purple'
                  : 'text-white/40 hover:text-white/70'"
                @click="activeTab = tab; audio.click()">
          {{ tab }}
        </button>
      </div>

      <!-- ── CONTENT TAB ── -->
      <div v-if="activeTab === 'Content'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Add Question -->
          <div class="glass-card p-6">
            <h3 class="font-orbitron text-sm font-bold text-plasma-purple mb-4">+ ADD SINGLE QUESTION</h3>
            <div class="space-y-3">
              <div>
                <label class="text-xs font-terminal text-white/50 mb-1 block">Question Text</label>
                <textarea v-model="newQ.question" rows="2"
                          class="w-full glass px-3 py-2 rounded-lg text-sm font-space text-white/80 outline-none resize-none"
                          placeholder="Enter question text..." />
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div v-for="i in 4" :key="i">
                  <input v-model="newQ.options[i-1]"
                         class="w-full glass px-3 py-2 rounded-lg text-xs font-space text-white/80 outline-none"
                         :placeholder="`Option ${String.fromCharCode(64+i)}`" />
                </div>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="text-xs font-terminal text-white/50 mb-1 block">Correct (0-3)</label>
                  <input v-model.number="newQ.answer" type="number" min="0" max="3"
                         class="w-full glass px-3 py-2 rounded-lg text-sm font-space text-white/80 outline-none" />
                </div>
                <div>
                  <label class="text-xs font-terminal text-white/50 mb-1 block">Category</label>
                  <select v-model="newQ.category"
                          class="w-full glass px-3 py-2 rounded-lg text-sm font-space text-white/80 outline-none bg-transparent">
                    <option v-for="c in categories" :key="c" :value="c" class="bg-[#080d1a]">{{ c }}</option>
                  </select>
                </div>
                <div>
                  <label class="text-xs font-terminal text-white/50 mb-1 block">Difficulty</label>
                  <select v-model.number="newQ.difficulty"
                          class="w-full glass px-3 py-2 rounded-lg text-sm font-space text-white/80 outline-none bg-transparent">
                    <option value="1" class="bg-[#080d1a]">1 - Easy</option>
                    <option value="2" class="bg-[#080d1a]">2 - Medium</option>
                    <option value="3" class="bg-[#080d1a]">3 - Hard</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="text-xs font-terminal text-white/50 mb-1 block">Explanation (shown after answer)</label>
                <textarea v-model="newQ.explanation" rows="2"
                          class="w-full glass px-3 py-2 rounded-lg text-sm font-space text-white/80 outline-none resize-none"
                          placeholder="Explain why the correct answer is right..." />
              </div>
              <button class="btn-neon px-6 py-2.5 rounded-xl font-orbitron text-sm w-full"
                      style="border-color: rgba(123,97,255,0.5); color: #7B61FF"
                      :disabled="!newQ.question.trim()"
                      @click="addQuestion">
                + ADD QUESTION
              </button>
            </div>
          </div>

          <!-- Question bank preview -->
          <div class="glass-card p-6">
            <h3 class="font-orbitron text-sm font-bold text-neon-cyan mb-1">
              CUSTOM QUESTION BANK
            </h3>
            <p class="text-white/30 font-terminal text-xs mb-4">{{ admin.customQuestions.length }} custom + {{ builtInCount }} built-in = {{ admin.customQuestions.length + builtInCount }} total</p>
            <div class="space-y-2 max-h-80 overflow-y-auto">
              <div v-for="(q, i) in admin.customQuestions.slice(0, 30)" :key="q.id"
                   class="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5 hover:border-white/10 group">
                <span class="text-xs font-terminal text-white/30 mt-0.5 w-6 flex-shrink-0">{{ i+1 }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-space text-white/70 line-clamp-2">{{ q.question }}</p>
                  <div class="flex gap-2 mt-1">
                    <span class="text-xs px-1.5 py-0.5 rounded font-terminal text-plasma-purple bg-plasma-purple/10">{{ q.category }}</span>
                    <span class="text-xs font-terminal" :class="q.difficulty === 1 ? 'text-github-green' : q.difficulty === 2 ? 'text-solar-amber' : 'text-red-400'">
                      {{ q.difficulty === 1 ? 'Easy' : q.difficulty === 2 ? 'Med' : 'Hard' }}
                    </span>
                    <span class="text-xs text-white/30 font-terminal">+{{ q.xp || 100 }} XP</span>
                  </div>
                </div>
                <button class="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all text-sm"
                        @click="admin.removeQuestion(q.id)">✕</button>
              </div>
            </div>
            <p v-if="admin.customQuestions.length === 0" class="text-center py-8 text-white/25 font-space text-sm">
              No custom questions yet. Add some above or use Bulk Upload.
            </p>
          </div>
        </div>
      </div>

      <!-- ── BULK UPLOAD TAB ── -->
      <div v-if="activeTab === 'Bulk Upload'" class="space-y-6">

        <!-- Category selector -->
        <div class="glass-card p-5">
          <h3 class="font-orbitron text-xs font-bold text-white/50 mb-3">SELECT UPLOAD CATEGORY</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button @click="bulkCategory = 'games'; importSuccess = false; previewRows = []"
                    class="p-4 rounded-xl border-2 text-left transition-all"
                    :class="bulkCategory === 'games'
                      ? 'border-plasma-purple/60 bg-plasma-purple/10'
                      : 'border-white/10 hover:border-white/25'">
              <p class="font-orbitron text-sm font-bold mb-1"
                 :class="bulkCategory === 'games' ? 'text-plasma-purple' : 'text-white/60'">
                🎮 GAME QUESTIONS
              </p>
              <p class="font-space text-xs text-white/40">
                Questions appear randomly in Temple Run, Snake &amp; Space Combat during gameplay.
              </p>
              <p class="font-terminal text-xs mt-2" :class="bulkCategory === 'games' ? 'text-plasma-purple' : 'text-white/30'">
                {{ admin.customQuestions.length }} uploaded
              </p>
            </button>
            <button @click="bulkCategory = 'interview'; importSuccess = false; previewRows = []"
                    class="p-4 rounded-xl border-2 text-left transition-all"
                    :class="bulkCategory === 'interview'
                      ? 'border-neon-cyan/60 bg-neon-cyan/10'
                      : 'border-white/10 hover:border-white/25'">
              <p class="font-orbitron text-sm font-bold mb-1"
                 :class="bulkCategory === 'interview' ? 'text-neon-cyan' : 'text-white/60'">
                📋 INTERVIEW Q&amp;A
              </p>
              <p class="font-space text-xs text-white/40">
                Questions appear on the learner Interview Q&amp;A study page — permanently visible to all learners.
              </p>
              <p class="font-terminal text-xs mt-2" :class="bulkCategory === 'interview' ? 'text-neon-cyan' : 'text-white/30'">
                {{ admin.interviewQuestions.length }} uploaded
              </p>
            </button>
          </div>
        </div>

        <!-- Format Guide -->
        <div class="glass-card p-6 border border-neon-cyan/15">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl">📋</span>
            <h3 class="font-orbitron text-sm font-bold text-neon-cyan">HOW TO BULK UPLOAD QUESTIONS</h3>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- JSON format -->
            <div>
              <p class="font-terminal text-xs text-solar-amber mb-2">METHOD 1: JSON FORMAT</p>
              <pre class="text-xs font-terminal text-white/60 bg-white/3 rounded-xl p-4 overflow-x-auto border border-white/5 leading-relaxed">{{jsonExample}}</pre>
            </div>
            <!-- CSV format -->
            <div>
              <p class="font-terminal text-xs text-github-green mb-2">METHOD 2: CSV FORMAT</p>
              <pre class="text-xs font-terminal text-white/60 bg-white/3 rounded-xl p-4 overflow-x-auto border border-white/5 leading-relaxed">{{csvExample}}</pre>
              <div class="mt-3 space-y-1">
                <p class="font-terminal text-xs text-white/40">CSV COLUMN ORDER:</p>
                <p v-for="(col, i) in csvCols" :key="i" class="font-terminal text-xs text-white/30">
                  <span class="text-neon-cyan">{{ i+1 }}.</span> {{ col }}
                </p>
              </div>
            </div>
          </div>

          <!-- Rules -->
          <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div v-for="rule in uploadRules" :key="rule.title"
                 class="p-3 rounded-xl border border-white/6 bg-white/2">
              <p class="font-terminal text-xs mb-1" :class="rule.color">{{ rule.icon }} {{ rule.title }}</p>
              <p class="text-white/40 font-space text-xs">{{ rule.desc }}</p>
            </div>
          </div>

          <!-- Download template buttons -->
          <div class="flex flex-wrap gap-3 mt-4">
            <button class="btn-neon px-4 py-2 rounded-xl font-terminal text-xs"
                    @click="downloadJsonTemplate">
              ↓ DOWNLOAD JSON TEMPLATE
            </button>
            <button class="btn-neon px-4 py-2 rounded-xl font-terminal text-xs btn-green"
                    @click="downloadCsvTemplate">
              ↓ DOWNLOAD CSV TEMPLATE
            </button>
          </div>
        </div>

        <!-- Upload area -->
        <div class="glass-card p-6">
          <h3 class="font-orbitron text-sm font-bold text-plasma-purple mb-4">📁 UPLOAD YOUR FILE</h3>

          <!-- Drop zone -->
          <div class="border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 cursor-pointer mb-4"
               :class="dragOver ? 'border-neon-cyan/50 bg-neon-cyan/5' : 'border-white/10 hover:border-white/25'"
               @click="bulkFileInput?.click()"
               @dragover.prevent="dragOver = true"
               @dragleave="dragOver = false"
               @drop.prevent="handleBulkDrop">
            <div class="text-4xl mb-3">{{ bulkFile ? '✅' : '📂' }}</div>
            <p class="font-space text-sm text-white/60 mb-1">
              {{ bulkFile ? bulkFile.name : 'Drop your JSON or CSV file here, or click to browse' }}
            </p>
            <p class="font-terminal text-xs text-white/30">Accepted: .json, .csv — Max 5MB</p>
          </div>
          <input ref="bulkFileInput" type="file" accept=".json,.csv" class="hidden" @change="handleBulkFile" />

          <!-- Paste area -->
          <div class="mb-4">
            <div class="flex items-center gap-3 mb-2">
              <p class="font-terminal text-xs text-white/40">OR PASTE JSON/CSV DIRECTLY:</p>
              <button v-if="pasteContent" class="text-xs text-white/30 hover:text-white/60 font-terminal"
                      @click="pasteContent = ''; parseError = ''">✕ clear</button>
            </div>
            <textarea v-model="pasteContent" rows="6"
                      class="w-full glass px-3 py-2 rounded-xl text-xs font-terminal text-white/70 outline-none resize-y"
                      placeholder='Paste JSON array or CSV rows here...'
                      @input="parseError = ''" />
          </div>

          <!-- Parse & preview -->
          <button class="btn-neon px-6 py-2.5 rounded-xl font-orbitron text-sm mb-4"
                  :disabled="!bulkFile && !pasteContent.trim()"
                  @click="parseBulk">
            🔍 PREVIEW & VALIDATE
          </button>

          <!-- Parse error -->
          <div v-if="parseError" class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
            <p class="font-terminal text-xs text-red-400">⚠ PARSE ERROR</p>
            <p class="font-space text-xs text-red-300/70 mt-1">{{ parseError }}</p>
          </div>

          <!-- Preview table -->
          <div v-if="previewRows.length > 0" class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="font-orbitron text-sm font-bold text-github-green">✓ {{ validRows }} VALID</span>
              <span v-if="invalidRows > 0" class="font-orbitron text-sm font-bold text-red-400">✗ {{ invalidRows }} INVALID</span>
              <span class="text-white/30 font-terminal text-xs">questions found</span>
            </div>

            <div class="overflow-x-auto rounded-xl border border-white/8">
              <table class="w-full text-xs">
                <thead>
                  <tr class="border-b border-white/8">
                    <th v-for="h in ['#','Question','Category','Diff','Opt A','Opt B','Opt C','Opt D','Answer','Status']" :key="h"
                        class="px-3 py-2 text-left font-terminal text-white/40 whitespace-nowrap">{{ h }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in previewRows.slice(0, 20)" :key="i"
                      class="border-b border-white/4 hover:bg-white/2"
                      :class="row.valid ? '' : 'bg-red-500/5'">
                    <td class="px-3 py-2 font-terminal text-white/30">{{ i+1 }}</td>
                    <td class="px-3 py-2 font-space text-white/70 max-w-48 truncate" :title="row.question">{{ row.question }}</td>
                    <td class="px-3 py-2 font-terminal text-plasma-purple">{{ row.category }}</td>
                    <td class="px-3 py-2 font-terminal" :class="row.difficulty == 1 ? 'text-github-green' : row.difficulty == 2 ? 'text-solar-amber' : 'text-red-400'">
                      {{ row.difficulty === 1 ? 'Easy' : row.difficulty === 2 ? 'Med' : 'Hard' }}
                    </td>
                    <td v-for="opt in row.options" :key="opt" class="px-3 py-2 text-white/50 max-w-32 truncate" :title="opt">{{ opt }}</td>
                    <td class="px-3 py-2 font-terminal text-neon-cyan">{{ String.fromCharCode(65 + row.answer) }}</td>
                    <td class="px-3 py-2 font-terminal" :class="row.valid ? 'text-github-green' : 'text-red-400'">
                      {{ row.valid ? '✓' : '✗ ' + row.error }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p v-if="previewRows.length > 20" class="text-center py-2 text-xs text-white/30 font-terminal">
                ... and {{ previewRows.length - 20 }} more rows
              </p>
            </div>

            <div v-if="validRows > 0" class="flex items-center gap-4">
              <button class="btn-neon px-8 py-3 rounded-xl font-orbitron font-bold text-sm"
                      style="border-color: rgba(57,255,20,0.5); color: #39FF14"
                      @click="importValid">
                ✓ IMPORT {{ validRows }} VALID QUESTIONS
              </button>
              <p class="text-white/30 font-space text-xs">{{ invalidRows > 0 ? `${invalidRows} invalid rows will be skipped.` : 'All rows are valid!' }}</p>
            </div>

            <div v-if="importSuccess" class="p-4 rounded-xl bg-github-green/10 border border-github-green/20">
              <p class="font-terminal text-sm text-github-green">✓ IMPORTED {{ lastImportCount }} questions successfully!</p>
              <p class="text-white/40 font-space text-xs mt-1">
                {{ bulkCategory === 'interview'
                  ? 'Questions are now live on the learner Interview Q&A page.'
                  : 'Questions are now available in Temple Run, Snake & Space Combat.' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ── PLANETS TAB ── -->
      <div v-if="activeTab === 'Planets'" class="space-y-5">

        <!-- Planet list -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="p in admin.customPlanets" :key="p.id"
               class="glass-card p-5 flex items-center gap-4 cursor-pointer transition-all"
               :class="selectedPlanet?.id === p.id ? 'border-2' : 'border border-white/8'"
               :style="selectedPlanet?.id === p.id ? { borderColor: p.color + '60' } : {}"
               @click="selectPlanet(p)">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                 :style="{ border: `2px solid ${p.color}60`, background: `${p.color}10` }">
              {{ p.icon }}
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-orbitron text-sm font-bold text-white/90">{{ p.name }}</h3>
              <p class="text-white/40 text-xs font-space mt-0.5 line-clamp-1">{{ p.description }}</p>
              <div class="flex items-center gap-3 mt-1">
                <p class="font-terminal text-xs" :style="{ color: p.color }">{{ p.missions.length }} missions</p>
                <p class="font-terminal text-xs text-white/30">
                  {{ admin.getPlanetCases(p.id).length }} extra case studies
                </p>
              </div>
            </div>
            <span class="text-xs font-terminal px-2 py-1 rounded"
                  :style="{ background: p.color + '15', color: p.color }">{{ p.category }}</span>
          </div>
        </div>

        <!-- Case study upload panel for selected planet -->
        <div v-if="selectedPlanet" class="glass-card p-6 border-2"
             :style="{ borderColor: selectedPlanet.color + '40' }">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-xl">{{ selectedPlanet.icon }}</span>
            <div>
              <h3 class="font-orbitron text-sm font-bold" :style="{ color: selectedPlanet.color }">
                {{ selectedPlanet.name }} — CASE STUDIES
              </h3>
              <p class="text-white/40 font-space text-xs">Upload case studies that appear on this planet's learner page</p>
            </div>
            <button class="ml-auto text-white/30 hover:text-white/60 text-xs font-terminal"
                    @click="selectedPlanet = null">✕ Close</button>
          </div>

          <!-- Format instructions -->
          <div class="mb-4 p-4 rounded-xl bg-white/3 border border-white/6 text-xs font-space text-white/50">
            <p class="font-terminal text-solar-amber mb-2">JSON FORMAT — paste an array of case study objects:</p>
            <pre class="text-white/40 font-terminal leading-relaxed overflow-x-auto">{{ caseStudyJsonExample }}</pre>
          </div>

          <textarea v-model="caseStudyPaste" rows="6"
                    class="w-full glass px-3 py-2 rounded-xl text-xs font-terminal text-white/70 outline-none resize-y mb-3"
                    placeholder='Paste JSON array of case studies here...' />

          <div class="flex items-center gap-3 mb-4">
            <button class="btn-neon px-5 py-2 rounded-xl font-orbitron text-xs"
                    :style="{ borderColor: selectedPlanet.color + '80', color: selectedPlanet.color }"
                    @click="importPlanetCases">
              ✓ IMPORT CASE STUDIES
            </button>
            <p v-if="caseStudyImportMsg" class="text-xs font-terminal text-github-green">{{ caseStudyImportMsg }}</p>
            <p v-if="caseStudyError" class="text-xs font-terminal text-red-400">{{ caseStudyError }}</p>
          </div>

          <!-- Existing cases for this planet -->
          <div v-if="admin.getPlanetCases(selectedPlanet.id).length > 0">
            <p class="font-terminal text-xs text-white/40 mb-2">UPLOADED CASE STUDIES ({{ admin.getPlanetCases(selectedPlanet.id).length }})</p>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              <div v-for="cs in admin.getPlanetCases(selectedPlanet.id)" :key="cs.id"
                   class="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6">
                <div class="flex-1 min-w-0">
                  <p class="font-orbitron text-xs text-white/80 truncate">{{ cs.title }}</p>
                  <p class="font-space text-xs text-white/35">{{ cs.company }} · {{ cs.scenario }}</p>
                </div>
                <button class="text-white/25 hover:text-red-400 text-xs font-terminal transition-colors flex-shrink-0"
                        @click="admin.removePlanetCase(selectedPlanet!.id, cs.id); refreshPlanetKey++">✕</button>
              </div>
            </div>
          </div>
          <p v-else class="text-xs font-terminal text-white/25">No case studies uploaded for this planet yet.</p>
        </div>
        <p v-else class="text-center py-6 text-white/30 font-space text-sm">
          👆 Click on a planet above to upload case studies for it
        </p>
      </div>

      <!-- ── ANNOUNCEMENTS TAB ── -->
      <div v-if="activeTab === 'Announcements'" class="space-y-5">
        <div class="glass-card p-6">
          <h3 class="font-orbitron text-sm font-bold text-solar-amber mb-4">📢 NEW ANNOUNCEMENT</h3>
          <textarea v-model="newAnn" rows="3"
                    class="w-full glass px-3 py-2 rounded-lg text-sm font-space text-white/80 outline-none resize-none mb-3"
                    placeholder="Enter announcement for learners..." />
          <div class="flex gap-2">
            <button v-for="t in ['info','warning','success']" :key="t"
                    class="px-3 py-1.5 rounded-lg text-xs font-terminal transition-all"
                    :class="annType === t ? 'bg-neon-cyan/20 text-neon-cyan' : 'glass text-white/40 hover:text-white/70'"
                    @click="annType = t">{{ t }}</button>
            <button class="ml-auto btn-neon px-4 py-1.5 rounded-lg text-xs font-orbitron"
                    @click="postAnnouncement">POST</button>
          </div>
        </div>
        <div v-for="a in admin.announcements" :key="a.id" class="glass-card p-4 flex items-start gap-4">
          <span class="text-lg flex-shrink-0">
            {{ a.type === 'warning' ? '⚠️' : a.type === 'success' ? '✅' : 'ℹ️' }}
          </span>
          <div class="flex-1">
            <p class="font-space text-sm text-white/80">{{ a.text }}</p>
            <p class="text-white/30 text-xs font-terminal mt-1">{{ a.type }}</p>
          </div>
          <button class="text-white/30 hover:text-red-400 transition-colors text-sm"
                  @click="admin.removeAnnouncement(a.id)">✕</button>
        </div>
        <div v-if="admin.announcements.length === 0" class="text-center py-12 text-white/30">
          <div class="text-4xl mb-3">📭</div>
          <p class="font-space text-sm">No announcements yet</p>
        </div>
      </div>

      <!-- ── SETTINGS TAB ── -->
      <div v-if="activeTab === 'Settings'" class="space-y-6">

        <!-- How settings work -->
        <div class="glass-card p-5 border border-neon-cyan/15">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">⚙️</span>
            <h3 class="font-orbitron text-sm font-bold text-neon-cyan">HOW SITE SETTINGS WORK</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-space text-white/50">
            <div class="p-3 rounded-xl bg-white/3 border border-white/6">
              <p class="font-terminal text-neon-cyan mb-1">📝 Galaxy Title</p>
              <p>Changes the main site title shown on the learner home page header. Default: <span class="text-white/70">GITGALAXY</span></p>
            </div>
            <div class="p-3 rounded-xl bg-white/3 border border-white/6">
              <p class="font-terminal text-neon-cyan mb-1">✏️ Galaxy Subtitle</p>
              <p>Changes the tagline below the title. Default: <span class="text-white/70">THE INFINITE LEARNING COSMOS</span></p>
            </div>
            <div class="p-3 rounded-xl bg-white/3 border border-white/6">
              <p class="font-terminal text-solar-amber mb-1">⚡ XP Multiplier</p>
              <p>Multiplies all XP earned by learners. Set to <span class="text-white/70">2</span> for a double-XP event. Range: 1–10. Changes take effect immediately for new XP gains.</p>
            </div>
          </div>
          <p class="text-xs font-terminal text-white/30 mt-3">✓ All settings save to localStorage instantly — no save button needed. Reload the page to see title/subtitle changes on the learner side.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="glass-card p-6 space-y-5">
          <h3 class="font-orbitron text-sm font-bold text-neon-cyan">SITE SETTINGS</h3>
          <div v-for="setting in siteSettings" :key="setting.key">
            <label class="text-xs font-terminal text-white/50 mb-0.5 block">{{ setting.label }}</label>
            <p class="text-xs font-space text-white/25 mb-1.5">{{ settingDesc[setting.key] }}</p>
            <input v-if="setting.type === 'text'"
                   :value="(admin.siteSettings as any)[setting.key]"
                   @input="admin.updateSetting(setting.key, ($event.target as HTMLInputElement).value)"
                   class="w-full glass px-3 py-2 rounded-lg text-sm font-space text-white/80 outline-none" />
            <input v-else-if="setting.type === 'number'"
                   type="number" min="1" max="10"
                   :value="(admin.siteSettings as any)[setting.key]"
                   @input="admin.updateSetting(setting.key, Number(($event.target as HTMLInputElement).value))"
                   class="w-full glass px-3 py-2 rounded-lg text-sm font-space text-white/80 outline-none" />
          </div>
          <!-- Live preview -->
          <div class="pt-3 border-t border-white/8">
            <p class="font-terminal text-xs text-white/30 mb-2">LIVE PREVIEW</p>
            <div class="p-4 rounded-xl bg-white/3 border border-white/6 text-center">
              <p class="font-orbitron text-sm font-bold text-white">{{ admin.siteSettings.galaxyTitle }}</p>
              <p class="font-space text-xs text-white/40">{{ admin.siteSettings.galaxySubtitle }}</p>
              <p class="font-terminal text-xs mt-2" :class="admin.siteSettings.xpMultiplier > 1 ? 'text-solar-amber' : 'text-white/30'">
                XP × {{ admin.siteSettings.xpMultiplier }}
                {{ admin.siteSettings.xpMultiplier > 1 ? '🔥 BONUS XP ACTIVE' : '' }}
              </p>
            </div>
          </div>
        </div>
        <div class="glass-card p-6">
          <h3 class="font-orbitron text-sm font-bold text-solar-amber mb-4">📁 UPLOAD ASSETS</h3>
          <div class="border-2 border-dashed border-white/10 rounded-xl p-8 text-center
                      hover:border-solar-amber/30 transition-colors cursor-pointer"
               @click="fileInput?.click()">
            <div class="text-4xl mb-3">☁️</div>
            <p class="font-space text-white/50 text-sm mb-1">Drop files or click to upload</p>
            <p class="font-terminal text-white/30 text-xs">Images, Videos, Markdown, JSON, CSV, PDF</p>
          </div>
          <input ref="fileInput" type="file" class="hidden" multiple @change="handleUpload" />
          <div class="mt-4 space-y-2 max-h-48 overflow-y-auto">
            <div v-for="a in admin.uploadedAssets" :key="a.name"
                 class="flex items-center gap-3 p-2 rounded-lg bg-white/3">
              <span class="text-sm">{{ getFileIcon(a.type) }}</span>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-space text-white/70 truncate">{{ a.name }}</p>
                <p class="text-xs font-terminal text-white/30">{{ a.date }}</p>
              </div>
            </div>
          </div>
        </div>
        </div><!-- close grid -->
      </div>

      <!-- ── ANALYTICS TAB ── -->
      <div v-if="activeTab === 'Analytics'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="glass-card p-6">
            <h3 class="font-orbitron text-sm font-bold text-neon-cyan mb-4">DAILY ACTIVE LEARNERS</h3>
            <canvas ref="chartCanvas" width="400" height="160" class="w-full" />
          </div>
          <div class="glass-card p-6">
            <h3 class="font-orbitron text-sm font-bold text-plasma-purple mb-4">PLANET COMPLETION %</h3>
            <div class="space-y-3">
              <div v-for="p in admin.customPlanets.slice(0, 8)" :key="p.id">
                <div class="flex justify-between text-xs font-terminal mb-1">
                  <span class="text-white/60">{{ p.icon }} {{ p.name }}</span>
                  <span :style="{ color: p.color }">{{ planetCompletion[p.id] }}%</span>
                </div>
                <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-1000"
                       :style="{ width: planetCompletion[p.id] + '%', background: p.color }" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="glass-card p-6">
          <h3 class="font-orbitron text-sm font-bold text-github-green mb-4">LIVE ACTIVITY FEED</h3>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            <div v-for="act in recentActivity" :key="act.id"
                 class="flex items-center gap-3 p-3 rounded-lg bg-white/2 border border-white/5">
              <span class="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                    :style="{ background: act.color + '20' }">{{ act.icon }}</span>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-space text-white/70">{{ act.text }}</p>
                <p class="text-xs font-terminal text-white/30">{{ act.time }}</p>
              </div>
              <span class="text-xs font-terminal" :style="{ color: act.color }">{{ act.xp }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useAdminStore } from '../stores/admin'
import { useAudio } from '../composables/useAudio'
import { allQuestions } from '../data/questions'

const admin = useAdminStore()
const audio = useAudio()
const activeTab = ref('Content')
const tabs = ['Content', 'Bulk Upload', 'Planets', 'Announcements', 'Settings', 'Analytics']
const fileInput = ref<HTMLInputElement | null>(null)
const bulkFileInput = ref<HTMLInputElement | null>(null)
const chartCanvas = ref<HTMLCanvasElement | null>(null)
const newAnn = ref('')
const annType = ref('info')
const dragOver = ref(false)
const bulkFile = ref<File | null>(null)
const pasteContent = ref('')
const parseError = ref('')
const previewRows = ref<any[]>([])
const importSuccess = ref(false)
const lastImportCount = ref(0)
const bulkCategory = ref<'games' | 'interview'>('games')

const builtInCount = computed(() => allQuestions.length)

type PreviewRow = {
  question: string
  category: string
  difficulty: number
  options: string[]
  answer: number
  explanation: string
  xp: number
  valid: boolean
  error: string
}

const categories = ['git', 'github', 'linux', 'cloud', 'devops', 'security', 'fullstack', 'ai', 'general', 'debugging']
const newQ = ref({ question: '', options: ['', '', '', ''], answer: 0, category: 'git', difficulty: 1, explanation: '', xp: 100 })

const validRows = computed(() => previewRows.value.filter(r => r.valid).length)
const invalidRows = computed(() => previewRows.value.filter(r => !r.valid).length)

const planetCompletion = computed(() => {
  const result: Record<string, number> = {}
  admin.customPlanets.forEach(p => { result[p.id] = Math.round(Math.random() * 75 + 10) })
  return result
})

const adminStats = computed(() => [
  { value: admin.customPlanets.length,    label: 'PLANETS',    color: 'text-neon-cyan' },
  { value: admin.customQuestions.length + builtInCount.value,  label: 'QUESTIONS', color: 'text-plasma-purple' },
  { value: admin.stats.totalLearners,     label: 'LEARNERS',   color: 'text-github-green' },
  { value: admin.stats.activeToday,       label: 'ACTIVE',     color: 'text-solar-amber' },
  { value: admin.stats.avgScore + '%',    label: 'AVG SCORE',  color: 'text-neon-cyan' },
  { value: admin.stats.completionRate + '%', label: 'COMPLETION', color: 'text-github-green' }
])

const siteSettings = [
  { key: 'galaxyTitle',    label: 'Galaxy Title',    type: 'text'   },
  { key: 'galaxySubtitle', label: 'Galaxy Subtitle', type: 'text'   },
  { key: 'xpMultiplier',   label: 'XP Multiplier (1–10)', type: 'number' }
]

const settingDesc: Record<string, string> = {
  galaxyTitle:    'Shown as the main heading on the learner home page',
  galaxySubtitle: 'Shown as the tagline below the main heading',
  xpMultiplier:   'Multiplies all XP earned by learners — set to 2 for a double-XP event'
}

// ── Planets tab — per-planet case study upload ──
const selectedPlanet = ref<any>(null)
const caseStudyPaste = ref('')
const caseStudyImportMsg = ref('')
const caseStudyError = ref('')
const refreshPlanetKey = ref(0)

const caseStudyJsonExample = `[
  {
    "id": "cs_myplanet_01",
    "title": "Real-world Git Rescue",
    "company": "Acme Corp",
    "scenario": "Production Incident",
    "difficulty": 2,
    "intro": "A team accidentally deleted the main branch...",
    "context": "Full story and background here..."
  }
]`

function selectPlanet(p: any) {
  selectedPlanet.value = p
  caseStudyPaste.value = ''
  caseStudyImportMsg.value = ''
  caseStudyError.value = ''
}

function importPlanetCases() {
  caseStudyError.value = ''
  caseStudyImportMsg.value = ''
  try {
    const arr = JSON.parse(caseStudyPaste.value.trim())
    if (!Array.isArray(arr)) { caseStudyError.value = 'Must be a JSON array [ ... ]'; return }
    const valid = arr.filter(c => c.title && c.id)
    if (valid.length === 0) { caseStudyError.value = 'No valid entries found. Each item needs at least "id" and "title".'; return }
    admin.addPlanetCases(selectedPlanet.value.id, valid)
    caseStudyImportMsg.value = `✓ ${valid.length} case studies added to ${selectedPlanet.value.name}!`
    caseStudyPaste.value = ''
    refreshPlanetKey.value++
    audio.success()
  } catch (e: any) {
    caseStudyError.value = `Parse error: ${e.message}`
  }
}

const recentActivity = Array.from({ length: 10 }, (_, i) => ({
  id: i, icon: ['🌿','🐙','🐧','☁️','⚙️','🛡️'][i % 6],
  color: ['#39FF14','#00F5FF','#FFB703','#00FFB3','#7B61FF','#FF3366'][i % 6],
  text: ['Learner completed Git Planet mission','PR Review badge unlocked','Linux quiz answered','Cloud case study completed','DevOps pipeline configured','Security audit passed'][i % 6],
  time: `${i * 3 + 1}m ago`,
  xp: `+${(i+1) * 50} XP`
}))

// ── Bulk upload helpers ──
const jsonExample = `[
  {
    "question": "What is git stash?",
    "options": ["Save changes temporarily","Delete changes","A branch","A commit"],
    "answer": 0,
    "category": "git",
    "difficulty": 1,
    "explanation": "git stash saves dirty working state to a stack.",
    "xp": 50
  }
]`

const csvExample = `question,option_a,option_b,option_c,option_d,answer,category,difficulty,explanation,xp
What is git stash?,Save temporarily,Delete changes,A branch,A commit,0,git,1,git stash saves dirty state.,50`

const csvCols = [
  'question — the question text',
  'option_a — first answer choice',
  'option_b — second answer choice',
  'option_c — third answer choice',
  'option_d — fourth answer choice',
  'answer — correct answer index (0=A, 1=B, 2=C, 3=D)',
  'category — git/github/linux/cloud/devops/security/fullstack/ai/general/debugging',
  'difficulty — 1 (easy), 2 (medium), or 3 (hard)',
  'explanation — why the answer is correct (shown to learners)',
  'xp — XP reward (50/100/150 recommended for easy/med/hard)'
]

const uploadRules = [
  { icon: '✓', title: 'VALID CATEGORIES', desc: 'git, github, linux, cloud, devops, security, fullstack, ai, general, debugging', color: 'text-neon-cyan' },
  { icon: '✓', title: 'ANSWER INDEX', desc: 'answer field must be 0, 1, 2, or 3 (index of the correct option)', color: 'text-github-green' },
  { icon: '✓', title: 'REQUIRED FIELDS', desc: 'question, 4 options, answer, category are required. Others optional.', color: 'text-solar-amber' }
]

function validateRow(q: any): PreviewRow {
  const errors: string[] = []
  if (!q.question?.trim()) errors.push('Missing question')
  const opts = Array.isArray(q.options) ? q.options : [q.option_a, q.option_b, q.option_c, q.option_d]
  if (opts.filter(Boolean).length < 2) errors.push('Need ≥2 options')
  const answer = Number(q.answer ?? q.answer_index ?? 0)
  if (isNaN(answer) || answer < 0 || answer > 3) errors.push('Answer must be 0-3')
  const validCats = ['git', 'github', 'linux', 'cloud', 'devops', 'security', 'fullstack', 'ai', 'general', 'debugging']
  const cat = (q.category || 'general').toLowerCase()
  if (!validCats.includes(cat)) errors.push(`Invalid category: ${cat}`)
  const diff = Number(q.difficulty || 1)

  return {
    question: q.question || '',
    category: validCats.includes(cat) ? cat : 'general',
    difficulty: [1,2,3].includes(diff) ? diff as 1|2|3 : 1,
    options: opts.map((o: any) => String(o || '')),
    answer,
    explanation: q.explanation || '',
    xp: Number(q.xp) || (diff === 3 ? 150 : diff === 2 ? 100 : 50),
    valid: errors.length === 0,
    error: errors.join('; ')
  }
}

function parseBulk() {
  parseError.value = ''
  previewRows.value = []
  importSuccess.value = false
  const raw = pasteContent.value.trim() || (bulkFile.value ? '' : '')

  if (bulkFile.value) {
    const reader = new FileReader()
    reader.onload = e => {
      const text = e.target?.result as string || ''
      doParse(text, bulkFile.value!.name)
    }
    reader.readAsText(bulkFile.value)
  } else if (raw) {
    doParse(raw, raw.trimStart().startsWith('[') ? 'data.json' : 'data.csv')
  }
}

function doParse(text: string, filename: string) {
  try {
    if (filename.endsWith('.json') || text.trimStart().startsWith('[')) {
      const arr = JSON.parse(text)
      if (!Array.isArray(arr)) { parseError.value = 'JSON must be an array [ ... ]'; return }
      previewRows.value = arr.map(validateRow)
    } else {
      // CSV parse
      const lines = text.trim().split('\n').filter(l => l.trim())
      const header = lines[0].toLowerCase()
      const hasHeader = header.includes('question') || header.includes('option')
      const dataLines = hasHeader ? lines.slice(1) : lines
      previewRows.value = dataLines.map(line => {
        const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''))
        return validateRow({
          question: cols[0], option_a: cols[1], option_b: cols[2],
          option_c: cols[3], option_d: cols[4],
          answer: cols[5], category: cols[6], difficulty: cols[7],
          explanation: cols[8], xp: cols[9]
        })
      })
    }
  } catch (e: any) {
    parseError.value = `Parse failed: ${e.message}. Check your JSON/CSV format against the examples above.`
  }
}

function handleBulkFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) { bulkFile.value = file; pasteContent.value = '' }
}

function handleBulkDrop(e: DragEvent) {
  dragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) { bulkFile.value = file; pasteContent.value = '' }
}

function importValid() {
  const valid = previewRows.value.filter(r => r.valid)
  const ts = Date.now()
  valid.forEach((row, i) => {
    const q = {
      id: `bulk_${ts}_${i}`,
      question: row.question,
      options: row.options,
      answer: row.answer,
      category: row.category,
      difficulty: row.difficulty,
      explanation: row.explanation,
      xp: row.xp
    }
    if (bulkCategory.value === 'interview') {
      admin.addInterviewQuestion(q)
    } else {
      admin.addQuestion(q)
    }
  })
  lastImportCount.value = valid.length
  importSuccess.value = true
  previewRows.value = []
  bulkFile.value = null
  pasteContent.value = ''
  audio.success()
}

function downloadJsonTemplate() {
  const template = [
    { question: 'What does git stash do?', options: ['Saves dirty state temporarily', 'Deletes uncommitted changes', 'Creates a new branch', 'Pushes to remote'], answer: 0, category: 'git', difficulty: 1, explanation: 'git stash saves your dirty working directory to a stack so you can switch contexts cleanly.', xp: 50 },
    { question: 'What HTTP status means "Not Found"?', options: ['200', '301', '404', '500'], answer: 2, category: 'general', difficulty: 1, explanation: '404 means the server could not find the requested resource.', xp: 50 }
  ]
  const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'questions_template.json'; a.click()
}

function downloadCsvTemplate() {
  const header = 'question,option_a,option_b,option_c,option_d,answer,category,difficulty,explanation,xp'
  const row1 = 'What does git stash do?,Saves dirty state temporarily,Deletes changes,Creates a branch,Pushes to remote,0,git,1,git stash saves working state to a stack.,50'
  const row2 = 'What HTTP status means Not Found?,200,301,404,500,2,general,1,404 means resource not found.,50'
  const blob = new Blob([header + '\n' + row1 + '\n' + row2], { type: 'text/csv' })
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'questions_template.csv'; a.click()
}

function addQuestion() {
  if (!newQ.value.question.trim()) return
  admin.addQuestion({ ...newQ.value, id: 'custom_' + Date.now() })
  audio.success()
  newQ.value = { question: '', options: ['', '', '', ''], answer: 0, category: 'git', difficulty: 1, explanation: '', xp: 100 }
}

function postAnnouncement() {
  if (!newAnn.value.trim()) return
  admin.addAnnouncement(newAnn.value, annType.value)
  newAnn.value = ''
  audio.success()
}

function handleUpload(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  Array.from(files).forEach(f => {
    const url = URL.createObjectURL(f)
    admin.addAsset(f.name, f.type, url)
  })
  audio.success()
}

function getFileIcon(type: string) {
  if (type.includes('image')) return '🖼️'
  if (type.includes('video')) return '🎬'
  if (type.includes('pdf'))   return '📄'
  if (type.includes('audio')) return '🎵'
  return '📁'
}

function drawChart() {
  const c = chartCanvas.value?.getContext('2d')
  if (!c) return
  const W = 400, H = 160
  c.clearRect(0, 0, W, H)
  const data = [45, 78, 65, 92, 110, 88, 134, 156, 143, 178, 165, 190, 210, 198]
  const max = Math.max(...data)
  const barW = W / data.length - 4
  data.forEach((v, i) => {
    const h = (v / max) * (H - 30)
    const x = i * (barW + 4) + 2
    const y = H - h - 10
    const grad = c.createLinearGradient(x, y, x, H - 10)
    grad.addColorStop(0, '#00F5FF'); grad.addColorStop(1, '#7B61FF50')
    c.fillStyle = grad; c.shadowColor = '#00F5FF'; c.shadowBlur = 6
    c.beginPath(); c.roundRect(x, y, barW, h, [3, 3, 0, 0]); c.fill()
    c.shadowBlur = 0
  })
  c.strokeStyle = 'rgba(0,245,255,0.15)'; c.lineWidth = 1
  c.beginPath(); c.moveTo(0, H - 10); c.lineTo(W, H - 10); c.stroke()
}

onMounted(async () => {
  await nextTick()
  if (activeTab.value === 'Analytics') drawChart()
})
</script>
