import { InterviewTopic } from './types';

export const mysqlInterview: InterviewTopic = {
  beginner: [
    {
      question: "What is a database and what is MySQL?",
      answer: "A database is an organised collection of data. MySQL is an open-source Relational Database Management System (RDBMS) — it stores data in tables with rows and columns (like Excel), enforces relationships between tables, and uses SQL to query data. It is the world's most popular open-source database, used by Facebook, Twitter, YouTube, and WordPress.",
      example: "-- A 'users' table\n+----+-------+------------------+\n| id | name  | email            |\n+----+-------+------------------+\n|  1 | Alice | alice@email.com  |\n|  2 | Bob   | bob@email.com    |\n+----+-------+------------------+",
      use_case: "An e-commerce site stores products, orders, and customers in MySQL. The database enforces that every order must link to a valid customer (referential integrity).",
      follow_up: "What is the difference between SQL and NoSQL databases? When would you choose MySQL over MongoDB?"
    },
    {
      question: "What is SQL and what are the main SQL commands?",
      answer: "SQL (Structured Query Language) is the language used to communicate with relational databases. Main categories: DDL (Data Definition Language — CREATE, ALTER, DROP), DML (Data Manipulation Language — SELECT, INSERT, UPDATE, DELETE), DCL (Data Control Language — GRANT, REVOKE), TCL (Transaction Control — COMMIT, ROLLBACK, SAVEPOINT).",
      example: "-- DDL: Create structure\nCREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(255), price DECIMAL(10,2));\n\n-- DML: Work with data\nINSERT INTO products VALUES (1, 'Laptop', 999.99);\nSELECT name, price FROM products WHERE price > 500;\nUPDATE products SET price = 899.99 WHERE id = 1;\nDELETE FROM products WHERE id = 1;",
      use_case: "Backend developers use SQL daily to read user data for API responses, insert new records from form submissions, and update status fields.",
      follow_up: "What is the difference between WHERE and HAVING clauses?"
    },
    {
      question: "What is a PRIMARY KEY?",
      answer: "A PRIMARY KEY uniquely identifies each row in a table. It cannot be NULL and must be unique. Every table should have one. MySQL automatically creates a unique index for the primary key. Best practice: use an auto-incrementing integer (INT AUTO_INCREMENT) or UUID as the primary key.",
      example: "CREATE TABLE users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    name VARCHAR(100) NOT NULL\n);\n-- id is PK — unique, auto-increments: 1, 2, 3, ...\n-- Each row has a guaranteed unique identifier",
      use_case: "When a React app requests /api/users/42, the server queries WHERE id = 42 — the primary key lookup is instant because MySQL maintains an index on it automatically.",
      follow_up: "What is the difference between PRIMARY KEY, UNIQUE KEY, and INDEX? Can a table have multiple primary keys?"
    },
    {
      question: "What is a FOREIGN KEY?",
      answer: "A FOREIGN KEY is a column in one table that references the PRIMARY KEY of another table. It enforces referential integrity — you cannot insert an order for a non-existent customer. ON DELETE CASCADE automatically deletes related records. ON DELETE RESTRICT prevents deletion if related records exist.",
      example: "CREATE TABLE orders (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    user_id INT NOT NULL,\n    total DECIMAL(10,2),\n    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\n);\n-- If user id=5 is deleted, all their orders are automatically deleted too",
      use_case: "Prevents orphaned records. Without FK constraints, you could delete a user while their orders still exist — referencing a user_id that no longer exists (data corruption).",
      follow_up: "What is the difference between ON DELETE CASCADE, SET NULL, and RESTRICT? When would you use each?"
    },
    {
      question: "What is a JOIN and what types exist?",
      answer: "JOIN combines rows from two or more tables based on a related column. Types: INNER JOIN (only rows with matches in BOTH tables), LEFT JOIN (all rows from left table + matching from right, NULL if no match), RIGHT JOIN (opposite of LEFT), FULL OUTER JOIN (all rows from both, MySQL uses UNION for this), CROSS JOIN (every row combined with every other row).",
      example: "-- INNER JOIN: only orders that have a matching user\nSELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;\n\n-- LEFT JOIN: all users, even those without orders\nSELECT u.name, COUNT(o.id) as order_count\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id;",
      use_case: "An order history page queries: user name (users table) + order details (orders table) + product names (products table) in one JOIN query.",
      follow_up: "What is a self JOIN? Give an example (hint: employee-manager relationship in the same table)."
    },
    {
      question: "What is the difference between WHERE and HAVING?",
      answer: "WHERE filters rows BEFORE grouping (before GROUP BY) — operates on individual rows. HAVING filters groups AFTER aggregation (after GROUP BY) — operates on aggregate results. You cannot use aggregate functions (SUM, COUNT, AVG) in WHERE. HAVING is designed for filtering aggregate results.",
      example: "-- WHERE: filter individual rows before grouping\nSELECT category, SUM(price) as total\nFROM products\nWHERE price > 50        -- filters ROWS (price column directly)\nGROUP BY category;\n\n-- HAVING: filter groups after aggregation\nSELECT category, SUM(price) as total\nFROM products\nGROUP BY category\nHAVING SUM(price) > 1000; -- filters GROUPS (aggregate result)",
      use_case: "Find product categories where total revenue exceeds $10,000 — that's a HAVING clause because you're filtering on an aggregate (sum of sales).",
      follow_up: "Can you use both WHERE and HAVING in the same query? What is the execution order?"
    },
    {
      question: "What are aggregate functions in MySQL?",
      answer: "Aggregate functions perform calculations on a set of rows and return a single value: COUNT() (count rows), SUM() (total), AVG() (average), MIN() (minimum), MAX() (maximum), GROUP_CONCAT() (combine values into a string). Used with GROUP BY to aggregate per group.",
      example: "-- Overall stats\nSELECT COUNT(*) as total_users, AVG(age) as avg_age, MAX(age) as oldest FROM users;\n\n-- Per category\nSELECT category, COUNT(*) as count, SUM(price) as revenue, AVG(price) as avg_price\nFROM products\nGROUP BY category\nORDER BY revenue DESC;",
      use_case: "An analytics dashboard: daily active users (COUNT), total revenue (SUM), average order value (AVG), highest and lowest single transaction (MAX/MIN).",
      follow_up: "What is the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT column)?"
    },
    {
      question: "What is an INDEX in MySQL and why is it important?",
      answer: "An index is a data structure that speeds up data retrieval. Without an index, MySQL scans every row (full table scan — O(n)). With an index, MySQL jumps directly to matching rows (B-tree lookup — O(log n)). Trade-off: indexes speed up reads but slow down writes (index must be updated on INSERT/UPDATE/DELETE) and use disk space.",
      example: "-- Without index: scans all 10 million rows\nSELECT * FROM orders WHERE user_id = 42; -- SLOW\n\n-- Create index\nCREATE INDEX idx_user_id ON orders(user_id);\n\n-- With index: jumps to user 42's rows in microseconds\nSELECT * FROM orders WHERE user_id = 42; -- FAST\n\n-- See indexes on a table\nSHOW INDEX FROM orders;",
      use_case: "A query that took 5 seconds on a 10M row table takes 2ms after adding the right index. Production systems with slow queries almost always need index tuning.",
      follow_up: "What is a composite index? What is the 'leftmost prefix rule'?"
    },
    {
      question: "What is the difference between VARCHAR and CHAR?",
      answer: "CHAR(n) is fixed-length — always stores exactly n bytes, padding with spaces if shorter. VARCHAR(n) is variable-length — stores only as many bytes as needed (plus 1-2 bytes overhead). CHAR is slightly faster because MySQL knows the exact size. Use CHAR for fixed-length data (country codes, status codes, hashes). Use VARCHAR for variable-length data (names, emails, descriptions).",
      example: "-- CHAR(5): 'Hi' stored as 'Hi   ' (3 trailing spaces) — wastes space\n-- VARCHAR(255): 'Hi' stored as 'Hi' (2 bytes + 1 length byte) — efficient\n\nCREATE TABLE users (\n    country_code CHAR(2),        -- always exactly 2 chars: 'IN', 'US'\n    name VARCHAR(100),            -- variable: 'Bob' to 'Alexandra Fernandez'\n    password_hash CHAR(64),       -- SHA-256 hash — always 64 chars\n    bio VARCHAR(500)              -- optional, varies greatly\n);",
      use_case: "Status fields (CHAR(1): 'A'=active, 'I'=inactive), ISO country codes (CHAR(2)), fixed-format IDs.",
      follow_up: "What is the maximum length for VARCHAR in MySQL? What happens if you exceed it?"
    },
    {
      question: "What is a transaction in MySQL?",
      answer: "A transaction is a group of SQL statements that execute as a single atomic unit — either ALL succeed or ALL fail. This maintains data consistency. ACID properties: Atomicity (all-or-nothing), Consistency (valid state before and after), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes).",
      example: "-- Bank transfer: both operations must succeed or both fail\nSTART TRANSACTION;\n\nUPDATE accounts SET balance = balance - 1000 WHERE id = 1; -- debit\nUPDATE accounts SET balance = balance + 1000 WHERE id = 2; -- credit\n\n-- Check for any issues\nIF @@ERROR <> 0 THEN\n    ROLLBACK; -- undo both if any problem\nELSE\n    COMMIT;  -- save both permanently\nEND IF;",
      use_case: "E-commerce checkout: deduct stock, create order, create order items, charge payment — all in one transaction. If payment fails, stock deduction and order creation are rolled back.",
      follow_up: "What is a deadlock? How does MySQL handle it? How do you prevent deadlocks?"
    },
    {
      question: "What is the difference between DELETE, TRUNCATE, and DROP?",
      answer: "DELETE removes rows based on WHERE condition, is logged (slow for many rows), can be rolled back within a transaction, doesn't reset AUTO_INCREMENT. TRUNCATE removes all rows instantly (DDL operation), cannot use WHERE, cannot be rolled back, resets AUTO_INCREMENT. DROP removes the entire table structure and data.",
      example: "-- DELETE: remove specific rows, can rollback\nDELETE FROM orders WHERE status = 'cancelled';\n\n-- TRUNCATE: remove ALL rows instantly, reset counter\nTRUNCATE TABLE temp_logs; -- faster than DELETE FROM temp_logs\n\n-- DROP: destroy the table entirely\nDROP TABLE IF EXISTS temp_logs; -- gone forever!",
      use_case: "Development environment: TRUNCATE users; to clear test data and start fresh. Production: DELETE WHERE condition to remove specific records.",
      follow_up: "Can you rollback a TRUNCATE? Is TRUNCATE DDL or DML? Why does it behave differently from DELETE?"
    },
    {
      question: "What is EXPLAIN in MySQL and how do you use it?",
      answer: "EXPLAIN shows how MySQL plans to execute a query — which indexes it uses, how many rows it scans, and what type of join it performs. It is the most important tool for query optimisation. Key columns: type (ALL = full scan BAD, ref/range = index used GOOD), key (which index is used), rows (estimated row scan count).",
      example: "EXPLAIN SELECT u.name, COUNT(o.id)\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.created_at > '2024-01-01'\nGROUP BY u.id;\n\n-- Look for:\n-- type: ALL → bad (add index)\n-- type: ref → good (uses index)\n-- key: NULL → no index used (add one!)\n-- rows: 1000000 → scanning 1M rows (needs index)",
      use_case: "A query taking 10 seconds in production. EXPLAIN shows type=ALL, rows=5000000 for the orders table — adding an index on created_at reduces it to type=range, rows=1200, query time: 8ms.",
      follow_up: "What is EXPLAIN ANALYZE? How is it different from EXPLAIN? What extra information does it provide?"
    },
    {
      question: "What is normalization in MySQL?",
      answer: "Normalization is the process of organizing data to reduce redundancy and improve data integrity. Normal forms: 1NF (no repeating groups, atomic values), 2NF (no partial dependency — non-key columns depend on the WHOLE primary key), 3NF (no transitive dependency — non-key columns depend only on the primary key, not on other non-key columns).",
      example: "-- UNNORMALIZED: product_category_name repeats everywhere\n-- orders: (order_id, product_id, product_name, category_id, category_name, price)\n-- If category_name changes, must update thousands of rows!\n\n-- NORMALIZED 3NF:\n-- products: (id, name, price, category_id)\n-- categories: (id, name)  ← stored ONCE, referenced by FK\n-- orders: (id, product_id, qty)  ← references products",
      use_case: "Storing category names in every product row means changing 'Electronics' to 'Consumer Electronics' requires updating 10,000 product rows. Normalized: update 1 row in categories table.",
      follow_up: "What is denormalization? When and why would you denormalize a database?"
    },
    {
      question: "What are the MySQL storage engines and which is recommended?",
      answer: "InnoDB: default and recommended — supports transactions, ACID, foreign keys, row-level locking, crash recovery. MyISAM: older — no transactions, table-level locking, faster for read-heavy workloads without transactions, no foreign keys. MEMORY: data in RAM — extremely fast, lost on restart (temp tables). Archive: compressed, append-only (logs).",
      example: "-- Create with explicit engine\nCREATE TABLE products (\n    id INT PRIMARY KEY,\n    name VARCHAR(255)\n) ENGINE=InnoDB;  -- recommended default\n\n-- Check current engine\nSHOW TABLE STATUS WHERE Name = 'products';\n\n-- Change engine (careful on large tables!)\nALTER TABLE old_table ENGINE=InnoDB;",
      use_case: "All production tables should use InnoDB for transactions, foreign keys, and crash safety. MyISAM is only relevant in legacy systems or specific full-text search scenarios.",
      follow_up: "Why does InnoDB use row-level locking while MyISAM uses table-level? How does this affect concurrency?"
    },
    {
      question: "What is NULL in MySQL and how should you handle it?",
      answer: "NULL represents a missing or unknown value. NULL is NOT equal to anything — even NULL != NULL. Comparisons with NULL using = always return NULL (unknown), not true or false. Use IS NULL and IS NOT NULL to check for NULL. NULL in arithmetic returns NULL. Aggregate functions like COUNT() and AVG() ignore NULLs.",
      example: "-- WRONG: this never matches any row!\nSELECT * FROM users WHERE middle_name = NULL;\n\n-- CORRECT:\nSELECT * FROM users WHERE middle_name IS NULL;\nSELECT * FROM users WHERE middle_name IS NOT NULL;\n\n-- COALESCE: return first non-NULL value\nSELECT COALESCE(phone, mobile, 'No contact') as contact FROM users;\n\n-- IFNULL shorthand\nSELECT IFNULL(discount, 0) as discount FROM orders;",
      use_case: "User profiles where not all fields are required (phone, bio, website). NULL means 'not provided'. Display 'Not specified' in the UI using COALESCE or application logic.",
      follow_up: "Does NULL = NULL in MySQL? What does NULL in an aggregate function do? Is NULL = 0?"
    }
  ],

  intermediate: [
    {
      question: "What is query optimisation and how do you approach it?",
      answer: "Step 1: Identify slow queries via slow query log (SET GLOBAL slow_query_log=ON). Step 2: Run EXPLAIN to understand the execution plan. Step 3: Look for full table scans (type=ALL), missing indexes, N+1 queries. Step 4: Add appropriate indexes. Step 5: Rewrite inefficient queries. Step 6: Consider query caching. Measure before and after each change.",
      example: "-- Enable slow query log\nSET GLOBAL slow_query_log = ON;\nSET GLOBAL long_query_time = 1; -- log queries > 1 second\n\n-- Find inefficient queries in app:\n-- 1. SELECT inside a loop (N+1 problem)\n-- 2. SELECT * instead of specific columns (over-fetching)\n-- 3. Missing WHERE clause (full table scan)\n-- 4. Functions on indexed columns (disables index)\n\n-- BAD: function on indexed column — can't use index!\nSELECT * FROM users WHERE YEAR(created_at) = 2024;\n\n-- GOOD: range query — uses index!\nSELECT * FROM users WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';",
      use_case: "A product search that takes 8 seconds. Slow query log reveals it's running without a WHERE index. Adding a composite index on (category, price) drops it to 12ms.",
      follow_up: "What is a covering index? How does it improve performance beyond just using a regular index?"
    },
    {
      question: "What is a composite index and what is the leftmost prefix rule?",
      answer: "A composite index is an index on multiple columns (a, b, c). The leftmost prefix rule: MySQL can use the index for queries on (a), (a, b), or (a, b, c) — starting from the leftmost column. It cannot use the index for queries starting with just (b) or (c). Order matters: put the most selective/frequently queried columns first.",
      example: "CREATE INDEX idx_user_date ON orders(user_id, created_at, status);\n\n-- Uses index (leftmost prefix)\nSELECT * FROM orders WHERE user_id = 5;                          -- uses index\nSELECT * FROM orders WHERE user_id = 5 AND created_at > '2024-01-01'; -- uses index\n\n-- Cannot use index (skips leftmost column)\nSELECT * FROM orders WHERE created_at > '2024-01-01';            -- FULL SCAN\nSELECT * FROM orders WHERE status = 'shipped';                   -- FULL SCAN",
      use_case: "Most queries filter by user_id first, then optionally by date. The composite index (user_id, created_at) handles both efficiently.",
      follow_up: "What is a covering index? When an index contains all columns needed by a query, MySQL never hits the main table — called 'index-only scan'."
    },
    {
      question: "What are isolation levels in MySQL transactions?",
      answer: "Isolation levels control how transactions see each other's uncommitted data. Levels (lowest to highest isolation): READ UNCOMMITTED (dirty reads possible), READ COMMITTED (no dirty reads, but non-repeatable reads possible), REPEATABLE READ (MySQL default — same row always returns same value within transaction), SERIALIZABLE (complete isolation, highest consistency, lowest concurrency).",
      example: "-- Set isolation level\nSET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;\n\n-- Phantom read example (REPEATABLE READ prevents this):\n-- Transaction A: SELECT COUNT(*) FROM orders WHERE amount > 1000  → 5 rows\n-- Transaction B: INSERT INTO orders(amount) VALUES(1500); COMMIT;\n-- Transaction A: SELECT COUNT(*) FROM orders WHERE amount > 1000  → still 5 (phantom prevented)\n\n-- Check current level\nSELECT @@transaction_isolation;",
      use_case: "Financial systems use SERIALIZABLE isolation for accurate balance calculations. Analytics systems use READ COMMITTED to avoid blocking writes with long-running reports.",
      follow_up: "What is a phantom read? How does REPEATABLE READ prevent them in InnoDB (hint: MVCC, gap locks)?"
    },
    {
      question: "What is MVCC (Multi-Version Concurrency Control) in InnoDB?",
      answer: "MVCC allows multiple transactions to read and write concurrently without blocking each other. Instead of locking rows, InnoDB maintains multiple versions of each row (in the undo log). Readers see a consistent snapshot from when their transaction started — without blocking writers. Writers create new versions. This enables MySQL's high concurrency.",
      example: "-- Without MVCC: a long SELECT would lock rows, blocking all writes\n-- With MVCC:\n-- Transaction A starts at t=100: reads a snapshot of the data at t=100\n-- Transaction B at t=101: updates a row (creates new version)\n-- Transaction A's SELECT: still sees the t=100 version (consistent read)\n-- Transaction A commits at t=110: both transactions run concurrently without blocking\n\n-- InnoDB stores:\n-- 1. Current row version\n-- 2. Undo log: previous versions for MVCC reads\n-- 3. Transaction IDs: to determine which version each transaction sees",
      use_case: "A reporting query that takes 30 seconds doesn't block any writes. Without MVCC, that query would lock every row it reads, preventing all updates for 30 seconds.",
      follow_up: "What is undo log and undo tablespace? What happens to the undo log when there are long-running transactions?"
    },
    {
      question: "How does MySQL replication work?",
      answer: "MySQL replication copies data from a primary (master) server to one or more replica (slave) servers. The primary logs all changes in the binary log (binlog). Replicas read the binlog and replay the changes. Types: asynchronous (default — replica may lag), semi-synchronous (at least one replica acknowledges before primary commits), GTID-based (global transaction IDs, easier failover).",
      example: "-- On Primary: enable binary logging\n[mysqld]\nserver-id = 1\nlog_bin = mysql-bin\nbinlog_format = ROW  # ROW is safest for most workloads\n\n-- On Replica:\nCHANGE MASTER TO\n  MASTER_HOST = '192.168.1.100',\n  MASTER_USER = 'replication_user',\n  MASTER_PASSWORD = 'rep_password',\n  MASTER_AUTO_POSITION = 1;  # GTID mode\n\nSTART REPLICA;\nSHOW REPLICA STATUS\\G  # check replication lag",
      use_case: "A high-traffic application directs all writes to the primary and distributes reads across 3 replicas. Replicas also serve as hot standbys — if primary fails, promote a replica.",
      follow_up: "What is replication lag? What causes it and how do you monitor and mitigate it?"
    },
    {
      question: "What is partitioning in MySQL?",
      answer: "Partitioning splits a large table into smaller physical pieces while appearing as one logical table. Types: RANGE (by value range — e.g., sales by year), LIST (by discrete values — region), HASH (distributed evenly), KEY (similar to hash, MySQL manages key selection). Benefits: pruning (queries only scan relevant partitions), archiving old data, easier maintenance.",
      example: "-- RANGE partitioning by year — common for time-series data\nCREATE TABLE sales (\n    id INT,\n    sale_date DATE,\n    amount DECIMAL(10,2)\n)\nPARTITION BY RANGE (YEAR(sale_date)) (\n    PARTITION p2022 VALUES LESS THAN (2023),\n    PARTITION p2023 VALUES LESS THAN (2024),\n    PARTITION p2024 VALUES LESS THAN (2025),\n    PARTITION future VALUES LESS THAN MAXVALUE\n);\n\n-- This query only scans p2024 partition — partition pruning!\nSELECT * FROM sales WHERE sale_date BETWEEN '2024-01-01' AND '2024-12-31';",
      use_case: "A logging table with 5 billion rows. Queries for 'last 30 days' only scan the recent partition. Old partitions can be dropped instantly (faster than deleting millions of rows).",
      follow_up: "What are the limitations of MySQL partitioning? Can foreign keys span partitioned tables?"
    },
    {
      question: "What is a stored procedure in MySQL?",
      answer: "A stored procedure is a pre-compiled set of SQL statements stored in the database and executed with CALL. Benefits: reusable logic, reduced network traffic (logic runs on DB server), encapsulation. Drawbacks: harder to version control, business logic in the DB makes it harder to scale (can't easily scale DB like app servers), debugging is difficult.",
      example: "DELIMITER //\nCREATE PROCEDURE transfer_funds(IN from_id INT, IN to_id INT, IN amount DECIMAL(10,2))\nBEGIN\n    DECLARE EXIT HANDLER FOR SQLEXCEPTION\n    BEGIN\n        ROLLBACK;\n        RESIGNAL;\n    END;\n    \n    START TRANSACTION;\n    UPDATE accounts SET balance = balance - amount WHERE id = from_id;\n    IF ROW_COUNT() = 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Account not found'; END IF;\n    UPDATE accounts SET balance = balance + amount WHERE id = to_id;\n    COMMIT;\nEND //\nDELIMITER ;\n\n-- Call it\nCALL transfer_funds(1, 2, 100.00);",
      use_case: "Legacy banking systems use stored procedures for all financial operations — guaranteed to run on the database level with atomic transactions.",
      follow_up: "What is the difference between a stored procedure and a function in MySQL? When can you use each in a SELECT statement?"
    },
    {
      question: "What are MySQL views?",
      answer: "A view is a virtual table based on a SELECT query. It doesn't store data — it runs the query when accessed. Benefits: simplify complex queries, provide row/column-level security, abstract schema changes. An updatable view can support INSERT/UPDATE/DELETE if it meets conditions (no JOINs, no aggregates, no DISTINCT). ALGORITHM=MERGE vs ALGORITHM=TEMPTABLE affects performance.",
      example: "-- Create a view for active high-value customers\nCREATE VIEW premium_customers AS\nSELECT u.id, u.name, u.email, SUM(o.total) as lifetime_value\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE u.status = 'active'\nGROUP BY u.id\nHAVING lifetime_value > 10000;\n\n-- Use like a table\nSELECT * FROM premium_customers WHERE lifetime_value > 50000;",
      use_case: "A reporting team queries premium_customers without knowing the join logic. If the query logic changes, only the view definition is updated — all existing queries continue working.",
      follow_up: "What is the performance difference between a view and a materialized view? Does MySQL support materialized views natively?"
    },
    {
      question: "How do you handle database migrations safely?",
      answer: "Migrations change the DB schema over time in a controlled, version-tracked way. Rules for zero-downtime migrations: 1. Add columns as nullable first. 2. Deploy code that handles both old and new schema. 3. Backfill data. 4. Add NOT NULL constraint. 5. Remove old column after all code uses new one. Never lock large tables (use pt-online-schema-change for MySQL).",
      example: "-- SAFE: Add nullable column first\nALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL;\n-- Deploy code that writes phone if available\n\n-- UNSAFE: Immediate NOT NULL without default on large table\n-- This locks the entire table for the duration!\nALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL;\n\n-- Use percona's pt-osc for large tables:\n-- pt-online-schema-change --alter='ADD COLUMN phone VARCHAR(20)' D=mydb,t=users --execute",
      use_case: "Adding a new field to a users table with 100M rows in production. A naïve ALTER TABLE would lock the table for 30+ minutes, causing an outage. pt-osc creates a shadow table and does a live swap.",
      follow_up: "What is the expand/contract pattern for database migrations? How does it enable zero-downtime schema changes?"
    },
    {
      question: "What are MySQL triggers and when should you avoid them?",
      answer: "Triggers are SQL code that runs automatically BEFORE or AFTER an INSERT, UPDATE, or DELETE. They run invisibly — application developers may not know they exist. While useful for auditing, they make debugging very hard, can create performance surprises, and business logic hidden in triggers violates separation of concerns. Use carefully and document thoroughly.",
      example: "-- Audit trigger: log every update to products\nCREATE TRIGGER after_product_update\nAFTER UPDATE ON products\nFOR EACH ROW\nBEGIN\n    INSERT INTO audit_log (table_name, record_id, old_price, new_price, changed_at)\n    VALUES ('products', NEW.id, OLD.price, NEW.price, NOW());\nEND;\n\n-- Now EVERY UPDATE on products automatically logs to audit_log\n-- Problem: a developer doing a bulk UPDATE doesn't know about the trigger!\n-- Audit table grows unexpectedly",
      use_case: "Audit logging of sensitive data (price changes, medical record changes) where you need guaranteed capture even if application code is bypassed (direct SQL by DBA).",
      follow_up: "What are the hidden performance costs of triggers on bulk operations? How do you test triggers?"
    }
  ],

  advanced: [
    {
      question: "How would you design a database schema for a multi-tenant SaaS application?",
      answer: "Three approaches: 1. Shared database, shared schema — add tenant_id to every table, use row-level security. Simplest, cheapest, but cross-tenant data isolation risk. 2. Shared database, separate schemas — each tenant gets their own schema. Good balance. 3. Separate databases per tenant — maximum isolation, expensive, hard to query across tenants. Choose based on compliance requirements, scale, and budget.",
      example: "-- Approach 1: Shared schema (most common for SaaS)\nCREATE TABLE organizations (id INT PRIMARY KEY, name VARCHAR(255), plan ENUM('free','pro','enterprise'));\nCREATE TABLE users (\n    id INT PRIMARY KEY,\n    org_id INT NOT NULL REFERENCES organizations(id),  -- tenant ID\n    email VARCHAR(255),\n    INDEX idx_org (org_id)\n);\n-- Every query MUST include org_id in WHERE\n-- Application enforces: SELECT * FROM users WHERE org_id = ? AND ...\n\n-- Row Level Security (MySQL doesn't have native RLS — enforce in application layer)",
      use_case: "Slack, Notion, Jira — all SaaS tools with multiple organizations sharing the same database infrastructure. Each user's data is isolated by org_id.",
      follow_up: "What are the risks of the shared schema approach? How do you prevent data leakage between tenants? What is row-level security?"
    },
    {
      question: "How do you implement full-text search in MySQL?",
      answer: "MySQL has native FULLTEXT indexes (InnoDB in MySQL 5.6+). FULLTEXT indexes use an inverted index — maps words to their row locations. Three modes: NATURAL LANGUAGE (relevance ranking), BOOLEAN (+ required, - excluded, * wildcard, phrase with quotes), QUERY EXPANSION (broadens results to related terms). For complex search, Elasticsearch is a better choice.",
      example: "-- Create fulltext index\nALTER TABLE articles ADD FULLTEXT INDEX ft_content (title, body);\n\n-- Natural language search (ranked by relevance)\nSELECT *, MATCH(title, body) AGAINST('nodejs performance' IN NATURAL LANGUAGE MODE) AS score\nFROM articles\nWHERE MATCH(title, body) AGAINST('nodejs performance')\nORDER BY score DESC;\n\n-- Boolean mode\nSELECT * FROM articles\nWHERE MATCH(title, body) AGAINST('+nodejs -php performance*' IN BOOLEAN MODE);\n-- Must contain 'nodejs', must NOT contain 'php', may contain 'performance*'",
      use_case: "A blog search feature: FULLTEXT search on title and body is faster and more relevant than LIKE '%keyword%' (which can't use indexes).",
      follow_up: "What are the minimum word length and stopword limitations of MySQL FULLTEXT? When should you switch to Elasticsearch?"
    },
    {
      question: "Explain MySQL's query cache and why it was removed in MySQL 8.",
      answer: "The query cache stored SELECT query results. If the exact same query was run again and no underlying table had changed, MySQL returned the cached result. Problem: the cache invalidation was too aggressive (ANY write to ANY table in the query invalidated ALL cached results for that table) and the global mutex on the cache became a bottleneck under high write concurrency. It was deprecated in MySQL 5.7 and removed in MySQL 8. Use Redis/Memcached for application-level caching instead.",
      example: "-- In MySQL 5.7 (deprecated):\nSET GLOBAL query_cache_size = 67108864; -- 64MB\nSET GLOBAL query_cache_type = ON;\n\n-- Why it failed:\n-- App has SELECT * FROM products (cached)\n-- Someone runs: UPDATE products SET updated_at = NOW() WHERE id = 1\n-- ENTIRE products cache is invalidated!\n-- Under high write load: constant cache thrashing, global mutex contention\n\n-- Modern replacement: application-level cache\nconst result = await redis.get('products:list') || await db.query('SELECT...');",
      use_case: "Understanding why MySQL removed this feature demonstrates knowledge of concurrency bottlenecks and why application-level caching (Redis) with fine-grained invalidation is superior.",
      follow_up: "How do you implement intelligent cache invalidation that avoids the thundering herd problem?"
    },
    {
      question: "How would you handle a database that is becoming a bottleneck?",
      answer: "Progressive approach: 1. Query optimization and indexes (free). 2. Read replicas to scale reads (common). 3. Connection pooling (PgBouncer/ProxySQL). 4. Caching layer (Redis). 5. Vertical scaling (bigger server). 6. Database sharding or partitioning. 7. CQRS with event sourcing. 8. Migrate read-heavy data to specialized stores (Elasticsearch for search, Redis for hot data, S3 for blobs).",
      example: "-- Step 1: Identify the bottleneck\n-- Is it: CPU, I/O, locks, connection exhaustion?\n-- Tools: SHOW PROCESSLIST, performance_schema, slow query log\n\n-- Step 2: Add ProxySQL for connection pooling + query routing\n-- Writes → primary\n-- Reads → replicas (auto-routed)\n\n-- Step 3: Application-level caching\n-- Product pages → Redis (TTL 5 min)\n-- User sessions → Redis\n\n-- Step 4: Sharding (last resort, very complex)\n-- Shard by user_id % number_of_shards\n-- Each shard handles a subset of users",
      use_case: "An e-commerce flash sale generates 100x normal traffic. The single MySQL server becomes a bottleneck. Progressive optimisation handles it without a full rewrite.",
      follow_up: "What is ProxySQL and how does it enable read/write splitting transparently to the application?"
    },
    {
      question: "What is the InnoDB buffer pool and how do you tune it?",
      answer: "The InnoDB buffer pool is the most important performance setting in MySQL. It caches table data and indexes in RAM. When data is needed, MySQL checks the buffer pool first (no I/O). Cache miss = disk read. Rule: set buffer pool to 70-80% of available RAM for a dedicated MySQL server. Monitor with SHOW ENGINE INNODB STATUS and performance_schema.",
      example: "# my.cnf tuning for a dedicated 32GB RAM server:\n[mysqld]\ninnodb_buffer_pool_size = 24G        # 75% of RAM\ninnodb_buffer_pool_instances = 8     # parallel access (1 per 1GB)\ninnodb_log_file_size = 2G            # larger = fewer checkpoints = faster writes\ninnodb_flush_log_at_trx_commit = 2   # slight durability trade-off for speed\ninnodb_io_capacity = 2000            # IOPS of your storage (SSD: 5000-10000)\n\n-- Monitor buffer pool hit rate (should be > 99%)\nSHOW STATUS LIKE 'Innodb_buffer_pool_read%';\n-- Innodb_buffer_pool_reads = disk reads (misses)\n-- Innodb_buffer_pool_read_requests = total requests\n-- hit_rate = 1 - (reads / read_requests)",
      use_case: "A MySQL server with 32GB RAM but innodb_buffer_pool_size = 128MB (default) is constantly hitting disk. Setting it to 24GB makes 99% of requests served from RAM — 100x faster.",
      follow_up: "What is innodb_log_file_size and how does it affect write performance and crash recovery time?"
    }
  ]
};
