import { Topic } from '@/types';

export const agileTopic: Topic = {
  id: 'agile',
  name: 'Agile',
  icon: '🔄',
  color: 'bg-purple-100 dark:bg-purple-900/30',
  textColor: 'text-purple-700 dark:text-purple-300',
  borderColor: 'border-purple-300 dark:border-purple-700',
  description: 'Agile is an iterative, collaborative approach to building software — fast feedback, adaptability, and team alignment.',
  levels: [
    {
      level: 'beginner',
      intro: 'Understand the Agile mindset, the Manifesto, and why it replaced Waterfall.',
      sections: [
        {
          title: 'What is Agile?',
          explanation:
            'Agile is a way of working that delivers software in small, frequent increments rather than one big release at the end. Teams work in short cycles (sprints), get feedback early, and adapt. The four core values from the Agile Manifesto guide the entire approach.',
          realWorldExample:
            'Spotify plans its product in "bets" — small experiments shipped in 2-week cycles. If users love a feature, they invest more. If users don\'t engage, they pivot. No 2-year roadmap carved in stone.',
          practicalUseCase:
            'Read the Agile Manifesto (agilemanifesto.org) and discuss: which values conflict with how most companies actually work?',
          codeExample: `# The 4 Agile Values (Manifesto):

1. Individuals and interactions   > Processes and tools
   (People solve problems — not JIRA tickets and rigid processes)

2. Working software               > Comprehensive documentation
   (Ship something users can use — not 200-page specs)

3. Customer collaboration         > Contract negotiation
   (Build what users need — not what was written 6 months ago)

4. Responding to change           > Following a plan
   (Adapt when requirements change — not "that's out of scope")

# The 12 Agile Principles (summary):
- Deliver working software frequently (weeks, not months)
- Welcome changing requirements
- Business people and developers work together daily
- Build projects around motivated individuals
- Face-to-face conversation is most efficient
- Working software is the primary measure of progress
- Sustainable pace (no death marches)
- Continuous attention to technical excellence
- Simplicity — maximising the work NOT done
- Self-organising teams
- Regular retrospectives to improve`,
          exercise:
            'Identify 3 ways your current/hypothetical team violates Agile values. Propose realistic improvements.',
        },
        {
          title: 'Scrum Framework',
          explanation:
            'Scrum is the most popular Agile framework. Key concepts: Sprint (2-week work cycle), Product Backlog (prioritised list of features), Sprint Backlog (work committed for this sprint), Daily Standup (15-min daily sync), Sprint Review (demo to stakeholders), Sprint Retrospective (team reflection).',
          realWorldExample:
            'A startup building an app: Sprint 1 — user login/registration. Sprint 2 — basic dashboard. Sprint 3 — payment integration. Each sprint ships working software that stakeholders can review.',
          practicalUseCase:
            'Write a set of user stories for a simple online library app. Prioritise them and define a first sprint.',
          codeExample: `# User Story format:
# "As a [who], I want [what], so that [why]"

# Epic: User Authentication
Story 1: As a user, I want to register with email and password so I can access my account.
  Acceptance Criteria:
  - Email must be valid format
  - Password must be 8+ characters
  - Confirmation email is sent
  - Duplicate email shows clear error
  Story Points: 5

Story 2: As a user, I want to log in so I can see my dashboard.
  Acceptance Criteria:
  - Login with email + password
  - "Remember me" option
  - Locked after 5 failed attempts
  Story Points: 3

Story 3: As a user, I want to reset my password via email.
  Story Points: 3

# Sprint 1 Plan (velocity = 10 points):
  ✅ Story 1 (5 pts) + Story 2 (3 pts) = 8 pts ← committed
  📋 Story 3 (3 pts) ← in backlog, may pull in if ahead`,
          exercise:
            'Write 5 user stories for a food delivery app. Estimate each in story points and plan a sprint with a velocity of 13 points.',
        },
      ],
      interviewQA: [
        {
          question: 'What is a Sprint Retrospective?',
          answer:
            'A Retrospective is a meeting at the end of each sprint where the team reflects on their process (not the product). Three questions: What went well? What did not go well? What will we do differently next sprint? The goal is continuous improvement of the team\'s way of working.',
        },
        {
          question: 'What is the difference between Agile and Scrum?',
          answer:
            'Agile is a philosophy — a set of values and principles. Scrum is a specific framework for implementing Agile. Other frameworks include Kanban, SAFe, LeSS, and XP (Extreme Programming). You can do Agile without Scrum, but most teams use Scrum as their Agile framework.',
        },
        {
          question: 'What is the Definition of Done (DoD)?',
          answer:
            'DoD is a shared checklist that must be completed before any story is considered "done". Typical DoD: code written, unit tests pass, code reviewed by peer, acceptance criteria met, deployed to staging, documentation updated. DoD prevents "90% done" syndrome.',
        },
      ],
    },
    {
      level: 'intermediate',
      intro: 'Kanban, estimation, ceremonies, and handling real-world Scrum challenges.',
      sections: [
        {
          title: 'Kanban vs Scrum',
          explanation:
            'Kanban is a visual workflow management method. Work items flow through stages (To Do → In Progress → Review → Done) on a Kanban board. No fixed sprints — work is pulled continuously. Great for support teams and maintenance work where priorities change frequently.',
          realWorldExample:
            'A DevOps team uses Kanban (not Scrum) because production issues arrive unpredictably. A product team building new features uses Scrum because they plan 2-week increments.',
          practicalUseCase:
            'Set up a Kanban board in Trello or GitHub Projects for a small project. Add WIP (Work In Progress) limits.',
          codeExample: `# Kanban Board columns:
┌──────────┬──────────────┬──────────┬──────────┬──────────┐
│ Backlog  │  In Progress │  Review  │ Testing  │   Done   │
│          │  (WIP: 3)    │ (WIP: 2) │ (WIP: 2) │          │
├──────────┼──────────────┼──────────┼──────────┼──────────┤
│ Story A  │   Story C    │ Story E  │ Story G  │ Story H  │
│ Story B  │   Story D    │          │          │ Story I  │
│ Story F  │   Story J    │          │          │ Story K  │
│ Story L  │              │          │          │          │
└──────────┴──────────────┴──────────┴──────────┴──────────┘

# WIP Limits prevent overloading — no more than 3 items
# can be "In Progress" at the same time.
# This forces the team to finish work before starting new work.

# Key Kanban metrics:
# - Cycle time: time from start to done
# - Lead time: time from request to done
# - Throughput: items completed per week`,
          exercise:
            'Apply WIP limits to a real (or simulated) team board. Run it for a week and calculate cycle time for each task.',
        },
        {
          title: 'Story Points & Velocity',
          explanation:
            'Story points are a relative measure of effort, complexity, and uncertainty — not time. A "5-point story" is 5x more complex than a "1-point story". Velocity is how many points a team averages per sprint. Use past velocity to predict how much fits in the next sprint.',
          realWorldExample:
            'A team with velocity 40 (points/sprint) has 100 points in the backlog. They forecast 2.5 sprints (~5 weeks) to finish. Product owners use this for roadmap planning.',
          practicalUseCase:
            'Play Planning Poker for a set of user stories with 3-4 people. Discuss disagreements to uncover hidden complexity.',
          codeExample: `# Planning Poker sequence: 1, 2, 3, 5, 8, 13, 21, ?, ∞

# Story: "As a user, I want to filter products by price range"
# Developer A: 3 points — slider UI + API call, straightforward
# Developer B: 8 points — need to handle currency conversion, mobile layout
# Developer C: 5 points

# Disagreement → discussion reveals:
# - B found a constraint others missed (currency)
# - Team agrees: 8 points

# Velocity calculation:
# Sprint 1: completed 38 pts
# Sprint 2: completed 41 pts
# Sprint 3: completed 37 pts
# Sprint 4: completed 44 pts
# Average velocity = (38 + 41 + 37 + 44) / 4 = 40 pts

# Sprint capacity = velocity × team availability factor
# (if 2 people on vacation this sprint: 40 × 0.8 = 32 pts)`,
          exercise:
            'Run a mock planning session for 10 user stories. Track velocity across 3 simulated sprints and predict when the backlog is done.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the role of a Product Owner in Scrum?',
          answer:
            'The Product Owner owns the Product Backlog — decides WHAT is built and WHY. They prioritise based on business value, user needs, and ROI. They write (or approve) user stories, accept completed work, and are the single decision-maker for the product. They balance stakeholder requests with team capacity.',
        },
        {
          question: 'What is the role of a Scrum Master?',
          answer:
            'The Scrum Master is a servant-leader who ensures the team follows Scrum correctly. They remove impediments (blockers), facilitate ceremonies, protect the team from outside interruptions, coach the team on Agile practices, and continuously improve the process. They do NOT manage the team or assign work.',
        },
      ],
    },
    {
      level: 'advanced',
      intro: 'Scaling Agile, SAFe, technical practices (TDD, CI/CD), and measuring Agile maturity.',
      sections: [
        {
          title: 'Agile at Scale — SAFe & LeSS',
          explanation:
            'When multiple teams need to coordinate, you need a scaling framework. SAFe (Scaled Agile Framework) and LeSS (Large-Scale Scrum) provide structures for 50-500 person product organisations. Key concept: Program Increment (PI) Planning — quarterly event where all teams align on the next 8-12 weeks of work.',
          realWorldExample:
            'A bank with 20 Scrum teams building a new digital banking platform uses SAFe. Every quarter, 200 people attend PI Planning to align on goals, identify dependencies between teams, and commit to quarterly objectives.',
          practicalUseCase:
            'Design a scaled Agile structure for a 50-person engineering organisation building an e-commerce platform. Define teams, team topologies, and coordination mechanisms.',
          codeExample: `# SAFe structure:
Team Level:
  - 6-12 people per team
  - 2-week sprints
  - Standard Scrum ceremonies

Program Level (Agile Release Train - ART):
  - 5-12 teams (50-125 people)
  - Aligned to a product/value stream
  - Program Increment (PI) = 4 sprints (8-10 weeks)
  - PI Planning: 2-day event every quarter

  Program ceremonies:
  - ART Sync (weekly cross-team standup)
  - System Demo (every sprint, integrated demo)
  - Inspect & Adapt (PI retrospective)

Large Solution Level:
  - Multiple ARTs coordinating
  - Solution Train Engineer (like a super Scrum Master)
  - Pre-PI / Post-PI Planning

Portfolio Level:
  - Strategic themes + Lean portfolio management
  - Epic Kanban board for large initiatives
  - OKRs aligned to ARTs`,
          exercise:
            'Design the quarterly PI Planning agenda for a hypothetical company. What would each time slot cover? Who attends?',
        },
      ],
      interviewQA: [
        {
          question: 'What is a Minimum Viable Product (MVP)?',
          answer:
            'An MVP is the smallest possible product that delivers value to early users and allows you to learn. It is NOT a prototype or half-built product. It is a real product with the smallest feature set that solves the core problem. Dropbox\'s MVP was a 2-minute demo video — it validated demand before writing a single line of code.',
        },
        {
          question: 'What are OKRs and how do they connect to Agile?',
          answer:
            'OKRs (Objectives and Key Results) set ambitious goals at the company/team level (quarterly). Objectives are qualitative (inspiring direction). Key Results are quantitative (measurable outcomes). In Agile, team backlogs are prioritised to achieve their OKRs. This connects day-to-day sprint work to strategic goals.',
        },
      ],
    },
  ],
};
