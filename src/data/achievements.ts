export interface CaseStudy {
  id: string
  title: string
  company: string
  scenario: string
  category: string
  difficulty: number
  intro: string
  context: string
  questions: Array<{
    id: string
    question: string
    options: string[]
    answer: number
    explanation: string
    xp: number
  }>
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs001',
    title: 'Git Catastrophe at a Startup',
    company: 'TechForge Inc.',
    scenario: 'Production Incident',
    category: 'git',
    difficulty: 2,
    intro: 'A junior developer at TechForge accidentally force-pushed to the main branch, overwriting the last 2 weeks of commits from 5 engineers.',
    context: 'The team was mid-sprint. The force push happened at 11 PM. No backups of specific commits were known to exist. The CTO was alerted at midnight. Your job: restore the codebase and prevent recurrence.',
    questions: [
      {
        id:'cs001_q1',
        question: 'What is the first command to run to assess the damage?',
        options: ['git status', 'git reflog', 'git log --all --oneline', 'git remote -v'],
        answer: 1,
        explanation: 'git reflog shows all HEAD movements on each contributor\'s local machine, including the commits before the force push. This is how you find the SHA of the last good state.',
        xp: 100
      },
      {
        id:'cs001_q2',
        question: 'Once you find the correct SHA from reflog, how do you restore main?',
        options: ['git checkout main', 'git push --force origin <good-sha>:main', 'git revert main', 'git reset HEAD~1'],
        answer: 1,
        explanation: 'Since the remote was incorrectly force-pushed, you force-push the correct SHA back. `git push --force origin <sha>:main` resets the remote to the correct state. Require all engineers to reset their local main.',
        xp: 120
      },
      {
        id:'cs001_q3',
        question: 'How do you prevent force pushes to main in the future on GitHub?',
        options: ['Ask devs to be careful', 'Enable branch protection: require PR + disable force push', 'Delete and recreate main', 'Use git hooks only'],
        answer: 1,
        explanation: 'GitHub branch protection rules: enable "Protect this branch", check "Require pull request reviews", and check "Do not allow force pushes". This makes it physically impossible to force push to main without admin bypass.',
        xp: 100
      },
      {
        id:'cs001_q4',
        question: 'One engineer has uncommitted changes on their local main. How do they safely get the restored commits?',
        options: ['git reset --hard origin/main', 'git stash → git fetch → git reset --hard origin/main → git stash pop', 'Delete and re-clone', 'git merge origin/main'],
        answer: 1,
        explanation: 'Stash saves their uncommitted work, fetch updates remote refs, hard reset makes local match remote, then stash pop brings back their work. Never hard-reset without stashing uncommitted changes first.',
        xp: 110
      },
      {
        id:'cs001_q5',
        question: 'What post-incident documentation should be written?',
        options: ['Nothing, just fix it', 'A blameless post-mortem: timeline, root cause, impact, immediate fix, preventive actions', 'Email to the junior dev', 'Ticket in Jira only'],
        answer: 1,
        explanation: 'Blameless post-mortems focus on system failures, not individual blame. Include: incident timeline, root cause (no branch protection), impact (2 weeks work at risk), resolution steps, and action items (add protection rules, train team on git reflog recovery).',
        xp: 90
      }
    ]
  },
  {
    id: 'cs002',
    title: 'The 3AM Production Outage',
    company: 'ShopFast E-commerce',
    scenario: 'Production Incident',
    category: 'devops',
    difficulty: 3,
    intro: 'ShopFast\'s checkout service went down at 3AM during a flash sale. Revenue loss: $45K per minute. The on-call engineer is you.',
    context: 'Symptoms: 503 errors on /checkout. CPU on app servers: 95%. Database connections: maxed at 500/500. A new feature was deployed 2 hours ago. 50,000 concurrent users.',
    questions: [
      {
        id:'cs002_q1',
        question: 'What is your FIRST action in this incident?',
        options: ['Debug the new feature', 'Rollback the 2-hour-old deployment immediately', 'Alert the team', 'Scale up servers'],
        answer: 1,
        explanation: 'The new deployment 2 hours ago is the most likely culprit. Rollback first to restore service (stop the bleeding), then debug offline. Revenue recovery takes priority over root cause analysis during an active outage.',
        xp: 150
      },
      {
        id:'cs002_q2',
        question: 'Database connections are maxed at 500/500. What likely caused this?',
        options: ['More users than expected', 'Connection pool misconfiguration or a query holding long-running transactions — possibly an N+1 query introduced in the new feature', 'Database hardware failure', 'Network issue'],
        answer: 1,
        explanation: 'Common cause: a new feature introduced N+1 queries (each request opens multiple DB connections) or slow queries holding connections longer. With 50K users and N+1, even 10 connections per user = 500K connections. Connection pooling with PgBouncer or connection limits per service prevents this.',
        xp: 130
      },
      {
        id:'cs002_q3',
        question: 'You see CPU at 95% on all app servers. What does this indicate?',
        options: ['Normal load', 'CPU-bound processing — likely JSON serialization of large payloads, synchronous blocking operations, or a tight loop in the new code', 'Memory leak', 'Disk I/O'],
        answer: 1,
        explanation: 'High CPU + deployment correlation suggests CPU-intensive code path: nested loops, large JSON parsing, synchronous crypto, or regex catastrophic backtracking. Profile with `node --prof` or `perf` on Linux. The new feature likely introduced an O(n²) operation on a hot path.',
        xp: 120
      },
      {
        id:'cs002_q4',
        question: 'After rollback, how do you safely test the problematic feature before redeploying?',
        options: ['Deploy to prod again carefully', 'Deploy to staging with production data clone, load test with k6/Locust simulating peak traffic, check connection pool metrics', 'Test locally', 'Skip testing, deploy at 3AM next time'],
        answer: 1,
        explanation: 'Load testing with tools like k6, Locust, or JMeter against a staging environment with realistic data reveals performance issues. Monitor: DB connection count, CPU/memory, response times at P95/P99. Set alerts for connection pool > 80% before considering it production-ready.',
        xp: 140
      },
      {
        id:'cs002_q5',
        question: 'What monitoring should have caught this BEFORE production impact?',
        options: ['More engineers', 'Canary deployment + automated rollback triggered by error rate > 5% or latency > 500ms', 'Daily manual testing', 'Weekly reviews'],
        answer: 1,
        explanation: 'Canary release: deploy new version to 1% of traffic first. Monitor error rate and latency. If metrics breach thresholds → auto-rollback. Tools: AWS CodeDeploy canary, Kubernetes rollout with metrics, Flagger. Combined with distributed tracing (Jaeger/Zipkin) would have caught the N+1 immediately.',
        xp: 160
      }
    ]
  },
  {
    id: 'cs003',
    title: 'The Open Source Contribution Journey',
    company: 'Linux Kernel Project',
    scenario: 'Open Source Engineering',
    category: 'github',
    difficulty: 2,
    intro: 'You want to contribute a bug fix to a major open source project. The fix is ready, but navigating the contribution process is complex.',
    context: 'Project has: 50K+ stars, strict contribution guidelines, DCO (Developer Certificate of Origin) requirements, CI checks, and code owners who review PRs. Your fix is in a core utility function.',
    questions: [
      {
        id:'cs003_q1',
        question: 'What should you do BEFORE writing a single line of code?',
        options: ['Start coding immediately', 'Read CONTRIBUTING.md, check for existing issues/PRs on the same bug, discuss in issue tracker', 'Fork and submit', 'Email maintainers'],
        answer: 1,
        explanation: 'Open source etiquette: (1) read CONTRIBUTING.md — it defines coding style, test requirements, PR process, (2) search issues for duplicate work, (3) open an issue to discuss approach before coding — maintainers might have context that changes your solution.',
        xp: 80
      },
      {
        id:'cs003_q2',
        question: 'The project requires DCO sign-off. How do you add this to every commit?',
        options: ['Add "DCO: signed" to commit message manually', 'git commit --signoff (or -s) adds "Signed-off-by: Name <email>" automatically', 'Create a separate sign-off file', 'Use a GitHub bot only'],
        answer: 1,
        explanation: 'DCO (Developer Certificate of Origin) certifies you have rights to submit the code. `git commit -s` adds "Signed-off-by: Your Name <email>" to the commit message. For existing commits: `git rebase HEAD~n --signoff`. The DCO check bot validates this on every PR.',
        xp: 100
      },
      {
        id:'cs003_q3',
        question: 'Your PR is open and CI fails on a test you didn\'t write. What do you do?',
        options: ['Ignore it, not your test', 'Investigate — your change may have broken a contract; fix or update the test to match new expected behavior', 'Ask maintainers to fix', 'Remove the test'],
        answer: 1,
        explanation: 'CI failures are your responsibility to resolve before merge. Even pre-existing flaky tests need investigation. If your change intentionally changes behavior, update tests. If unrelated flaky test, document and link to existing issue. Maintainers respect contributors who investigate failures thoroughly.',
        xp: 110
      },
      {
        id:'cs003_q4',
        question: 'Maintainer leaves a review comment: "Please squash your commits before merge." How do you do this?',
        options: ['Close and reopen PR', 'git rebase -i origin/main → squash → git push --force-with-lease', 'Delete commits one by one', 'Merge then squash'],
        answer: 1,
        explanation: '`git rebase -i origin/main` shows all your PR commits. Change "pick" to "s" (squash) for all but the first. Edit the combined commit message. `git push --force-with-lease` (safer than --force: fails if someone else pushed) updates the PR. force-with-lease prevents accidental overwrites.',
        xp: 120
      },
      {
        id:'cs003_q5',
        question: 'Your PR has been open for 3 weeks with no maintainer response. What is appropriate?',
        options: ['Spam the maintainers', 'A polite single bump comment ("friendly ping — would appreciate feedback when you have time"), or tag CODEOWNERS', 'Close and reopen', 'Abandon the contribution'],
        answer: 1,
        explanation: 'Maintainers are often volunteers with limited time. A single polite bump after 2-3 weeks is appropriate. Tag CODEOWNERS if listed. Join the project\'s communication channels (Discord, IRC, mailing list) — maintainers are often more responsive there. Never spam.',
        xp: 70
      }
    ]
  },
  {
    id: 'cs004',
    title: 'Scaling a Node.js API from 100 to 1M Users',
    company: 'GrowthLab SaaS',
    scenario: 'System Design',
    category: 'fullstack',
    difficulty: 3,
    intro: 'Your Node.js REST API served 100 users fine. After a viral TechCrunch article, you have 1M users and the service is crumbling.',
    context: 'Current stack: single Node.js instance, PostgreSQL on the same server, no caching, all images served from the API server, deployments done via SSH and pray. Response times: 8 seconds average.',
    questions: [
      {
        id:'cs004_q1',
        question: 'What is the fastest win to reduce 8-second response times?',
        options: ['Buy faster servers', 'Add Redis caching for frequently-read data — DB queries dropping from 8s to <50ms for cached responses', 'Rewrite in Rust', 'Add more endpoints'],
        answer: 1,
        explanation: 'Caching is almost always the highest ROI optimization. Redis in-memory cache for: session data, user profiles, API responses. Cache-aside pattern: check cache first, on miss query DB and cache result with TTL. For read-heavy workloads, 90%+ cache hit rate is achievable.',
        xp: 130
      },
      {
        id:'cs004_q2',
        question: 'The Node.js single-threaded event loop is saturated. How do you scale horizontally?',
        options: ['Add more RAM to the server', 'Deploy multiple Node.js instances behind a load balancer (nginx/ALB), use PM2 cluster mode to use all CPU cores', 'Use setTimeout tricks', 'Increase heap size'],
        answer: 1,
        explanation: 'Node.js is single-threaded but I/O-bound workloads scale well horizontally. PM2 cluster mode forks one process per CPU core. Add multiple servers behind an Application Load Balancer. Stateless APIs (JWT, not server-side sessions) are essential for horizontal scaling.',
        xp: 120
      },
      {
        id:'cs004_q3',
        question: 'PostgreSQL on the same server as the app is a bottleneck. What is the solution architecture?',
        options: ['Use SQLite instead', 'Separate DB to dedicated server, add read replicas for read-heavy queries, use connection pooling (PgBouncer)', 'Switch to MongoDB', 'Add more RAM to DB'],
        answer: 1,
        explanation: 'DB on separate server: dedicated resources, independent scaling. Read replicas: route SELECT queries to replicas, only writes to primary. PgBouncer connection pooling: 1000 app connections → 20 DB connections (DB handles fewer, larger connections efficiently). Also consider: index optimization, query analysis with EXPLAIN ANALYZE.',
        xp: 140
      },
      {
        id:'cs004_q4',
        question: 'Images served through the API consume 80% of bandwidth. How do you fix this?',
        options: ['Compress images more', 'Move images to S3 + CloudFront CDN — serve directly from CDN edge nodes globally', 'Delete old images', 'Use smaller images'],
        answer: 1,
        explanation: 'Static assets (images, videos, JS, CSS) should never go through your API. S3 stores them cheaply. CloudFront CDN serves them from 450+ global edge locations with automatic compression (WebP conversion, Brotli). Result: 0 API bandwidth for static assets, sub-100ms global image delivery.',
        xp: 110
      },
      {
        id:'cs004_q5',
        question: 'SSH-deploy-and-pray is too risky. What modern deployment pipeline should you implement?',
        options: ['Continue with SSH but add a checklist', 'GitHub Actions → build Docker image → push to ECR → blue/green ECS deploy with automatic rollback on health check failure', 'Manual deployment during off-hours', 'FTP deployment'],
        answer: 1,
        explanation: 'Modern CD pipeline: commit → GitHub Actions runs tests → builds Docker image → pushes to container registry → deploys to ECS/K8s with blue-green strategy → health checks → auto-rollback if health check fails. Zero-downtime deploys, instant rollback, full audit trail.',
        xp: 150
      }
    ]
  },
  {
    id: 'cs005',
    title: 'The Security Breach: Post-Mortem',
    company: 'FinData Corp',
    scenario: 'Security Incident',
    category: 'security',
    difficulty: 3,
    intro: 'FinData Corp\'s customer database was breached. 500,000 user records including hashed passwords were stolen. The breach was discovered 3 months after it happened.',
    context: 'Attackers exploited: an unpatched SQL injection vulnerability in the search endpoint, MD5-hashed passwords (crackable in seconds), no rate limiting on the login API, and no anomaly detection. The breach wasn\'t detected until a customer noticed their credentials on a dark web forum.',
    questions: [
      {
        id:'cs005_q1',
        question: 'Why were MD5-hashed passwords immediately crackable by attackers?',
        options: ['MD5 is encrypted', 'MD5 is a fast, unsalted hash — rainbow tables and GPU cracking can reverse billions of MD5 hashes per second', 'Passwords were too short', 'Database was unencrypted'],
        answer: 1,
        explanation: 'MD5 was designed for speed (checksums), not password hashing. Modern GPUs crack 100+ billion MD5 hashes/second. Without salt, identical passwords have identical hashes (rainbow tables). Use bcrypt (cost factor 12), scrypt, or Argon2 — designed to be slow (100ms) and include built-in salting.',
        xp: 150
      },
      {
        id:'cs005_q2',
        question: 'The SQL injection was in a search endpoint: `SELECT * FROM products WHERE name LIKE \'%$query%\'`. How should it be fixed?',
        options: ['Add input validation only', 'Use parameterized queries: `SELECT * FROM products WHERE name LIKE $1` with `%${query}%` as parameter', 'Escape single quotes manually', 'Switch databases'],
        answer: 1,
        explanation: 'Parameterized queries separate SQL from data. The DB driver handles escaping automatically — no injection possible. ORMs (Sequelize, Prisma, SQLAlchemy) use parameterization by default. Additionally: run DB user with least privilege (SELECT only on product table), use WAF, add input length limits.',
        xp: 140
      },
      {
        id:'cs005_q3',
        question: 'How should the company respond immediately after discovering the breach?',
        options: ['Wait for legal guidance before notifying anyone', 'Contain breach → forensic analysis → notify affected users → notify authorities (GDPR: 72 hrs) → offer credit monitoring → patch vulnerabilities', 'Keep it quiet', 'Only notify large customers'],
        answer: 1,
        explanation: 'Breach response: (1) Contain: revoke compromised access, take vulnerable systems offline, (2) Assess: scope of data stolen, (3) Notify: GDPR requires 72-hour authority notification, affected users ASAP, (4) Remediate: force password resets, patch vulnerabilities, (5) Monitor: watch for fraudulent activity.',
        xp: 120
      },
      {
        id:'cs005_q4',
        question: 'What would have detected the breach earlier?',
        options: ['More developers', 'SIEM system monitoring for unusual query patterns, data exfiltration volumes, off-hours access, and alerts on large SELECT queries', 'Annual security audits', 'More servers'],
        answer: 1,
        explanation: 'Early detection via: SIEM (Security Information and Event Management — Splunk, ELK Stack), database activity monitoring, anomaly detection (unusual query volumes, off-hours access, SELECT * without WHERE), network egress monitoring for large data transfers. The 3-month detection gap is catastrophic — breach dwell time industry average is 197 days.',
        xp: 160
      },
      {
        id:'cs005_q5',
        question: 'What is "defense in depth" and how should FinData implement it?',
        options: ['Having many developers', 'Multiple independent security layers — parameterized queries + WAF + least privilege DB user + network segmentation + encryption + monitoring + patch management', 'A firewall only', 'Encryption only'],
        answer: 1,
        explanation: 'Defense in depth: no single point of failure. Layers: (1) WAF blocks common attacks, (2) Input validation at API layer, (3) Parameterized queries at DB layer, (4) Least privilege DB accounts, (5) Network segmentation (DB not publicly accessible), (6) Encryption at rest + in transit, (7) Monitoring and alerting, (8) Regular penetration testing.',
        xp: 170
      }
    ]
  }
]

export const blogPosts = [
  {
    id: 'birth-of-git',
    title: 'The Birth of Git: A Crisis That Changed Software Forever',
    planet: 'git',
    author: 'GITGALAXY Archives',
    date: '2005-04-07',
    readTime: '8 min',
    heroEmoji: '🌿',
    sections: [
      {
        title: 'The Problem: BitKeeper and the Linux Kernel',
        content: `In 2002, the Linux kernel — the world's most ambitious open-source project — was using BitKeeper, a proprietary distributed version control system. Linus Torvalds chose it because it was the only tool fast enough to handle the kernel's massive, distributed development workflow. BitKeeper allowed thousands of developers worldwide to work on the kernel simultaneously, which was revolutionary for the time.

The arrangement worked because BitMover (BitKeeper's creator) offered free licenses to open-source projects. But in April 2005, this changed. A Linux developer reverse-engineered the BitKeeper protocol, violating its license. BitMover revoked free access to the Linux kernel project.

The Linux community was suddenly without a VCS tool capable of handling their workflow.`
      },
      {
        title: 'Linus Torvalds Takes Matters Into His Own Hands',
        content: `Linus Torvalds evaluated every existing version control system. His criteria were brutal: must handle the Linux kernel's 6.7 million lines of code, must support distributed workflows, must be fast (patching must take under 3 seconds), and must have strong data integrity guarantees.

Nothing met his standards. So on April 7, 2005 — just 10 days after the BitKeeper crisis — Linus began writing Git. His goals: speed as the primary design principle, simple design, strong support for non-linear development (thousands of parallel branches), fully distributed workflow, and ability to handle large projects.

The name "git" is British slang for an unpleasant person. Torvalds joked: "I'm an egotistical bastard, and I name all my projects after myself. First 'Linux', now 'git'."

In just 10 days of coding, Linus built a working prototype. The first commit to the Linux kernel using Git happened on June 16, 2005.`
      },
      {
        title: 'Why Git\'s Architecture is Brilliant',
        content: `Git\'s content-addressable storage is its superpower. Every file, directory, and commit is identified by a SHA-1 hash of its contents. This means:

• Data integrity is built in — you cannot modify a file without changing its hash
• Deduplication is automatic — identical files share storage
• The entire history is a Merkle tree — mathematically verifiable

Unlike centralized VCS (SVN, CVS) where history lives on one server, every Git clone IS the full repository. This means:
• No single point of failure
• Work offline with full history
• Fast operations (no network needed for log, diff, blame)
• Natural disaster recovery: any clone can restore the project`
      },
      {
        title: 'The Impact: Git Changes Everything',
        content: `Within 5 years, Git became the dominant VCS for all new projects. By 2022, over 90% of developers use Git. It enabled:

• GitHub (2008): Social coding, open-source collaboration at scale
• The open-source revolution: Contributing to any project worldwide
• Modern CI/CD: Branch-based workflows, PR reviews, automated testing
• DevOps culture: Infrastructure-as-code, GitOps
• The entire modern software development workflow

Linus Torvalds created Git to solve his own problem. In doing so, he accidentally revolutionized how all software is built.`
      }
    ]
  },
  {
    id: 'github-rise',
    title: 'GitHub: How Three Engineers Built the Heart of the Software World',
    planet: 'github',
    author: 'GITGALAXY Archives',
    date: '2008-04-10',
    readTime: '7 min',
    heroEmoji: '🐙',
    sections: [
      {
        title: 'The Founding: A Side Project That Changed Everything',
        content: `In October 2007, Chris Wanstrath, PJ Hyett, and Tom Preston-Werner were frustrated. Using Git was powerful but painful — there was no easy way to share, discover, or collaborate on Git repositories. They started building a solution as a side project on weekends.

On April 10, 2008, GitHub launched publicly. The core insight was revolutionary: what if code had a social layer? What if you could follow developers, fork projects with one click, and collaborate through pull requests?

Within one year: 46,000 public repositories. GitHub had become the place where software was built.`
      },
      {
        title: 'The Pull Request: GitHub\'s Greatest Invention',
        content: `GitHub's most impactful feature isn't hosting — it's the Pull Request workflow. Before GitHub, contributing to open-source meant emailing patches, subscribing to mailing lists, and navigating complex maintainer approval processes.

GitHub's PR workflow democratized contribution:
1. Fork any public repository
2. Make your changes on a branch
3. Open a Pull Request with a description
4. Discuss, review, iterate
5. Merge with one click

This workflow was so effective it became the standard for all software development — not just open-source. Companies now use it internally for all code review.`
      },
      {
        title: 'GitHub Actions: The CI/CD Revolution',
        content: `In 2019, GitHub launched Actions — built-in CI/CD pipelines defined in YAML files. The integration was perfect: code changes trigger automated workflows for testing, building, and deploying, all in the same place as the code.

GitHub Actions became one of the fastest-growing developer tools ever. It eliminated the friction of connecting external CI systems (Jenkins, CircleCI) and made automated testing accessible to every developer, even those working alone on small projects.`
      },
      {
        title: 'The Microsoft Acquisition: Controversy and Vindication',
        content: `In June 2018, Microsoft acquired GitHub for $7.5 billion — the largest acquisition of a developer-focused company in history. The reaction was split: many developers worried about Microsoft's historically hostile relationship with open source. Thousands moved repositories to GitLab in protest.

But the fears proved largely unfounded. Microsoft maintained GitHub's independence, kept it free for public repositories, and invested heavily: acquired npm (Node package manager), launched Copilot (AI pair programmer), Codespaces (cloud development environments), and expanded GitHub Education.

Today, GitHub hosts over 420 million repositories, 100+ million developers, and is home to virtually every major open-source project in the world.`
      }
    ]
  }
]

export const additionalCaseStudies: CaseStudy[] = [
  {
    id: 'cs006',
    title: 'The Kubernetes Migration That Saved $2M/Year',
    company: 'DataStream Analytics',
    scenario: 'Cloud Cost Optimization',
    category: 'devops',
    difficulty: 3,
    intro: 'DataStream was running 200 EC2 instances manually managed with Ansible. Infrastructure costs hit $4M/year with 30% average utilization. A Kubernetes migration project was proposed.',
    context: 'Current state: fixed EC2 instances always-on even at 10% load, 5-hour deploy cycles, 3 SREs spending 60% of time on maintenance, zero autoscaling, no container strategy. CTO approved a 6-month Kubernetes migration with $500K budget.',
    questions: [
      {
        id: 'cs006_q1',
        question: 'What is the first step before containerizing any application?',
        options: ['Start writing Dockerfiles immediately', 'Assess application architecture — identify stateful vs stateless services, external dependencies, port requirements, and config/secret needs', 'Set up the Kubernetes cluster', 'Hire Kubernetes consultants'],
        answer: 1,
        explanation: 'Container readiness assessment: stateless apps (API servers) containerize easily. Stateful apps (DBs) need careful handling (K8s StatefulSets or keep on managed services). Document dependencies, environment variables, config files, port bindings, and resource requirements. Twelve-factor app principles guide this assessment.',
        xp: 120
      },
      {
        id: 'cs006_q2',
        question: 'Which services should NOT be migrated to Kubernetes containers?',
        options: ['All services should move to K8s', 'Stateful databases (PostgreSQL, Redis) — keep on managed services (RDS, ElastiCache). K8s adds complexity for DBs without clear benefit over managed solutions', 'Only microservices should move', 'Legacy services only'],
        answer: 1,
        explanation: 'Databases on K8s add operational complexity (PersistentVolumes, StatefulSets, backup operators) without the cost benefits of containers. RDS Multi-AZ, automated backups, point-in-time recovery are worth the managed service premium. Focus K8s on stateless application workloads where autoscaling delivers value.',
        xp: 130
      },
      {
        id: 'cs006_q3',
        question: 'How does the team achieve the 30% → 80% utilization improvement?',
        options: ['Manual bin packing', 'Kubernetes Horizontal Pod Autoscaler (HPA) scales pods based on CPU/memory. Cluster Autoscaler adds/removes nodes. KEDA for event-driven scaling. Spot instances for batch workloads', 'More developers monitoring', 'Larger instance sizes'],
        answer: 1,
        explanation: 'HPA: scale pods when CPU > 70%. Cluster Autoscaler: remove nodes when pods can fit on fewer nodes, add nodes when pods are pending. Result: at 4AM (low traffic), cluster shrinks to 20 nodes. During business hours, expands to 80. Spot instances (70% cheaper) for batch/stateless workloads. VPA for right-sizing individual pods.',
        xp: 150
      },
      {
        id: 'cs006_q4',
        question: 'The team wants zero-downtime deploys. What K8s features enable this?',
        options: ['Restart all pods simultaneously', 'Rolling updates with readiness probes — new pod must pass health check before old pod terminates. PodDisruptionBudgets ensure minimum available replicas', 'Scale to zero then back up', 'Blue/green only'],
        answer: 1,
        explanation: 'Readiness probe: K8s only routes traffic to pods that return healthy. Rolling update: creates new pod → waits for readiness → terminates old pod. PodDisruptionBudget: `minAvailable: 2` prevents all pods being down simultaneously. Combined with preStop lifecycle hook for graceful drain. Result: deploys with zero dropped requests.',
        xp: 140
      },
      {
        id: 'cs006_q5',
        question: 'After 6 months, infra costs dropped to $2M. What accounted for the savings?',
        options: ['Cheaper cloud provider', 'Autoscaling reduced idle capacity, spot instances for batch jobs, right-sized containers vs overprovisioned VMs, and consolidating 200 EC2s into a smaller autoscaling node pool', 'Reduced team size', 'Fewer services'],
        answer: 1,
        explanation: 'Savings breakdown: Autoscaling (idle instances gone): $800K. Spot instances for non-critical workloads: $600K. Right-sizing (containers request exact CPU/memory): $400K. Reduced SRE toil (2.5 engineers freed for product work): $200K indirect savings. Kubernetes overhead (cert-manager, monitoring, ingress) added $100K but net savings: $2M annually.',
        xp: 160
      }
    ]
  },
  {
    id: 'cs007',
    title: 'The Git History Rewrite Disaster',
    company: 'OpenPayments Inc.',
    scenario: 'Security Incident + Recovery',
    category: 'git',
    difficulty: 3,
    intro: 'A developer accidentally committed production AWS credentials (access key + secret) to the public GitHub repository. The commit was pushed 6 minutes ago. AWS CloudTrail shows no unauthorized API calls yet.',
    context: 'The credentials have full AdministratorAccess to production AWS account ($500K/month in resources). GitHub search shows the commit is already indexed. The team has 5 engineers online. You are the senior engineer.',
    questions: [
      {
        id: 'cs007_q1',
        question: 'What is your FIRST action in the next 60 seconds?',
        options: ['Remove the credentials from the file and push', 'Immediately revoke/delete the compromised AWS credentials in IAM console — even if history is cleaned, the credentials are already compromised', 'Rewrite git history with BFG', 'Contact GitHub support'],
        answer: 1,
        explanation: 'Invalidate first — git history rewrite takes time and the credentials are already exposed. AWS IAM → access keys → delete/deactivate immediately. GitHub indexes commits within minutes. Bots scan GitHub continuously for credentials. Even after history rewrite, the original commit SHA may be cached. Rotate first, clean second.',
        xp: 200
      },
      {
        id: 'cs007_q2',
        question: 'After revoking credentials, how do you remove them from git history?',
        options: ['git rm the file and commit', 'BFG Repo Cleaner (simpler) or git filter-repo — both rewrite entire repository history to remove the sensitive data from all commits', 'git reset HEAD~1 only', 'Make the repo private'],
        answer: 1,
        explanation: 'BFG: `bfg --replace-text passwords.txt` or `bfg --delete-files secrets.env`. git filter-repo: more powerful, official git project. Both rewrite all commits containing the file. After rewrite: force push with `--force` to all branches and tags. Ask all team members to re-clone. Note: forks and caches may still have original history.',
        xp: 150
      },
      {
        id: 'cs007_q3',
        question: 'After cleaning history and rotating credentials, what AWS investigation is needed?',
        options: ['Nothing if no charges appeared', 'Review CloudTrail logs for all API calls with the compromised credentials. Check for: new IAM users created, S3 data accessed, EC2 instances launched, unusual regions', 'Just check the bill', 'Only check S3 buckets'],
        answer: 1,
        explanation: 'CloudTrail records every API call. Filter by the compromised access key. Look for: unauthorized resource creation (crypto mining EC2), data exfiltration (S3 GetObject on customer data), persistence mechanisms (new IAM users, backdoor policies). Check all regions including unusual ones. Even 6 minutes of exposure can mean data theft.',
        xp: 130
      },
      {
        id: 'cs007_q4',
        question: 'How do you prevent this from happening again?',
        options: ['Trust engineers more', 'Pre-commit hooks with detect-secrets/git-secrets block credential commits locally. GitHub secret scanning alerts immediately. Never use long-lived credentials — use IAM roles and short-lived tokens', 'Code review only', 'Read-only credentials in repos'],
        answer: 1,
        explanation: 'Multi-layer prevention: (1) detect-secrets pre-commit hook blocks commit if secrets detected, (2) GitHub secret scanning (automatic for all public repos), (3) AWS IAM best practices: no long-lived access keys for production, use IAM roles with temporary STS credentials instead, (4) gitguardian.com for monitoring, (5) Regular security training.',
        xp: 140
      },
      {
        id: 'cs007_q5',
        question: 'The incident took 45 minutes to resolve. What should the post-mortem focus on?',
        options: ['Blame the developer who committed', 'System failures: why were long-lived credentials being used at all? Why no pre-commit hooks? Why no automated secret scanning? Focus on policy and tooling improvements', 'Security policy reading requirement', 'Firing the developer'],
        answer: 1,
        explanation: 'Blameless post-mortem: the developer made a human error that the system should have prevented. Root causes: (1) Long-lived credentials existed (should use IAM roles), (2) No automated detection at commit time, (3) No GitHub secret scanning configured, (4) No least-privilege credential policy. Action items: IAM roles migration, mandatory pre-commit hooks, secret scanning alert policy.',
        xp: 110
      }
    ]
  },
  {
    id: 'cs008',
    title: 'Building a Multi-Region Disaster Recovery System',
    company: 'MediCore Health Platform',
    scenario: 'Architecture Design',
    category: 'cloud',
    difficulty: 3,
    intro: 'MediCore\'s platform serves 5 million patients. They have a single AWS us-east-1 deployment. During a 4-hour us-east-1 outage, the platform was completely unavailable. Regulatory compliance requires 99.99% uptime (< 1hr/year downtime).',
    context: 'Current: single region, RTO 8 hours, RPO 24 hours (daily backups). Required: RTO < 15 minutes, RPO < 1 minute (data loss). Budget: $500K/year infrastructure increase. HIPAA compliance required.',
    questions: [
      {
        id: 'cs008_q1',
        question: 'What do RTO and RPO mean in disaster recovery?',
        options: ['Routing and processing objectives', 'RTO (Recovery Time Objective): maximum time to restore service. RPO (Recovery Point Objective): maximum data loss measured in time. Lower is better but more expensive', 'Real-time operations metrics', 'Response time objectives'],
        answer: 1,
        explanation: 'RTO: "system must be back online within 15 minutes of an outage." RPO: "we can lose at most 1 minute of data." RTO drives recovery automation speed. RPO drives backup/replication frequency. Daily backup = RPO 24h (could lose 24h of data). Synchronous replication = RPO ~0. Cost rises exponentially as both decrease.',
        xp: 120
      },
      {
        id: 'cs008_q2',
        question: 'What AWS architecture achieves 15-minute RTO and 1-minute RPO?',
        options: ['Larger EC2 instances', 'Active-passive multi-region: primary us-east-1 with synchronous write to us-west-2. Automated Route53 health check failover. Aurora Global Database with < 1 second replication lag', 'More availability zones in one region', 'Better backups only'],
        answer: 1,
        explanation: 'Multi-region active-passive: Aurora Global Database replicates with <1s lag (RPO met). Route53 health check + automated failover to us-west-2 on primary failure. Pre-warmed EC2 instances in standby region (reduces RTO). CloudFormation/Terraform to ensure secondary region mirrors primary. Full active-active is more expensive but achieves RPO~0.',
        xp: 160
      },
      {
        id: 'cs008_q3',
        question: 'How do you test the disaster recovery plan without affecting production?',
        options: ['Test during actual disasters', 'Regular DR drills: quarterly failover tests to secondary region during off-peak hours. Chaos engineering: inject failures in staging. Document runbooks. Verify RTO/RPO metrics each test', 'Annual test is sufficient', 'Manual inspection of configs'],
        answer: 1,
        explanation: 'Untested DR plans fail when needed. Regular drills: (1) Quarterly automated failover to secondary region, (2) Measure actual RTO/RPO achieved, (3) Test data integrity after failback, (4) Review and update runbooks, (5) Game days: simulate region failure with full team. Chaos engineering (failure injection) in staging proactively discovers weaknesses.',
        xp: 140
      },
      {
        id: 'cs008_q4',
        question: 'HIPAA compliance requires specific data handling. What are the key requirements?',
        options: ['Just use HTTPS', 'Encryption at rest (AES-256) and in transit (TLS 1.2+), access logging, audit trails, minimum necessary access, BAA with AWS, regular security assessments, breach notification procedures', 'Passwords for all access', 'Two-factor authentication only'],
        answer: 1,
        explanation: 'HIPAA Technical Safeguards: (1) Access control: unique user IDs, emergency access procedures, automatic logoff, encryption. (2) Audit controls: hardware/software activity logs. (3) Integrity: data not improperly altered. (4) Transmission security: TLS. AWS is HIPAA-eligible if you sign a BAA (Business Associate Agreement). PHI must be encrypted — both at rest and in transit.',
        xp: 130
      },
      {
        id: 'cs008_q5',
        question: 'The secondary region costs $400K/year (80% of primary). How do you reduce this?',
        options: ['Remove the DR plan', 'Pilot light architecture: keep minimal services running in secondary (DB replication, key infra) but scale up app tier only during failover. Reduces cost to ~20% of primary', 'Use smaller instances', 'Switch cloud providers'],
        answer: 1,
        explanation: 'DR tiers by cost: Cold standby (just backups, RTO hours, cheapest) → Pilot light (minimal infra, RTO 15min, moderate) → Warm standby (scaled-down running copy) → Active-active (full capacity, RPO~0, most expensive). Pilot light for MediCore: Aurora Global DB always running (RPO met), app servers only launched during failover (RTO 10min). Reduces cost from $400K to $120K.',
        xp: 150
      }
    ]
  },
  {
    id: 'cs009',
    title: 'Debugging the Silent Data Corruption Bug',
    company: 'FinTrack Accounting SaaS',
    scenario: 'Production Bug Investigation',
    category: 'debugging',
    difficulty: 3,
    intro: 'FinTrack processes $2B in transactions monthly. Accountants started reporting that invoice totals were wrong by small amounts (off by $0.01 to $0.99). The bug appeared 3 months ago but was just reported. Auditors flagged 12,000 incorrect invoices.',
    context: 'Stack: Node.js API, PostgreSQL, React frontend. The bug doesn\'t appear in local testing. It\'s intermittent — some invoices are correct, others wrong. No errors in logs. Deployment history shows a dependency update 3 months ago.',
    questions: [
      {
        id: 'cs009_q1',
        question: 'Why might floating point arithmetic cause off-by-penny bugs in financial software?',
        options: ['Floating point is always accurate', 'IEEE 754 floating point cannot represent many decimal values exactly (0.1 + 0.2 = 0.30000000000000004). Financial calculations using float/double will accumulate rounding errors', 'Only JavaScript has this issue', 'Database stores floats differently'],
        answer: 1,
        explanation: 'Floating point: binary representation cannot exactly represent 0.1, 0.3, etc. `0.1 + 0.2` in JavaScript = `0.30000000000000004`. For currency: always use integer arithmetic (store cents not dollars), use PostgreSQL NUMERIC type (exact), or a Decimal library (decimal.js, big.js). Never `FLOAT` or JavaScript `number` for money.',
        xp: 170
      },
      {
        id: 'cs009_q2',
        question: 'How do you identify which dependency update introduced the bug?',
        options: ['Read all changelogs manually', 'git bisect: binary search through commits to find the regression. Combine with an automated test that verifies the calculation. Also check npm audit for the specific dep versions changed', 'Check npm registry manually', 'Ask the team'],
        answer: 1,
        explanation: '`git bisect start` → `git bisect bad` (current, broken) → `git bisect good v3.0.0` (known working) → git checks out midpoint. Run your calculation test. `git bisect good/bad` → git narrows down. Typically finds the commit in ~10 steps for 1000-commit range. `git bisect run ./test.sh` automates the process fully.',
        xp: 150
      },
      {
        id: 'cs009_q3',
        question: 'The bug is confirmed: a financial helper library changed its rounding behavior. How do you fix 12,000 incorrect invoices?',
        options: ['Manually correct each invoice', 'Write a migration script: recalculate all affected invoices with fixed library, compare old vs new values, store diff, create audit log, apply corrections in a database transaction', 'Notify accountants to fix manually', 'Archive affected invoices'],
        answer: 1,
        explanation: 'Data fix strategy: (1) Identify all affected records, (2) Calculate correct values, (3) Create audit trail of original vs corrected values, (4) Batch update in transactions with rollback on error, (5) Notify affected customers, (6) Update accounting records. Run in staging first. Keep original values in an audit log for compliance. Test correction script on small batch first.',
        xp: 140
      },
      {
        id: 'cs009_q4',
        question: 'How do you prevent this class of financial calculation bug in the future?',
        options: ['Be more careful with updates', 'Property-based testing for financial calculations (verify invariants on random inputs), use PostgreSQL NUMERIC not FLOAT, pin library versions, integration tests with known calculation outcomes', 'Manual testing on each deploy', 'Hire a financial QA team'],
        answer: 1,
        explanation: 'Defense-in-depth for financial calculations: (1) Unit tests with specific decimal edge cases (0.1+0.2, 1.005 rounding), (2) Property-based tests (fast-check, QuickCheck) verify invariants on random amounts, (3) Use NUMERIC(19,4) in PostgreSQL not FLOAT, (4) Use decimal.js or similar for JS calculations, (5) Integration tests comparing results against known-correct reference data.',
        xp: 130
      },
      {
        id: 'cs009_q5',
        question: 'How should this incident be communicated to customers?',
        options: ['Don\'t tell customers unless they ask', 'Proactive transparent disclosure: notify all 12,000 affected customers with specific impact (invoice #, amount corrected), what you\'re doing to fix it, and assurance it won\'t recur', 'Send a generic apology', 'Only notify if they contact support'],
        answer: 1,
        explanation: 'Financial data correctness is fundamental to customer trust. Proactive disclosure: individual notification per affected account, specific impact details (not vague), concrete fix description, corrected documents/records, compliance implications addressed, timeline for complete resolution. Hiding data errors destroys trust permanently when discovered later. B2B SaaS: this may have legal/contractual implications requiring immediate escalation.',
        xp: 110
      }
    ]
  },
  {
    id: 'cs010',
    title: 'The Microservices Migration Gone Wrong',
    company: 'RetailCore Platform',
    scenario: 'Architecture Incident',
    category: 'devops',
    difficulty: 3,
    intro: 'RetailCore started "breaking up the monolith" 18 months ago. They now have 47 microservices. Deployment frequency dropped from daily to weekly. Engineers spend more time on service coordination than features. System reliability decreased from 99.9% to 98.5%.',
    context: 'Original monolith: 1 codebase, 1 deploy, team knew it well. Current: 47 services, distributed tracing not implemented, 15 teams each owning services, no service catalog. P99 latency increased 400%. CTO says "we over-engineered this."',
    questions: [
      {
        id: 'cs010_q1',
        question: 'What warning signs should have indicated the migration was going wrong?',
        options: ['None, microservices always succeed', 'Deployment frequency dropping (more coordination overhead), latency increasing (distributed call chains), team cognitive load increasing, reliability decreasing — clear indicators of distributed systems complexity without the benefits', 'Just needs more engineers', 'Add more services to solve it'],
        answer: 1,
        explanation: 'Sam Newman\'s warning signs: (1) Distributed monolith (services coupled synchronously, deploy together), (2) Chatty services (service A calls B calls C calls D — 4x latency), (3) Shared databases (defeats service independence), (4) Teams don\'t own full service lifecycle. The goal was developer autonomy and independent deployment — if those aren\'t achieved, the cost isn\'t worth it.',
        xp: 140
      },
      {
        id: 'cs010_q2',
        question: 'With 47 services and no distributed tracing, how do you debug a slow user request?',
        options: ['Check each service log manually', 'Implement OpenTelemetry distributed tracing immediately — propagate trace context across services so you can see the full request path and where latency occurs', 'Add more logging', 'Hire more SREs'],
        answer: 1,
        explanation: 'OpenTelemetry: single SDK for traces, metrics, logs. Propagate `traceparent` header across HTTP/gRPC calls. Each service adds spans. Jaeger/Zipkin/Grafana Tempo visualizes the full trace: user request → service A (2ms) → service B (450ms bottleneck!) → service C (5ms). Without tracing in microservices, debugging is guesswork across log files.',
        xp: 160
      },
      {
        id: 'cs010_q3',
        question: 'What is a "distributed monolith" and why is it worse than either pattern?',
        options: ['A better version of monolith', 'Services that are deployed separately but must be deployed together (shared DB, synchronous coupling) — has the operational complexity of microservices without the independence benefits', 'A monolith on multiple servers', 'Microservices that share code'],
        answer: 1,
        explanation: 'Distributed monolith: worst of both worlds. No independent deployability (team A must coordinate with teams B, C, D for every release). Network latency added to every call. Partial failures possible. But no developer autonomy because of tight coupling. Fix: identify which services are truly independent vs just the monolith split over the network, and merge the coupled ones back.',
        xp: 150
      },
      {
        id: 'cs010_q4',
        question: 'The CTO suggests merging some services back. Which services should be merged first?',
        options: ['All services back to monolith', 'Services with high coupling (frequently deployed together, sharing databases, synchronous call chains). Keep services that are truly independent with different scaling needs', 'Services owned by the same team', 'The smallest services'],
        answer: 1,
        explanation: 'Merge candidates: services that (1) are always deployed together, (2) share a database, (3) have synchronous call chains with no independent value. Strangler Fig in reverse. Keep separate: services with genuinely different scaling needs (auth service: 100K req/s vs report service: 10 req/s), different reliability requirements, different technology needs, or genuinely separate team ownership.',
        xp: 130
      },
      {
        id: 'cs010_q5',
        question: 'What should RetailCore have done before starting the microservices migration?',
        options: ['Just do it, iterate later', 'Define what problem microservices solve for them specifically (independent deployability? Scaling? Team autonomy?), start with modular monolith, extract services only when the seams are clear and teams are ready', 'Hire a microservices consultant', 'Rewrite everything first'],
        answer: 1,
        explanation: 'Martin Fowler: "Don\'t start with microservices." Start with: (1) Modular monolith (well-structured internal modules), (2) Identify actual pain points (which parts need independent scaling? which teams are blocked?), (3) Extract service only when the seam is clear and stable. Prerequisites for microservices: CI/CD pipeline, distributed tracing, service mesh, or mature DevOps culture. Microservices done wrong create organizational complexity, not solve it.',
        xp: 170
      }
    ]
  }
]

// allCaseStudies merges both arrays — import both caseStudies + additionalCaseStudies in consuming code
