// Professional Profile Data structured using STAR methodology
// This data will be used for RAG system embeddings and retrieval

export interface STAREntry {
  id: string;
  category: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  skills: string[];
  keywords: string[];
}

export const professionalProfile = {
  name: "Digital Twin Professional",
  title: "Full-Stack Developer & AI Engineer",
  summary: "Experienced software engineer specializing in full-stack development, AI/ML integration, and scalable system architecture. Proven track record of delivering high-impact solutions using modern technologies.",
  
  contact: {
    email: "professional@digitaltwin.dev",
    linkedin: "linkedin.com/in/digitaltwin",
    github: "github.com/digitaltwin",
    location: "Remote / Global"
  },

  skills: {
    programming: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
    frontend: ["React", "Next.js", "Vue.js", "TailwindCSS", "HTML5", "CSS3"],
    backend: ["Node.js", "Express", "FastAPI", "Django", "REST APIs", "GraphQL"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Vector Databases"],
    aiml: ["TensorFlow", "PyTorch", "Transformers", "RAG Systems", "LangChain", "OpenAI API"],
    cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
    tools: ["Git", "CI/CD", "Jest", "Pytest", "Webpack", "Vite"]
  },

  experiences: [
    {
      id: "exp1",
      company: "TechCorp Solutions",
      position: "Senior Full-Stack Developer",
      duration: "2022 - Present",
      location: "Remote",
      description: "Leading development of enterprise-scale web applications with AI integration",
      achievements: [
        "Architected and deployed RAG-based customer support system serving 100K+ users",
        "Reduced API response time by 60% through optimization and caching strategies",
        "Mentored team of 5 junior developers in modern web development practices"
      ]
    },
    {
      id: "exp2",
      company: "InnovateLabs",
      position: "Full-Stack Developer",
      duration: "2020 - 2022",
      location: "Hybrid",
      description: "Developed scalable web applications and microservices architecture",
      achievements: [
        "Built real-time analytics dashboard processing 1M+ events daily",
        "Implemented CI/CD pipeline reducing deployment time by 75%",
        "Integrated third-party APIs and payment gateways for e-commerce platform"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Tech University",
      year: "2020",
      gpa: "3.8/4.0",
      relevant_courses: ["Data Structures", "Algorithms", "Machine Learning", "Database Systems", "Software Engineering"]
    }
  ],

  certifications: [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional Developer",
    "MongoDB Certified Developer"
  ]
};

// STAR Methodology Examples for Common Interview Questions
export const starExamples: STAREntry[] = [
  {
    id: "star1",
    category: "Technical Problem Solving",
    situation: "Our e-commerce platform was experiencing severe performance degradation during peak hours, with page load times exceeding 10 seconds and causing significant cart abandonment.",
    task: "I was tasked with identifying the bottlenecks and implementing solutions to reduce load times to under 2 seconds while maintaining system stability.",
    action: "I conducted comprehensive performance profiling using Chrome DevTools and New Relic. Identified inefficient database queries, lack of caching, and unoptimized image loading. Implemented Redis caching for frequently accessed data, optimized SQL queries with proper indexing, introduced lazy loading for images, and set up CDN for static assets. Created monitoring dashboards to track performance metrics in real-time.",
    result: "Reduced average page load time from 10s to 1.5s (85% improvement). Cart abandonment rate decreased by 40%, resulting in $500K additional monthly revenue. System now handles 3x traffic during peak hours without degradation.",
    skills: ["Performance Optimization", "Redis", "SQL", "CDN", "Monitoring", "Problem Solving"],
    keywords: ["performance", "optimization", "caching", "database", "scalability", "metrics"]
  },
  {
    id: "star2",
    category: "AI/ML Integration",
    situation: "Customer support team was overwhelmed with 500+ daily inquiries, with average response time of 4 hours. Many questions were repetitive and could be automated.",
    task: "Design and implement an AI-powered customer support system that could handle common queries automatically while routing complex issues to human agents.",
    action: "Built a RAG (Retrieval-Augmented Generation) system using OpenAI embeddings and vector database. Collected and structured 2000+ historical support tickets using STAR methodology. Implemented semantic search to retrieve relevant context. Created a Next.js interface with real-time chat functionality. Set up confidence scoring to determine when to escalate to human agents. Integrated with existing ticketing system via REST API.",
    result: "System successfully handles 70% of inquiries automatically with 92% customer satisfaction rating. Average response time reduced from 4 hours to 30 seconds for automated responses. Support team can now focus on complex issues, improving overall service quality. System processes 350+ queries daily with 95% accuracy.",
    skills: ["RAG Systems", "OpenAI API", "Vector Databases", "Next.js", "API Integration", "NLP"],
    keywords: ["AI", "RAG", "embeddings", "automation", "customer support", "machine learning", "chatbot"]
  },
  {
    id: "star3",
    category: "Team Leadership",
    situation: "Our development team was struggling with inconsistent code quality, frequent bugs in production, and missed deadlines. Team morale was low due to constant firefighting.",
    task: "As senior developer, I needed to establish best practices and improve team efficiency while maintaining delivery schedules.",
    action: "Introduced comprehensive code review process with clear guidelines. Set up automated testing with Jest and Cypress, achieving 80% code coverage requirement. Implemented CI/CD pipeline with automated deployments. Organized weekly knowledge-sharing sessions where team members presented technical topics. Created detailed documentation for common patterns and architecture decisions. Mentored junior developers through pair programming sessions.",
    result: "Production bugs reduced by 75% within 3 months. Code review process caught 90% of issues before production. Team velocity increased by 40% as developers spent less time debugging. Junior developers progressed faster with structured mentorship. Team satisfaction scores improved from 6.2 to 8.5 out of 10.",
    skills: ["Leadership", "Mentoring", "CI/CD", "Testing", "Code Review", "Documentation"],
    keywords: ["leadership", "mentoring", "code quality", "testing", "team management", "best practices"]
  },
  {
    id: "star4",
    category: "System Architecture",
    situation: "Legacy monolithic application was becoming unmaintainable with 200K+ lines of code. Deployment took 2 hours and any bug required full system restart, causing extended downtime.",
    task: "Architect and lead migration from monolith to microservices architecture without disrupting ongoing business operations.",
    action: "Designed microservices architecture with clear domain boundaries. Created migration roadmap prioritizing high-impact services. Implemented API gateway for routing and authentication. Set up Docker containers and Kubernetes for orchestration. Established service mesh for inter-service communication. Migrated services incrementally using strangler fig pattern. Set up comprehensive monitoring with Prometheus and Grafana.",
    result: "Successfully migrated 12 core services over 6 months with zero downtime. Deployment time reduced from 2 hours to 15 minutes. Individual services can now be updated independently, increasing deployment frequency from weekly to daily. System reliability improved with 99.9% uptime. Development teams can work independently on different services, increasing overall productivity by 50%.",
    skills: ["Microservices", "Docker", "Kubernetes", "System Design", "API Gateway", "DevOps"],
    keywords: ["architecture", "microservices", "migration", "scalability", "docker", "kubernetes", "system design"]
  },
  {
    id: "star5",
    category: "Data Engineering",
    situation: "Analytics team needed real-time insights from user behavior data, but existing batch processing system had 24-hour delay, making data stale and less actionable.",
    task: "Build real-time data pipeline to process and analyze user events with sub-minute latency while ensuring data accuracy and system reliability.",
    action: "Designed event-driven architecture using Apache Kafka for message streaming. Implemented data ingestion layer with Node.js services to capture user events. Built stream processing with Apache Flink for real-time aggregations. Set up time-series database (InfluxDB) for efficient storage and querying. Created real-time dashboards using React and WebSocket connections. Implemented data validation and error handling to ensure data quality.",
    result: "Reduced data latency from 24 hours to under 30 seconds. Analytics team can now make data-driven decisions in real-time. System processes 5M+ events daily with 99.99% accuracy. Real-time dashboards enabled A/B testing with immediate feedback, improving feature iteration speed by 10x. Marketing team increased campaign ROI by 35% using real-time insights.",
    skills: ["Data Engineering", "Apache Kafka", "Stream Processing", "Real-time Analytics", "WebSocket", "InfluxDB"],
    keywords: ["data pipeline", "real-time", "streaming", "kafka", "analytics", "big data", "event-driven"]
  },
  {
    id: "star6",
    category: "Security Implementation",
    situation: "Security audit revealed multiple vulnerabilities in our application including SQL injection risks, exposed API keys, and lack of proper authentication mechanisms.",
    task: "Implement comprehensive security measures to address all identified vulnerabilities and establish security best practices for future development.",
    action: "Conducted thorough security assessment of entire codebase. Implemented parameterized queries to prevent SQL injection. Set up environment variable management for sensitive credentials. Integrated OAuth 2.0 and JWT for secure authentication. Added rate limiting and CORS policies. Implemented input validation and sanitization across all endpoints. Set up automated security scanning in CI/CD pipeline. Created security guidelines documentation for team.",
    result: "Successfully addressed all critical and high-priority vulnerabilities within 2 weeks. Passed follow-up security audit with zero critical issues. Prevented potential data breach that could have cost company millions. Automated security scanning catches 95% of issues before code review. Team now follows security-first development approach, reducing security incidents by 90%.",
    skills: ["Security", "OAuth", "JWT", "SQL Injection Prevention", "API Security", "DevSecOps"],
    keywords: ["security", "authentication", "vulnerabilities", "SQL injection", "OAuth", "encryption", "best practices"]
  },
  {
    id: "star7",
    category: "API Development",
    situation: "Multiple client applications (web, mobile, IoT devices) needed to interact with our backend, but existing REST API was inconsistent, poorly documented, and inefficient for mobile clients.",
    task: "Design and implement a unified, well-documented API that serves all client types efficiently while maintaining backward compatibility.",
    action: "Designed RESTful API following OpenAPI 3.0 specification. Implemented GraphQL endpoint for flexible data fetching to optimize mobile performance. Created comprehensive API documentation using Swagger/OpenAPI. Set up API versioning strategy to maintain backward compatibility. Implemented request/response validation using JSON Schema. Added comprehensive error handling with meaningful error messages. Set up API monitoring and analytics to track usage patterns.",
    result: "Unified API reduced mobile app data usage by 60% through GraphQL optimization. API documentation reduced integration time for new clients from 2 weeks to 3 days. Backward compatibility strategy allowed smooth migration of 50+ existing integrations. API uptime improved to 99.95%. Developer satisfaction increased significantly with clear documentation and consistent error handling.",
    skills: ["API Design", "REST", "GraphQL", "OpenAPI", "Documentation", "API Versioning"],
    keywords: ["API", "REST", "GraphQL", "documentation", "integration", "backend", "web services"]
  },
  {
    id: "star8",
    category: "Performance Optimization",
    situation: "Mobile application was receiving poor reviews due to slow performance and high battery consumption, with average app rating dropping from 4.5 to 3.2 stars.",
    task: "Optimize mobile application performance to improve user experience and app store ratings while reducing resource consumption.",
    action: "Profiled application using React Native performance tools to identify bottlenecks. Implemented code splitting and lazy loading for faster initial load. Optimized image assets and implemented progressive loading. Reduced unnecessary re-renders using React.memo and useMemo. Implemented efficient state management with Redux Toolkit. Added offline-first capabilities with local caching. Optimized network requests with request batching and compression.",
    result: "App launch time reduced from 4.5s to 1.2s (73% improvement). Battery consumption decreased by 40%. App rating recovered to 4.6 stars within 2 months. User session duration increased by 55% due to improved experience. App size reduced by 30% through optimization. Crash rate decreased from 2.1% to 0.3%.",
    skills: ["React Native", "Performance Optimization", "Mobile Development", "State Management", "Caching"],
    keywords: ["mobile", "performance", "optimization", "React Native", "battery", "user experience"]
  },
  {
    id: "star9",
    category: "Database Optimization",
    situation: "Database queries were taking increasingly longer as data volume grew to 50M+ records. Some reports were timing out, and users complained about slow dashboard loading.",
    task: "Optimize database performance to handle growing data volume while maintaining fast query response times.",
    action: "Analyzed slow query logs to identify problematic queries. Created appropriate indexes on frequently queried columns. Implemented database partitioning for large tables by date ranges. Optimized complex joins and subqueries. Set up read replicas for reporting queries to reduce load on primary database. Implemented query result caching with Redis. Created materialized views for complex aggregations. Set up database monitoring with automated alerts.",
    result: "Average query response time reduced from 8s to 0.5s (94% improvement). Dashboard loading time decreased from 15s to 2s. Eliminated all query timeouts. Database can now handle 100M+ records efficiently. Read replica setup reduced primary database load by 60%. System successfully handles 10K concurrent users during peak hours.",
    skills: ["Database Optimization", "SQL", "Indexing", "PostgreSQL", "Redis", "Query Optimization"],
    keywords: ["database", "SQL", "optimization", "indexing", "performance", "scalability", "PostgreSQL"]
  },
  {
    id: "star10",
    category: "DevOps & Automation",
    situation: "Manual deployment process was error-prone, time-consuming (3-4 hours), and required multiple team members. Rollbacks were difficult and often caused extended downtime.",
    task: "Automate deployment process to enable fast, reliable deployments with easy rollback capabilities.",
    action: "Set up CI/CD pipeline using GitHub Actions. Implemented automated testing (unit, integration, e2e) that must pass before deployment. Created Docker containers for consistent environments. Set up Kubernetes for orchestration and auto-scaling. Implemented blue-green deployment strategy for zero-downtime releases. Created automated rollback mechanism. Set up infrastructure as code using Terraform. Implemented automated monitoring and alerting.",
    result: "Deployment time reduced from 3-4 hours to 15 minutes (95% improvement). Deployment frequency increased from weekly to multiple times daily. Deployment success rate improved from 85% to 99.5%. Rollback time reduced from 2 hours to 2 minutes. Zero-downtime deployments achieved. Team productivity increased as developers can deploy independently. Infrastructure provisioning time reduced from days to hours.",
    skills: ["CI/CD", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "DevOps", "Automation"],
    keywords: ["DevOps", "CI/CD", "automation", "deployment", "docker", "kubernetes", "infrastructure"]
  }
];

// Additional profile content for RAG system
export const additionalContent = [
  {
    id: "content1",
    title: "Technical Philosophy",
    content: "I believe in writing clean, maintainable code that prioritizes readability and scalability. Test-driven development and continuous integration are essential practices in my workflow. I advocate for documentation-first approach and believe that good architecture should be simple and easy to understand."
  },
  {
    id: "content2",
    title: "Problem-Solving Approach",
    content: "When faced with technical challenges, I start by thoroughly understanding the problem and its context. I research existing solutions and best practices, then design a solution that balances immediate needs with long-term maintainability. I believe in iterative development with continuous feedback and improvement."
  },
  {
    id: "content3",
    title: "Collaboration Style",
    content: "I thrive in collaborative environments where knowledge sharing is encouraged. I actively participate in code reviews, providing constructive feedback and learning from others. I believe in clear communication, setting expectations, and maintaining transparency about progress and challenges."
  },
  {
    id: "content4",
    title: "Learning & Growth",
    content: "I'm committed to continuous learning and staying current with technology trends. I regularly read technical blogs, contribute to open-source projects, and experiment with new technologies. I believe in sharing knowledge through technical writing, mentoring, and presenting at team meetings."
  },
  {
    id: "content5",
    title: "Project Highlights",
    content: "Successfully delivered 15+ production applications serving millions of users. Built scalable microservices architecture handling 10M+ daily requests. Implemented AI-powered features that improved user engagement by 45%. Led migration projects with zero downtime. Reduced infrastructure costs by 40% through optimization."
  }
];

// Combine all content for RAG system
export function getAllProfileContent(): string[] {
  const content: string[] = [];
  
  // Add basic profile info
  content.push(`Name: ${professionalProfile.name}`);
  content.push(`Title: ${professionalProfile.title}`);
  content.push(`Summary: ${professionalProfile.summary}`);
  
  // Add skills
  Object.entries(professionalProfile.skills).forEach(([category, skills]) => {
    content.push(`${category} skills: ${skills.join(', ')}`);
  });
  
  // Add experiences
  professionalProfile.experiences.forEach(exp => {
    content.push(`${exp.position} at ${exp.company} (${exp.duration}): ${exp.description}`);
    exp.achievements.forEach(achievement => {
      content.push(`Achievement: ${achievement}`);
    });
  });
  
  // Add STAR examples
  starExamples.forEach(star => {
    content.push(`${star.category} - Situation: ${star.situation}`);
    content.push(`${star.category} - Task: ${star.task}`);
    content.push(`${star.category} - Action: ${star.action}`);
    content.push(`${star.category} - Result: ${star.result}`);
    content.push(`Skills demonstrated: ${star.skills.join(', ')}`);
  });
  
  // Add additional content
  additionalContent.forEach(item => {
    content.push(`${item.title}: ${item.content}`);
  });
  
  return content;
}
