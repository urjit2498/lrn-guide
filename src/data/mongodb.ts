import { Topic } from '@/types';

export const mongodbTopic: Topic = {
  id: 'mongodb',
  name: 'MongoDB',
  icon: '🍃',
  color: 'bg-emerald-100 dark:bg-emerald-900/30',
  textColor: 'text-emerald-700 dark:text-emerald-300',
  borderColor: 'border-emerald-300 dark:border-emerald-700',
  description: 'MongoDB is a NoSQL document database — flexible schema, horizontally scalable, and JSON-native.',
  levels: [
    {
      level: 'beginner',
      intro: 'Understand what makes MongoDB different, its document model, and basic CRUD.',
      sections: [
        {
          title: 'What is MongoDB?',
          explanation:
            'MongoDB stores data as documents (like JSON objects) in collections (like tables but without a fixed schema). Each document can have different fields. There are no JOINs — you embed related data inside one document or reference it by ID.',
          realWorldExample:
            'A user profile in MongoDB can store basic info, their preferences, and recent activities all in one document. No need for 5 separate tables joined together.',
          practicalUseCase:
            'Install MongoDB, create a database, and insert your first document using the MongoDB shell or Compass.',
          codeExample: `// MongoDB shell commands
use myapp;   // Create/switch to database

// Insert one document
db.users.insertOne({
  name: "Alice",
  email: "alice@example.com",
  age: 28,
  skills: ["JavaScript", "React", "Node.js"],
  address: {
    city: "Mumbai",
    country: "India"
  }
});

// Insert many
db.users.insertMany([
  { name: "Bob", email: "bob@example.com", age: 32 },
  { name: "Carol", email: "carol@example.com", age: 25 }
]);

// Find all
db.users.find();

// Find with filter
db.users.find({ age: { $gte: 28 } });`,
          exercise:
            'Create a "products" collection. Insert 5 products with different structures (some with reviews, some without). Query products with price under $100.',
        },
        {
          title: 'CRUD in MongoDB',
          explanation:
            'MongoDB CRUD: insertOne/insertMany, find/findOne, updateOne/updateMany/replaceOne, deleteOne/deleteMany. MongoDB uses operators like $set, $push, $pull, $inc to modify specific fields without replacing the whole document.',
          realWorldExample:
            'A social media app: post a tweet (insert), read the feed (find with sort), add a like (updateOne + $inc), delete a tweet (deleteOne).',
          practicalUseCase:
            'Build a simple note-taking app queries: create a note, update its title, add a tag, delete it.',
          codeExample: `// Find with projection (select specific fields)
db.users.find(
  { age: { $gte: 25 } },    // filter
  { name: 1, email: 1, _id: 0 }  // projection
);

// Update — only change specific fields
db.users.updateOne(
  { email: "alice@example.com" },
  {
    $set: { age: 29 },
    $push: { skills: "TypeScript" },  // Add to array
    $currentDate: { updatedAt: true }
  }
);

// Increment a counter
db.posts.updateOne(
  { _id: postId },
  { $inc: { likes: 1 } }
);

// Delete
db.users.deleteOne({ email: "spam@example.com" });

// Count
db.users.countDocuments({ age: { $lt: 30 } });`,
          exercise:
            'Write queries to: find all posts from a specific author, add a "featured" tag to posts with more than 100 likes, and delete all posts older than 1 year.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the difference between SQL and NoSQL databases?',
          answer:
            'SQL (relational): fixed schema, tables with rows and columns, ACID transactions, JOINs. Best for structured data with clear relationships. NoSQL: flexible schema, various data models (document, key-value, graph), horizontal scaling. MongoDB (document) is best for hierarchical/variable data. Choose based on data structure and query patterns, not trends.',
        },
        {
          question: 'What is _id in MongoDB?',
          answer:
            '_id is the unique identifier for every document. By default it is an ObjectId — a 12-byte value encoding timestamp + machine ID + random bytes. This makes ObjectIds roughly sortable by creation time and unique across machines without a central ID counter.',
        },
      ],
    },
    {
      level: 'intermediate',
      intro: 'Aggregation pipeline, indexes, schema design, and Mongoose ORM.',
      sections: [
        {
          title: 'Aggregation Pipeline',
          explanation:
            'The aggregation pipeline processes documents through stages like $match (filter), $group (aggregate), $sort, $project (reshape), $lookup (join). It is like SQL GROUP BY + JOINs but more powerful and flexible.',
          realWorldExample:
            'An analytics dashboard: "Total revenue by product category this month" — $match (date range) → $lookup (join products) → $group (sum by category) → $sort (highest first) → $limit (top 10).',
          practicalUseCase:
            'Build an aggregation query that returns the top 5 most liked posts per month.',
          codeExample: `// Total sales by category
db.orders.aggregate([
  // Stage 1: Only completed orders
  { $match: { status: "completed" } },

  // Stage 2: Unwind (split) the items array — one doc per item
  { $unwind: "$items" },

  // Stage 3: Join with products collection
  { $lookup: {
    from: "products",
    localField: "items.productId",
    foreignField: "_id",
    as: "product"
  }},
  { $unwind: "$product" },

  // Stage 4: Group by category
  { $group: {
    _id: "$product.category",
    totalRevenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } },
    orderCount: { $sum: 1 }
  }},

  // Stage 5: Sort by revenue
  { $sort: { totalRevenue: -1 } },

  // Stage 6: Top 5 only
  { $limit: 5 }
]);`,
          exercise:
            'Write an aggregation that finds the average rating per product and shows only products with an average rating above 4.0.',
        },
        {
          title: 'Mongoose — MongoDB + Node.js',
          explanation:
            'Mongoose is an ODM (Object Document Mapper) for MongoDB in Node.js. It adds schemas, validation, middleware, and a clean API on top of the raw MongoDB driver. It bridges the gap between MongoDB\'s flexibility and the structure your app needs.',
          realWorldExample:
            'Every Node.js + MongoDB project (MEAN/MERN stack) uses Mongoose. The User schema validates that email is unique and properly formatted before any data reaches the database.',
          practicalUseCase:
            'Define a Mongoose schema for a Blog Post with validation, indexes, and a virtual field.',
          codeExample: `import mongoose, { Schema, Document } from 'mongoose';

// Define the schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title too long'],
  },
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String, lowercase: true, trim: true }],
  likes: { type: Number, default: 0 },
  published: { type: Boolean, default: false },
}, {
  timestamps: true, // Adds createdAt, updatedAt automatically
});

// Index for fast author lookups + sorting by date
PostSchema.index({ author: 1, createdAt: -1 });
// Text index for search
PostSchema.index({ title: 'text', body: 'text' });

// Virtual — not stored in DB but computed on demand
PostSchema.virtual('preview').get(function() {
  return this.body.slice(0, 150) + '...';
});

// Middleware — hash passwords, send emails, etc.
PostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

export const Post = mongoose.model('Post', PostSchema);

// Usage
const post = await Post.create({ title: 'Hello', body: '...', author: userId });
const posts = await Post.find({ published: true }).populate('author', 'name email');`,
          exercise:
            'Add a "comments" sub-document array to the Post schema with author, body, and createdAt. Write a function to add a comment.',
        },
      ],
      interviewQA: [
        {
          question: 'When should you embed vs reference documents in MongoDB?',
          answer:
            'Embed when: data is always accessed together, data does not grow unbounded, you need atomic updates. Reference when: data is accessed independently, the embedded data could grow very large (e.g., post comments in a viral post), or many documents share the same related data.',
        },
        {
          question: 'What is a MongoDB index and what types exist?',
          answer:
            'Indexes speed up queries. Types: Single field, Compound (multiple fields), Text (full-text search), Geospatial (location queries), Hashed (for sharding), TTL (auto-delete documents after time). Wildcard index covers all fields in a document. Without indexes, MongoDB does a collection scan.',
        },
      ],
    },
    {
      level: 'advanced',
      intro: 'Transactions, change streams, sharding, and MongoDB in production.',
      sections: [
        {
          title: 'MongoDB Transactions',
          explanation:
            'MongoDB 4.0+ supports multi-document ACID transactions. Like SQL transactions, they let you make multiple operations atomically. Transactions have some performance overhead — design your schema to embed data and avoid needing them when possible.',
          realWorldExample:
            'A payment system: debit wallet, create order, create invoice — must all succeed or all fail. MongoDB transactions ensure consistency.',
          practicalUseCase:
            'Write a transaction that transfers credits between two user accounts.',
          codeExample: `import mongoose from 'mongoose';

async function transferCredits(fromId, toId, amount) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const from = await User.findById(fromId).session(session);
    if (from.credits < amount) throw new Error('Insufficient credits');

    await User.updateOne(
      { _id: fromId },
      { $inc: { credits: -amount } },
      { session }
    );
    await User.updateOne(
      { _id: toId },
      { $inc: { credits: amount } },
      { session }
    );
    await Transaction.create([{
      from: fromId, to: toId, amount,
    }], { session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}`,
          exercise:
            'Refactor the transfer function to use withTransaction helper which handles retry logic automatically.',
        },
      ],
      interviewQA: [
        {
          question: 'What is sharding in MongoDB?',
          answer:
            'Sharding horizontally partitions data across multiple servers (shards). A shard key determines which shard each document goes to. MongoDB\'s mongos router directs queries to the right shard. Sharding enables handling billions of documents that cannot fit on a single server.',
        },
        {
          question: 'What are Change Streams?',
          answer:
            'Change Streams let you listen to real-time changes in a collection, database, or entire cluster. When a document is inserted, updated, or deleted, your application receives an event. Use cases: real-time dashboards, cache invalidation, audit logging, syncing data to another system.',
        },
      ],
    },
  ],
};
