<template>
  <div class="relative min-h-screen overflow-auto">
    <SubtleBackground />
    <div class="relative z-10 pt-20 pb-16 px-6 max-w-6xl mx-auto">

      <div class="text-center mb-10">
        <p class="font-terminal text-white/40 text-xs tracking-widest mb-2">── GIT REFERENCE ──</p>
        <h1 class="font-orbitron text-3xl font-black text-white mb-2">GIT COMMAND COSMOS</h1>
        <p class="text-white/40 font-space text-sm">{{ total }} commands · Full reference guide</p>
      </div>

      <!-- Search + filter -->
      <div class="flex flex-wrap gap-3 mb-6 items-center">
        <div class="flex-1 min-w-48 flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5">
          <span class="text-white/30">🔍</span>
          <input v-model="search" class="flex-1 bg-transparent text-sm font-space text-white/80 outline-none placeholder-white/25"
                 placeholder="Search commands..." />
        </div>
        <div class="flex gap-2 flex-wrap">
          <button v-for="cat in cmdCategories" :key="cat.id"
                  class="px-3 py-2 rounded-xl text-xs font-terminal transition-all"
                  :class="activeFilter === cat.id
                    ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/35'
                    : 'bg-white/4 border border-white/8 text-white/50 hover:text-white/80'"
                  @click="activeFilter = cat.id; audio.click()">
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Commands -->
      <div class="space-y-6">
        <div v-for="section in filteredSections" :key="section.id">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-xl">{{ section.icon }}</span>
            <h2 class="font-orbitron text-sm font-bold text-white/80">{{ section.title }}</h2>
            <div class="flex-1 h-px bg-white/8" />
            <span class="font-terminal text-xs text-white/30">{{ section.commands.length }}</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="cmd in section.commands" :key="cmd.name"
                 class="cmd-card p-5">
              <div class="flex items-start justify-between gap-3 mb-3">
                <code class="font-terminal text-sm text-neon-cyan font-bold">{{ cmd.name }}</code>
                <div class="flex items-center gap-2">
                  <span class="px-1.5 py-0.5 rounded text-xs font-terminal"
                        :class="diffColor(cmd.difficulty)">
                    {{ cmd.difficulty }}
                  </span>
                  <button class="text-white/25 hover:text-white/70 text-xs transition-colors"
                          @click="copyCmd(cmd.name)" :title="'Copy ' + cmd.name">
                    {{ copied === cmd.name ? '✓' : '⎘' }}
                  </button>
                </div>
              </div>
              <p class="text-white/65 font-space text-xs leading-relaxed mb-3">{{ cmd.desc }}</p>

              <!-- Syntax -->
              <div class="bg-black/50 rounded-lg px-3 py-2 mb-3 font-terminal text-xs text-github-green overflow-x-auto">
                {{ cmd.syntax }}
              </div>

              <!-- Example -->
              <div v-if="cmd.example" class="text-xs">
                <p class="font-terminal text-white/30 mb-1">EXAMPLE:</p>
                <div class="bg-black/40 rounded-lg px-3 py-2 font-terminal text-xs text-white/60 overflow-x-auto">
                  {{ cmd.example }}
                </div>
              </div>

              <!-- Flags -->
              <div v-if="cmd.flags && cmd.flags.length" class="mt-3 flex flex-wrap gap-1.5">
                <span v-for="f in cmd.flags" :key="f"
                      class="px-2 py-0.5 rounded font-terminal text-xs text-plasma-purple bg-plasma-purple/8 border border-plasma-purple/20">
                  {{ f }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import { useAudio } from '../composables/useAudio'

const audio = useAudio()
const search = ref('')
const activeFilter = ref('all')
const copied = ref('')

function copyCmd(name: string) {
  navigator.clipboard.writeText(name)
  copied.value = name
  audio.click()
  setTimeout(() => { copied.value = '' }, 1500)
}

function diffColor(d: string) {
  return d === 'Beginner' ? 'bg-github-green/15 text-github-green'
       : d === 'Intermediate' ? 'bg-solar-amber/15 text-solar-amber'
       : 'bg-stellar-red/15 text-stellar-red'
}

const cmdCategories = [
  { id: 'all',       label: 'ALL'       },
  { id: 'setup',     label: 'SETUP'     },
  { id: 'basic',     label: 'BASIC'     },
  { id: 'branch',    label: 'BRANCHING' },
  { id: 'remote',    label: 'REMOTE'    },
  { id: 'history',   label: 'HISTORY'   },
  { id: 'undo',      label: 'UNDO'      },
  { id: 'advanced',  label: 'ADVANCED'  }
]

const sections = [
  {
    id: 'setup', icon: '⚙️', title: 'SETUP & CONFIGURATION', category: 'setup',
    commands: [
      { name: 'git config --global user.name "Name"', difficulty: 'Beginner', desc: 'Set your global username for all commits', syntax: 'git config --global user.name "Your Name"', example: 'git config --global user.name "Jane Doe"', flags: ['--global','--local','--system'] },
      { name: 'git config --global user.email "email"', difficulty: 'Beginner', desc: 'Set your global email for all commits', syntax: 'git config --global user.email "you@example.com"', example: 'git config --global user.email "jane@dev.io"', flags: [] },
      { name: 'git config --list', difficulty: 'Beginner', desc: 'List all configuration settings currently active', syntax: 'git config --list', example: 'git config --list --show-origin', flags: ['--list','--show-origin'] },
      { name: 'git config --global core.editor "code --wait"', difficulty: 'Intermediate', desc: 'Set VS Code as default editor for commit messages', syntax: 'git config --global core.editor "<editor>"', example: 'git config --global core.editor "vim"', flags: ['--global'] },
      { name: 'git config --global alias.st status', difficulty: 'Intermediate', desc: 'Create a shortcut alias for a git command', syntax: 'git config --global alias.<name> "<command>"', example: 'git config --global alias.lg "log --oneline --graph"', flags: ['--global'] }
    ]
  },
  {
    id: 'basic', icon: '🌱', title: 'BASIC WORKFLOW', category: 'basic',
    commands: [
      { name: 'git init', difficulty: 'Beginner', desc: 'Initialize a new Git repository in the current directory. Creates the .git folder.', syntax: 'git init [directory]', example: 'git init my-project', flags: ['--bare','--initial-branch=main'] },
      { name: 'git clone', difficulty: 'Beginner', desc: 'Clone a remote repository locally. Automatically sets up origin remote.', syntax: 'git clone <url> [directory]', example: 'git clone https://github.com/user/repo.git', flags: ['--depth 1','--branch main','--recurse-submodules'] },
      { name: 'git status', difficulty: 'Beginner', desc: 'Show the state of the working directory and staging area.', syntax: 'git status', example: 'git status -s  # short format', flags: ['-s','--short','-b','--branch'] },
      { name: 'git add', difficulty: 'Beginner', desc: 'Stage changes for the next commit. Use . for all files or specify paths.', syntax: 'git add <file|directory|.>', example: 'git add src/\ngit add -p  # interactive patch', flags: ['-A','--all','-p','--patch','-u'] },
      { name: 'git commit', difficulty: 'Beginner', desc: 'Record staged changes to the repository with a message.', syntax: 'git commit -m "message"', example: 'git commit -m "feat: add user authentication"\ngit commit --amend  # edit last commit', flags: ['-m','-a','--amend','--no-edit','--allow-empty','-s'] },
      { name: 'git diff', difficulty: 'Beginner', desc: 'Show differences between working directory, staging, and commits.', syntax: 'git diff [commit1] [commit2] [-- file]', example: 'git diff HEAD~1 HEAD\ngit diff --staged', flags: ['--staged','--cached','--stat','--name-only'] },
      { name: 'git stash', difficulty: 'Intermediate', desc: 'Temporarily save uncommitted changes to a stack, clean working directory.', syntax: 'git stash [push|pop|list|drop|apply]', example: 'git stash push -m "WIP: login feature"\ngit stash pop', flags: ['push -m','pop','list','drop','apply','--include-untracked'] }
    ]
  },
  {
    id: 'branch', icon: '🌿', title: 'BRANCHING & MERGING', category: 'branch',
    commands: [
      { name: 'git branch', difficulty: 'Beginner', desc: 'List, create, delete, or rename branches.', syntax: 'git branch [name] [-d|-D|-m|-r|-a]', example: 'git branch feature/login\ngit branch -d old-feature\ngit branch -a  # all branches', flags: ['-d','--delete','-D','--force','-m','--move','-r','--remote','-a','--all'] },
      { name: 'git checkout', difficulty: 'Beginner', desc: 'Switch to a branch or restore working tree files.', syntax: 'git checkout <branch|commit|-- file>', example: 'git checkout -b feature/new\ngit checkout -- src/app.js  # discard changes', flags: ['-b','--track','-','--'] },
      { name: 'git switch', difficulty: 'Beginner', desc: 'Modern command to switch branches (safer than checkout).', syntax: 'git switch <branch>', example: 'git switch main\ngit switch -c new-branch', flags: ['-c','--create','-d','--detach','--discard-changes'] },
      { name: 'git merge', difficulty: 'Intermediate', desc: 'Join two branches. Creates a merge commit preserving history.', syntax: 'git merge <branch>', example: 'git merge feature/login\ngit merge --no-ff feature  # always create merge commit', flags: ['--no-ff','--ff-only','--squash','--abort','--strategy'] },
      { name: 'git rebase', difficulty: 'Advanced', desc: 'Reapply commits on top of another base. Creates linear history.', syntax: 'git rebase <branch|commit>', example: 'git rebase main\ngit rebase -i HEAD~3  # interactive rebase', flags: ['-i','--interactive','--onto','--abort','--continue','--skip'] },
      { name: 'git cherry-pick', difficulty: 'Intermediate', desc: 'Apply a specific commit from another branch to the current branch.', syntax: 'git cherry-pick <commit-hash>', example: 'git cherry-pick abc1234\ngit cherry-pick main~3..main~1  # range', flags: ['-n','--no-commit','-e','--edit','--abort','--continue'] },
      { name: 'git tag', difficulty: 'Intermediate', desc: 'Create, list, or delete tags marking specific commits.', syntax: 'git tag [-a] <name> [-m "msg"]', example: 'git tag -a v1.0.0 -m "Release v1.0.0"\ngit push origin --tags', flags: ['-a','--annotate','-m','-d','--list','-l'] }
    ]
  },
  {
    id: 'remote', icon: '🌐', title: 'REMOTE REPOSITORIES', category: 'remote',
    commands: [
      { name: 'git remote', difficulty: 'Beginner', desc: 'Manage remote repository connections.', syntax: 'git remote [add|remove|rename|set-url|show]', example: 'git remote add origin https://github.com/user/repo.git\ngit remote -v  # list with URLs', flags: ['-v','--verbose','add','remove','rename','set-url','show'] },
      { name: 'git fetch', difficulty: 'Intermediate', desc: 'Download objects and refs from a remote without merging.', syntax: 'git fetch [remote] [branch]', example: 'git fetch origin\ngit fetch --all  # all remotes\ngit fetch origin feature-branch', flags: ['--all','--prune','-p','--tags','--depth'] },
      { name: 'git pull', difficulty: 'Beginner', desc: 'Fetch and integrate with the current branch. Equivalent to fetch + merge.', syntax: 'git pull [remote] [branch]', example: 'git pull origin main\ngit pull --rebase origin main', flags: ['--rebase','--no-rebase','--ff-only','--no-ff'] },
      { name: 'git push', difficulty: 'Beginner', desc: 'Upload local branch commits to a remote repository.', syntax: 'git push [remote] [branch]', example: 'git push origin main\ngit push -u origin feature  # set upstream\ngit push --force-with-lease', flags: ['-u','--set-upstream','--force-with-lease','--force','-f','--tags','--delete'] },
      { name: 'git clone --depth 1', difficulty: 'Intermediate', desc: 'Shallow clone: download only the latest commit, not full history. Faster.', syntax: 'git clone --depth <n> <url>', example: 'git clone --depth 1 https://github.com/linux/linux', flags: ['--depth','--shallow-since','--no-single-branch'] }
    ]
  },
  {
    id: 'history', icon: '📜', title: 'VIEWING HISTORY', category: 'history',
    commands: [
      { name: 'git log', difficulty: 'Beginner', desc: 'Show commit history with various formatting options.', syntax: 'git log [options] [file]', example: 'git log --oneline --graph --all\ngit log --author="Jane" --since="2 weeks ago"\ngit log -p -- src/auth.js', flags: ['--oneline','--graph','--all','--stat','-p','--author','--since','--until','--grep','--follow'] },
      { name: 'git show', difficulty: 'Beginner', desc: 'Show information about a git object (commit, tag, tree, blob).', syntax: 'git show <commit|tag|object>', example: 'git show HEAD\ngit show abc1234:src/file.js  # file at commit', flags: ['--stat','--name-only','--format=','--no-patch'] },
      { name: 'git blame', difficulty: 'Intermediate', desc: 'Show who last modified each line of a file and in which commit.', syntax: 'git blame <file>', example: 'git blame -L 50,75 src/auth.js  # lines 50-75\ngit blame -w  # ignore whitespace', flags: ['-L','--line-range','-w','--ignore-whitespace','-e','--show-email'] },
      { name: 'git bisect', difficulty: 'Advanced', desc: 'Binary search through commits to find which one introduced a bug.', syntax: 'git bisect start|good|bad|reset', example: 'git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0\ngit bisect reset', flags: ['start','good','bad','skip','reset','run'] },
      { name: 'git reflog', difficulty: 'Advanced', desc: 'Show the log of all HEAD movements. Essential for recovery after destructive operations.', syntax: 'git reflog [show|expire]', example: 'git reflog\ngit reset --hard HEAD@{3}  # go back to earlier state', flags: ['show','expire','delete','--all'] },
      { name: 'git shortlog', difficulty: 'Intermediate', desc: 'Summarize git log output grouped by author. Great for release notes.', syntax: 'git shortlog [-n] [-s] [-e]', example: 'git shortlog -sn HEAD  # by commit count\ngit shortlog -sn --no-merges', flags: ['-n','--numbered','-s','--summary','-e','--email','--no-merges'] }
    ]
  },
  {
    id: 'undo', icon: '↩️', title: 'UNDOING CHANGES', category: 'undo',
    commands: [
      { name: 'git revert', difficulty: 'Intermediate', desc: 'Create a new commit that undoes a previous commit. Safe — preserves history.', syntax: 'git revert <commit>', example: 'git revert HEAD  # undo last commit\ngit revert abc1234  # undo specific commit', flags: ['--no-edit','-n','--no-commit','--mainline'] },
      { name: 'git reset', difficulty: 'Intermediate', desc: 'Move HEAD to a previous commit. --soft keeps changes staged, --hard discards everything.', syntax: 'git reset [--soft|--mixed|--hard] <commit>', example: 'git reset --soft HEAD~1  # undo commit, keep staged\ngit reset --hard HEAD~3  # delete last 3 commits', flags: ['--soft','--mixed','--hard','--keep','--merge'] },
      { name: 'git restore', difficulty: 'Beginner', desc: 'Restore working tree files. Modern alternative to checkout for discarding changes.', syntax: 'git restore [--staged] <file>', example: 'git restore src/app.js  # discard working changes\ngit restore --staged src/app.js  # unstage file', flags: ['--staged','-s','--source','--worktree','-W'] },
      { name: 'git clean', difficulty: 'Intermediate', desc: 'Remove untracked files and directories from working tree.', syntax: 'git clean [-f] [-d] [-n]', example: 'git clean -n  # dry run (show what would be deleted)\ngit clean -fd  # delete untracked files and dirs', flags: ['-f','--force','-d','-n','--dry-run','-i','--interactive','-x'] },
      { name: 'git stash drop', difficulty: 'Beginner', desc: 'Delete a stash entry. Use pop to apply and delete.', syntax: 'git stash drop [stash@{n}]', example: 'git stash list\ngit stash drop stash@{0}', flags: [] }
    ]
  },
  {
    id: 'advanced', icon: '⚡', title: 'ADVANCED COMMANDS', category: 'advanced',
    commands: [
      { name: 'git submodule', difficulty: 'Advanced', desc: 'Manage nested git repositories inside your repo. Common in monorepos and dependencies.', syntax: 'git submodule [add|update|init|foreach]', example: 'git submodule add https://github.com/user/lib.git\ngit submodule update --init --recursive', flags: ['add','update','init','foreach','--recursive','--remote'] },
      { name: 'git worktree', difficulty: 'Advanced', desc: 'Check out multiple branches simultaneously in different directories.', syntax: 'git worktree add <path> <branch>', example: 'git worktree add ../hotfix hotfix/critical\ngit worktree list', flags: ['add','list','remove','prune','lock','unlock'] },
      { name: 'git archive', difficulty: 'Intermediate', desc: 'Create a zip/tar archive of a git tree. Useful for releases.', syntax: 'git archive --format=<fmt> <ref>', example: 'git archive --format=zip HEAD > release.zip\ngit archive -o latest.tar.gz HEAD', flags: ['--format','--output','-o','--prefix','--worktree-attributes'] },
      { name: 'git bundle', difficulty: 'Advanced', desc: 'Pack repository data into a single file for offline transfer.', syntax: 'git bundle create <file> <refs>', example: 'git bundle create repo.bundle HEAD main\ngit clone repo.bundle', flags: ['create','verify','list-heads','unbundle'] },
      { name: 'git filter-branch', difficulty: 'Advanced', desc: 'Rewrite branches and history. Use git-filter-repo (modern tool) instead.', syntax: 'git filter-branch --tree-filter "<cmd>" HEAD', example: '# Modern alternative:\npip install git-filter-repo\ngit filter-repo --path sensitive.txt --invert-paths', flags: ['--tree-filter','--msg-filter','--env-filter','--tag-name-filter'] },
      { name: 'git gc', difficulty: 'Advanced', desc: 'Garbage collection: optimize repository, compress file revisions and remove unreachable objects.', syntax: 'git gc [--aggressive] [--prune=<date>]', example: 'git gc --aggressive --prune=now', flags: ['--aggressive','--auto','--prune=','--no-prune','--quiet'] },
      { name: 'git hooks', difficulty: 'Advanced', desc: 'Scripts triggered by git events. Located in .git/hooks/. Use Husky for team-wide hooks.', syntax: '# .git/hooks/pre-commit, commit-msg, pre-push', example: '# .git/hooks/pre-commit (chmod +x required)\n#!/bin/sh\nnpm test && npm run lint', flags: ['pre-commit','commit-msg','pre-push','post-merge','post-checkout'] }
    ]
  }
]

const filteredSections = computed(() => {
  const q = search.value.toLowerCase()
  return sections
    .filter(s => activeFilter.value === 'all' || s.category === activeFilter.value)
    .map(s => ({
      ...s,
      commands: q
        ? s.commands.filter(c => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
        : s.commands
    }))
    .filter(s => s.commands.length > 0)
})

const total = computed(() => sections.reduce((acc, s) => acc + s.commands.length, 0))
</script>

<style scoped>
.cmd-card {
  background: rgba(5,8,16,0.85);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  backdrop-filter: blur(20px);
  transition: all 0.25s ease;
}
.cmd-card:hover {
  border-color: rgba(0,245,255,0.2);
  background: rgba(0,245,255,0.02);
}
</style>
