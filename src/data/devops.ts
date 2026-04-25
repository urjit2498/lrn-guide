import { Topic } from '@/types';

export const devopsTopic: Topic = {
  id: 'devops',
  name: 'DevOps',
  icon: '⚙️',
  color: 'bg-orange-100 dark:bg-orange-900/30',
  textColor: 'text-orange-700 dark:text-orange-300',
  borderColor: 'border-orange-300 dark:border-orange-700',
  description: 'DevOps bridges development and operations — CI/CD, Docker, Linux, and cloud deployment.',
  levels: [
    {
      level: 'beginner',
      intro: 'Understand DevOps culture, Linux basics, and why CI/CD matters.',
      sections: [
        {
          title: 'What is DevOps?',
          explanation:
            'DevOps is a culture and set of practices that brings developers (who write code) and operations teams (who deploy and run code) together. The goal: ship software faster, more reliably, and with fewer surprises. Key practices: automation, continuous integration, continuous delivery, monitoring.',
          realWorldExample:
            'Before DevOps: developers threw code "over the wall" to ops. Deployments happened once a month with big bang releases. Failures were common. After DevOps: Amazon deploys to production every 11.6 seconds with automated testing and rollbacks.',
          practicalUseCase:
            'Draw a simple DevOps pipeline: Code → Test → Build → Deploy → Monitor.',
          codeExample: `# A simple CI/CD pipeline story:

# 1. Developer pushes code to GitHub
git push origin feature/login

# 2. CI system (GitHub Actions) automatically:
#    - Installs dependencies
#    - Runs unit tests
#    - Runs linting
#    - Builds Docker image

# 3. If all checks pass → deploys to staging
# 4. After QA approval → deploys to production
# 5. Monitoring alerts if error rates spike

# This whole process takes ~10 minutes, automated
# No human needs to manually FTP files to a server`,
          exercise:
            'Map out the current deployment process for a hypothetical project. Identify manual steps that could be automated.',
        },
        {
          title: 'Linux Fundamentals for DevOps',
          explanation:
            'Most servers run Linux. DevOps engineers spend significant time in the terminal. Essential commands: file navigation, process management, permissions, networking, and log analysis.',
          realWorldExample:
            'A production server goes down at 2 AM. A DevOps engineer SSHes in, checks logs with tail -f /var/log/nginx/error.log, sees a disk full error, finds the culprit with du -sh /var/log/*, and fixes it.',
          practicalUseCase:
            'Practice the 20 most common Linux commands until they are muscle memory.',
          codeExample: `# Navigation
ls -la              # List files with permissions
cd /var/www/html    # Change directory
pwd                 # Print current directory

# File operations
cat app.log         # View file
tail -f app.log     # Follow live log output
grep "ERROR" app.log # Search in file
cp src dest         # Copy
mv old new          # Move/rename
rm -rf dir          # Delete directory (careful!)

# Processes
ps aux | grep node  # Find running processes
kill -9 PID         # Force kill a process
top / htop          # CPU/memory usage

# Network
curl https://api.example.com/health  # Test HTTP
netstat -tulpn      # Show listening ports
ss -tulpn           # Modern netstat

# Permissions
chmod 755 script.sh    # rwxr-xr-x
chown www-data:www-data /var/www/html

# Disk
df -h               # Disk space
du -sh /var/log/*   # Directory sizes`,
          exercise:
            'Write a shell script that checks if nginx is running, and if not, starts it and sends an alert email.',
        },
        {
          title: 'Docker — Containers',
          explanation:
            'Docker packages your application and all its dependencies into a container — a lightweight, isolated, portable unit. "It works on my machine" is no longer an excuse. The container runs the same everywhere: laptop, CI server, production.',
          realWorldExample:
            'A Node.js app that uses Node 18, specific npm packages, and environment variables. Instead of every team member manually installing the right Node version, they just run docker compose up and everything starts correctly.',
          practicalUseCase:
            'Dockerise a simple Express API: write a Dockerfile, build the image, run the container.',
          codeExample: `# Dockerfile — recipe for your app container
FROM node:20-alpine

WORKDIR /app

# Copy package files first (layer caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the app
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]

# Build and run
# docker build -t myapp:1.0 .
# docker run -p 3000:3000 --env-file .env myapp:1.0

# docker-compose.yml — for multi-container apps
version: '3.9'
services:
  api:
    build: .
    ports: ['3000:3000']
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on: [db]

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: myapp
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:`,
          exercise:
            'Dockerise the simple PHP app from the PHP section. Make sure MySQL is also in a container and they communicate.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the difference between a container and a virtual machine?',
          answer:
            'A VM virtualises the entire hardware and runs a full OS (GBs of overhead). A container shares the host OS kernel and only packages the application and its libraries (MBs). Containers start in seconds, VMs in minutes. Containers are lighter but offer less isolation.',
        },
        {
          question: 'What is CI/CD?',
          answer:
            'CI (Continuous Integration): developers merge code frequently, automated tests run on every push to catch bugs early. CD (Continuous Delivery): code that passes CI is automatically deployable. CD (Continuous Deployment): every passing build automatically deploys to production without manual approval.',
        },
        {
          question: 'What is an environment variable and why use it?',
          answer:
            'Environment variables store configuration outside the code (database passwords, API keys, feature flags). This means the same code runs in dev, staging, and production with different configs. Never hardcode secrets — use environment variables and a secrets manager in production.',
        },
      ],
    },
    {
      level: 'intermediate',
      intro: 'GitHub Actions CI/CD, Nginx, SSL, and basic cloud deployment.',
      sections: [
        {
          title: 'GitHub Actions — CI/CD Pipeline',
          explanation:
            'GitHub Actions automates your workflow using YAML files in .github/workflows/. On every push or PR, it can run tests, build your app, and deploy — all in GitHub, no external CI server needed.',
          realWorldExample:
            'Every open-source project on GitHub (React, Laravel, etc.) uses Actions. When you open a PR, tests run automatically. You can only merge if tests pass.',
          practicalUseCase:
            'Write a GitHub Actions workflow that installs dependencies, runs tests, and deploys to a VPS on push to main.',
          codeExample: `# .github/workflows/deploy.yml
name: Test & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm test

  deploy:
    needs: test           # Only deploy if tests pass
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to VPS via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.VPS_HOST }}
          username: \${{ secrets.VPS_USER }}
          key: \${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/myapp
            git pull origin main
            npm ci --only=production
            pm2 restart myapp`,
          exercise:
            'Add a step to the workflow that runs a Docker build and pushes the image to Docker Hub. Use GitHub Secrets for credentials.',
        },
        {
          title: 'Nginx — Web Server & Reverse Proxy',
          explanation:
            'Nginx (pronounced "engine-x") is a high-performance web server. In DevOps it is used as a reverse proxy: it sits in front of your Node/PHP app, handles HTTPS, serves static files, and load balances across multiple app instances.',
          realWorldExample:
            'Your Node app runs on port 3000 (not exposed to the internet). Nginx listens on port 443 (HTTPS), decrypts SSL, and forwards requests to port 3000. The internet only talks to Nginx.',
          practicalUseCase:
            'Set up Nginx on an Ubuntu server as a reverse proxy for a Node.js app, with SSL via Let\'s Encrypt.',
          codeExample: `# /etc/nginx/sites-available/myapp
server {
    listen 80;
    server_name myapp.com www.myapp.com;
    return 301 https://$host$request_uri;  # Force HTTPS
}

server {
    listen 443 ssl http2;
    server_name myapp.com www.myapp.com;

    ssl_certificate     /etc/letsencrypt/live/myapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;

    # Serve static files directly (faster)
    location /static/ {
        root /var/www/myapp/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Proxy to Node.js app
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable the site
# sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
# sudo certbot --nginx -d myapp.com
# sudo systemctl reload nginx`,
          exercise:
            'Configure Nginx to load balance between two instances of a Node app running on ports 3000 and 3001.',
        },
      ],
      interviewQA: [
        {
          question: 'What is a reverse proxy?',
          answer:
            'A reverse proxy is a server that sits in front of your application servers and forwards client requests to them. Benefits: SSL termination, load balancing, caching, rate limiting, DDoS protection. The client only talks to the proxy — it never connects directly to the app server.',
        },
        {
          question: 'What is the difference between horizontal and vertical scaling?',
          answer:
            'Vertical scaling: make the server bigger (more CPU, RAM). Simple but has limits and single point of failure. Horizontal scaling: add more servers behind a load balancer. More complex but no theoretical limit and resilient to individual server failures. Cloud-native apps are designed for horizontal scaling.',
        },
      ],
    },
    {
      level: 'advanced',
      intro: 'Kubernetes basics, monitoring, infrastructure as code, and cloud-native patterns.',
      sections: [
        {
          title: 'Kubernetes — Container Orchestration',
          explanation:
            'Kubernetes (K8s) manages containers at scale. You describe the desired state (3 replicas of my API, 1 database), and Kubernetes ensures it stays that way — automatically restarting failed containers, scaling on load, and deploying updates with zero downtime.',
          realWorldExample:
            'Spotify runs Kubernetes. When a song goes viral and 10x more users hit the API, K8s automatically spins up more API pods to handle the load, then scales down when traffic drops.',
          practicalUseCase:
            'Deploy a simple app to a local Kubernetes cluster (using minikube). Write a Deployment and Service manifest.',
          codeExample: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-api
spec:
  replicas: 3           # Always keep 3 instances running
  selector:
    matchLabels:
      app: myapp-api
  template:
    metadata:
      labels:
        app: myapp-api
    spec:
      containers:
      - name: api
        image: myregistry/myapp:1.2.0
        ports:
        - containerPort: 3000
        env:
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: host
        resources:
          requests: { memory: "128Mi", cpu: "100m" }
          limits:   { memory: "256Mi", cpu: "500m" }

---
# service.yaml — expose the deployment
apiVersion: v1
kind: Service
metadata:
  name: myapp-api-svc
spec:
  selector:
    app: myapp-api
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer

# Deploy: kubectl apply -f deployment.yaml
# Scale:  kubectl scale deployment myapp-api --replicas=5`,
          exercise:
            'Add a HorizontalPodAutoscaler that scales from 2 to 10 replicas based on CPU usage exceeding 70%.',
        },
      ],
      interviewQA: [
        {
          question: 'What is Infrastructure as Code (IaC)?',
          answer:
            'IaC manages infrastructure using code rather than manual processes. Tools: Terraform (cloud-agnostic), AWS CloudFormation, Pulumi. You define your servers, databases, networks in code files, check them into git, and apply them. Benefit: reproducible, version-controlled infrastructure.',
        },
        {
          question: 'What is observability and its three pillars?',
          answer:
            'Observability is the ability to understand a system\'s internal state from its external outputs. Three pillars: Logs (records of events — what happened), Metrics (numerical measurements — CPU, latency, error rate), Traces (track a request through distributed services — where the slowness is). Tools: Prometheus + Grafana, Datadog, New Relic.',
        },
      ],
    },
  ],
};
