import { AiFillSecurityScan } from "react-icons/ai";
import { FaTerminal, FaDatabase, FaAws, FaDev } from "react-icons/fa6";
import { GiAutoRepair } from "react-icons/gi";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineDevicesOther } from "react-icons/md";
import {
  SiWindowsterminal,
  SiSpeedtest,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiAwsamplify,
  SiReact,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiFramer,
  SiAngular,
  SiBootstrap,
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiPython,
  SiFastapi,
  SiAmazonaws,
  SiDocker,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { VscCircuitBoard } from "react-icons/vsc";

export const services = [
  {
    name: "UX Design",
    text: `Well-designed User Interfaces can make a real difference. I conduct user research and follow the Design Thinking principles to create user-friendly interfaces.`,
    id: 0,
    icon: MdOutlineDevicesOther,
  },
  {
    name: "Frontend Development",
    text: `Websites and web applications must function well when they are interacting with the user. I use frontend technologies such as React, Next.js, and TypeScript to implement that.`,
    id: 1,
    icon: SiWindowsterminal,
  },
  {
    name: "API Development",
    text: `I design, develop, and maintain RESTful APIs. I utilize Node.js, Express.js, AWS API Gateway, and Lambda to implement them. I also use OpenAPI and Swagger to document APIs.`,
    id: 2,
    icon: TbApi,
  },
  {
    name: "Backend Development",
    text: `Any request from the user on the web browser is processed on the server side to provide a response. Any response requires data. I develop applications for the interaction between user and data.`,
    id: 3,
    icon: FaTerminal,
  },
  {
    name: "Database Design",
    text: `Data is the most valuable asset these days and users need to have access to data in every interaction with the application in real time. I design relational and non-relational database suitable for the application.`,
    id: 4,
    icon: FaDatabase,
  },
  {
    name: "Cloud Services",
    text: `I use AWS, Google Cloud, and Microsoft Azure to deploy and maintain applications. I also design cloud infrastructure based on the requirements of the application.`,
    id: 5,
    icon: FaAws,
  },
  {
    name: "DevOps",
    text: `As a software engineer, DevOps is essential for the success of any project. I employ tools such as Docker, Kubernetes, and Jenkins to deploy and maintain applications.`,
    id: 6,
    icon: FaDev,
  },
  {
    name: "Software Security",
    text: `Every data transaction involves some risks. As data is valuable, I eliminate those risks using authentication, data protection, secure data transfer protocols and encryption methods.`,
    id: 7,
    icon: AiFillSecurityScan,
  },
  {
    name: "Software Testing",
    text: "I test software to ensure that it works as expected. I use Jest, React Testing Library, and Cypress to test web applications for unit, integration, and e2e testing.",
    id: 8,
    icon: SiSpeedtest,
  },
  {
    name: "Application Architecture",
    text: "Full stack applications are complex, especially when they are deployed on the cloud services. I find the right solution and architecture to develop scalable and maintainable applications.",
    id: 9,
    icon: VscCircuitBoard,
  },
  {
    name: "Software Maintenance",
    text: `Like computer hardware, software products need to be maintained, debugged, and updated. Once the product is luanched, the maintenance is essential for the success of the product.`,
    id: 10,
    icon: GiAutoRepair,
  },
  {
    name: "Software Documentation",
    text: "In the process of software development, it is necessary to document the project. I write documentation for the project for future reference and maintenance, and use tools such as JSDoc and Markdown.",
    id: 11,
    icon: IoDocumentText,
  },
];

// Define commonly used tags as constants to avoid duplication
const TAGS_TS_NEXT_TAILWIND = ["Typescript", "Next.js", "Tailwind"];
const TAGS_TS_NEXT_TAILWIND_FRAMER = [
  "Typescript",
  "Next.js",
  "Tailwind",
  "Motion",
];

const projectsItems = [
  {
    index: 0,
    title: "PhyscianGPS",
    description:
      "A web application that uses AI to identify the best physicians",
    img: "/projects/physician-gps-home-1750x1000.webp",
    url: "/projects/case-study",
    tags: ["Typescript", "Next.js", "Amplify", "AWS", "Docker"],
    icons: [
      {
        name: "Typescript",
        icon: SiTypescript,
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
      {
        name: "Amplify",
        icon: SiAwsamplify,
      },
      {
        name: "AWS",
        icon: SiAmazonaws,
      },
      {
        name: "Docker",
        icon: SiDocker,
      },
    ],
    date: "2025",
  },
  {
    index: 1,
    title: "Job Intelligence Web",
    description: "An AI-powered job intelligence platform",
    img: "/projects/job-intelligence-web-1750x1000.webp",
    url: "https://job-intelligence-web.vercel.app/",
    tags: ["Typescript", "Next.js", "Python", "FastAPI"],
    icons: [
      {
        name: "Typescript",
        icon: SiTypescript,
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
      {
        name: "Python",
        icon: SiPython,
      },
      {
        name: "FastAPI",
        icon: SiFastapi,
      },
    ],
    date: "2025",
  },
  {
    index: 2,
    title: "My Dashbaord",
    description: "A full stack project management dashboard",
    img: "/projects/MyDash_Projects_1750x1000.webp",
    url: "https://payamd-dashboard.vercel.app/",
    tags: ["React", "Redux", "Express", "MongoDB"],
    icons: [
      {
        name: "React",
        icon: SiReact,
      },
      {
        name: "Redux",
        icon: SiRedux,
      },
      {
        name: "Express",
        icon: SiExpress,
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
      },
    ],
    date: "2023",
  },
  {
    index: 3,
    title: "My Web Blog",
    description: "My personal blog about books, films, and more",
    img: "/projects/blog_1750x1000.webp",
    url: "https://payamd-blog.vercel.app/",
    tags: TAGS_TS_NEXT_TAILWIND,
    icons: [
      {
        name: "Typescript",
        icon: SiTypescript,
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
      {
        name: "Tailwind",
        icon: SiTailwindcss,
      },
    ],
    date: "2024",
  },
  {
    index: 4,
    title: "Photography",
    description: "My photography blog website",
    img: "/projects/Portfolio_anim_Photography1750x1000.webp",
    url: "https://payamd-photo.vercel.app/",
    tags: TAGS_TS_NEXT_TAILWIND_FRAMER,
    icons: [
      {
        name: "Typescript",
        icon: SiTypescript,
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
      {
        name: "Tailwind",
        icon: SiTailwindcss,
      },
      {
        name: "Framer Motion",
        icon: SiFramer,
      },
    ],
    date: "2024",
  },
  {
    index: 5,
    title: "Algorithms for Life",
    description: "A GUI for learning Data Structure and Algorithms",
    img: "/projects/algorithms_2100x1200.webp",
    url: "https://algorithms-next.vercel.app/",
    tags: TAGS_TS_NEXT_TAILWIND,
    icons: [
      {
        name: "Typescript",
        icon: SiTypescript,
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
      },
      {
        name: "Tailwind",
        icon: SiTailwindcss,
      },
    ],
    date: "2023",
  },
  {
    index: 7,
    title: "Paper Browser",
    description: "A research manegement user interface",
    img: "/projects/paper_browser_1750x1000.webp",
    url: "https://personal-informatics.depstein.net",
    tags: ["Typescript", "Angular", "Bootstrap"],
    icons: [
      {
        name: "Typescript",
        icon: SiTypescript,
      },
      {
        name: "Angular",
        icon: SiAngular,
      },
      {
        name: "Bootstrap",
        icon: SiBootstrap,
      },
    ],
    date: "2020",
  },
  {
    index: 8,
    title: "Admin Web Portal",
    description: "A full-stack admin web portal application",
    img: "/projects/CalPlug_2100x1200.webp",
    url: "https://payamdowlatyari.github.io/admin-web-portal/",
    tags: ["React", "Redux", "Express", "MongoDB"],
    icons: [
      {
        name: "React",
        icon: SiReact,
      },
      {
        name: "Redux",
        icon: SiRedux,
      },
      {
        name: "Express",
        icon: SiExpress,
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
      },
    ],
    date: "2020",
  },
  {
    index: 9,
    title: "M-Studios",
    description: "A responsive business portfolio website",
    img: "/projects/m-studios_1260x720.webp",
    url: "https://m-studios.us/",
    tags: ["HTML", "CSS", "Javascript", "Bootstrap"],
    icons: [
      {
        name: "HTML",
        icon: SiHtml5,
      },
      {
        name: "CSS",
        icon: SiCss3,
      },
      {
        name: "Javascript",
        icon: SiJavascript,
      },
      {
        name: "Bootstrap",
        icon: SiBootstrap,
      },
    ],
    date: "2019",
  },
];

export const about = {
  title: "About Me.",
  text: `I'm Payam Dowlatyari, a senior software engineer, AI application developer, software architect, and UX designer based in California. 
  I have over 5 years of experience, specializing in building scalable, high-performance web applications using modern frameworks and Cloud platforms. 
  I've spent the last few years building healthcare technology platforms. I enjoy solving tough technical problems and turning them into simple, elegant experiences. 
  I am a hobbyist photographer and blogger passionate about art, philosophy, and social sciences.`,
};

export const portfolio = {
  name: "Payam Dowlatyari",
  firstName: "Payam",
  lastName: "Dowlatyari",
  titles:
    "UX Design ✳︎ Frontend Development ✳︎ API Development ✳︎ Backend Development ✳︎ Database Design ✳︎ DevOps ✳︎ Cloud Computing ✳︎ Aplication Architecture ✳︎",
  words: [
    "Software Engineer",
    "Full Stack Developer",
    "Software Architect",
    "UX Designer",
    "Photographer",
    "Blogger",
  ],
  contacts: [
    {
      title: "Contact",
      links: [
        { name: "Email", url: "mailto:pdowlatyari@gmail.com" },
        { name: "Calendly", url: "https://calendly.com/pdowlatyari" },
      ],
    },
    {
      title: "Links",
      links: [
        { name: "Blog", url: "https://blog.payamd.com" },
        { name: "Photography", url: "https://photos.payamd.com" },
      ],
    },
    {
      title: "Social",
      links: [
        { name: "GitHub", url: "https://github.com/payamdowlatyari" },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/payamdowlatyari",
        },
        { name: "X", url: "https://x.com/payamyam" },
      ],
    },
  ],
};

export const intro = {
  title: "About",
  summary: `Hi, I'm Payam Dowlatyari, a full-stack software engineer based in California who loves 
  building fast, reliable, and scalable web applications. I'm passionate about turning complex ideas 
  into clean, efficient systems that people actually enjoy using.`,
  tagline: `Scroll down to learn more about my work and experience!`,
  description: `After earning my B.S. in Software Engineering from UC Irvine (2020), I joined Amplify.ai, 
  where I spent three years developing AI-driven products and automation tools. In 2024, 
  I joined Avalon AI as a full-stack engineer, focusing on healthcare technology.
  Lately, I've been leading the architecture and development of PhysicianGPS, a multi-tenant cloud platform 
  that powers sub-second provider search and analytics across large healthcare datasets. 
  I've built data ingestion pipelines, optimized performance, and integrated AI-assisted 
  search features to make provider data easier to explore and act on.
  I care deeply about scalability, security, and great user experience, and I'm always exploring new technologies 
  to push my work further. Recently, that's included pragmatic AI enhancements like query rewriting, intelligent summaries, 
  and schema-guided responses that add intelligence to structured systems without sacrificing performance.
  Outside of work, I'm a hobbyist photographer and blogger who is passionate about art, philosophy, and social sciences, 
  and I'm always looking for new opportunities to learn and grow.
  Scroll down to learn more about my work and experience!`,
};

export const experience = [
  {
    title: "Full Stack Engineer",
    subtitle: "Avalon AI",
    date: "Apr 2024 - Present",
    description: [
      "Define software requirements specifications and identify the best solutions",
      "Design system architecture and configure resources and dev environments",
      "Work with a team to develop a full-stack web app for the healthcare industry",
      "Utilize AWS serverless technologies such as Lambda, API Gateway, DynamoDB",
    ],
    index: 0,
  },
  {
    title: "Software Engineer",
    subtitle: "Amplify.ai",
    date: "Dec 2020 - Nov 2023",
    description: [
      "Designed, Developed, tested, deployed, and maintained AI-powered applications",
      "Built 100+ user engagement apps on various platforms i.e. Facebook, Twitter",
      "Created a developer-friendly toolkit to facilitate development with SvelteJS",
      "Implemented user authentication and authorization tools such as 2FA, OAuth, etc.",
    ],
    index: 1,
  },
  {
    title: "Web Developer",
    subtitle: "Freelance",
    date: "Sep 2019 - Dec 2020",
    description: [
      "Develop responsive web applications using HTML, CSS, and JavaScript",
      "Optimize applications for maximum speed, security, and performance",
    ],
    index: 2,
  },
];

export const education = [
  {
    title: "California Institute of Technology",
    subtitle: "Postgraduate Certificate, Full-Stack Web Development",
    date: "Class 2023",
    description: [
      "Capstone: Full-Stack banking app with Java, Spring Boot, Angular, MySQL, AWS",
    ],
    index: 0,
  },
  {
    title: "University of California, Irvine",
    subtitle: "Software Engineering B.S.",
    date: "Class 2020",
    description: [
      "Capstone: Grid-Level Energy Negotiation for Electric Vehicle Supply Equipment",
      "Research Area: Informatics, Human-Computer Interaction, and Self-Tracking",
      "Honor Society: National Society of Leadership and Success (ΣAπ)",
    ],
    index: 1,
  },
  {
    title: "American River College",
    subtitle: "Computer Science",
    date: "Class 2018",
    description: [
      "Activities and societies: Mathematics and Computer Science tutor at MESA",
    ],
    index: 2,
  },
];

export const certificate = [
  {
    title: "IBM",
    subtitle: "Generative AI for Software Developers Specialization",
    date: "Oct 2025",
    link: "https://www.coursera.org/account/accomplishments/specialization/UO0CJNQQU3IL",
  },
  {
    title: "DeepLearning.AI",
    subtitle: "Generative AI for Software Development Professional Certificate",
    date: "Oct 2025",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/BRL9P96RR14B",
  },
  {
    title: "Interaction Design Foundation (IDF)",
    subtitle: "Design Thinking Certificate",
    date: "Oct 2021",
    link: "https://www.interaction-design.org/members/payam-dowlatyari/certificate/course/9fa0344a-1965-4994-9383-851e3109f9f2",
  },
  {
    title: "University of Colorado Boulder",
    subtitle: "Secure Software Design Specialization",
    date: "Sep 2020",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/CMWVV4CZ59WM",
  },
  {
    title: "Stanford University",
    subtitle: "Machine Learning Certificate",
    date: "Feb 2020",
    link: "https://www.coursera.org/account/accomplishments/certificate/8NJAABHZRNUM",
  },
];

export const publication = [
  {
    title: "Mapping and Taking Stock of the Personal Informatics Literature",
    link: "https://dl.acm.org/doi/10.1145/3432231",
    date: "Dec 2020",
    subtitle:
      "Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies, Article No.: 126",
    description: [
      "The research community on the study and design of systems for personal informatics has grown over the past decade. To take stock of what the topics the field has studied and methods the field has used, we map and label 523 publications from ACM's library, IEEE Xplore, and PubMed. We surface that the literature has focused on studying and designing for health and wellness domains, an emphasis on understanding and overcoming barriers to data collection and reflection, and progressively fewer contributions involving artifacts being made. Our mapping review suggests directions future research could explore, such as identifying and resolving barriers to tracking stages beyond collection and reflection, engaging more with domain experts, and further discussing the privacy and ethical concerns around tracked data.",
    ],
  },
];

export const resume = [
  {
    section: "Experience",
    items: experience,
  },
  {
    section: "Education",
    items: education,
  },
  {
    section: "Certificates",
    items: certificate,
  },
  {
    section: "Publications",
    items: publication,
  },
];

const projectsDetails = {
  title: "Projects",
  description:
    "Here are some of my most recent works in web applications and landing pages. I have used different tools, technologies, and services to create these projects.",
  // Add black and white icons
  icons: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-plain.svg",
  ],
};

export const contactDetails = {
  title: "Contact",
  description:
    "I'm always open to new opportunities and collaborations. Please don't hesitate to reach out to me.",
  icons: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gmail/gmail-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  ],
};

export const projectCaseStudy = {
  title: "PhysicianGPS",
  subtitle:
    "Building a Scalable Provider Search Platform with AI-Powered Features",
  summary: `This case study provides an in-depth look at the design and development of PhysicianGPS, a provider search and analytics platform built for employers and organizations to help their members find the best physicians. It covers the project overview, problem statement, research and understanding of the domain, system architecture solution, implementation highlights, reliability and performance considerations, and concludes with key takeaways and future directions.`,
  images: [
    {
      url: "/projects/case/home.png",
      alt: "Home Page",
      desc: "The home page of PhysicianGPS, showcasing the search interface and featured physicians.",
    },
    {
      url: "/projects/case/search.png",
      alt: "Search Page",
      desc: "The search results page of PhysicianGPS, displaying a list of physicians based on user queries.",
    },
    {
      url: "/projects/case/PhysicianGPSLogoDark.png",
      alt: "PhysicianGPS Logo",
      desc: "The logo of PhysicianGPS, representing the brand identity of the platform.",
    },
  ],
  sections: [
    {
      title: "Project Overview",
      description: `PhysicianGPS is a provider search and analytics platform built for employers and organizations to help their members find the best physicians—not just the closest ones. 
With healthcare quality varying widely, employees often struggle to identify top-performing doctors who accept their insurance, are nearby, and match their needs. 
As the lead engineer on the project, I designed and implemented the end-to-end system architecture—from data ingestion and indexing to the backend APIs and frontend search experience.
The result was a scalable platform that enables sub-second search across 200K+ healthcare records, supported by an automated ingestion pipeline, reliable filtering, and a user experience optimized for speed and clarity.`,
    },
    {
      title: "The Problem",
      description: `When companies provide healthcare benefits, employees are left to navigate provider networks on their own. They often pick doctors based on convenience, proximity, or a friend's recommendation—not on objective quality or outcomes. This leads to frustration for patients and higher long-term healthcare costs for employers. The reality is that finding the right physician is difficult, even with modern insurance portals. 
A healthcare startup, Avalon AI, aimed to address this issue. Their data science team developed machine learning models to evaluate physicians using billions of data points—from prescribing patterns and readmission rates to infection rates and outcome metrics. 
To bring this to life, they needed an engineering team to build a fast, accurate, multi-tenant provider search experience on top of a massive dataset with strict tenant isolation for employer-specific networks.
PhysicianGPS became that solution: a platform that allows employees to quickly find high-quality, in-network physicians, while giving employers confidence that their employees are making data-driven healthcare decisions.`,
    },
    {
      title: "Goals & Requirements",
      description:
        "To address these challenges, I defined a set of functional and non-functional requirements that shaped the architecture and implementation strategy.",
      sections: [
        {
          title: "Functional Requirements",
          items: [
            "Automate ingestion, transformation, and enrichment of provider datasets",
            "Provide a user-friendly interface for searching and filtering providers",
            "Support real-time search with geospatial queries and ranked results",
            "Support fast filtering by specialty, location, telehealth, and other attributes",
            "Provide real-time search with geospatial queries and ranked results",
            "Support multi-tenant access patterns for future growth",
          ],
        },
        {
          title: "Non-Functional Requirements",
          items: [
            "Performance: sub-second query responses and fast UI rendering",
            "Scalability: support hundreds of thousands of records and future dataset expansion",
            "Reliability: no silent failures, robust error handling and retries, auditable data pipeline",
            "Observability: metrics, logs, and user behavior analytics to drive iteration",
            "User Experience: intuitive, fast, low-friction search interactions",
          ],
        },
      ],
      ending:
        "These requirements ensured that the final solution would not only work—but work at scale, with speed and trust at its core.",
    },
    {
      title: "Research & Understanding the Domain",
      description: `Building an effective provider search platform required more than just ingesting data and exposing it through a UI. The core challenge was understanding the complex and messy world of healthcare provider data.
Provider information comes from fragmented sources such as NPI registries, claims datasets, licensing boards, and insurance networks. Each source has its own structure, refresh cadence, and data quality issues. On top of that, high-value fields—such as specialties, hospital affiliations, outcome metrics, or telehealth availability—are not standardized and often require inference, cleaning, and enrichment.
`,
      sections: [
        {
          title:
            "There were also unique domain expectations that shaped the solution:",
          items: [
            "Accuracy matters more than convenience. A user must trust that a physician is in-network and correctly labeled.",
            "Geolocation precision affects UX. Ranking by distance, coverage area, and service radius had to be correct, not “close enough.”",
            "Healthcare quality is multi-dimensional. Predictive models and rankings required traceability and consistent provider identifiers.",
            "Privacy and isolation are non-negotiable. Employers (tenants) should never see another tenant’s network or data.",
          ],
        },
      ],
      ending: `Understanding these realities upfront helped guide technical decisions around architecture, testing, data modeling, and performance.`,
    },
    {
      title: "System Architecture Solution",
      description: `At a high level, the platform follows a pipeline → index → API → UI model designed for speed, scalability, and tenant isolation.`,
      sections: [
        {
          title: "Why this architecture works:",
          items: [
            "Serverless ingestion scales automatically with large datasets",
            "OpenSearch enables sub-second text, geo, and filter queries",
            "A clean API layer enforces tenant boundaries and caching",
            "React UI delivers a fast, intuitive search experience",
            "Amplitude + CloudWatch closes the loop with real usage insights and observability",
          ],
        },
      ],
    },
    {
      title: "Implementation Highlights",
      description: `To deliver a fast, trustworthy, and scalable experience, I implemented an architecture that cleanly separated data concerns, leveraged modern Next.js patterns for performance, and used AWS tooling to accelerate iteration and reliability.`,
      sections: [
        {
          title: "Next.js Server Components for Fast, Direct Search",
          items: [
            "Built the web app using Next.js (App Router)",
            "Leveraging Server Components to query OpenSearch directly from the server layer for faster TTFB and stronger data security (no search logic exposed to the client).",
            "Implemented responsive filters, map views, pagination, and caching strategies to make the search experience feel instant and intuitive.",
          ],
        },
        {
          title: "Amplify Gen 2 for Auth, Logging, and CI/CD",
          items: [
            "Used AWS Amplify Gen 2 to streamline environment configuration, deployments, authentication flows, and application logging.",
            "Integrated Cognito with multi-tenant guardrails, ensuring users only access physicians within their employer's network.",
            "Amplify's built-in CI/CD and environment management allowed rapid iteration across staging, dev, and production with minimal operational overhead.",
          ],
        },
        {
          title: "Search Indexing & Backend Query Layer",
          items: [
            "Designed OpenSearch index templates tuned for keyword, text relevancy, and geolocation fields.",
            "Built a backend query layer (invoked by Next.js server components) to implement query optimization, caching, and complex filtering logic.",
          ],
        },
        {
          title: "ETL and Multi-Tenant Data Ingestion Pipeline",
          items: [
            "Developed a serverless ingestion pipeline using AWS Step Functions and Lambda (Python ETL) to process large healthcare datasets in parallel.",
            "Performed validation, normalization, enrichment, and NDJSON generation for reliable bulk indexing.",
          ],
        },
        {
          title: "Separate APIs for Employee Data (AWS CDK)",
          items: [
            "Used AWS CDK to define and deploy APIs for handling employer-specific employee datasets (e.g., plan grouping, permissions, employee-provider matching).",
            "CDK-managed infra included DynamoDB, API Gateway, IAM policies, and a repeatable pipeline for provisioning new tenants and environments via IaC.",
          ],
        },
        {
          title: "Testing and UX Instrumentation",
          items: [
            "Wrote Jest for unit tests and Playwright for e2e testing for core components.",
            "Implemented frontend performance monitoring using Lighthouse.",
            "Instrumented Amplitude for feature adoption, user funnel analysis, and product decision feedback.",
          ],
        },
      ],
      ending: `This combination of Next.js server-driven rendering, Amplify operational tooling, and AWS CDK-defined infrastructure created a strong foundation: fast at runtime, reliable in production, and easy to evolve as the business grew.`,
    },
    {
      title: "Reliability & Performance",
      description: `Because PhysicianGPS was designed to handle sensitive data and power live decision-making, I built reliability and performance into the system from end to end.`,
      sections: [
        {
          title: "Observability & Monitoring",
          items: [
            "Used AWS CloudWatch for ingestion metrics, execution logs, and pipeline anomaly alerts.",
            "Integrated Amplitude to understand how users interacted with search filters, map results, and ranking features—helping us prioritize UX improvements based on real behavior.",
            "Implemented structured logging and trace IDs so search requests could be tracked across pipeline → index → API → UI.",
          ],
        },
        {
          title: "Testing Strategy",
          items: [
            "Frontend: Unit tests (Jest + RTL) for filter logic and component behavior, reducing regressions as UI evolved.",
            "Backend & ETL: Integration tests for API + OpenSearch interactions, plus validation tests for data transformations.",
            "Performance: Lighthouse audits, React Profiler, and API load tests to catch slow renders or query paths early.",
          ],
        },
        {
          title: "Performance Outcomes",
          items: [
            "Reduced ingestion time from hours to minutes using chunked parallel processing.",
            "Achieved sub-500ms average search latency, even under complex multi-filter queries.",
            "Delivered zero-downtime reindexing by using shadow indices and swap strategies during deployments.",
          ],
        },
      ],
      ending: `These investments ensured that PhysicianGPS remained fast, stable, and transparent in production—even as datasets, tenants, and usage grew.`,
    },
    {
      title: "Results & Impact ",
      description: `The platform delivered measurable improvements for users, engineering, and the business.`,
      sections: [
        {
          title: "User Impact",
          items: [
            "Employees could quickly find high-quality, in-network doctors, increasing trust in their healthcare choices.",
            "A fast, intuitive UI reduced search friction and increased adoption across pilot tenants.",
          ],
        },
        {
          title: "Business Impact",
          items: [
            "Enabled Avalon AI to productize their ML physician-quality models, turning raw data science into a compelling employer-facing product.",
            "Reduced manual workloads and time-to-answer by replacing spreadsheets and disjointed provider directories.",
            "Created a repeatable multi-tenant foundation for onboarding new enterprise customers.",
          ],
        },
        {
          title: "Engineering Impact",
          items: [
            "Established a modern, scalable stack combining Next.js + OpenSearch + AWS serverless + Amplify + CDK.",
            "Significantly improved development velocity with trunk-based workflows, environment automation, and CI/CD.",
          ],
        },
      ],
      ending:
        "The result was a platform that aligned engineering excellence with tangible user and business value.",
    },
    {
      title: "Challenges",
      description: "",
      sections: [
        {
          title: "Scaling Ingestion and Search",
          items: [
            "Challenge: Single-threaded ingestion and synchronous search calls couldn't scale.",
            "Solution: Introduced chunked ETL with Step Functions, async workflows, and fine-tuned OpenSearch indexing.",
          ],
        },
        {
          title: "Multi-Tenant Isolation at Scale",
          items: [
            "Challenge: Each employer needed strict data boundaries.",
            "Solution: Used subdomain-derived tenant context, Cognito-based auth, and tenant-aware data policies in the backend.",
          ],
        },
        {
          title: "Maintaining Velocity While Ensuring Reliability",
          items: [
            "Challenge: Move fast without breaking trust (especially in healthcare).",
            "Solution: CI/CD + automated tests + canary indexing + observability allowed rapid shipping with confidence.",
          ],
        },
      ],
      ending: `Each challenge reinforced the importance of designing systems that are not only functional but also scalable, secure, and maintainable—especially in a domain as critical as healthcare.`,
    },
    {
      title: "What I Would Improve Next",

      description: `PhysicianGPS reinforced an important lesson: the most impactful engineering happens when technical excellence and product clarity move in lockstep. Working across the full stack — from ingestion pipelines to search relevance to UI responsiveness — taught me the value of owning the problem, not just the code, and making decisions that balance speed, reliability, and usability.`,

      sections: [
        {
          title: "If I were to evolve the platform further, I would invest in:",
          items: [
            "Deeper relevance tuning: measuring outcomes and iterating on ranking signals",
            "Even stronger domain boundaries: refining service boundaries using DDD patterns",
            "Automated contract testing: especially between the indexing and query layers",
            "Data versioning and lineage visibility: for clearer analytics and auditability",
          ],
        },
      ],
      endind:
        "These are natural next steps that would push the platform toward even greater scale, clarity, and long-term maintainability.",
    },

    {
      title: "Conclusion/Takeaways",
      description: `PhysicianGPS pushed me to think beyond features and focus on building systems that truly empower people. By transforming messy healthcare data into a fast, trustworthy search experience, I helped create a product that gives users confidence in one of the most important decisions they make: choosing a physician.
This project strengthened my belief that great engineering is equal parts craftsmanship, curiosity, and accountability — that when we combine reliable architecture, observable systems, and thoughtful UX, we can deliver technology that feels effortless and makes a real difference. I'm proud of the platform I built, and I'm even more excited to take these lessons into the next challenge — solving complex problems, collaborating with sharp teams, and building products that matter.`,
    },
  ],
};

export const projects = {
  products: projectsItems,
  details: projectsDetails,
};
