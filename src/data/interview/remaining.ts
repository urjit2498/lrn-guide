// MongoDB, DevOps, GitHub, Agile, Laravel interview questions
import { InterviewTopic } from './types';

export const mongodbInterview: InterviewTopic = {
  beginner: [
    {
      question: "What is MongoDB and how is it different from MySQL?",
      answer: "MongoDB is a NoSQL document database. Instead of tables with rows and columns, it stores data as documents (JSON-like objects called BSON) in collections. No fixed schema — each document can have different fields. Key differences: no JOINs (embed or reference), flexible schema, horizontal scaling by default, BSON documents instead of rows.",
      example: "// MySQL row: rigid, every user must have same columns\n// | id | name  | age | country |\n// MongoDB document: flexible, each document can differ\n{ _id: ObjectId('...'), name: 'Alice', age: 28, skills: ['React', 'Node'] }\n{ _id: ObjectId('...'), name: 'Bob', company: 'Acme', verified: true }",
      use_case: "A product catalog where different product types have different attributes (a laptop has RAM/CPU, a shirt has size/color). MongoDB handles varying structures naturally without dozens of nullable columns.",
      follow_up: "When would you choose MongoDB over MySQL? What makes a data model a good fit for MongoDB?"
    },
    {
      question: "What is a document in MongoDB?",
      answer: "A document is the basic unit of data in MongoDB — similar to a row in SQL but much more flexible. Documents are stored as BSON (Binary JSON). They can contain nested objects, arrays, and different data types. Maximum size is 16MB. Each document must have a unique _id field (auto-generated ObjectId by default).",
      example: "{\n  _id: ObjectId('507f1f77bcf86cd799439011'),\n  name: 'iPhone 15 Pro',\n  price: 999,\n  specs: { storage: '256GB', color: 'Natural Titanium' }, // embedded document\n  tags: ['smartphone', 'apple', 'flagship'],               // array\n  reviews: [{ user: 'Alice', rating: 5, text: 'Great!' }]  // array of documents\n}",
      use_case: "Product detail page: one MongoDB document contains everything needed — no JOINs required. The entire product, its specs, and recent reviews are in one document.",
      follow_up: "What is the difference between embedding documents and referencing them? When do you choose each approach?"
    },
    {
      question: "What are the CRUD operations in MongoDB?",
      answer: "CRUD maps to: Create (insertOne, insertMany), Read (find, findOne), Update (updateOne, updateMany, replaceOne), Delete (deleteOne, deleteMany). MongoDB uses operators for partial updates: $set (set a field), $inc (increment), $push (add to array), $pull (remove from array), $unset (remove field).",
      example: "// Create\ndb.users.insertOne({ name: 'Alice', email: 'alice@test.com', role: 'user' });\n\n// Read\ndb.users.find({ role: 'admin' }).sort({ name: 1 }).limit(10);\n\n// Update — only update specific fields\ndb.users.updateOne(\n  { _id: userId },\n  { $set: { role: 'admin' }, $inc: { loginCount: 1 } }\n);\n\n// Delete\ndb.users.deleteOne({ email: 'spam@test.com' });",
      use_case: "A user management API: GET /users calls find(), POST /users calls insertOne(), PATCH /users/:id calls updateOne() with $set, DELETE /users/:id calls deleteOne().",
      follow_up: "What is the difference between updateOne with $set and replaceOne? What happens to other fields?"
    },
    {
      question: "What is the aggregation pipeline in MongoDB?",
      answer: "The aggregation pipeline processes documents through stages. Each stage transforms the data. Common stages: $match (filter — like WHERE), $group (aggregate — like GROUP BY), $sort (order), $project (select/reshape fields — like SELECT), $lookup (join another collection), $unwind (expand arrays), $limit, $skip.",
      example: "// Total sales by product category\ndb.orders.aggregate([\n  { $match: { status: 'completed' } },     // filter\n  { $unwind: '$items' },                    // expand items array\n  { $group: {\n    _id: '$items.category',\n    totalRevenue: { $sum: { $multiply: ['$items.price', '$items.qty'] } },\n    orderCount: { $sum: 1 }\n  }},\n  { $sort: { totalRevenue: -1 } },          // sort by revenue\n  { $limit: 10 }                            // top 10\n]);",
      use_case: "Analytics dashboard: daily active users by country, revenue by product category, top-performing salespeople — all using aggregation pipelines.",
      follow_up: "What is $facet in MongoDB aggregation? How does it allow multiple aggregation pipelines in parallel?"
    },
    {
      question: "What are MongoDB indexes?",
      answer: "Indexes in MongoDB work like SQL indexes — they speed up queries at the cost of more storage and slower writes. Types: Single field, Compound (multiple fields), Text (full-text search), Geospatial (location queries), Hashed (for sharding), TTL (auto-delete documents after a time). Without indexes, MongoDB does a collection scan — reads every document.",
      example: "// Create indexes\ndb.users.createIndex({ email: 1 }, { unique: true });       // unique index\ndb.users.createIndex({ createdAt: -1 });                     // sort by date\ndb.products.createIndex({ category: 1, price: -1 });         // compound\ndb.posts.createIndex({ title: 'text', body: 'text' });        // text search\ndb.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // TTL — auto-delete after 1 day\n\n// View query plan\ndb.users.find({ email: 'alice@test.com' }).explain('executionStats');",
      use_case: "User login: without an index on email, every login requires scanning all users. With an index, it's a microsecond lookup regardless of how many users exist.",
      follow_up: "What is a covered query in MongoDB? How does it eliminate the need to fetch the actual document?"
    },
    {
      question: "What is Mongoose and why do Node.js projects use it?",
      answer: "Mongoose is an ODM (Object Data Modeling) library for MongoDB in Node.js. It adds: schemas (structure to MongoDB's schema-less collections), validation (required fields, types, min/max), middleware (pre/post hooks), virtuals (computed fields), and a clean query API. It bridges MongoDB's flexibility with the structure applications need.",
      example: "const UserSchema = new mongoose.Schema({\n  name: { type: String, required: true, trim: true },\n  email: { type: String, required: true, unique: true, lowercase: true },\n  age: { type: Number, min: 18, max: 120 },\n  role: { type: String, enum: ['user', 'admin'], default: 'user' },\n  createdAt: { type: Date, default: Date.now }\n});\n\nUserSchema.index({ email: 1 });\nconst User = mongoose.model('User', UserSchema);\n\n// Usage\nconst user = await User.findOne({ email: 'alice@test.com' })\n  .populate('orders') // join orders collection\n  .select('-password'); // exclude password field",
      use_case: "Every MEAN/MERN stack app uses Mongoose. The User schema ensures every user has a valid email, minimum age, and consistent structure — even though MongoDB is schema-less.",
      follow_up: "What is virtual populate in Mongoose? What is the lean() option and when should you use it for performance?"
    }
  ],
  intermediate: [
    {
      question: "When should you embed vs reference documents in MongoDB?",
      answer: "Embed when: data is always accessed together, the embedded data has a small, bounded size, atomic updates on the parent document are needed. Reference when: data grows unbounded (a post with millions of comments), data is accessed independently (users referenced from many posts), the embedded data is large (could push document past 16MB limit).",
      example: "// EMBED: address always accessed with user, small, bounded\n{ name: 'Alice', address: { street: '123 Main', city: 'Mumbai' } }\n\n// REFERENCE: comments can be millions, accessed independently\n// Post document: { _id: postId, title: '...', authorId: userId }\n// Comments collection: { postId: postId, text: '...', userId: userId }\n// Use $lookup to join when needed\n\n// HYBRID: embed last 3 comments, reference the rest (performance + flexibility)\n{ title: '...', recentComments: [last3], commentCount: 1250 }",
      use_case: "A blog post embeds author details (name, avatar) to avoid a JOIN on every page load. But comments are referenced because a viral post could have 100k comments.",
      follow_up: "What is the 'document growth problem' in MongoDB? How does it affect storage and performance?"
    },
    {
      question: "How does MongoDB handle transactions?",
      answer: "MongoDB 4.0+ supports multi-document ACID transactions (single-server). MongoDB 4.2+ supports sharded transactions. Transactions use the same Start/Commit/Abort pattern as SQL. They're more expensive than single-document operations because MongoDB is optimized for document atomicity. Design your schema to minimize the need for transactions.",
      example: "const session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await Account.updateOne({ _id: fromId }, { $inc: { balance: -amount } }, { session });\n  const from = await Account.findById(fromId).session(session);\n  if (from.balance < 0) throw new Error('Insufficient funds');\n  await Account.updateOne({ _id: toId }, { $inc: { balance: amount } }, { session });\n  await session.commitTransaction();\n} catch (err) {\n  await session.abortTransaction();\n  throw err;\n} finally {\n  session.endSession();\n}",
      use_case: "Wallet transfer system, order placement (create order + decrement inventory), event tickets (reserve seat + create ticket record).",
      follow_up: "What is the performance overhead of multi-document transactions in MongoDB compared to single-document operations? How does schema design reduce the need for them?"
    },
    {
      question: "What is the difference between $lookup and embedding for joins in MongoDB?",
      answer: "$lookup is MongoDB's JOIN equivalent — it performs a left outer join between collections. It is less efficient than SQL JOINs because MongoDB wasn't designed for relational data. Multiple $lookups in one pipeline can be slow. Use embedding for frequently accessed related data. Use $lookup sparingly for reporting queries, not high-frequency API calls.",
      example: "// $lookup: join orders with users\ndb.orders.aggregate([\n  { $lookup: {\n    from: 'users',\n    localField: 'userId',\n    foreignField: '_id',\n    as: 'user'\n  }},\n  { $unwind: '$user' },\n  { $project: { 'user.password': 0 } } // exclude password\n]);\n\n// Uncorrelated subquery (MongoDB 3.6+) — more powerful\n{ $lookup: {\n  from: 'products',\n  let: { productIds: '$items.productId' },\n  pipeline: [\n    { $match: { $expr: { $in: ['$_id', '$$productIds'] } } },\n    { $project: { name: 1, price: 1 } }\n  ],\n  as: 'products'\n}}",
      use_case: "Analytics reports that need data from multiple collections. Not for high-frequency API endpoints — embed data there instead.",
      follow_up: "What is Atlas Search in MongoDB Atlas? When is it a better option than $lookup for search use cases?"
    }
  ],
  advanced: [
    {
      question: "How does MongoDB sharding work?",
      answer: "Sharding distributes data across multiple servers (shards). A shard key determines which shard a document belongs to. Components: mongos (router — directs queries), config servers (store cluster metadata), shards (each a replica set). Choosing the right shard key is critical: high cardinality (many values), even distribution, queries should include the shard key.",
      example: "// Shard by userId (high cardinality, even distribution)\nsh.shardCollection('mydb.orders', { userId: 'hashed' }); // hashed = even distribution\n\n// Good shard key: userId — most queries filter by userId\n// BAD shard key: status (only 3 values — creates 'hot shards')\n// BAD shard key: createdAt monotonically increasing — all inserts go to one shard!\n\n// Find which shard a document is on:\ndb.orders.find({ userId: ObjectId('...') }).explain();",
      use_case: "A social media platform with 10 billion posts that cannot fit on a single server. Sharding by userId distributes posts evenly across 20 shards.",
      follow_up: "What is a hotspot shard and what causes it? How do hashed shard keys prevent hotspots?"
    },
    {
      question: "What are Change Streams in MongoDB and how do you use them?",
      answer: "Change Streams allow applications to subscribe to real-time changes (inserts, updates, deletes) in a collection, database, or entire cluster. They use the oplog (operation log) internally. Great for: real-time dashboards, cache invalidation, audit logging, syncing to other systems. Require replica sets.",
      example: "// Watch for changes in the orders collection\nconst pipeline = [{ $match: { 'fullDocument.status': 'paid' } }];\nconst changeStream = db.collection('orders').watch(pipeline, { fullDocument: 'updateLookup' });\n\nchangeStream.on('change', (change) => {\n  switch (change.operationType) {\n    case 'insert': handleNewOrder(change.fullDocument); break;\n    case 'update': handleOrderUpdate(change.updateDescription); break;\n    case 'delete': handleOrderDelete(change.documentKey._id); break;\n  }\n});\n\n// Always handle resume tokens for reliability!\nchangeStream.on('change', (change) => {\n  const resumeToken = change._id;\n  // Save resumeToken to persist — resume from here if connection drops\n});",
      use_case: "Invalidate Redis cache when a MongoDB document is updated. Send real-time WebSocket notifications when an order status changes.",
      follow_up: "What is a resume token in MongoDB Change Streams and why must you persist it for production use?"
    }
  ]
};

export const devopsInterview: InterviewTopic = {
  beginner: [
    {
      question: "What is DevOps and what problem does it solve?",
      answer: "DevOps is a culture and set of practices that bridges the gap between Development (writing code) and Operations (deploying and running code). Before DevOps: Dev team threw code 'over the wall' to Ops — slow releases, finger-pointing when things broke. With DevOps: shared responsibility, automated pipelines, 'you build it, you run it', frequent small deployments.",
      example: "// Before DevOps:\nDev: 'Our code works in dev, it's Ops' problem now'\nOps: 'We didn't know about this change, the server config is wrong'\nResult: deployment every 3 months, high failure rate\n\n// With DevOps:\nSame team owns development + CI/CD + monitoring\nAutomated testing → automated deployment → automated alerts\nResult: Amazon deploys every 11.6 seconds",
      use_case: "A startup that moves from quarterly releases to daily releases by implementing DevOps practices — CI/CD pipelines, automated testing, and infrastructure as code.",
      follow_up: "What is the difference between CI, CD (Continuous Delivery), and CD (Continuous Deployment)?"
    },
    {
      question: "What is Docker and why is it used?",
      answer: "Docker packages an application and ALL its dependencies (code, runtime, libraries, config) into a container — a lightweight, portable, isolated unit. 'It works on my machine' is eliminated — the container runs identically everywhere. Docker solves dependency conflicts between apps on the same server and makes deployments predictable.",
      example: "# Dockerfile — recipe for a Node.js app container\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\n\n# Build the image\ndocker build -t myapp:1.0 .\n\n# Run it — same behavior on any machine\ndocker run -p 3000:3000 -e NODE_ENV=production myapp:1.0",
      use_case: "A team of 5 developers on Mac, Windows, and Linux all run the same app without 'it works on my machine' issues. The same Docker image runs in CI, staging, and production.",
      follow_up: "What is the difference between a Docker image and a container? What is a Dockerfile?"
    },
    {
      question: "What is CI/CD?",
      answer: "CI (Continuous Integration): developers merge code to a shared branch frequently (daily or more). Automated tests and builds run on every merge — catching bugs immediately. CD (Continuous Delivery): code that passes CI is always in a deployable state, deployment to production is a button click. CD (Continuous Deployment): every passing build automatically deploys to production — no human approval.",
      example: "// CI/CD Pipeline:\ngit push origin feature/login\n\n// Automatically triggers:\n1. Install dependencies (npm install)\n2. Run unit tests (npm test)  ← FAIL = block merge\n3. Run linting (npm run lint)\n4. Build Docker image\n5. Push to registry\n\n// CD: If all pass:\n6. Deploy to staging automatically\n7. Run E2E tests\n8. Deploy to production (auto or after approval)",
      use_case: "A development team finds bugs in production. With CI/CD, bugs are caught in automated tests before they ever reach production.",
      follow_up: "What is the difference between a CI pipeline and a CD pipeline? What tools are commonly used (GitHub Actions, GitLab CI, Jenkins, CircleCI)?"
    },
    {
      question: "What is the difference between a container and a virtual machine?",
      answer: "A VM virtualises the entire hardware stack — it includes a full OS kernel, OS binaries, and the application. VMs are GBs in size and take minutes to start. A container shares the HOST OS kernel — it only packages the app and its libraries. Containers are MBs in size and start in seconds. Containers are lighter but offer less isolation (shared kernel).",
      example: "// VM: Host OS → Hypervisor → Guest OS (2GB) → App\n// Container: Host OS → Docker Engine → App (50MB)\n\n// VM: Boot time 2-5 minutes, 2GB+ memory\n// Container: Start time <1 second, 50MB memory\n\n// Use case:\n// VMs: strong security isolation, different OSes, legacy apps\n// Containers: microservices, fast scaling, same OS family",
      use_case: "Running 100 microservices: VMs would need 100 full OS instances (200GB+ RAM). Containers share one OS kernel — 100 containers might use 10GB total.",
      follow_up: "What is container escape and why does it make containers less secure than VMs for multi-tenant environments?"
    },
    {
      question: "What is Kubernetes?",
      answer: "Kubernetes (K8s) is a container orchestration platform. It automates: deploying containers, scaling (adding more containers when load increases), self-healing (restarting failed containers), rolling updates (zero-downtime deployments), service discovery and load balancing. You declare desired state (3 replicas of my API) and Kubernetes ensures it stays that way.",
      example: "# Kubernetes deployment — 3 replicas always running\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-api\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: my-api\n  template:\n    spec:\n      containers:\n      - name: api\n        image: myapp:1.0\n        ports:\n        - containerPort: 3000\n# If any container dies, Kubernetes starts a new one automatically",
      use_case: "A payment service with 3 replicas. If one crashes, Kubernetes restarts it in seconds. During Black Friday, auto-scaling adds 20 more replicas. After sale, scales back down.",
      follow_up: "What is the difference between a Kubernetes Pod, Deployment, and Service?"
    },
    {
      question: "What is Infrastructure as Code (IaC)?",
      answer: "IaC manages infrastructure using code files instead of clicking through UIs or running commands manually. You define your servers, networks, databases in code (Terraform, CloudFormation, Pulumi), check it into git, review changes in PRs, and apply automatically. Benefits: version controlled, reproducible, reviewable, automated.",
      example: "# Terraform: create an AWS EC2 instance\nresource \"aws_instance\" \"web\" {\n  ami           = \"ami-0c55b159cbfafe1f0\"\n  instance_type = \"t3.medium\"\n  \n  tags = { Name = \"web-server\" }\n}\n\nresource \"aws_db_instance\" \"mysql\" {\n  engine         = \"mysql\"\n  instance_class = \"db.t3.micro\"\n  db_name        = \"myapp\"\n  username       = \"admin\"\n  password       = var.db_password\n}\n\n# Apply: terraform plan && terraform apply",
      use_case: "A startup destroys their staging environment every night (cost saving) and recreates it every morning with Terraform — exact same environment, takes 3 minutes.",
      follow_up: "What is idempotency in IaC? Why is it important that 'terraform apply' can be run multiple times safely?"
    },
    {
      question: "What is a Linux process and how do you manage it?",
      answer: "A process is a running instance of a program. Each has a PID (Process ID). Key commands: ps aux (list all processes), top/htop (interactive monitor), kill -9 PID (force kill), systemctl (manage system services), grep + kill to find and stop specific processes. Node.js/PHP apps run as processes managed by systemd or process managers.",
      example: "# Find a process\nps aux | grep node\n# Output: urjit  12345 10.0  1.2  node server.js\n\n# Kill it gracefully (SIGTERM — app can cleanup)\nkill 12345\n\n# Force kill (SIGKILL — immediate, no cleanup)\nkill -9 12345\n\n# Manage with systemd\nsystemctl start myapp\nsystemctl stop myapp\nsystemctl restart myapp\nsystemctl status myapp  # check if running\njournalctl -u myapp -f  # follow logs",
      use_case: "A Node.js process stops responding. SSH to the server, ps aux | grep node finds PID 5432, kill 5432 sends SIGTERM for graceful shutdown, systemctl restart myapp brings it back.",
      follow_up: "What is PM2 and why do Node.js developers use it instead of running node server.js directly?"
    },
    {
      question: "What is Nginx and what is it used for?",
      answer: "Nginx (engine-x) is a high-performance web server and reverse proxy. It is used as: web server (serve static files), reverse proxy (receive HTTPS, forward to app server on internal port), load balancer (distribute traffic across multiple app instances), SSL terminator (handle HTTPS, forward HTTP internally).",
      example: "# /etc/nginx/sites-available/myapp\nserver {\n    listen 443 ssl;\n    server_name api.myapp.com;\n    \n    ssl_certificate /etc/letsencrypt/live/api.myapp.com/fullchain.pem;\n    ssl_certificate_key /etc/letsencrypt/live/api.myapp.com/privkey.pem;\n    \n    location / {\n        proxy_pass http://127.0.0.1:3000;  # forward to Node.js\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n    \n    location /static/ {\n        root /var/www/myapp;\n        expires 1y;\n    }\n}",
      use_case: "Internet → Nginx (HTTPS 443) → Node.js app (HTTP 3000 internal). Nginx handles SSL, serves static files from disk, and proxies API calls to Node.js.",
      follow_up: "What is the difference between Nginx and Apache? Why is Nginx generally faster for high-concurrency scenarios?"
    }
  ],
  intermediate: [
    {
      question: "How do you implement a CI/CD pipeline with GitHub Actions?",
      answer: "GitHub Actions uses YAML workflow files in .github/workflows/. On events (push, PR, schedule), jobs run on virtual machines (ubuntu-latest, etc.). Each job has steps. Jobs can run in parallel or sequentially (needs: keyword). Common pattern: test → build → deploy with environment secrets for credentials.",
      example: "name: Deploy\non:\n  push:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: '20' }\n      - run: npm ci\n      - run: npm test\n  deploy:\n    needs: test  # wait for test job\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Deploy\n        run: |\n          ssh ${{ secrets.SERVER_USER }}@${{ secrets.SERVER_IP }} '\n            cd /app && git pull && pm2 restart all\n          '\n        env:\n          SSH_KEY: ${{ secrets.DEPLOY_KEY }}",
      use_case: "Every PR to main automatically runs tests. Merging to main triggers automatic deployment. Failed tests block the merge — bugs never reach production.",
      follow_up: "What are GitHub Actions reusable workflows and composite actions? How do you avoid duplicating CI logic across multiple repositories?"
    },
    {
      question: "What is Docker Compose and when do you use it?",
      answer: "Docker Compose defines and runs multi-container applications. A docker-compose.yml file describes all services (app, database, cache), their images, ports, environment variables, and networks. docker compose up starts everything. Ideal for development and testing environments. Not recommended for production (use Kubernetes or managed services).",
      example: "version: '3.9'\nservices:\n  api:\n    build: .\n    ports: ['3000:3000']\n    environment:\n      - NODE_ENV=development\n      - DB_HOST=mysql\n      - REDIS_HOST=redis\n    depends_on: [mysql, redis]\n    volumes:\n      - .:/app              # hot reload in dev\n  \n  mysql:\n    image: mysql:8.0\n    environment:\n      MYSQL_ROOT_PASSWORD: secret\n      MYSQL_DATABASE: myapp\n    volumes:\n      - mysql_data:/var/lib/mysql  # persist data\n  \n  redis:\n    image: redis:7-alpine\n\nvolumes:\n  mysql_data:",
      use_case: "New developer runs 'docker compose up' — entire app with MySQL and Redis starts in 30 seconds without installing anything locally. Consistent environment for the whole team.",
      follow_up: "What is the difference between Docker Compose and Kubernetes? When should you graduate from Docker Compose to Kubernetes?"
    },
    {
      question: "What are the key Linux commands every DevOps engineer must know?",
      answer: "File management: ls, cd, cat, tail, grep, find, chmod, chown, cp, mv, rm. Process: ps, top, kill, systemctl. Network: netstat/ss, curl, ping, dig, traceroute, iptables. Text processing: awk, sed, cut, sort, uniq, wc. Archives: tar, gzip. Performance: vmstat, iostat, free, df, du. Log analysis: tail -f, journalctl, grep with regex.",
      example: "# Investigate a server problem:\ntail -f /var/log/nginx/error.log    # live error logs\njournalctl -u myapp --since '1 hour ago'  # app logs\ndisk: df -h && du -sh /var/log/*     # check disk usage\nps aux --sort=-%cpu | head -20       # top CPU processes\nfree -h                               # memory\nnetstat -tulpn | grep :3000          # what's on port 3000\ncurl -I http://localhost:3000/health # test the endpoint",
      use_case: "Server is slow. In sequence: check CPU (top), check memory (free -h), check disk (df -h), check error logs (tail -f), check network connections (netstat).",
      follow_up: "What are cgroups and namespaces? How does Docker use them to implement container isolation?"
    },
    {
      question: "What is monitoring and observability? What is the difference?",
      answer: "Monitoring: watching known metrics — CPU, memory, error rate, response time. Alerting when a metric crosses a threshold. Tells you WHEN something is wrong. Observability: the ability to understand WHAT and WHY something went wrong by examining system outputs — Logs, Metrics, and Traces (the three pillars). Observable systems can be debugged even for novel failures.",
      example: "// Three pillars:\n// 1. Metrics (Prometheus): numbers over time\n//    - API response time p99: 245ms\n//    - Error rate: 0.1%\n//    - CPU: 68%\n\n// 2. Logs (ELK/Loki): events that happened\n//    - ERROR 2024-01-15 12:45:03 - Payment gateway timeout\n\n// 3. Traces (Jaeger/Zipkin): request flow across services\n//    - GET /checkout: 1200ms total\n//      - auth service: 45ms\n//      - product service: 200ms  \n//      - payment service: 900ms  ← bottleneck!",
      use_case: "CPU alert fires at 90%. Metrics show it spiked 10 minutes ago. Logs show a new deployment happened 11 minutes ago. Traces show the new code doing an N+1 query. Root cause found in 5 minutes.",
      follow_up: "What is the RED method (Rate, Errors, Duration) and USE method (Utilisation, Saturation, Errors) for monitoring?"
    }
  ],
  advanced: [
    {
      question: "How do you implement zero-downtime deployments?",
      answer: "Strategies: 1. Rolling deployment — replace instances one by one (Kubernetes default). 2. Blue-Green — run two identical environments, switch traffic atomically. 3. Canary — route small % of traffic to new version, gradually increase. 4. Feature flags — deploy code but feature is off, enable gradually. Requires: health checks, graceful shutdown (drain connections), backward-compatible DB changes.",
      example: "# Kubernetes rolling deployment\nstrategy:\n  type: RollingUpdate\n  rollingUpdate:\n    maxSurge: 1        # 1 extra pod during update\n    maxUnavailable: 0  # never reduce below desired count\n\n# Canary with Istio/Argo Rollouts:\nstepWeight: 5   # 5% traffic to new version\nstepWeight: 25  # 25%\nstepWeight: 50  # 50%\nstepWeight: 100 # 100% if metrics good\n\n# Blue-Green with load balancer:\n# Blue: current production (100% traffic)\n# Deploy to Green: test it\n# Switch LB to Green: instant traffic shift\n# Keep Blue for instant rollback",
      use_case: "A payment service update: canary deployment sends 5% of traffic. Error rate monitoring shows no increase. Gradually promote to 100% over 30 minutes. Zero user impact.",
      follow_up: "What is a feature flag and how does it decouple deployment from release? What tools implement feature flags (LaunchDarkly, Unleash)?"
    },
    {
      question: "How do you secure a Kubernetes cluster?",
      answer: "Key areas: RBAC (Role-Based Access Control — least privilege per service account), Network Policies (restrict pod-to-pod communication), Pod Security Standards (prevent privileged containers), Secrets management (external secrets — Vault, AWS Secrets Manager, not in etcd plaintext), Image scanning (Trivy, Snyk for vulnerabilities), Admission controllers (validating webhooks), mTLS (service mesh — Istio, Linkerd).",
      example: "# RBAC: read-only access for a service account\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: pod-reader\nrules:\n- apiGroups: [\"\"]\n  resources: [\"pods\"]\n  verbs: [\"get\", \"list\"]\n\n# Network policy: block all ingress except from frontend\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: api-policy\nspec:\n  podSelector:\n    matchLabels: { app: api }\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels: { app: frontend }",
      use_case: "A compromised container in a cluster should not be able to access other services, steal secrets, or escalate privileges. Proper RBAC + Network Policies contain the blast radius.",
      follow_up: "What is the principle of least privilege in Kubernetes? What is a service mesh and how does mTLS help security?"
    }
  ]
};

export const githubInterview: InterviewTopic = {
  beginner: [
    {
      question: "What is Git and what is GitHub?",
      answer: "Git is a distributed version control system — it tracks changes to files over time, lets multiple people collaborate, and allows reverting to any previous state. GitHub is a cloud platform that hosts Git repositories and adds collaboration features: Pull Requests (code review), Issues (bug tracking), Actions (CI/CD), and Project boards.",
      example: "# Git basics\ngit init                    # create a local repo\ngit add .                   # stage all changes\ngit commit -m 'feat: add login'  # save a snapshot\ngit log --oneline           # view history\ngit diff                    # see what changed",
      use_case: "Every professional developer uses Git daily. Without it, multiple developers would overwrite each other's work. Git's branching lets teams work in parallel safely.",
      follow_up: "What is the difference between git pull and git fetch? What is a remote repository?"
    },
    {
      question: "What is the difference between git merge and git rebase?",
      answer: "git merge combines two branches by creating a MERGE COMMIT — preserves the full history as-is (shows all the individual commits from both branches). git rebase rewrites commits from one branch on top of another — creates a CLEAN LINEAR HISTORY as if the feature was built on top of the latest main. Rule: never rebase shared/public branches.",
      example: "// MERGE: creates a merge commit, preserves history\ngit checkout main\ngit merge feature/login\n// History: A--B--C--M (M is merge commit, shows C and D)\n//                \\--D/\n\n// REBASE: replays commits on top of main\ngit checkout feature/login\ngit rebase main\n// History: A--B--C--D' (D' is D replayed on top of C)\n// Clean linear — as if you just started the feature on latest main",
      use_case: "A team using GitHub Flow rebases feature branches before merging to keep main's history clean and linear — easier to bisect bugs with git bisect.",
      follow_up: "What is an interactive rebase (git rebase -i)? How do you use it to squash multiple commits?"
    },
    {
      question: "What is a Pull Request?",
      answer: "A Pull Request (PR) is a request to merge your branch into another branch (usually main). It enables code review — teammates can see every line you changed, add comments, suggest improvements, and approve or request changes before the code is merged. PRs are the fundamental unit of collaboration in professional software development.",
      example: "// PR workflow:\ngit checkout -b feature/payment-integration\n// ... make changes ...\ngit add . && git commit -m 'feat: add Stripe payment'\ngit push origin feature/payment-integration\n// Open PR on GitHub: feature/payment-integration → main\n// Teammate reviews: adds comments, approves\n// CI passes: tests green\n// Merge!",
      use_case: "Every code change at professional companies goes through PR review. A senior developer catches a SQL injection vulnerability in a junior's PR before it reaches production.",
      follow_up: "What is a draft PR? What is the difference between 'Squash and merge', 'Rebase and merge', and regular 'Merge commit'?"
    },
    {
      question: "What is .gitignore?",
      answer: ".gitignore tells Git which files and folders to never track. Common entries: node_modules/ (auto-generated, huge), .env (contains secrets), dist/ or build/ (build output), .DS_Store (macOS metadata), *.log (log files). If a file is already tracked, adding it to .gitignore won't untrack it — use git rm --cached.",
      example: "# .gitignore\nnode_modules/\ndist/\nbuild/\n.env\n.env.local\n*.log\n.DS_Store\n.idea/\n*.swp",
      use_case: "A developer accidentally committed .env with API keys. Now the keys are in git history forever (even if deleted from the current state). .gitignore prevents this by ignoring .env from the start.",
      follow_up: "What do you do if you accidentally committed a secret to git? (hint: git filter-branch, BFG Repo Cleaner, rotate the keys)"
    },
    {
      question: "What is branching strategy? Explain GitHub Flow.",
      answer: "A branching strategy defines rules for how teams use branches. GitHub Flow (recommended for most teams): main is always deployable, every change starts on a short-lived feature branch (feature/description), PR is created when ready, CI runs, team reviews, merge to main, deploy. Simple, works well for continuous deployment.",
      example: "// GitHub Flow:\n1. git checkout -b fix/login-bug    # from main\n2. Make changes, commit\n3. git push origin fix/login-bug\n4. Open PR → main\n5. CI passes, peer approves\n6. Merge PR\n7. Auto-deploy to production\n8. Delete the branch\n\n// GitFlow (more complex — for versioned releases):\nmain → production code\ndevelop → integration branch\nfeature/* → feature branches\nrelease/* → release preparation\nhotfix/* → urgent production fixes",
      use_case: "A startup doing continuous deployment uses GitHub Flow — simple and fast. An enterprise with quarterly releases uses GitFlow for its structure.",
      follow_up: "What are the differences between GitHub Flow, GitFlow, and trunk-based development? What do large tech companies like Google use?"
    }
  ],
  intermediate: [
    {
      question: "How do you recover from common Git mistakes?",
      answer: "git commit --amend: fix the last commit message (only before push). git reset --soft HEAD~1: undo last commit, keep changes staged. git reset --hard HEAD~1: undo last commit, DISCARD changes (dangerous). git revert: create a new commit that undoes a previous commit (safe for shared branches). git stash: temporarily save uncommitted work. git reflog: see all recent HEAD positions — recover from almost any mistake.",
      example: "# Fix last commit message\ngit commit --amend -m 'fix: correct the message'\n\n# Undo last commit, keep changes staged\ngit reset --soft HEAD~1\n\n# Recover a 'lost' commit (reflog is your safety net)\ngit reflog                    # shows: abc1234 HEAD@{3}: commit: the lost work\ngit checkout abc1234          # recover it\n\n# Undo a merged commit (safe for shared branches)\ngit revert abc1234            # creates a new 'undo' commit",
      use_case: "Accidentally committed to main instead of a feature branch. git reset --soft HEAD~1 unstages the commit, create the branch, recommit — history saved.",
      follow_up: "What is the difference between git reset, git revert, and git restore? When is each appropriate?"
    },
    {
      question: "What is git stash and when do you use it?",
      answer: "git stash temporarily saves your uncommitted changes (both staged and unstaged) and reverts the working directory to the last commit. Use when: you need to switch branches urgently but aren't ready to commit, you want to test something on a clean state. git stash list shows all stashes. git stash pop restores and removes. git stash apply restores but keeps it.",
      example: "# Working on feature/payment, urgent bug comes in\ngit stash push -m 'WIP: half-done payment form'\n# Working directory is now clean\ngit checkout main\ngit checkout -b hotfix/login-crash\n# Fix the bug, commit, PR, merge\ngit checkout feature/payment\ngit stash pop  # restore your in-progress work\n\n# Multiple stashes\ngit stash list\n# stash@{0}: WIP: half-done payment form\n# stash@{1}: experiment I want to keep\ngit stash pop stash@{1}  # apply specific stash",
      use_case: "Daily workflow tool for switching context. Mid-feature, your team asks for a quick demo. Stash, show demo on main, pop back and continue.",
      follow_up: "What is the difference between git stash push and git stash? Can stash include untracked files?"
    },
    {
      question: "How do you use git bisect to find bugs?",
      answer: "git bisect does a binary search through commit history to find the exact commit that introduced a bug. You tell it a 'bad' commit (current state) and a 'good' commit (working state). Git checks out the middle commit. You test and mark good/bad. Git halves the search space each time — finds the culprit in log2(N) steps.",
      example: "git bisect start\ngit bisect bad              # current commit is broken\ngit bisect good v2.1.0      # version 2.1.0 worked fine\n\n# Git checks out middle commit\n# Run your test:\nnpm test\n# If test fails:\ngit bisect bad\n# If test passes:\ngit bisect good\n# Repeat until Git says: 'abc1234 is the first bad commit'\n\n# Automate it!\ngit bisect run npm test     # Git runs npm test on each commit automatically\ngit bisect reset            # return to HEAD when done",
      use_case: "A performance regression was introduced sometime in the last 200 commits. git bisect finds the exact commit in 7-8 steps (log2(200) ≈ 8) instead of manually checking 200 commits.",
      follow_up: "How does binary search make git bisect efficient? What is its time complexity compared to linear search?"
    }
  ],
  advanced: [
    {
      question: "How do you manage secrets and sensitive data in GitHub?",
      answer: "Never commit secrets. GitHub provides: Repository Secrets (Actions secrets, never exposed in logs), Environment Secrets (per-environment like staging/production), Dependabot Secrets. Use GitHub Secret Scanning to detect accidentally committed secrets and rotate immediately. For applications, use AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault instead of environment variables in production.",
      example: "# GitHub Actions — access secrets\nsteps:\n  - name: Deploy\n    env:\n      DB_PASSWORD: ${{ secrets.DB_PASSWORD }}  # never exposed in logs\n      API_KEY: ${{ secrets.STRIPE_KEY }}\n    run: ./deploy.sh\n\n# Detect secrets in code\nnpm install -g detect-secrets\ndetect-secrets scan > .secrets.baseline\ngit add .secrets.baseline\n\n# Pre-commit hook to prevent committing secrets\nnpm install --save-dev husky\n# Add detect-secrets scan to pre-commit hook",
      use_case: "A developer accidentally pushes a file with AWS credentials. GitHub Secret Scanning detects it within seconds, alerts the organization, and the credentials are rotated before anyone can exploit them.",
      follow_up: "What is secret rotation and why is it important? How do you implement automatic secret rotation?"
    },
    {
      question: "How do you implement advanced GitHub Actions workflows?",
      answer: "Advanced patterns: Matrix strategy (test on multiple Node versions/OSes simultaneously), Reusable workflows (DRY for CI across repos), Composite actions (group steps into one action), Job outputs (pass data between jobs), Caching (cache node_modules for speed), Concurrency groups (cancel outdated PR runs), Manual approval gates (require human approval for production).",
      example: "# Matrix: test on Node 18, 20, 22 × Ubuntu, macOS\nstrategy:\n  matrix:\n    node: [18, 20, 22]\n    os: [ubuntu-latest, macos-latest]\nruns-on: ${{ matrix.os }}\nsteps:\n  - uses: actions/setup-node@v4\n    with: { node-version: '${{ matrix.node }}' }\n\n# Caching for speed\n- uses: actions/cache@v3\n  with:\n    path: ~/.npm\n    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}\n\n# Concurrency: cancel outdated PR runs\nconcurrency:\n  group: ${{ github.workflow }}-${{ github.ref }}\n  cancel-in-progress: true",
      use_case: "A Node.js library must work on all LTS versions and across platforms. Matrix strategy runs 6 test combinations in parallel, catching version-specific bugs.",
      follow_up: "What is OIDC (OpenID Connect) in GitHub Actions? How does it enable passwordless cloud deployments to AWS/GCP/Azure?"
    }
  ]
};

export const agileInterview: InterviewTopic = {
  beginner: [
    {
      question: "What is Agile and what problem does it solve?",
      answer: "Agile is a set of values and principles for software development that prioritises delivering working software in small increments, welcoming changing requirements, and close collaboration with customers. It was created to solve Waterfall's main problem: spending 2 years building something users don't want, discovering the issues only at the end.",
      example: "// Waterfall (old way):\n// Requirements (3 months) → Design (2 months) → Build (6 months) → Test (3 months) → Deploy\n// Total: 14 months. Users see it for the first time. Needs were wrong from the start.\n\n// Agile:\n// Sprint 1 (2 weeks): login feature → deploy → get feedback\n// Sprint 2 (2 weeks): dashboard → deploy → get feedback\n// Feedback shapes every sprint. Users see working software every 2 weeks.",
      use_case: "Spotify ships features weekly, gets real user data, and adjusts. A competitor using Waterfall ships a product once a year that users may not want.",
      follow_up: "What are the 4 values of the Agile Manifesto? What are the 12 principles?"
    },
    {
      question: "What is Scrum?",
      answer: "Scrum is the most popular Agile framework. Key concepts: Sprint (2-week fixed iteration), Product Backlog (prioritised list of all features), Sprint Backlog (items committed for current sprint), Daily Standup (15-minute sync), Sprint Review (demo to stakeholders), Sprint Retrospective (team improves process). Three roles: Product Owner, Scrum Master, Development Team.",
      example: "// A Sprint cycle:\nMonday:\n  → Sprint Planning: pick items from backlog for next 2 weeks\n\nEvery day (15 minutes):\n  → Daily Standup: What did I do yesterday? What will I do today? Any blockers?\n\nDay 10 (end of sprint):\n  → Sprint Review: demo working software to stakeholders\n  → Sprint Retrospective: What went well? What to improve?\n\nDay 11:\n  → New Sprint begins immediately",
      use_case: "A fintech startup building a mobile banking app uses Scrum. Sprint 1: basic account view. Sprint 2: transfer money. Sprint 3: payment history. Each sprint delivers real, testable features.",
      follow_up: "What is the difference between Sprint Review and Sprint Retrospective? Who attends each?"
    },
    {
      question: "What is a User Story?",
      answer: "A user story describes a feature from the user's perspective in plain language: 'As a [who], I want [what], so that [why]'. It keeps the focus on user value, not technical implementation. User stories have acceptance criteria (conditions that must be met for it to be 'done') and story points (relative effort estimate).",
      example: "// User Story format:\n'As a registered user,\n I want to reset my password via email,\n so that I can regain access if I forget my password.'\n\nAcceptance Criteria:\n□ Clicking 'Forgot Password' shows an email input\n□ A reset link is sent within 2 minutes\n□ Link expires after 24 hours\n□ After reset, old password no longer works\n□ Invalid email shows 'Email not found' error\n\nStory Points: 5",
      use_case: "A product team writes all features as user stories. Developers build what the user needs, not what the engineer finds technically interesting.",
      follow_up: "What is the INVEST acronym for good user stories? (Independent, Negotiable, Valuable, Estimable, Small, Testable)"
    },
    {
      question: "What are the three Scrum roles?",
      answer: "Product Owner: owns the Product Backlog, decides WHAT to build and WHY, prioritises by business value, single decision-maker for the product. Scrum Master: servant-leader, ensures Scrum is followed, removes blockers/impediments, protects team from interruptions, coaches the team. Development Team: self-organising, cross-functional (dev, QA, design), decides HOW to build, owns Sprint commitments.",
      example: "// Who does what:\nProduct Owner:\n  - Writes and prioritises backlog\n  - Accepts/rejects completed stories\n  - Represents customer/business\n\nScrum Master:\n  - Facilitates ceremonies\n  - Removes blockers (e.g., gets server access for team)\n  - DOES NOT assign tasks or manage the team\n\nDevelopment Team:\n  - Self-organise: pick stories from sprint backlog\n  - All needed skills (fullstack, test, UX) in one team\n  - Commits as a TEAM to sprint goals",
      use_case: "The Scrum Master discovers the team is blocked because the client isn't providing feedback on designs. The SM escalates to the PO who gets client time scheduled — the team never had to break their focus.",
      follow_up: "Can the Scrum Master also be a developer on the same team? What are the conflicts?"
    },
    {
      question: "What is Sprint Velocity?",
      answer: "Velocity is how many story points a team completes per sprint on average. Calculated over last 3-6 sprints. Used to forecast: if backlog has 200 points and velocity is 40 points/sprint, expect ~5 sprints (10 weeks) to finish. Velocity is team-specific and for planning only — NOT a performance metric.",
      example: "// Sprint history:\nSprint 1: 38 points\nSprint 2: 42 points\nSprint 3: 39 points\nSprint 4: 41 points\n\nAverage velocity: (38+42+39+41) / 4 = 40 points/sprint\n\n// Capacity adjustment:\nIf 2 devs on vacation next sprint: 40 × 0.8 = 32 points\n\n// Common mistake: comparing velocity between teams\n// Team A: velocity 80 — uses large story points\n// Team B: velocity 20 — uses small story points\n// CANNOT compare — different scales!",
      use_case: "Product Owner asks 'when will the product be ready?'. Scrum Master calculates: 320 story points remaining ÷ 40 average velocity = 8 sprints = 16 weeks.",
      follow_up: "Why is it wrong to use velocity as a performance metric or to compare teams? What happens when management uses it to pressure teams?"
    },
    {
      question: "What is the Daily Standup (Daily Scrum)?",
      answer: "The Daily Standup is a 15-minute daily team synchronisation. Three questions: 1. What did I complete yesterday toward the Sprint Goal? 2. What will I do today toward the Sprint Goal? 3. Are there any blockers? It is NOT a status meeting for management — it is a planning and coordination tool for the development team. The Scrum Master keeps it on time.",
      example: "// Good standup (15 min max):\n'Yesterday: completed the login API and unit tests.\nToday: starting the JWT middleware.\nBlockers: None.'\n\n// BAD standup (goes 45 minutes):\n'Let me pull up my screen and show you the code...\nSo I was thinking we could use OAuth or JWT, and I read this article...'\n\n// Standup anti-patterns:\n- Reporting to manager (not team sync)\n- Deep technical discussions (take offline)\n- Absent members slowing it down\n- Going over 15 minutes",
      use_case: "Alice mentions she's blocked on an API contract from Bob. Bob says he finished it yesterday and forgot to share. 10 seconds of information saves Alice half a day of waiting.",
      follow_up: "What should happen when a blocker is raised in standup? Who is responsible for resolving it?"
    },
    {
      question: "What is Kanban and how is it different from Scrum?",
      answer: "Kanban is a visual workflow management method — work items flow through stages (Backlog → In Progress → Review → Done) on a board. No fixed sprints, no roles, no ceremonies. Work is pulled continuously. WIP (Work In Progress) limits prevent overloading. Scrum: fixed sprints, defined roles, planning ceremonies. Kanban: continuous flow, minimal process, flexible.",
      example: "// Kanban Board:\n| Backlog | In Progress (WIP: 3) | Review (WIP: 2) | Done |\n|---------|---------------------|-----------------|------|\n| Task E  | Task A              | Task C          | D,F  |\n| Task G  | Task B              |                 |      |\n|         | Task H              |                 |      |\n\n// WIP limit of 3: cannot start Task E until a slot opens in 'In Progress'\n// Forces team to FINISH before starting new work",
      use_case: "A DevOps/support team uses Kanban because production incidents arrive unpredictably. Scrum's 2-week sprints don't fit this 'always-on, interrupt-driven' work style.",
      follow_up: "What is the Cycle Time in Kanban? How is it different from Lead Time? Why are WIP limits powerful?"
    }
  ],
  intermediate: [
    {
      question: "What are Agile estimation techniques?",
      answer: "Planning Poker: team votes simultaneously on story points (1,2,3,5,8,13,21) — disagreements spark discussion revealing hidden complexity. T-Shirt Sizes: XS, S, M, L, XL for quick rough estimates. Bucket System: fast for large backlogs. #NoEstimates: count stories, not points (assumes average story is similar). Story points measure RELATIVE complexity, not hours.",
      example: "// Planning Poker:\nProduct Owner reads: 'User can filter products by price range'\n\nDeveloper A (backend): 3 pts — just a SQL WHERE clause\nDeveloper B (frontend): 8 pts — need price slider UI, mobile layout, URL state\nDeveloper C (QA): 5 pts — a few scenarios but straightforward\n\n// Disagreement! Discussion:\n→ B reveals: 'Did you account for the currency conversion needed?'\n→ Team now understands hidden complexity\n→ Consensus: 8 points after discussion\n\n// The DISCUSSION is more valuable than the number!",
      use_case: "Planning Poker reveals that what a Product Owner thought was a '2-point' feature is actually '13 points' because the team discovered 3 dependencies nobody had considered.",
      follow_up: "Why do we use Fibonacci numbers (1,2,3,5,8,13) instead of 1-10? What cognitive bias does this address?"
    },
    {
      question: "What is the Definition of Done (DoD) vs Acceptance Criteria?",
      answer: "Acceptance Criteria: specific conditions for a SINGLE user story to be accepted (defined by Product Owner per story). Definition of Done: a SHARED CHECKLIST applied to ALL stories — usually includes code review, unit tests passing, documentation updated, deployed to staging, no critical bugs. DoD prevents 'done' meaning different things to different people.",
      example: "// Acceptance Criteria (story-specific):\nStory: 'User can upload profile photo'\n□ Only jpg/png accepted\n□ Max 5MB\n□ Photo displayed immediately after upload\n□ Old photo is replaced\n\n// Definition of Done (applies to every story):\n□ Code merged to main\n□ Peer code reviewed and approved\n□ Unit tests written with >80% coverage\n□ No critical/high severity bugs\n□ Deployed to staging and smoke tested\n□ Product Owner has accepted the story",
      use_case: "Without DoD, developers consider a feature 'done' when code is written but tests are missing. With DoD, 'done' means code is reviewed, tested, and deployed to staging — no ambiguity.",
      follow_up: "What is the 'Definition of Ready' (DoR)? How does it pair with Definition of Done?"
    },
    {
      question: "What is a Sprint Retrospective and how should you run it?",
      answer: "The Retrospective is a team ceremony at the end of each sprint to improve the process (not the product). Typical format: What went well? What didn't go well? What will we try differently next sprint? Key rule: the retrospective must result in ACTIONABLE improvements — not just venting. 1-3 concrete action items to implement next sprint.",
      example: "// Retrospective formats:\n\n// Start/Stop/Continue:\nStart: writing tests before code (TDD)\nStop: merging PRs without review\nContinue: daily standups — keeping them 15 min\n\n// Mad/Sad/Glad:\nMad: builds take 40 minutes\nSad: we had to roll back the deployment\nGlad: we shipped the payments feature!\n\n// Action items (must be specific):\n✗ 'Improve communication' (vague)\n✓ 'Hold a 30-min design sync every Monday at 2pm' (specific, measurable)",
      use_case: "A team's retrospective reveals deployments take 2 hours due to manual testing. Action item: invest one sprint automating the test suite. Next sprint deployment takes 20 minutes.",
      follow_up: "How do you prevent retrospectives from becoming blame sessions? What is psychological safety and why does it matter?"
    },
    {
      question: "What are OKRs and how do they connect to Agile sprints?",
      answer: "OKRs (Objectives and Key Results): Objectives are inspiring, qualitative goals. Key Results are measurable outcomes that indicate the objective is achieved. OKRs are set quarterly at company/team level. Sprints are 2-week cycles where the team works on stories that contribute to their Key Results. This connects day-to-day sprint work to strategic quarterly goals.",
      example: "// Company OKR:\nObjective: Become the most trusted payment platform\nKey Results:\n  KR1: Reduce payment failure rate from 3% to 0.5%\n  KR2: Achieve NPS of 50+ (currently 30)\n  KR3: Launch in 3 new markets\n\n// Team OKRs align:\nEngineering team:\n  → Sprint 1: retry logic for failed payments (→ KR1)\n  → Sprint 2: better error messages for users (→ KR2)\n  → Sprint 3: currency support for EU markets (→ KR3)",
      use_case: "Without OKRs, developers build features that seem good but don't move business metrics. With OKRs, every sprint story maps to a measurable outcome the business cares about.",
      follow_up: "What is the difference between OKRs and KPIs? What is the 'stretch goal' concept in OKRs?"
    }
  ],
  advanced: [
    {
      question: "How do you scale Agile across multiple teams?",
      answer: "Scaling frameworks: SAFe (Scaled Agile Framework) — most detailed, used by large enterprises. LeSS (Large-Scale Scrum) — extends Scrum to multiple teams, minimal additional process. Nexus — 3-9 Scrum teams with an integration team. Key challenges at scale: cross-team dependencies, architectural consistency, integration, aligned priorities. Program Increment (PI) Planning in SAFe aligns all teams quarterly.",
      example: "// SAFe Program Level:\n// 5-12 teams (Agile Release Train - ART)\n// All teams align on 10-week Program Increment\n\n// PI Planning (2 days, all teams together):\nDay 1: Business context, team breakouts, draft plans\nDay 2: Review cross-team dependencies, risk identification, PI Objectives\nOutput: Each team has a PI plan with their committed features\n         Dependency map between teams\n         Risks identified and mitigation plans\n\n// ART ceremonies:\n// System Demo (every sprint) — integrated demo of all teams' work\n// Inspect & Adapt (end of PI) — PI-level retrospective",
      use_case: "A bank with 15 Scrum teams building a new digital banking platform. Without SAFe, teams work in isolation, create duplicate code, and their features don't integrate. With PI Planning, dependencies are identified and resolved upfront.",
      follow_up: "What is team topology in the context of Agile scaling? What is the 'inverse Conway's law'?"
    },
    {
      question: "What is technical debt and how do you manage it in Agile?",
      answer: "Technical debt is the implied cost of future rework caused by choosing an expedient solution now instead of a better, more maintainable one. Like financial debt: small amounts manageable, but accumulated debt slows development and increases bugs. Management strategies: dedicate 20% of each sprint to debt, track debt as backlog items, debt metrics (code coverage, static analysis), never negotiate on code quality for 'speed'.",
      example: "// Types of technical debt:\n// Deliberate: 'We know this is a hack, ship now, fix in Sprint 5'\n// Accidental: discovered later 'This API design makes testing impossible'\n// Bit rot: code that was fine but technology moved on\n\n// Managing debt:\n// 1. Make it visible — create debt tickets in backlog\n// 2. Prioritise by impact (high business risk = high priority)\n// 3. Boy Scout Rule: leave code cleaner than you found it\n// 4. Refactoring sprints (quarterly 'debt sprints')\n\n// Metrics to track:\n// Code coverage (< 60% is a debt risk)\n// Cyclomatic complexity (high = maintenance nightmare)\n// Dependency health (outdated packages)",
      use_case: "A startup ships fast, accumulates massive technical debt. Adding a simple feature now takes 3x longer than it should. Developer productivity falls 50%. A quarter-long refactoring initiative is needed.",
      follow_up: "How do you convince a product owner (who only sees features) to invest sprint capacity in reducing technical debt?"
    },
    {
      question: "What is the difference between Story Points and Hours? Why do Agile teams use story points?",
      answer: "Hours: absolute time estimates, prone to optimism bias, pressure from management, and don't account for complexity or uncertainty. Story Points: RELATIVE complexity estimates. A 5-point story is roughly 5x more complex than a 1-point story. Points encode: effort, complexity, and uncertainty. They are stable across time (a 3-point story today is still a 3-point story in 6 months, regardless of how fast the team gets).",
      example: "// Why points beat hours:\n\n// Hours (problems):\n'This will take 4 hours'\n→ Manager hears: 'commit to 4 hours'\n→ Developer encounters hidden complexity\n→ 4 hours becomes 16 hours\n→ Manager is disappointed\n\n// Story points (better):\n'This is a 3-point story'\n→ No commitment to hours\n→ Team's velocity absorbs uncertainty\n→ Over many sprints, velocity becomes predictable\n→ Forecasting based on average velocity, not individual estimates\n\n// Planning Poker forces collective estimation\n// One person's 2 hours != another's 2 hours (different skills, context)\n// Team's relative complexity is more consistent",
      use_case: "A team estimated in hours for 6 months, consistently missing by 50%. Switched to story points, established velocity, and now forecast within 10% accuracy.",
      follow_up: "What is the 'cone of uncertainty' in project estimation? How does iterative development help reduce it over time?"
    }
  ]
};

export const laravelInterview: InterviewTopic = {
  beginner: [
    {
      question: "What is Laravel and why is it popular?",
      answer: "Laravel is the most popular PHP framework known for its elegant syntax and developer experience. It provides: Eloquent ORM (database), Blade templating, routing, authentication, queues, events, caching, and more — all out of the box. It follows MVC pattern and convention over configuration. Used by millions of developers globally.",
      example: "// Why Laravel over raw PHP:\n\n// Raw PHP — repetitive, error-prone:\n$pdo = new PDO('mysql:host=...');\n$stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');\n$stmt->execute([$id]);\n$user = $stmt->fetch();\n\n// Laravel — clean, expressive:\n$user = User::find($id);\n$user->orders()->where('status', 'paid')->get();",
      use_case: "Startups building SaaS products, booking systems, e-commerce platforms, and REST APIs choose Laravel because it ships features 3x faster than raw PHP with enterprise-grade security built in.",
      follow_up: "What is the difference between Laravel and Lumen? When would you use each?"
    },
    {
      question: "What is Eloquent ORM?",
      answer: "Eloquent is Laravel's ORM (Object-Relational Mapper). It represents database tables as PHP classes (models). Each model instance represents a row. You interact with the database using expressive PHP methods instead of SQL. Relationships (hasMany, belongsTo, etc.) are defined in the model — no JOIN syntax needed.",
      example: "// Users table → User model\nclass User extends Model {\n    public function orders(): HasMany {\n        return $this->hasMany(Order::class);\n    }\n}\n\n// Usage — no SQL needed\n$user = User::find(1);                    // SELECT * FROM users WHERE id = 1\n$users = User::where('active', true)->get(); // SELECT * WHERE active = 1\n$user->orders()->create(['total' => 99.99]);  // INSERT into orders\n$user->orders()->where('status', 'paid')->sum('total'); // aggregate",
      use_case: "A dashboard that shows a user's account, their recent orders, and the products in each order — Eloquent navigates all these relationships with simple method calls.",
      follow_up: "What is the N+1 query problem in Eloquent and how do you fix it with eager loading?"
    },
    {
      question: "What are Laravel migrations?",
      answer: "Migrations are version control for your database schema. Instead of manually altering the database, you write migration files in PHP. They can be run (migrate), rolled back (rollback), or refreshed. This lets teams keep database schema changes in sync with code changes — committed to git alongside the code.",
      example: "// Create a migration\nphp artisan make:migration create_products_table\n\n// The migration file:\npublic function up(): void {\n    Schema::create('products', function (Blueprint $table) {\n        $table->id();\n        $table->string('name');\n        $table->decimal('price', 10, 2);\n        $table->foreignId('category_id')->constrained();\n        $table->timestamps();\n    });\n}\npublic function down(): void {\n    Schema::dropIfExists('products');\n}\n\n// Run migrations\nphp artisan migrate\n// Rollback last batch\nphp artisan migrate:rollback",
      use_case: "A new developer joins the team. They run php artisan migrate and have the complete database schema without any SQL scripts or manual DB setup. Schema changes are tracked in git.",
      follow_up: "What is the difference between php artisan migrate:fresh and migrate:rollback? When would you use each?"
    },
    {
      question: "What are Laravel routes?",
      answer: "Routes define how URLs map to code. Defined in routes/web.php (browser requests with session/CSRF) and routes/api.php (API endpoints, stateless). You can use closures or controller methods. Route parameters, named routes, route groups (middleware, prefix), and route model binding are key features.",
      example: "// web.php\nRoute::get('/', [HomeController::class, 'index']);\nRoute::get('/profile/{user}', [ProfileController::class, 'show']);  // parameter\n\n// Named route — use name() for URLs in code\nRoute::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');\nreturn redirect()->route('dashboard'); // use name, not hardcoded URL\n\n// Route group with middleware and prefix\nRoute::middleware('auth')->prefix('admin')->group(function () {\n    Route::resource('users', UserController::class);\n    Route::get('reports', [ReportController::class, 'index']);\n});\n\n// api.php\nRoute::middleware('auth:sanctum')->apiResource('products', ProductController::class);",
      use_case: "A SaaS app uses route groups: public routes, authenticated user routes (middleware: auth), and admin routes (middleware: auth, role:admin).",
      follow_up: "What is Route Model Binding? How does it automatically inject a model instance into a controller method?"
    },
    {
      question: "What is middleware in Laravel?",
      answer: "Middleware is code that runs between the HTTP request being received and the controller handling it. Laravel includes: auth (redirect unauthenticated users), throttle (rate limiting), cors, csrf. You can create custom middleware. Middleware can run before or after the request (request terminating middleware).",
      example: "// Create middleware\nphp artisan make:middleware EnsureUserIsAdmin\n\n// The middleware class\npublic function handle(Request $request, Closure $next): Response {\n    if ($request->user()?->role !== 'admin') {\n        return response()->json(['error' => 'Forbidden'], 403);\n    }\n    return $next($request); // pass to next middleware/controller\n}\n\n// Register and use\nRoute::middleware(['auth', 'admin'])->group(function () {\n    Route::resource('admin/users', AdminUserController::class);\n});\n\n// Built-in middleware\nRoute::middleware('throttle:60,1')->get('/api/...', ...); // 60 requests per minute",
      use_case: "An admin panel protected by auth + role:admin middleware. A public API with throttle:100,1 middleware (100 requests per minute). A maintenance mode middleware that returns 503 for all routes.",
      follow_up: "What is the difference between global middleware, route middleware, and middleware groups in Laravel?"
    },
    {
      question: "What is Blade templating in Laravel?",
      answer: "Blade is Laravel's template engine. It compiles templates to PHP and caches them for performance. It provides clean syntax for: echoing variables ({{$var}}), conditionals (@if/@else), loops (@foreach/@for), layout inheritance (@extends/@section/@yield), and components (@component, Blade components with classes).",
      example: "{{-- layouts/app.blade.php --}}\n<html>\n<body>\n    @yield('content')\n    @yield('scripts')\n</body>\n</html>\n\n{{-- pages/products.blade.php --}}\n@extends('layouts.app')\n\n@section('content')\n    @foreach($products as $product)\n        <x-product-card :product=\"$product\" />\n    @endforeach\n    \n    @if($products->isEmpty())\n        <p>No products found</p>\n    @endif\n@endsection",
      use_case: "Any Laravel web app uses Blade. The layout defines the header/footer/nav once. All pages extend it and override just the content section.",
      follow_up: "What is the difference between {{ }} and {!! !!} in Blade? When is each appropriate (and why is {!! !!} dangerous)?"
    },
    {
      question: "What is Artisan in Laravel and why is it important?",
      answer: "Artisan is Laravel's command-line tool. It helps you create files, run migrations, clear cache, run queues, and automate common tasks quickly.",
      example: "php artisan make:controller OrderController\nphp artisan migrate\nphp artisan queue:work",
      use_case: "You can scaffold a feature in minutes instead of creating every file manually.",
      follow_up: "What is the difference between php artisan serve and using Nginx/Apache?"
    },
    {
      question: "What is a Laravel controller?",
      answer: "A controller is a class that receives request data, runs business logic, and returns response (view or JSON).",
      example: "class ProductController extends Controller {\n  public function index() { return Product::all(); }\n}",
      use_case: "Keeps route files clean and groups related logic in one place.",
      follow_up: "Single action controller vs resource controller?"
    },
    {
      question: "What is a resource controller in Laravel?",
      answer: "A resource controller gives standard CRUD methods like index, store, show, update, destroy.",
      example: "Route::resource('products', ProductController::class);",
      use_case: "Quickly build admin CRUD panels with consistent route names.",
      follow_up: "When should you use apiResource instead of resource?"
    },
    {
      question: "What is mass assignment in Laravel?",
      answer: "Mass assignment means creating/updating model fields in one call. You must protect fields using fillable or guarded.",
      example: "protected $fillable = ['name', 'price'];\nProduct::create($request->all());",
      use_case: "Prevents users from updating sensitive fields like is_admin.",
      follow_up: "What bug can happen if fillable is not set?"
    },
    {
      question: "What is CSRF protection in Laravel?",
      answer: "CSRF protection blocks fake form submissions from other websites. Laravel adds and verifies CSRF token automatically for web forms.",
      example: "<form method=\"POST\">@csrf ...</form>",
      use_case: "Protects profile update and password change forms from malicious requests.",
      follow_up: "Why is CSRF usually not required for stateless token APIs?"
    },
    {
      question: "What is Laravel validation and why should it be used?",
      answer: "Validation ensures incoming data has correct type and rules before saving to DB.",
      example: "$request->validate(['email' => 'required|email', 'name' => 'required']);",
      use_case: "Avoids broken records and bad user input in production.",
      follow_up: "Inline validation vs FormRequest validation?"
    },
    {
      question: "What is route caching in Laravel?",
      answer: "Route caching precompiles route definitions for faster boot time in production.",
      example: "php artisan route:cache",
      use_case: "Large apps with many routes get faster request handling.",
      follow_up: "Why do closure routes break route:cache?"
    },
    {
      question: "What is config caching in Laravel?",
      answer: "Config caching combines all config files into one cached file for speed.",
      example: "php artisan config:cache",
      use_case: "Improves production performance and startup time.",
      follow_up: "Why should env() usually not be called outside config files?"
    },
    {
      question: "What are Laravel seeders and factories?",
      answer: "Seeders insert sample or base data. Factories generate fake model data for tests and local dev.",
      example: "User::factory()->count(50)->create();",
      use_case: "Quickly prepare realistic test data for development.",
      follow_up: "How do seeders help CI test pipelines?"
    },
    {
      question: "What is the difference between web.php and api.php in Laravel?",
      answer: "web.php uses session, cookies, and CSRF middleware. api.php is stateless and usually used for token-based APIs.",
      example: "routes/web.php -> dashboard pages\nroutes/api.php -> mobile app endpoints",
      use_case: "Separate browser flow from API flow clearly.",
      follow_up: "How are route prefixes applied to api.php by default?"
    },
    {
      question: "How does Laravel pagination work?",
      answer: "Laravel provides paginate(), simplePaginate(), and cursorPaginate() for easy paginated results.",
      example: "$users = User::latest()->paginate(15);",
      use_case: "Efficient list pages without loading huge datasets at once.",
      follow_up: "When is cursor pagination better than offset pagination?"
    }
  ],
  intermediate: [
    {
      question: "What is the N+1 query problem and how does Eloquent fix it?",
      answer: "N+1 occurs when you load N records and execute 1 additional query per record to get related data — resulting in N+1 total queries. Eloquent's eager loading with with() solves this by loading all related data in 2 queries (one for main records, one for all related records). Always use with() when accessing relationships in a loop.",
      example: "// N+1 PROBLEM — 1 + N queries!\n$posts = Post::all(); // 1 query\nforeach ($posts as $post) {\n    echo $post->user->name; // 1 query PER post! 100 posts = 101 queries\n}\n\n// EAGER LOADING — always 2 queries!\n$posts = Post::with('user')->get(); // 2 queries total\n// Query 1: SELECT * FROM posts\n// Query 2: SELECT * FROM users WHERE id IN (1, 2, 3, ...)\nforeach ($posts as $post) {\n    echo $post->user->name; // uses loaded data, no query!\n}\n\n// Nested eager loading\n$posts = Post::with(['user', 'tags', 'comments.user'])->paginate(20);",
      use_case: "A blog listing page with 50 posts and their author names. Without eager loading: 51 queries. With eager loading: 2 queries. With 1000 posts: 1001 vs 2 queries — critical for performance.",
      follow_up: "What is lazy eager loading in Eloquent (load() method)? When would you use it after initial loading?"
    },
    {
      question: "What is Laravel's service container and dependency injection?",
      answer: "The service container (IoC container) is Laravel's dependency injection system. When a class type-hints a dependency in its constructor, Laravel automatically resolves and injects it. You can bind interfaces to implementations. This makes code testable (swap real dependencies for mocks), decoupled, and follows SOLID principles.",
      example: "// Interface\ninterface PaymentGatewayInterface {\n    public function charge(float $amount): bool;\n}\n\n// Implementation\nclass StripeGateway implements PaymentGatewayInterface {\n    public function charge(float $amount): bool { /* stripe API */ }\n}\n\n// Bind in AppServiceProvider\n$this->app->bind(PaymentGatewayInterface::class, StripeGateway::class);\n\n// Controller — Laravel auto-injects StripeGateway\nclass OrderController {\n    public function __construct(private PaymentGatewayInterface $gateway) {}\n    public function checkout() {\n        $this->gateway->charge(99.99);\n    }\n}\n\n// In tests: bind a mock\n$this->app->bind(PaymentGatewayInterface::class, FakeGateway::class);",
      use_case: "In production: StripeGateway is injected. In tests: MockGateway is injected — no real API calls, fast, reliable tests.",
      follow_up: "What is the difference between bind, singleton, and instance bindings in the Laravel service container?"
    },
    {
      question: "How does Laravel handle authentication and authorization?",
      answer: "Authentication (who are you): Laravel Breeze/Jetstream for UI scaffolding, Sanctum for SPA/API tokens, Passport for OAuth2. Authorization (what can you do): Gates (simple closures for actions), Policies (resource-specific rules organized in a class). Blade directives (@can, @auth) make UI conditional based on permissions.",
      example: "// Gate — simple permission check\nGate::define('delete-post', function (User $user, Post $post) {\n    return $user->id === $post->user_id || $user->isAdmin();\n});\n\nif (!Gate::allows('delete-post', $post)) abort(403);\n\n// Policy — resource-based, organized\nphp artisan make:policy PostPolicy --model=Post\n\n// PostPolicy.php\npublic function delete(User $user, Post $post): bool {\n    return $user->id === $post->user_id;\n}\n\n// Controller\n$this->authorize('delete', $post); // uses PostPolicy::delete automatically\n\n// Blade\n@can('delete', $post)\n    <button>Delete Post</button>\n@endcan",
      use_case: "A blog platform: only the post author can edit/delete their posts. Admins can do anything. Policies encode these rules centrally — controllers stay thin.",
      follow_up: "What is the difference between Gates and Policies in Laravel? When would you use each?"
    },
    {
      question: "What are Laravel queues and jobs?",
      answer: "Queues let you defer slow, non-critical work to background workers so HTTP responses return instantly. A job is a class that encapsulates a background task. Drivers: database, Redis, SQS, Beanstalkd. Jobs can be delayed, retried, have priority, and run with concurrency limits. Queue workers (php artisan queue:work) process jobs asynchronously.",
      example: "// Create a job\nphp artisan make:job SendWelcomeEmail\n\nclass SendWelcomeEmail implements ShouldQueue {\n    use Dispatchable, InteractsWithQueue, Queueable;\n    \n    public int $tries = 3;  // retry up to 3 times\n    public int $backoff = 60; // wait 60s between retries\n    \n    public function __construct(private User $user) {}\n    \n    public function handle(MailerService $mailer): void {\n        $mailer->send($this->user->email, new WelcomeMail($this->user));\n    }\n    \n    public function failed(\\Throwable $e): void {\n        Log::error('Welcome email failed', ['user' => $this->user->id, 'error' => $e->getMessage()]);\n    }\n}\n\n// Dispatch — returns 201 immediately, email sent in background\nSendWelcomeEmail::dispatch($user);\n// Or delay by 5 minutes\nSendWelcomeEmail::dispatch($user)->delay(now()->addMinutes(5));\n\n// Run the worker\nphp artisan queue:work redis --queue=emails --tries=3",
      use_case: "User registration: /register returns 200 in <100ms. Welcome email, analytics event, and Slack notification are processed asynchronously by queue workers.",
      follow_up: "What is the difference between ShouldQueue and ShouldBeUnique? What are failed jobs and how do you monitor them?"
    },
    {
      question: "What is Laravel's event system?",
      answer: "Events and Listeners implement the observer pattern, decoupling parts of your application. An event represents something that happened (UserRegistered, OrderPlaced). Listeners respond to events — can be queued. You can have multiple listeners per event. Events are dispatched with event() or Event::dispatch().",
      example: "// 1. Create event and listener\nphp artisan make:event OrderPlaced\nphp artisan make:listener SendOrderConfirmation --event=OrderPlaced\n\n// 2. Register in EventServiceProvider\nprotected $listen = [\n    OrderPlaced::class => [\n        SendOrderConfirmation::class, // email\n        NotifyWarehouse::class,       // inventory\n        UpdateAnalytics::class,       // tracking\n    ],\n];\n\n// 3. Dispatch the event\n$order = Order::create($data);\nevent(new OrderPlaced($order)); // triggers all 3 listeners\n\n// 4. Listener (implement ShouldQueue for async)\nclass SendOrderConfirmation implements ShouldQueue {\n    public function handle(OrderPlaced $event): void {\n        Mail::to($event->order->user)->send(new OrderConfirmation($event->order));\n    }\n}",
      use_case: "When an order is placed, 3 things happen independently: email confirmation, warehouse notification, analytics tracking. Events decouple them — adding a 4th action (loyalty points) requires no changes to existing code.",
      follow_up: "What is the difference between synchronous events and queued listeners? What are event observers in Eloquent?"
    },
    {
      question: "What are Laravel API Resources and why use them?",
      answer: "API Resources control how model data is returned as JSON. They prevent leaking internal fields and keep response format consistent.",
      example: "return new UserResource($user);",
      use_case: "Frontend gets stable API shape even if database columns change.",
      follow_up: "Resource collection vs single resource?"
    },
    {
      question: "What is Laravel Sanctum and where is it used?",
      answer: "Sanctum provides simple token auth for SPAs and mobile apps, and can also support cookie-based SPA auth.",
      example: "$token = $user->createToken('mobile')->plainTextToken;",
      use_case: "Secure mobile app APIs without full OAuth complexity.",
      follow_up: "Sanctum vs Passport?"
    },
    {
      question: "What is Laravel Passport and when do you need it?",
      answer: "Passport is Laravel's OAuth2 server package. Use it when you need full OAuth flows with clients and scopes.",
      example: "php artisan passport:install",
      use_case: "Third-party integrations where external apps access your API with OAuth.",
      follow_up: "When is Passport overkill?"
    },
    {
      question: "How do database transactions work in Laravel?",
      answer: "Transactions wrap multiple DB operations so all succeed or all rollback.",
      example: "DB::transaction(function () {\n  // create order\n  // update stock\n});",
      use_case: "Avoid partial checkout data when payment fails mid-flow.",
      follow_up: "What happens if exception is thrown inside transaction?"
    },
    {
      question: "What is polymorphic relationship in Eloquent?",
      answer: "Polymorphic relationships allow one model to belong to multiple model types.",
      example: "Comment can belong to Post or Video using morphTo.",
      use_case: "Reusable comments, likes, attachments across many entities.",
      follow_up: "morphOne vs morphMany vs morphedByMany?"
    },
    {
      question: "How do you schedule tasks in Laravel?",
      answer: "Use Laravel Scheduler to define recurring tasks in code and trigger with one cron entry.",
      example: "$schedule->command('report:daily')->dailyAt('08:00');",
      use_case: "Auto send daily reports, cleanup old data, sync external APIs.",
      follow_up: "How do you prevent overlapping scheduled commands?"
    },
    {
      question: "What is Laravel caching strategy in real apps?",
      answer: "Cache expensive reads using Redis/memcached, set TTL, and invalidate on write operations.",
      example: "Cache::remember('products:top', 600, fn () => Product::top()->get());",
      use_case: "Reduce DB load on high-traffic homepage queries.",
      follow_up: "What is cache invalidation challenge?"
    },
    {
      question: "How do you upload files safely in Laravel?",
      answer: "Validate file type and size, store with generated name, and prefer cloud/object storage in production.",
      example: "$path = $request->file('avatar')->store('avatars', 'public');",
      use_case: "User profile uploads, invoice PDFs, and KYC documents.",
      follow_up: "Why should extension check alone be avoided?"
    },
    {
      question: "What is Laravel policy auto-discovery?",
      answer: "Laravel can automatically map model policies based on naming conventions.",
      example: "Post model -> PostPolicy class auto-resolved.",
      use_case: "Cleaner authorization setup with less manual registration.",
      follow_up: "When should you register policy manually?"
    },
    {
      question: "How do you handle exceptions globally in Laravel?",
      answer: "Use App\\Exceptions\\Handler to report and render exceptions consistently.",
      example: "return response()->json(['message' => 'Server error'], 500);",
      use_case: "Consistent API error responses and cleaner logs.",
      follow_up: "How to return different error formats for web and API?"
    },
    {
      question: "What is common Laravel interview mistake in intermediate level?",
      answer: "Putting all business logic in controllers and not using services/actions.",
      example: "500-line controller with pricing and payment rules.",
      use_case: "Hard testing and frequent regressions during changes.",
      follow_up: "How would you refactor fat controllers safely?"
    }
  ],
  advanced: [
    {
      question: "How do you test a Laravel application effectively?",
      answer: "Laravel testing types: Feature tests (HTTP request/response — routes, controllers), Unit tests (isolated classes — services, helpers), Browser tests (Dusk — real browser automation). Use RefreshDatabase trait to reset DB between tests. Factories for test data. HTTP testing: actingAs() for authentication, assertDatabaseHas() for DB verification, assertJson() for API responses.",
      example: "class OrderApiTest extends TestCase {\n    use RefreshDatabase;\n    \n    public function test_authenticated_user_can_create_order(): void {\n        $user = User::factory()->create();\n        $product = Product::factory()->create(['stock' => 10]);\n        \n        $response = $this->actingAs($user)\n            ->postJson('/api/orders', [\n                'product_id' => $product->id,\n                'quantity' => 2,\n            ]);\n        \n        $response\n            ->assertCreated()\n            ->assertJsonPath('data.status', 'pending');\n        \n        $this->assertDatabaseHas('orders', ['user_id' => $user->id]);\n        $this->assertDatabaseHas('products', ['id' => $product->id, 'stock' => 8]);\n    }\n    \n    public function test_unauthenticated_user_cannot_create_order(): void {\n        $this->postJson('/api/orders', [])->assertUnauthorized();\n    }\n}",
      use_case: "A payment feature: test that funds are deducted, order is created, email is dispatched, and stock is decremented — all verified in one test without real payment calls.",
      follow_up: "What is mocking in Laravel tests? How do you use Mail::fake() and Queue::fake() to avoid real side effects in tests?"
    },
    {
      question: "What is Laravel Telescope and how do you use it for debugging?",
      answer: "Telescope is Laravel's debugging and introspection assistant for local/staging environments. It records: HTTP requests, exceptions, log entries, database queries (with timing!), queued jobs, mail, events, cache operations, Redis commands, and scheduled tasks. Accessible via /telescope in your browser. Essential for debugging N+1 queries and slow requests.",
      example: "// Install\ncomposer require laravel/telescope --dev\nphp artisan telescope:install\nphp artisan migrate\n\n// It auto-instruments everything — access at /telescope\n\n// Most useful panels:\n// Requests: see every query for a request (spot N+1!)\n// Queries: all queries across the app, sorted by duration\n// Exceptions: full stack trace with request context\n// Jobs: see job payload, attempts, exceptions\n\n// Telescope shows:\n// GET /products: 47 queries (N+1!), 1.2 seconds\n// After adding with('category','brand'): 3 queries, 45ms",
      use_case: "Mysterious slow page in development. Telescope shows 231 database queries, 220 of which are 'SELECT * FROM categories WHERE id = X' — classic N+1, fixed with eager loading.",
      follow_up: "What is the difference between Telescope and Debugbar? When would you use each?"
    },
    {
      question: "How do you optimize a slow Laravel application?",
      answer: "Performance checklist: 1. Enable caching (config, routes, views: php artisan optimize). 2. Eager load relationships (fix N+1). 3. Database indexes on queried columns. 4. Cache expensive queries (Cache::remember). 5. Queue slow operations (emails, notifications). 6. Use lazy loading for large collections. 7. Enable OPcache. 8. Use Redis for sessions and cache. 9. Lazy load routes.",
      example: "// Production optimisations\nphp artisan config:cache    // merge all config files into one\nphp artisan route:cache     // pre-compile all routes\nphp artisan view:cache      // pre-compile Blade templates\nphp artisan event:cache     // cache event/listener mappings\nphp artisan optimize        // runs all of the above\n\n// Database query caching\n$products = Cache::remember('products:featured', 3600, function () {\n    return Product::with('category')->where('featured', true)->get();\n});\n\n// Lazy collections for large datasets (memory-efficient)\nUser::lazy()->each(function (User $user) {\n    // Process one at a time — doesn't load 1M users into memory\n    $this->processUser($user);\n});",
      use_case: "A Laravel app handles 10k requests/hour. Without optimisation: 800ms average response, OOM errors. After optimization: 120ms average, stable memory usage.",
      follow_up: "What is the difference between Cache::remember and Cache::rememberForever? What is cache stampede and how does Cache::lock() prevent it?"
    },
    {
      question: "How do you design a scalable Laravel architecture for high traffic?",
      answer: "Keep app stateless, use Redis for cache/session/queues, separate read replicas, and scale app servers horizontally.",
      example: "Nginx -> multiple Laravel app nodes -> Redis + MySQL primary/replica",
      use_case: "Scale from thousands to millions of API calls/day with minimal downtime.",
      follow_up: "Why are file sessions a problem in multi-server setup?"
    },
    {
      question: "How do you do zero-downtime Laravel deployments?",
      answer: "Use atomic release strategy, run safe migrations, warm caches, and restart queue workers gracefully.",
      example: "Deploy new release folder then switch symlink.",
      use_case: "Users continue requests while new version goes live.",
      follow_up: "What migration patterns can still cause downtime?"
    },
    {
      question: "How do you prevent race conditions in Laravel checkout flow?",
      answer: "Use DB transactions, row-level locking, and idempotency keys for critical operations.",
      example: "DB::transaction + lockForUpdate() on inventory row.",
      use_case: "Avoid overselling same item during flash sales.",
      follow_up: "What is difference between optimistic and pessimistic locking?"
    },
    {
      question: "How do you implement multi-tenant architecture in Laravel?",
      answer: "Scope all data by tenant, isolate configs, and enforce tenant context globally.",
      example: "Global scope adds tenant_id to every query.",
      use_case: "SaaS platform where one company's data never leaks to another.",
      follow_up: "Single DB multi-tenant vs DB-per-tenant trade-offs?"
    },
    {
      question: "How do you handle large exports in Laravel?",
      answer: "Process exports in queued chunks and stream output instead of loading everything in memory.",
      example: "Chunk users by 1000 rows and write CSV in background job.",
      use_case: "Export 2M rows without request timeout or memory crash.",
      follow_up: "Why are sync exports risky for production?"
    },
    {
      question: "How do you secure Laravel APIs at advanced level?",
      answer: "Use auth + authorization, request validation, rate limits, audit logs, and strict error handling.",
      example: "Route::middleware(['auth:sanctum', 'throttle:api'])->group(...)",
      use_case: "Protect fintech/health APIs from abuse and privilege escalation.",
      follow_up: "How do you design role + permission checks cleanly?"
    },
    {
      question: "How do you monitor Laravel in production?",
      answer: "Use centralized logs, APM traces, queue failure alerts, and DB slow query monitoring.",
      example: "Track p95 latency, failed jobs count, error rate dashboards.",
      use_case: "Catch performance regressions before users complain.",
      follow_up: "Which 3 alerts would you set first?"
    },
    {
      question: "How do you handle eventual consistency with queued listeners?",
      answer: "Design idempotent listeners, retries, and clear status transitions for delayed updates.",
      example: "Order created now, invoice generated by queue worker later.",
      use_case: "Reliable async workflows across payment, email, analytics.",
      follow_up: "How do you avoid duplicate side effects after retries?"
    },
    {
      question: "How do you tune Laravel Horizon for heavy queue workloads?",
      answer: "Configure queue priorities, worker counts, balancing, and retry/backoff based on job profile.",
      example: "High-priority queue for payments, low-priority for reports.",
      use_case: "Keep critical jobs fast even under heavy background load.",
      follow_up: "What metrics in Horizon tell you workers are overloaded?"
    },
    {
      question: "How do you approach legacy Laravel upgrade safely?",
      answer: "Upgrade version-by-version, add regression tests, and replace deprecated APIs in small steps.",
      example: "Laravel 8 -> 9 -> 10 with CI checks on each stage.",
      use_case: "Modernize old app without breaking business-critical flows.",
      follow_up: "Why is one-shot major upgrade risky?"
    },
    {
      question: "Tricky advanced Laravel question: should every query be cached?",
      answer: "No. Cache only expensive and frequently read data with clear invalidation strategy.",
      example: "Cache product list, but not always-changing cart count.",
      use_case: "Good performance without stale or inconsistent user data.",
      follow_up: "How do you pick safe cache TTL per feature?"
    }
  ]
};
