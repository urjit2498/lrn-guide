import type { SpecificSectionData } from './php';

const javascript: Record<string, SpecificSectionData> = {
  'Execution Context and Call Stack': {
    explanation:
      'JavaScript executes code inside execution contexts. Global context is created first, then function contexts are pushed to the call stack when functions run. The call stack is LIFO: last called, first completed. If recursion has no base case, stack frames keep growing until `RangeError: Maximum call stack size exceeded`.',
    realWorldExample:
      'In a checkout page, clicking "Pay" triggers `validateCart() -> calculateTax() -> submitOrder()`. If `calculateTax()` accidentally calls itself on malformed data, the stack overflows and the button appears frozen.',
    practicalUseCase:
      'Add a `console.trace()` inside nested function calls and inspect stack order. Then create a recursive function with and without base case to see where stack overflow happens.',
    keyPoints: [
      'Every function call creates a new execution context and stack frame.',
      'Synchronous code must finish before async callbacks run.',
      'Stack overflow is a logic bug, not a performance optimization issue.',
      '`try/catch` catches runtime errors inside the current call stack path only.',
    ],
    interviewQA: [
      {
        question: 'What is the difference between execution context and call stack?',
        answer:
          'Execution context is the environment containing variables, scope chain, and `this` binding for one running unit of code. Call stack is the runtime structure holding active contexts in order.',
        follow_up: 'How would you debug a stack overflow in production logs?',
      },
      {
        question: 'Why does heavy synchronous work block user input in the browser?',
        answer:
          'Because it occupies the single JavaScript thread and keeps the current stack frame active, so rendering and event handlers cannot run until the stack clears.',
        follow_up: 'Name one strategy to break long work into non-blocking chunks.',
      },
    ],
  },
  'Variables, Scope, and Hoisting': {
    explanation:
      'Hoisting is JavaScript’s creation-phase behavior. `var` declarations are hoisted and initialized with `undefined`, while `let` and `const` are hoisted but uninitialized until declaration line (Temporal Dead Zone). Function declarations are hoisted with their bodies.',
    realWorldExample:
      'A legacy analytics script used `var userId` in a loop and every async callback logged the final loop value, causing wrong attribution for events.',
    practicalUseCase:
      'Rewrite a `for (var i...) setTimeout(...)` loop using `let` and compare outputs. Then trigger TDZ error intentionally to understand why `let` guards early access bugs.',
    keyPoints: [
      '`var` is function-scoped; `let` and `const` are block-scoped.',
      'TDZ errors happen before declaration line for `let/const`.',
      '`const` protects reassignment, not deep object immutability.',
      'Function declaration hoisting differs from function expression assignment.',
    ],
    interviewQA: [
      {
        question: 'Why does `console.log(a); var a = 10;` print `undefined`?',
        answer:
          '`var a` is hoisted and initialized as `undefined` during creation phase; assignment happens later in execution phase.',
        follow_up: 'What changes if `var` becomes `let`?',
      },
      {
        question: 'How does `let` reduce common async loop bugs?',
        answer:
          '`let` creates a new binding per loop iteration in block scope, so callbacks close over the correct iteration value.',
        follow_up: 'Can closures with `let` still leak memory? When?',
      },
    ],
  },
  'this Keyword and Binding Rules': {
    explanation:
      '`this` is decided by call-site. In `obj.method()`, `this` is `obj`. In detached `const fn = obj.method; fn()`, `this` becomes `undefined` in strict mode. Arrow functions do not create their own `this`; they capture outer lexical `this`.',
    realWorldExample:
      'A class-based payment widget passed `this.handleSubmit` as callback to a button without binding, so `this.apiClient` was undefined and order creation failed.',
    practicalUseCase:
      'Implement the same handler using `bind`, class field arrow, and wrapper callback. Compare readability and memory trade-offs.',
    keyPoints: [
      'Default binding depends on strict mode.',
      '`call`, `apply`, `bind` explicitly control `this`.',
      'Arrow functions are ideal for preserving outer instance context in callbacks.',
      'Do not use arrow functions as constructors (`new` fails).',
    ],
    interviewQA: [
      {
        question: 'Why does method extraction often break object logic?',
        answer:
          'Extraction changes call-site, so implicit object binding is lost and `this` no longer points to the original instance.',
        follow_up: 'When is `bind` preferable to wrapper arrow functions?',
      },
      {
        question: 'How is `this` resolved in event listeners?',
        answer:
          'In DOM listeners with normal function, `this` is the element; with arrow function, `this` comes from outer scope.',
        follow_up: 'Which style is safer in React components and why?',
      },
    ],
  },
  'Functions and Closures': {
    explanation:
      'A closure is a function that retains references to variables from its lexical scope even after outer function returns. This enables private state, factories, and controlled state mutation patterns.',
    realWorldExample:
      'A debounce utility for search input stores timer id in closure. Every keypress clears old timer and starts a new one, preventing 20 API calls per second while typing.',
    practicalUseCase:
      'Build a `createCounter()` closure with private `count` variable and public `increment/get/reset` methods. Verify external code cannot mutate `count` directly.',
    keyPoints: [
      'Closures capture bindings, not snapshots.',
      'Private state via closure avoids accidental global mutation.',
      'Long-lived closures can retain large objects and cause leaks.',
      'Factory functions use closures for independent instance state.',
    ],
    interviewQA: [
      {
        question: 'Where are closures used in production frontend code?',
        answer:
          'Debounce/throttle utilities, memoization wrappers, module factories, and callback-based state encapsulation all rely on closures.',
        follow_up: 'How can a closure become a memory leak in SPA navigation?',
      },
      {
        question: 'What is the difference between class private fields and closure privacy?',
        answer:
          'Class private fields are syntax-level privacy with instance methods, while closure privacy is lexical and can hide data without exposing it on object instances.',
        follow_up: 'Which one is easier to serialize/inspect during debugging?',
      },
    ],
  },
  'Prototype Chain and Inheritance': {
    explanation:
      'JavaScript objects inherit via prototype chain. Property lookup checks own properties first, then walks `[[Prototype]]` links. Class syntax is syntactic sugar over prototype-based inheritance.',
    realWorldExample:
      'A design system used constructor functions for Button variants. Shared methods on prototype reduced memory usage compared to attaching methods inside each constructor call.',
    practicalUseCase:
      'Create `function Animal(name){...}` and `function Dog(name){...}` with `Dog.prototype = Object.create(Animal.prototype)`; then compare with equivalent `class` syntax.',
    keyPoints: [
      'Prototype methods are shared across instances.',
      '`__proto__` is runtime object link; `prototype` belongs to constructor functions.',
      'Overriding methods supports polymorphic behavior.',
      '`instanceof` checks prototype chain, not class text.',
    ],
    interviewQA: [
      {
        question: 'Why are prototype methods more memory efficient than instance methods?',
        answer:
          'Prototype methods are stored once and shared by all instances, while instance methods create a new function per object.',
        follow_up: 'When is per-instance method still acceptable?',
      },
      {
        question: 'How does method overriding work in JS inheritance?',
        answer:
          'Child prototype defines method with same name, and lookup resolves child method first before parent prototype.',
        follow_up: 'How do you call parent implementation from overridden class method?',
      },
    ],
  },
  'Event Loop and Task Queues': {
    explanation:
      'JavaScript runtime executes synchronous stack first, then drains microtasks (Promise callbacks, `queueMicrotask`), then processes macrotasks (timers, I/O callbacks). This ordering explains many async timing bugs.',
    realWorldExample:
      'A checkout UI updated loading spinner via Promise microtask, but a `setTimeout` cleanup ran later; incorrect ordering caused brief stale status text in payment modal.',
    practicalUseCase:
      'Run: `console.log(1); setTimeout(()=>console.log(4),0); Promise.resolve().then(()=>console.log(3)); console.log(2);` and verify output `1 2 3 4`.',
    keyPoints: [
      'Microtasks run before next macrotask.',
      '`await` resumes on microtask queue.',
      'Long synchronous blocks delay timer callbacks.',
      'Understanding queue order is essential for race-condition debugging.',
    ],
    interviewQA: [
      {
        question: 'Why does Promise `.then` run before `setTimeout(...,0)`?',
        answer:
          'Promise handlers are microtasks and runtime drains microtasks completely before processing timer macrotasks.',
        follow_up: 'Can unlimited microtasks delay rendering? Explain.',
      },
      {
        question: 'How do you debug an ordering bug between API response handling and timers?',
        answer:
          'Trace sync path, microtask callbacks, and timer callbacks with timestamped logs and isolate which queue each callback enters.',
        follow_up: 'Which browser tool helps visualize long tasks and event loop delay?',
      },
    ],
  },
  'Promises and Async/Await': {
    explanation:
      'Promises model eventual completion (`pending -> fulfilled/rejected`). `async/await` is syntax over Promises that makes control flow look synchronous. Error handling should use `try/catch` and structured rejection paths.',
    realWorldExample:
      'A profile page loads user, orders, and notifications concurrently with `Promise.all`. If one endpoint fails, fallback UI renders partial data instead of crashing whole page.',
    practicalUseCase:
      'Implement `loadDashboard()` with `Promise.allSettled` and map rejected calls to default placeholders. Add retry for transient 503 responses.',
    keyPoints: [
      '`Promise.all` fails fast on first rejection.',
      '`Promise.allSettled` is useful when partial success is acceptable.',
      '`await` inside loops can serialize calls unintentionally.',
      'Always return/throw in async functions to avoid hanging states.',
    ],
    interviewQA: [
      {
        question: 'When would you choose `Promise.allSettled` over `Promise.all`?',
        answer:
          'Choose `allSettled` when each request is independent and UI can still render useful data even if one request fails.',
        follow_up: 'How would you retry only rejected settled promises?',
      },
      {
        question: 'What is a common async/await anti-pattern in API handlers?',
        answer:
          'Sequential awaits for independent calls increase latency; use parallel promises with bounded concurrency when safe.',
        follow_up: 'How do you avoid overloading downstream services while parallelizing?',
      },
    ],
  },
  'Memory Management and Garbage Collection': {
    explanation:
      'JavaScript uses garbage collection to reclaim unreachable objects. Leaks happen when references are retained unintentionally (listeners, timers, closures, detached DOM). GC cannot free objects that are still reachable.',
    realWorldExample:
      'A dashboard route mounted chart listeners on every navigation but never removed them. Memory grew from 120MB to 700MB over 40 minutes and browser tab became unresponsive.',
    practicalUseCase:
      'Create a component with `setInterval` and event listener, then navigate repeatedly. Capture heap snapshots before/after and fix by adding cleanup in unmount lifecycle.',
    keyPoints: [
      'Reachability drives GC; reference retention prevents cleanup.',
      'Detached DOM nodes with listeners are classic leak source.',
      'Use DevTools heap snapshots to compare retained object graphs.',
      'Cleanup timers/listeners/subscriptions on unmount.',
    ],
    interviewQA: [
      {
        question: 'How do you detect memory leaks in a SPA?',
        answer:
          'Use performance memory timeline and heap snapshots across repeated navigation flows to find retained nodes/listeners that should have been released.',
        follow_up: 'What leak pattern is most common with custom event buses?',
      },
      {
        question: 'Why can closures prevent garbage collection?',
        answer:
          'Because closure scope keeps references alive while the closure remains reachable, even if original UI element is gone.',
        follow_up: 'How do weak references differ from normal references here?',
      },
    ],
  },
};

const oop: Record<string, SpecificSectionData> = {
  'What is OOP': {
    explanation:
      'OOP organizes code around objects that hold state and behavior. Good OOP design makes business rules explicit in methods instead of scattered if/else logic. It is useful when data and behavior must evolve together over time.',
    realWorldExample:
      'In a subscription platform, `Subscription.activate()`, `pause()`, and `cancel()` enforce allowed transitions. This prevents invalid status changes spread across controllers.',
    practicalUseCase:
      'Create `Subscription` class with private status and methods that throw on invalid transitions. Write tests for allowed and blocked transitions.',
    keyPoints: [
      'Objects encapsulate state + behavior.',
      'Methods should enforce invariants.',
      'Model behavior near domain data to reduce duplication.',
      'Avoid anemic models that only expose getters/setters.',
    ],
    interviewQA: [
      {
        question: 'Why is OOP better than procedural style in rule-heavy domains?',
        answer:
          'Because domain rules live in cohesive objects, reducing duplicated condition logic across multiple services/controllers.',
        follow_up: 'When is procedural style actually simpler and preferable?',
      },
      {
        question: 'What is an anemic domain model?',
        answer:
          'A model containing only data fields while business logic is moved into external services, making invariants harder to protect.',
        follow_up: 'How would you refactor one anemic class incrementally?',
      },
    ],
  },
  Encapsulation: {
    explanation:
      'Encapsulation means hiding internal state and exposing safe methods. It prevents direct mutation that can break business invariants.',
    realWorldExample:
      'A wallet class keeps balance private. `withdraw(amount)` checks for sufficient balance and logs audit entry; direct assignment is impossible from outside.',
    practicalUseCase:
      'Implement a `BankAccount` class with private `#balance`, `deposit`, `withdraw`, and `getBalance` methods. Reject negative deposits and overdraw attempts.',
    keyPoints: [
      'Private fields (`#field`) protect internal data in modern JS.',
      'Public methods act as validation boundary.',
      'Encapsulation reduces invalid state bugs.',
      'Expose behavior, not raw mutable internals.',
    ],
    interviewQA: [
      {
        question: 'How does encapsulation improve debugging in production systems?',
        answer:
          'All state changes pass through controlled methods, so logging and validation are centralized at mutation points.',
        follow_up: 'What is the downside of exposing mutable objects directly via getters?',
      },
      {
        question: 'Is private field syntax enough for complete encapsulation?',
        answer:
          'It protects field access, but you still need method-level validation and careful return values to avoid leaking mutable references.',
        follow_up: 'How would you return collection data safely?',
      },
    ],
  },
  'Inheritance Basics': {
    explanation:
      'Inheritance allows specialized classes to reuse and extend parent behavior. It should represent a true “is-a” relationship, not just code reuse convenience.',
    realWorldExample:
      'A role system has `User` base class and `AdminUser` subclass with extra moderation capabilities while keeping shared authentication behavior in parent.',
    practicalUseCase:
      'Implement `User` with `canAccessDashboard()`. Extend `AdminUser` and override permission behavior. Compare with composition-based role policies.',
    keyPoints: [
      'Use inheritance for shared semantic behavior.',
      'Avoid deep hierarchies that are hard to change.',
      'Override carefully to preserve base contract.',
      'Prefer composition when variation is orthogonal.',
    ],
    interviewQA: [
      {
        question: 'What is a sign inheritance is the wrong tool?',
        answer:
          'If subclasses keep disabling or bypassing parent methods, relationship is likely not a real subtype and design should move to composition.',
        follow_up: 'Give a concrete refactor path from inheritance to composition.',
      },
      {
        question: 'How can inheritance break backward compatibility?',
        answer:
          'Parent method contract changes can silently alter subclass behavior and break callers depending on old assumptions.',
        follow_up: 'How do contract tests help here?',
      },
    ],
  },
  'Polymorphism Basics': {
    explanation:
      'Polymorphism lets code call the same method on different objects and get type-specific behavior without type checks everywhere.',
    realWorldExample:
      'Checkout service calls `paymentMethod.charge(amount)` for card, UPI, or wallet implementations without `if (type === "...")` branching.',
    practicalUseCase:
      'Build `CardPayment`, `UpiPayment`, and `WalletPayment` classes implementing a shared `charge` method. Add a new `NetBankingPayment` without changing checkout flow.',
    keyPoints: [
      'Reduces conditional complexity.',
      'Supports open extension for new behaviors.',
      'Works best with clear shared contracts.',
      'Enables easier testing with mock implementations.',
    ],
    interviewQA: [
      {
        question: 'Why is polymorphism preferred over switch-case by payment type?',
        answer:
          'It localizes behavior to each payment class and avoids central branching updates whenever a new method is added.',
        follow_up: 'Where can polymorphism be overused?',
      },
      {
        question: 'How does polymorphism support dependency injection?',
        answer:
          'Services depend on interface contract, so test doubles and alternate implementations can be injected without changing service logic.',
        follow_up: 'What breaks if implementations violate shared method semantics?',
      },
    ],
  },
  'Abstraction Basics': {
    explanation:
      'Abstraction hides implementation complexity behind a clear contract. Callers focus on “what” behavior they need, not “how” it is implemented.',
    realWorldExample:
      'An `EmailService` exposes `send(to, template, data)` while provider-specific SMTP/SES details stay inside adapter classes.',
    practicalUseCase:
      'Define a `StorageService` abstraction with `upload` and `getSignedUrl`. Implement local and S3 versions without changing consumer code.',
    keyPoints: [
      'Contracts reduce coupling between layers.',
      'Abstractions should map to stable domain behavior.',
      'Too many abstractions increase cognitive overhead.',
      'Good naming is critical for useful abstractions.',
    ],
    interviewQA: [
      {
        question: 'How is abstraction different from encapsulation?',
        answer:
          'Encapsulation controls access to object internals; abstraction defines the essential external contract while hiding underlying complexity.',
        follow_up: 'Can you have encapsulation without abstraction?',
      },
      {
        question: 'When does abstraction become harmful?',
        answer:
          'When introduced without real variation, it adds indirection and slows debugging without reducing change cost.',
        follow_up: 'How would you detect and remove unnecessary abstraction layers?',
      },
    ],
  },
  'Composition vs Inheritance': {
    explanation:
      'Composition builds behavior by combining smaller objects, while inheritance extends a parent class. Composition is safer when features vary independently because it avoids deep hierarchy coupling.',
    realWorldExample:
      'A notification system supports email, SMS, and push. Composition uses channel strategy objects; adding WhatsApp does not require modifying a parent notification class.',
    practicalUseCase:
      'Refactor a `Vehicle` inheritance tree into composed `EngineStrategy` and `PricingStrategy` objects, then swap strategies per market.',
    keyPoints: [
      'Composition favors runtime flexibility.',
      'Inheritance can create fragile base-class dependencies.',
      'Use composition when capabilities combine in many permutations.',
      'Prefer behavior injection over subclass explosion.',
    ],
    interviewQA: [
      {
        question: 'Why does composition usually age better than inheritance?',
        answer:
          'Because behavior can be combined or replaced without changing base classes, so new requirements do not force hierarchy rewrites.',
        follow_up: 'When is inheritance still the cleaner option?',
      },
      {
        question: 'How do you migrate from inheritance to composition safely?',
        answer:
          'Introduce composable collaborators behind existing API first, then gradually flatten subclass tree while preserving external contracts.',
        follow_up: 'What tests are critical during this migration?',
      },
    ],
  },
  'OOP Architecture Trade-offs': {
    explanation:
      'In large systems, OOP trade-offs include abstraction cost, object graph complexity, and performance overhead from excessive indirection. Strong modeling helps change safety, but too many layers hurt onboarding and debugging speed.',
    realWorldExample:
      'A logistics service had 12 tiny classes for one simple address formatting flow. Debugging required stepping through many wrappers; team collapsed low-value layers and kept only domain-critical abstractions.',
    practicalUseCase:
      'Review one module and list abstractions by value: high-change boundary, test seam, or pure indirection. Remove wrappers that provide no contract value.',
    keyPoints: [
      'Abstractions should reduce future change cost.',
      'Over-abstraction increases cognitive load.',
      'Domain invariants deserve strong object boundaries.',
      'Measure maintainability impact, not class count.',
    ],
    interviewQA: [
      {
        question: 'How do you identify over-engineered OOP in code reviews?',
        answer:
          'Look for many pass-through classes with no unique rule ownership and frequent “jump through files” debugging with little value gain.',
        follow_up: 'What is your rubric for removing layers?',
      },
      {
        question: 'What is the cost of anemic OOP at scale?',
        answer:
          'Rules spread into services/controllers, creating duplicated conditions and inconsistent behavior across endpoints.',
        follow_up: 'How would you centralize invariants without a full rewrite?',
      },
    ],
  },
};

const solid: Record<string, SpecificSectionData> = {
  'Single Responsibility Principle': {
    explanation:
      'A class should have one reason to change. If one class handles validation, persistence, and notification, unrelated changes keep colliding in the same file.',
    realWorldExample:
      'An `OrderService` that validates requests, writes DB, sends email, and publishes analytics became fragile: a mail provider change required redeploying order logic.',
    practicalUseCase:
      'Split `OrderService` into `OrderValidator`, `OrderRepository`, and `OrderNotifier`. Keep orchestration in a thin application service.',
    keyPoints: [
      'Group behavior by change axis, not by convenience.',
      'SRP reduces merge conflicts and regression risk.',
      'Thin orchestrators + focused collaborators are easier to test.',
      'SRP is not one-method-per-class; it is one reason-to-change.',
    ],
    interviewQA: [
      {
        question: 'How do you identify SRP violation in a code review?',
        answer:
          'Look for mixed concerns: IO + business rules + formatting in one class, or frequent unrelated change requests touching same file.',
        follow_up: 'What is a safe first extraction step without full rewrite?',
      },
      {
        question: 'Can SRP increase file count too much?',
        answer:
          'Yes, if over-applied mechanically. Use SRP where change pressure exists, not for trivial helpers with stable behavior.',
        follow_up: 'How do you balance SRP with readability for juniors?',
      },
    ],
  },
  'Open Closed Principle': {
    explanation:
      'Software entities should be open for extension and closed for modification. Add new behavior by adding new classes, not editing stable core branching logic.',
    realWorldExample:
      'A shipping calculator originally used `if(country === "...")` chain. Each new region edit risked breaking existing paths. Strategy classes made new regions additive.',
    practicalUseCase:
      'Implement `ShippingStrategy` interface and region-specific classes (`IndiaShipping`, `USShipping`). Inject strategy resolver based on order country.',
    keyPoints: [
      'Extension points should be explicit (interfaces/strategies).',
      'Reduces regression from repeated edits in core logic.',
      'Works best where variation is expected.',
      'Avoid premature abstraction for one fixed behavior.',
    ],
    interviewQA: [
      {
        question: 'How does OCP improve release safety in billing modules?',
        answer:
          'New pricing/tax rules are added as new implementations without changing proven core flow, reducing side-effect risk in existing countries.',
        follow_up: 'What testing strategy validates old behavior remains intact?',
      },
      {
        question: 'When is modifying existing code better than extending?',
        answer:
          'When behavior is wrong or dead and no future variation exists; unnecessary extension would add noise.',
        follow_up: 'How do you decide this in a fast-moving startup?',
      },
    ],
  },
  'Liskov Substitution Principle': {
    explanation:
      'Subtypes must be replaceable for their base type without breaking behavior. If child class changes contract expectations, consumers fail at runtime.',
    realWorldExample:
      'A `ReadOnlyCache` subclass of `Cache` threw exception on `set()`, breaking services that expected writable cache contract.',
    practicalUseCase:
      'Split read/write responsibilities into separate interfaces so read-only implementation does not pretend to satisfy write contract.',
    keyPoints: [
      'Subclasses must honor parent contract semantics.',
      'Do not strengthen preconditions in child methods.',
      'Avoid inheritance when behavior differs fundamentally.',
      'Contract tests catch substitution violations.',
    ],
    interviewQA: [
      {
        question: 'Give a practical LSP violation in backend code.',
        answer:
          'Subclass throws `UnsupportedOperation` for methods that callers expect to work from base type, causing runtime failures after substitution.',
        follow_up: 'How would interface segregation prevent this?',
      },
      {
        question: 'How do you test LSP in CI?',
        answer:
          'Run shared behavior test suite against every implementation of the same abstraction and assert consistent contract guarantees.',
        follow_up: 'What should be included in a contract test suite?',
      },
    ],
  },
  'Interface Segregation Principle': {
    explanation:
      'Clients should not depend on methods they do not use. Fat interfaces force implementations to carry irrelevant methods and create fake no-op behavior.',
    realWorldExample:
      'A single `UserRepository` interface had admin-only analytics methods. Auth service implementing it had to include meaningless stubs.',
    practicalUseCase:
      'Split into `UserReader`, `UserWriter`, and `UserAnalyticsReader` interfaces and inject only required contracts per service.',
    keyPoints: [
      'Small focused interfaces reduce coupling.',
      'Prevents no-op or exception-throwing method implementations.',
      'Improves mocking in tests by minimizing method surface.',
      'Do not over-fragment into one-method interfaces unnecessarily.',
    ],
    interviewQA: [
      {
        question: 'How does ISP improve unit test quality?',
        answer:
          'Mocks need only methods used by the unit, so test setup is smaller and less brittle when unrelated methods change.',
        follow_up: 'What is a sign interface splitting went too far?',
      },
      {
        question: 'Why are `UnsupportedOperationException` methods a design smell?',
        answer:
          'They indicate implementation was forced into an interface contract it cannot truly satisfy, usually violating ISP and LSP together.',
        follow_up: 'How would you refactor without breaking callers?',
      },
    ],
  },
  'Dependency Inversion Principle': {
    explanation:
      'High-level policy should depend on abstractions, not concrete low-level modules. This allows swapping infrastructure without rewriting business rules.',
    realWorldExample:
      'Checkout service depended on `StripeGateway` directly. During regional expansion to Razorpay, core checkout code needed edits. Replacing with `PaymentGateway` contract removed that coupling.',
    practicalUseCase:
      'Inject `PaymentGateway` interface into checkout service. Configure concrete adapter in composition root/container per environment.',
    keyPoints: [
      'Business logic stays stable while adapters change.',
      'Dependency injection supports DIP implementation.',
      'Improves testability with fake/in-memory adapters.',
      'Avoid service locator anti-pattern that hides dependencies.',
    ],
    interviewQA: [
      {
        question: 'How is DIP different from dependency injection?',
        answer:
          'DIP is design principle about depending on abstractions; dependency injection is a technique to supply concrete implementations.',
        follow_up: 'Can a project use DI container and still violate DIP?',
      },
      {
        question: 'Where should abstractions live for clean DIP architecture?',
        answer:
          'In higher-level policy/domain layer consumed by both application and infrastructure adapters, not inside low-level implementation package.',
        follow_up: 'What import direction rule enforces this?',
      },
    ],
  },
  'Applying SOLID in Refactoring': {
    explanation:
      'Applying SOLID in legacy code means incremental refactoring, not big rewrites. Start by isolating one seam, add tests, and move one responsibility at a time.',
    realWorldExample:
      'A report generator mixed SQL, formatting, and email delivery. Team extracted data fetcher first (SRP), then report formatter strategy (OCP), then delivery interface (DIP).',
    practicalUseCase:
      'Pick one 300+ line class and perform 3-step refactor: extract validator, extract persistence adapter, inject interface dependency. Keep behavior identical.',
    keyPoints: [
      'Add characterization tests before structural refactor.',
      'Extract one concern per PR to reduce risk.',
      'Use contract tests when introducing interfaces.',
      'Prefer evolutionary refactor over rewrite deadlines.',
    ],
    interviewQA: [
      {
        question: 'How do you apply SOLID without stopping feature delivery?',
        answer:
          'Refactor around changed areas only, with small pull requests tied to current feature work so design improves continuously.',
        follow_up: 'Which anti-pattern appears if team does delayed “big cleanup sprint”?',
      },
      {
        question: 'What is the first SOLID step in a god-class refactor?',
        answer:
          'Find the highest-volatility responsibility and extract it behind tests first, because it gives immediate maintenance payoff.',
        follow_up: 'How do you pick that responsibility objectively?',
      },
    ],
  },
  'SOLID Trade-offs in Large Systems': {
    explanation:
      'SOLID improves changeability, but each abstraction adds indirection. In large systems, apply principles where change frequency and integration risk are high, not blindly everywhere.',
    realWorldExample:
      'A payments platform used DIP and OCP for gateways/tax engines, but kept straightforward internal mapping logic concrete. This reduced complexity while preserving extensibility where needed.',
    practicalUseCase:
      'Map modules by volatility and business criticality. Enforce SOLID strongly in high-volatility boundaries; keep low-volatility internals simple.',
    keyPoints: [
      'Use principles strategically by change pressure.',
      'Every interface should justify its lifecycle value.',
      'Observability is harder with deep indirection.',
      'Architecture reviews should remove stale abstractions.',
    ],
    interviewQA: [
      {
        question: 'Can strict SOLID hurt delivery speed?',
        answer:
          'Yes, over-abstraction can slow feature work and debugging when variability is low; principles must be applied proportionally.',
        follow_up: 'How do you decide abstraction ROI before adding it?',
      },
      {
        question: 'Where should SOLID be strongest in distributed systems?',
        answer:
          'At integration boundaries (payments, storage, messaging) where implementations change and failure impact is high.',
        follow_up: 'Why not enforce same rigor in tiny utility modules?',
      },
    ],
  },
};

export const JS_OOP_SOLID_CONTENT: Record<string, Record<string, SpecificSectionData>> = {
  javascript,
  oop,
  solid,
};
