import { Topic } from '@/types';

export const githubTopic: Topic = {
  id: 'github',
  name: 'GitHub',
  icon: '🐙',
  color: 'bg-gray-100 dark:bg-gray-800/50',
  textColor: 'text-gray-700 dark:text-gray-300',
  borderColor: 'border-gray-300 dark:border-gray-600',
  description: 'GitHub is the world\'s largest code hosting platform — version control, collaboration, and automation.',
  levels: [
    {
      level: 'beginner',
      intro: 'Learn Git fundamentals, what GitHub adds, and how to start contributing.',
      sections: [
        {
          title: 'Git vs GitHub',
          explanation:
            'Git is a version control system — it tracks changes in your code over time. GitHub is a cloud platform that hosts Git repositories and adds collaboration features (pull requests, issues, code review). Git is the tool; GitHub is the service.',
          realWorldExample:
            'Every professional developer uses Git daily. It is like Google Docs version history but for code — you can see who changed what, when, and why. You can revert any mistake.',
          practicalUseCase:
            'Install Git, configure your name and email, create a repository, and make your first commit.',
          codeExample: `# Initial setup (do this once)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Create a new repository
mkdir myproject && cd myproject
git init

# Stage and commit files
git add README.md          # Stage one file
git add .                  # Stage all changes
git commit -m "feat: add initial README"

# Connect to GitHub
git remote add origin https://github.com/yourname/myproject.git
git push -u origin main

# Check what changed
git status                 # See staged/unstaged changes
git diff                   # See what changed in files
git log --oneline          # See commit history`,
          exercise:
            'Create a new repo on GitHub, clone it locally, create a README.md, commit it, and push it. View the commit on GitHub.',
        },
        {
          title: 'Branches & Pull Requests',
          explanation:
            'A branch is an independent line of development. You create a branch for a feature, work on it without affecting the main code, then merge it back via a Pull Request. PRs allow teammates to review your code before it is merged.',
          realWorldExample:
            'Every professional team uses feature branches. "feature/user-login", "bugfix/cart-crash", "chore/update-dependencies" — all in separate branches, all reviewed before merging to main.',
          practicalUseCase:
            'Create a feature branch, make changes, push it, and open a Pull Request on GitHub.',
          codeExample: `# Create and switch to a new branch
git checkout -b feature/user-login

# Make changes... then commit
git add .
git commit -m "feat: add login form component"
git commit -m "feat: add auth API integration"

# Push branch to GitHub
git push -u origin feature/user-login

# After PR is merged — clean up
git checkout main
git pull origin main           # Get the merged changes
git branch -d feature/user-login  # Delete local branch

# Useful branch commands
git branch          # List local branches
git branch -a       # List all (including remote)
git log --oneline --graph --all  # Visual branch history`,
          exercise:
            'Create two branches from main, make different changes on each, push both, and open PRs. Merge one and observe what happens.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the difference between git merge and git rebase?',
          answer:
            'git merge combines two branches by creating a merge commit, preserving the full history. git rebase rewrites commits from one branch on top of another — creating a cleaner, linear history. Use merge for long-lived branches (main); rebase for short feature branches before merging.',
        },
        {
          question: 'What is a .gitignore file?',
          answer:
            '.gitignore tells Git which files to ignore (not track). Common entries: node_modules/, .env (secrets), dist/ (build output), .DS_Store (macOS metadata), *.log. The file is committed to the repository so everyone on the team ignores the same files.',
        },
      ],
    },
    {
      level: 'intermediate',
      intro: 'Advanced Git workflows, GitHub Actions, and collaborating on open source.',
      sections: [
        {
          title: 'Advanced Git Commands',
          explanation:
            'Beyond basic commits: stash saves uncommitted work temporarily, cherry-pick applies specific commits from another branch, revert safely undoes a commit, reset moves the HEAD pointer (use with caution on shared branches).',
          realWorldExample:
            'You are mid-feature when an urgent bug is reported. git stash saves your in-progress work, you switch branches to fix the bug, commit, then git stash pop resumes your feature work.',
          practicalUseCase:
            'Practice git stash, git cherry-pick, and resolving a merge conflict.',
          codeExample: `# Stash — save work without committing
git stash push -m "WIP: half-done login form"
git stash list                    # See all stashes
git stash pop                     # Restore latest stash

# Cherry-pick — apply a specific commit to current branch
git log --oneline other-branch    # Find the commit hash
git cherry-pick abc1234           # Apply it here

# Revert — safe undo (creates a new commit)
git revert HEAD                   # Undo last commit safely
git revert abc1234                # Undo specific commit

# Reset — dangerous, rewrites history
git reset --soft HEAD~1   # Undo commit, keep changes staged
git reset --hard HEAD~1   # Undo commit AND discard changes!

# Fix last commit message
git commit --amend -m "fix: correct the commit message"

# Interactive rebase — rewrite/squash last 3 commits
git rebase -i HEAD~3`,
          exercise:
            'Take 3 small commits, squash them into one clean commit using interactive rebase. Write a good commit message.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the GitFlow branching strategy?',
          answer:
            'GitFlow uses: main (production), develop (integration), feature/* (new features), release/* (pre-release stabilisation), hotfix/* (urgent production fixes). Complex but gives structure to large teams. Simpler alternatives: GitHub Flow (just main + feature branches) is preferred for most teams today.',
        },
        {
          question: 'How do you resolve a merge conflict?',
          answer:
            'Git marks conflicting sections with <<<<<<<, =======, >>>>>>>. You manually edit the file to choose the correct code (or combine both), remove the conflict markers, stage the file with git add, and complete the merge with git commit. Use a visual merge tool (VS Code, IntelliJ) to make this easier.',
        },
      ],
    },
    {
      level: 'advanced',
      intro: 'GitHub Actions, security scanning, protected branches, and contributing to open source.',
      sections: [
        {
          title: 'Contributing to Open Source',
          explanation:
            'Contributing to open source is one of the best ways to grow as a developer. The process: Fork (copy to your account), Clone (download locally), create a branch, make changes, push, open a PR to the original repo. Following the project\'s CONTRIBUTING.md and code style is essential.',
          realWorldExample:
            'Thousands of developers contribute to projects like VS Code, React, Laravel. A bug fix or documentation improvement you submit could be used by millions of developers.',
          practicalUseCase:
            'Find a project with "good first issue" label. Fork it, fix the issue, and open a PR.',
          codeExample: `# Fork on GitHub (click Fork button)

# Clone YOUR fork
git clone https://github.com/yourname/react.git
cd react

# Add upstream (original repo) as a remote
git remote add upstream https://github.com/facebook/react.git

# Create a branch
git checkout -b fix/typo-in-docs

# Make your change...
# Commit with a descriptive message following project conventions
git commit -m "docs: fix typo in useMemo documentation"

# Push to YOUR fork
git push origin fix/typo-in-docs

# Open Pull Request on GitHub: base=facebook/react:main, compare=yourname:fix/typo-in-docs

# Keep your fork up to date
git fetch upstream
git checkout main
git merge upstream/main
git push origin main`,
          exercise:
            'Find a typo or outdated example in the documentation of any open-source project. Fix it and open a PR.',
        },
      ],
      interviewQA: [
        {
          question: 'What is semantic versioning?',
          answer:
            'Semantic versioning uses MAJOR.MINOR.PATCH format. PATCH (1.0.1): bug fix, backwards compatible. MINOR (1.1.0): new feature, backwards compatible. MAJOR (2.0.0): breaking change. Most npm packages follow this. "^1.2.3" in package.json means "compatible with 1.2.3" (allows minor and patch updates).',
        },
        {
          question: 'What is a GitHub Action and how does a workflow differ from a job?',
          answer:
            'A workflow is the entire automation file (.yml). It contains one or more jobs. Jobs run in parallel by default (or sequentially if you set "needs:"). Each job runs in a fresh virtual machine. Jobs contain steps — individual commands or action references (uses:).',
        },
      ],
    },
  ],
};
