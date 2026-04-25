import { Topic } from '@/types';

export const mysqlTopic: Topic = {
  id: 'mysql',
  name: 'MySQL',
  icon: '🐬',
  color: 'bg-blue-100 dark:bg-blue-900/30',
  textColor: 'text-blue-700 dark:text-blue-300',
  borderColor: 'border-blue-300 dark:border-blue-700',
  description: 'MySQL is the world\'s most popular open-source relational database — structured data, ACID-compliant, and battle-tested.',
  levels: [
    {
      level: 'beginner',
      intro: 'Learn what databases are, how to create tables, and write basic SQL queries.',
      sections: [
        {
          title: 'What is a Relational Database?',
          explanation:
            'A relational database stores data in tables (like Excel sheets). Tables have rows (records) and columns (fields). Tables relate to each other via foreign keys. MySQL enforces data structure and ensures consistency.',
          realWorldExample:
            'An online store has a users table (id, name, email), an orders table (id, user_id, total), and an order_items table (id, order_id, product_id, qty). They connect via foreign keys.',
          practicalUseCase:
            'Install MySQL, create a database, and create your first table.',
          codeExample: `-- Create database
CREATE DATABASE shop;
USE shop;

-- Create table
CREATE TABLE products (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    price       DECIMAL(10,2) NOT NULL,
    stock       INT DEFAULT 0,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO products (name, price, stock) VALUES
    ('Laptop',    999.99, 50),
    ('Keyboard',  79.99,  200),
    ('Mouse',     29.99,  150);

-- Read data
SELECT * FROM products;
SELECT name, price FROM products WHERE price < 100;`,
          exercise: 'Create a "students" table with id, name, email, grade, and enrolled_at. Insert 5 students.',
        },
        {
          title: 'CRUD Operations',
          explanation:
            'CRUD = Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE). These four operations cover 90% of all database work.',
          realWorldExample:
            'A blog: CREATE when you publish a post, READ to display it, UPDATE when you edit it, DELETE when you remove it.',
          practicalUseCase:
            'Write SQL to manage a simple contacts list — add, view, update phone number, delete a contact.',
          codeExample: `-- CREATE
INSERT INTO products (name, price, stock)
VALUES ('Monitor', 299.99, 30);

-- READ with filtering
SELECT name, price
FROM products
WHERE stock > 0
ORDER BY price ASC
LIMIT 10;

-- UPDATE
UPDATE products
SET price = 89.99, stock = stock - 1
WHERE id = 2;

-- DELETE
DELETE FROM products
WHERE stock = 0;

-- Aggregate functions
SELECT COUNT(*) as total, AVG(price) as avg_price, MAX(price) as most_expensive
FROM products;`,
          exercise:
            'Write a query to find all products that cost more than $50 and are in stock. Then update their stock by reducing by 1.',
        },
        {
          title: 'JOINs — Combining Tables',
          explanation:
            'JOINs let you fetch data from multiple related tables in one query. INNER JOIN returns rows that match in both tables. LEFT JOIN returns all rows from the left table even if there is no match in the right.',
          realWorldExample:
            'An order history page: SELECT orders.id, users.name, products.name FROM orders INNER JOIN users ON orders.user_id = users.id INNER JOIN order_items ON... — one query, all the data.',
          practicalUseCase:
            'Write a query that returns each order with the customer name and total amount.',
          codeExample: `CREATE TABLE users (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE orders (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    total      DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- INNER JOIN — only orders that have a user
SELECT
    o.id      AS order_id,
    u.name    AS customer,
    o.total,
    o.created_at
FROM orders o
INNER JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC;

-- LEFT JOIN — all users, even those with no orders
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;`,
          exercise:
            'Write a query to find customers who have placed more than 3 orders and spent more than $500 total.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the difference between WHERE and HAVING?',
          answer:
            'WHERE filters rows before aggregation (before GROUP BY). HAVING filters groups after aggregation (after GROUP BY). Example: WHERE price > 50 filters products before grouping; HAVING COUNT(*) > 5 filters groups that have more than 5 products.',
        },
        {
          question: 'What are indexes and why are they important?',
          answer:
            'An index is a data structure that speeds up lookups on a column. Without an index, MySQL scans every row (full table scan). With an index, it jumps directly to matching rows. Trade-off: indexes speed up reads but slow down writes and use extra disk space.',
        },
        {
          question: 'What is the difference between CHAR and VARCHAR?',
          answer:
            'CHAR(n) stores a fixed-length string — always uses n bytes. VARCHAR(n) stores a variable-length string — uses only as many bytes as needed plus 1-2 bytes overhead. Use CHAR for fixed-length data (country codes, status flags); VARCHAR for variable-length (names, emails).',
        },
      ],
    },
    {
      level: 'intermediate',
      intro: 'Indexes, transactions, stored procedures, and query optimisation.',
      sections: [
        {
          title: 'Transactions & ACID',
          explanation:
            'A transaction groups multiple SQL statements into one atomic operation. Either ALL succeed, or NONE do. ACID: Atomicity (all-or-nothing), Consistency (database stays valid), Isolation (concurrent transactions do not interfere), Durability (committed data survives crashes).',
          realWorldExample:
            'Bank transfer: debit $100 from Account A AND credit $100 to Account B. If the credit fails, the debit must be rolled back. Without a transaction, you could lose $100.',
          practicalUseCase:
            'Write a stored procedure for a money transfer that uses a transaction.',
          codeExample: `-- Transfer money safely
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Check balance is not negative
SELECT balance INTO @balance FROM accounts WHERE id = 1;
IF @balance < 0 THEN
    ROLLBACK;  -- Undo everything
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient funds';
ELSE
    COMMIT;    -- Save everything
END IF;

-- Transaction isolation levels
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;`,
          exercise:
            'Write a transaction that places an order: insert into orders, insert into order_items, and reduce product stock — all atomically.',
        },
        {
          title: 'Query Optimisation & EXPLAIN',
          explanation:
            'EXPLAIN shows you the execution plan of a query — which indexes are used, how many rows are scanned, and what type of join is performed. Slow queries usually mean missing indexes or poorly written JOINs.',
          realWorldExample:
            'A query that takes 10 seconds in production with millions of rows. Adding a composite index on (user_id, created_at) brings it to 5ms.',
          practicalUseCase:
            'Take a slow query, run EXPLAIN on it, identify the problem, add an index, and verify it improved.',
          codeExample: `-- Check query plan
EXPLAIN SELECT u.name, COUNT(o.id)
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.created_at > '2024-01-01'
GROUP BY u.id;

-- Look for: type=ALL (bad), type=ref or range (good)
-- key=NULL means no index used

-- Add indexes to fix it
CREATE INDEX idx_orders_user_created
    ON orders (user_id, created_at);

-- Composite index — covers both the JOIN and the WHERE
-- Now EXPLAIN shows key=idx_orders_user_created

-- Check slow query log
SET GLOBAL slow_query_log = ON;
SET GLOBAL long_query_time = 1; -- Log queries > 1 second`,
          exercise:
            'Find the 5 most expensive queries in a sample dataset using EXPLAIN. Add indexes and show the before/after row scan counts.',
        },
      ],
      interviewQA: [
        {
          question: 'What is the difference between clustered and non-clustered indexes?',
          answer:
            'In MySQL/InnoDB, the PRIMARY KEY is a clustered index — the table data IS the index (rows are stored in primary key order). All other indexes are non-clustered — they store the indexed column(s) + a pointer to the primary key. This is why choosing a small primary key (INT vs UUID) matters for performance.',
        },
        {
          question: 'What is a deadlock in MySQL?',
          answer:
            'A deadlock happens when two transactions each hold a lock that the other needs. Transaction A holds lock on Row 1 and waits for Row 2. Transaction B holds Row 2 and waits for Row 1. MySQL detects this and kills one transaction (rolling it back). Prevention: always lock rows in the same order across transactions.',
        },
      ],
    },
    {
      level: 'advanced',
      intro: 'Replication, partitioning, JSON columns, and MySQL in high-traffic architectures.',
      sections: [
        {
          title: 'MySQL vs Other Databases',
          explanation:
            'MySQL is excellent for structured data, complex JOINs, and ACID transactions. It is the right choice when data has a clear, defined schema and relationships matter (e-commerce, banking, CRMs). Use MongoDB when data is unstructured, varies per record, or needs horizontal scaling (social feeds, IoT data).',
          realWorldExample:
            'Airbnb uses MySQL for reservations (structured, relational, requires consistency) and MongoDB for property listing attributes (each property has different amenities — a flexible document fits better).',
          practicalUseCase:
            'Design the schema for a multi-tenant SaaS application. Decide what goes in MySQL vs a NoSQL store.',
          codeExample: `-- MySQL: structured, relational data
CREATE TABLE subscriptions (
    id         INT PRIMARY KEY,
    user_id    INT REFERENCES users(id),
    plan       ENUM('free','pro','enterprise'),
    starts_at  DATETIME,
    ends_at    DATETIME,
    INDEX idx_user (user_id),
    INDEX idx_active (ends_at)
);

-- MySQL JSON column: flexible metadata without separate table
CREATE TABLE products (
    id         INT PRIMARY KEY,
    name       VARCHAR(255),
    attributes JSON  -- {"color":"red","size":"M","weight":0.5}
);

SELECT name, attributes->>'$.color' AS color
FROM products
WHERE JSON_EXTRACT(attributes, '$.size') = 'M';

-- Generated column from JSON (indexable)
ALTER TABLE products
ADD COLUMN size VARCHAR(10) GENERATED ALWAYS AS
    (attributes->>'$.size') STORED;
CREATE INDEX idx_size ON products (size);`,
          exercise:
            'Add JSON columns to an existing table, write queries that filter on JSON fields, and create a generated column with an index.',
        },
      ],
      interviewQA: [
        {
          question: 'Explain MySQL replication.',
          answer:
            'In MySQL replication, one server (primary/master) writes data. Changes are recorded in a binary log. Replica servers read this log and apply the same changes. Replicas handle read traffic. This scales reads and provides redundancy. Failover: promote a replica to primary if the primary fails.',
        },
        {
          question: 'What is connection pooling?',
          answer:
            'Opening a database connection is expensive (TCP handshake, auth). A connection pool maintains N open connections and reuses them. Applications borrow a connection, use it, and return it to the pool. Most frameworks (Laravel, Node mysql2) use connection pools by default.',
        },
      ],
    },
  ],
};
