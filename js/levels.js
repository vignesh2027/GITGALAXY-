// GitGalaxy - 50 Levels, 5 commands each
export const LEVELS = [
  { id:1, title:"First Steps", commands:["git init","git status","git add .","git commit -m","git log"], tier:"basics" },
  { id:2, title:"Tracking Changes", commands:["git diff","git diff --staged","git rm","git mv","git show"], tier:"basics" },
  { id:3, title:"Undo Operations", commands:["git restore","git restore --staged","git reset HEAD","git checkout --","git clean -fd"], tier:"basics" },
  { id:4, title:"Log Mastery", commands:["git log --oneline","git log --graph","git log --author","git log -p","git shortlog"], tier:"basics" },
  { id:5, title:"Config & Setup", commands:["git config user.name","git config user.email","git config --global","git config --list","git config core.editor"], tier:"basics" },
  { id:6, title:"Staging Craft", commands:["git add -p","git add -i","git add -u","git add *.js","git reset HEAD file"], tier:"basics" },
  { id:7, title:"Commit Craft", commands:["git commit -a","git commit --amend","git commit --no-edit","git commit -v","git commit --allow-empty"], tier:"basics" },
  { id:8, title:"Branch Basics", commands:["git branch","git branch new","git checkout -b","git branch -d","git branch -m"], tier:"branching" },
  { id:9, title:"Switch & Merge", commands:["git switch","git switch -c","git merge","git merge --no-ff","git merge --abort"], tier:"branching" },
  { id:10, title:"Rebase & Stash", commands:["git rebase","git rebase -i","git stash","git stash pop","git stash list"], tier:"branching" },
  { id:11, title:"Remote Setup", commands:["git remote add","git remote -v","git remote rename","git remote remove","git remote show"], tier:"remote" },
  { id:12, title:"Push & Pull", commands:["git push","git push -u origin","git pull","git pull --rebase","git push --force-with-lease"], tier:"remote" },
  { id:13, title:"Fetch & Clone", commands:["git fetch","git fetch --all","git clone","git clone --depth 1","git clone --branch"], tier:"remote" },
  { id:14, title:"Remote Branches", commands:["git branch -r","git branch -a","git checkout -t","git push origin --delete","git fetch --prune"], tier:"remote" },
  { id:15, title:"Upstream Tracking", commands:["git branch -u","git push --set-upstream","git rev-parse --abbrev-ref @{u}","git remote update","git ls-remote"], tier:"remote" },
  { id:16, title:"Tag Operations", commands:["git tag","git tag -a v1.0","git push --tags","git tag -d","git describe"], tier:"remote" },
  { id:17, title:"Submodules Intro", commands:["git submodule add","git submodule init","git submodule update","git submodule status","git submodule foreach"], tier:"remote" },
  { id:18, title:"Patch & Bundle", commands:["git format-patch","git apply","git am","git bundle create","git bundle verify"], tier:"remote" },
  { id:19, title:"Archive & Export", commands:["git archive","git archive --format=zip","git archive --prefix","git shortlog -sn","git log --format"], tier:"remote" },
  { id:20, title:"Collaboration", commands:["git request-pull","git send-email","git blame -L","git annotate","git log --follow"], tier:"remote" },
  { id:21, title:"GitHub Forking", commands:["gh repo fork","git remote add upstream","git fetch upstream","git merge upstream/main","gh repo sync"], tier:"github" },
  { id:22, title:"Pull Requests", commands:["gh pr create","gh pr list","gh pr checkout","gh pr merge","gh pr review"], tier:"github" },
  { id:23, title:"GitHub Issues", commands:["gh issue create","gh issue list","gh issue close","gh issue comment","gh issue view"], tier:"github" },
  { id:24, title:"Actions Basics", commands:["workflow dispatch","on: push","on: pull_request","jobs: build","steps: - uses:"], tier:"github" },
  { id:25, title:"GitHub Pages", commands:["gh-pages branch","docs/ folder","jekyll serve","CNAME setup","actions deploy"], tier:"github" },
  { id:26, title:"GitHub CLI", commands:["gh auth login","gh repo create","gh repo clone","gh gist create","gh api"], tier:"github" },
  { id:27, title:"Code Review", commands:["gh pr diff","gh pr checks","CODEOWNERS","review comments","suggested changes"], tier:"github" },
  { id:28, title:"Releases", commands:["gh release create","gh release list","gh release download","draft releases","release notes"], tier:"github" },
  { id:29, title:"Security", commands:["dependabot.yml","secret scanning","code scanning","branch protection","signed commits"], tier:"github" },
  { id:30, title:"Projects & Boards", commands:["gh project create","gh project list","project boards","milestones","labels manage"], tier:"github" },
  { id:31, title:"Cherry Pick", commands:["git cherry-pick","git cherry-pick -n","git cherry-pick --abort","git cherry-pick --continue","git cherry-pick -x"], tier:"advanced" },
  { id:32, title:"Bisect Debug", commands:["git bisect start","git bisect bad","git bisect good","git bisect reset","git bisect run"], tier:"advanced" },
  { id:33, title:"Reflog Rescue", commands:["git reflog","git reflog show","git reflog expire","git fsck","git fsck --lost-found"], tier:"advanced" },
  { id:34, title:"Worktree Power", commands:["git worktree add","git worktree list","git worktree remove","git worktree prune","git worktree lock"], tier:"advanced" },
  { id:35, title:"Advanced Rebase", commands:["git rebase --onto","git rebase -i squash","git rebase -i fixup","git rebase -i edit","git rebase --autosquash"], tier:"advanced" },
  { id:36, title:"Filter & Clean", commands:["git filter-branch","git filter-repo","BFG cleaner","git gc","git prune"], tier:"advanced" },
  { id:37, title:"Diff Mastery", commands:["git diff --stat","git diff --name-only","git diff branch1..branch2","git difftool","git diff --word-diff"], tier:"advanced" },
  { id:38, title:"Grep & Search", commands:["git grep","git grep -n","git log -S","git log -G","git log --all --grep"], tier:"advanced" },
  { id:39, title:"Attributes", commands:[".gitattributes","linguist-language","diff=custom","merge=ours","filter=lfs"], tier:"advanced" },
  { id:40, title:"Sparse & Partial", commands:["git sparse-checkout","git sparse-checkout set","git clone --filter","partial clone","treeless clone"], tier:"advanced" },
  { id:41, title:"Git Internals", commands:["git cat-file -p","git hash-object","git update-index","git write-tree","git commit-tree"], tier:"hero" },
  { id:42, title:"Object Model", commands:["blob objects","tree objects","commit objects","tag objects","git rev-parse"], tier:"hero" },
  { id:43, title:"Packfiles", commands:["git verify-pack","git unpack-objects","git index-pack","git repack","delta compression"], tier:"hero" },
  { id:44, title:"Gitconfig Power", commands:[".gitconfig aliases","conditional includes","core.autocrlf","merge.tool","diff.algorithm"], tier:"hero" },
  { id:45, title:"Git Hooks", commands:["pre-commit","pre-push","commit-msg","post-merge","prepare-commit-msg"], tier:"hero" },
  { id:46, title:"Advanced Merge", commands:["merge strategies","ort strategy","octopus merge","subtree merge","rerere"], tier:"hero" },
  { id:47, title:"GitHub Actions Pro", commands:["matrix strategy","reusable workflows","composite actions","self-hosted runners","OIDC tokens"], tier:"hero" },
  { id:48, title:"Performance", commands:["git maintenance","scalar register","commit-graph","multi-pack-index","filesystem monitor"], tier:"hero" },
  { id:49, title:"Advanced CLI", commands:["gh extension","gh alias set","gh codespace","gh copilot","gh attestation"], tier:"hero" },
  { id:50, title:"Git Mastery", commands:["git notes","git replace","git interpret-trailers","git credential","git daemon"], tier:"hero" }
];

// Command descriptions for the encyclopedia
export const COMMAND_INFO = {
  "git init": { desc: "Initialize a new Git repository in the current directory", syntax: "git init [directory]", example: "$ git init my-project\nInitialized empty Git repository in /my-project/.git/" },
  "git status": { desc: "Show the working tree status - modified, staged, untracked files", syntax: "git status [-s]", example: "$ git status\nOn branch main\nChanges not staged for commit:\n  modified: app.js" },
  "git add .": { desc: "Stage all changes in the current directory for the next commit", syntax: "git add <pathspec>", example: "$ git add .\n$ git status\nChanges to be committed:\n  new file: index.html" },
  "git commit -m": { desc: "Record staged changes to the repository with a message", syntax: 'git commit -m "message"', example: '$ git commit -m "Initial commit"\n[main (root-commit) a1b2c3d] Initial commit' },
  "git log": { desc: "Show the commit history log", syntax: "git log [--oneline] [--graph]", example: "$ git log --oneline\na1b2c3d Initial commit" },
  "git diff": { desc: "Show changes between commits, working tree, etc.", syntax: "git diff [file]", example: "$ git diff\n-old line\n+new line" },
  "git branch": { desc: "List, create, or delete branches", syntax: "git branch [name] [-d name]", example: "$ git branch\n* main\n  feature" },
  "git checkout -b": { desc: "Create and switch to a new branch", syntax: "git checkout -b <branch>", example: "$ git checkout -b feature\nSwitched to a new branch 'feature'" },
  "git merge": { desc: "Join two or more development histories together", syntax: "git merge <branch>", example: "$ git merge feature\nMerge made by the 'ort' strategy." },
  "git rebase": { desc: "Reapply commits on top of another base tip", syntax: "git rebase <branch>", example: "$ git rebase main\nSuccessfully rebased and updated refs/heads/feature." },
  "git stash": { desc: "Stash changes in a dirty working directory away", syntax: "git stash [push] [pop] [list]", example: "$ git stash\nSaved working directory and index state WIP on main" },
  "git push": { desc: "Update remote refs along with associated objects", syntax: "git push [remote] [branch]", example: "$ git push origin main\nTo github.com:user/repo.git\n   a1b2c3d..e4f5g6h  main -> main" },
  "git pull": { desc: "Fetch from and integrate with another repository or branch", syntax: "git pull [remote] [branch]", example: "$ git pull origin main\nAlready up to date." },
  "git clone": { desc: "Clone a repository into a new directory", syntax: "git clone <url> [dir]", example: "$ git clone https://github.com/user/repo.git" },
  "git fetch": { desc: "Download objects and refs from another repository", syntax: "git fetch [remote]", example: "$ git fetch origin\nFrom github.com:user/repo\n   a1b2c3d..e4f5g6h  main -> origin/main" },
  "git cherry-pick": { desc: "Apply the changes introduced by existing commits", syntax: "git cherry-pick <commit>", example: "$ git cherry-pick a1b2c3d\n[feature e4f5g6h] Apply fix from main" },
  "git bisect start": { desc: "Use binary search to find the commit that introduced a bug", syntax: "git bisect start", example: "$ git bisect start\n$ git bisect bad\n$ git bisect good v1.0" },
  "git reflog": { desc: "Manage reflog information - your safety net", syntax: "git reflog [show]", example: "$ git reflog\na1b2c3d HEAD@{0}: commit: Latest change\ne4f5g6h HEAD@{1}: checkout: moving from feature to main" },
  "git remote add": { desc: "Add a new remote repository", syntax: "git remote add <name> <url>", example: "$ git remote add origin https://github.com/user/repo.git" },
  "git tag": { desc: "Create, list, delete or verify a tag object", syntax: "git tag [-a] <tagname>", example: "$ git tag -a v1.0 -m 'Release 1.0'" },
};

// Quiz questions for each command
export function generateQuestions(commands) {
  const questions = [];
  const templates = [
    (cmd) => ({ q: `Which command does this: "${COMMAND_INFO[cmd]?.desc || 'Perform ' + cmd}"?`, correct: cmd }),
    (cmd) => ({ q: `Complete the command to ${cmd.includes('commit') ? 'save changes' : cmd.includes('push') ? 'upload to remote' : cmd.includes('pull') ? 'download from remote' : cmd.includes('branch') ? 'manage branches' : cmd.includes('merge') ? 'combine branches' : cmd.includes('stash') ? 'temporarily save work' : cmd.includes('log') ? 'view history' : cmd.includes('init') ? 'start a new repo' : cmd.includes('clone') ? 'copy a repository' : 'execute ' + cmd}`, correct: cmd }),
    (cmd) => ({ q: `What is the correct syntax for: ${cmd}?`, correct: cmd }),
  ];
  commands.forEach(cmd => {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const question = template(cmd);
    // Generate wrong answers from other commands
    const wrongs = commands.filter(c => c !== cmd);
    while (wrongs.length < 3) wrongs.push("git help");
    question.answers = [cmd, ...wrongs.slice(0, 3)].sort(() => Math.random() - 0.5);
    questions.push(question);
  });
  return questions;
}

export const ACHIEVEMENTS = [
  { id: "first_commit", name: "First Commit Crusader", desc: "Complete Level 1", icon: "⚡", tier: 1 },
  { id: "branch_bender", name: "Branch Bender", desc: "Complete all branching levels", icon: "🌿", tier: 2 },
  { id: "merge_master", name: "Merge Master", desc: "Complete Level 9", icon: "🔀", tier: 2 },
  { id: "rebase_ranger", name: "Rebase Ranger", desc: "Complete Level 10", icon: "📐", tier: 2 },
  { id: "remote_warrior", name: "Remote Warrior", desc: "Complete all remote levels", icon: "🌐", tier: 3 },
  { id: "pr_prophet", name: "Pull Request Prophet", desc: "Complete Level 22", icon: "📮", tier: 3 },
  { id: "action_hero", name: "Action Hero", desc: "Complete Level 24", icon: "⚙️", tier: 3 },
  { id: "cherry_picker", name: "Cherry Picker", desc: "Complete Level 31", icon: "🍒", tier: 4 },
  { id: "time_traveler", name: "Time Traveler", desc: "Use git reflog", icon: "⏰", tier: 4 },
  { id: "git_wizard", name: "Git Wizard", desc: "Complete Level 41", icon: "🧙", tier: 5 },
  { id: "flow_state", name: "Flow State Master", desc: "Get 10x combo", icon: "🔥", tier: 3 },
  { id: "speed_demon", name: "Speed Demon", desc: "Answer in under 1 second", icon: "💨", tier: 2 },
  { id: "perfectionist", name: "Perfectionist", desc: "Complete a level with no mistakes", icon: "💎", tier: 3 },
  { id: "halfway", name: "Halfway Hero", desc: "Complete 25 levels", icon: "🏔️", tier: 4 },
  { id: "galaxy_master", name: "Galaxy Master", desc: "Complete all 50 levels", icon: "🌌", tier: 5 },
];
