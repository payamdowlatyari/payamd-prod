import { AiFillSecurityScan } from "react-icons/ai";
import { FaTerminal, FaDatabase, FaAws, FaDev } from "react-icons/fa6";
import { GiAutoRepair } from "react-icons/gi";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineDevicesOther } from "react-icons/md";
import { SiWindowsterminal, SiSpeedtest } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { VscCircuitBoard } from "react-icons/vsc";

export const services = [
  {
    name: "UX Design",
    text: `Well-designed User Interfaces can make a real difference. I conduct user research and follow the Design Thinking principles to create user-friendly interfaces.`,
    id: 1,
    icon: MdOutlineDevicesOther,
  },
  {
    name: "Frontend Development",
    text: `Websites and web applications must function well when they are interacting with the user. I use frontend technologies such as React, Next.js, and TypeScript to implement that.`,
    id: 2,
    icon: SiWindowsterminal,
  },
  {
    name: "API Development",
    text: `I design, develop, and maintain RESTful APIs. I utilize Node.js, Express.js, AWS API Gateway, and Lambda to implement them. I also use OpenAPI and Swagger to document APIs.`,
    id: 3,
    icon: TbApi,
  },
  {
    name: "Backend Development",
    text: `Any request from the user on the web browser is processed on the server side to provide a response. Any response requires data. I develop applications for the interaction between user and data.`,
    id: 4,
    icon: FaTerminal,
  },
  {
    name: "Database Design",
    text: `Data is the most valuable asset these days and users need to have access to data in every interaction with the application in real time. I design relational and non-relational database suitable for the application.`,
    id: 5,
    icon: FaDatabase,
  },
  {
    name: "Cloud Services",
    text: `I use AWS, Google Cloud, and Microsoft Azure to deploy and maintain applications. I also design cloud infrastructure based on the requirements of the application.`,
    id: 6,
    icon: FaAws,
  },
  {
    name: "DevOps",
    text: `As a software engineer, DevOps is essential for the success of any project. I employ tools such as Docker, Kubernetes, and Jenkins to deploy and maintain applications.`,
    id: 7,
    icon: FaDev,
  },
  {
    name: "Software Security",
    text: `Every data transaction involves some risks. As data is valuable, I eliminate those risks using authentication, data protection, secure data transfer protocols and encryption methods.`,
    id: 8,
    icon: AiFillSecurityScan,
  },
  {
    name: "Software Testing",
    text: "I test software to ensure that it works as expected. I use Jest, React Testing Library, and Cypress to test web applications for unit, integration, and e2e testing.",
    id: 9,
    icon: SiSpeedtest,
  },
  {
    name: "Application Architecture",
    text: "Full stack applications are complex, especially when they are deployed on the cloud services. I find the right solution and architecture to develop scalable and maintainable applications.",
    id: 10,
    icon: VscCircuitBoard,
  },
  {
    name: "Software Maintenance",
    text: `Like computer hardware, software products need to be maintained, debugged, and updated. Once the product is luanched, the maintenance is essential for the success of the product.`,
    id: 11,
    icon: GiAutoRepair,
  },
  {
    name: "Software Documentation",
    text: "In the process of software development, it is necessary to document the project. I write documentation for the project for future reference and maintenance, and use tools such as JSDoc and Markdown.",
    id: 12,
    icon: IoDocumentText,
  },
];

export const projects = [
  {
    index: 0,
    title: "FindADoc",
    description: "A demo web application for finding healthcare providers",
    img: "https://storage.googleapis.com/www.payamd.com/Portfolio/myprojects/find-a-doc1750x1000.webp",
    url: "https://find-a-doc-app.vercel.app/",
    tags: ["Typescript", "Next.js", "Tailwind", "Vercel"],
  },
  {
    index: 1,
    title: "Canvasfolio",
    description: "A portfolio project build with Three.js and Canvas",
    img: "https://storage.googleapis.com/www.payamd.com/Portfolio/myprojects/canvasfolio1750x1000.webp",
    url: "https://dice-app-two.vercel.app/",
    tags: ["Typescript", "Next.js", "Tailwind", "Vercel"],
  },
  {
    index: 2,
    title: "My Dashbaord",
    description: "A project management user interface",
    img: "https://storage.googleapis.com/www.payamd.com/Portfolio/myprojects/MyDash_Projects_1750x1000.webp",
    url: "https://payamd-dashboard.vercel.app/",
    tags: ["React", "Redux", "Node", "Express", "Mongo", "Router"],
  },
  {
    index: 3,
    title: "My Web Blog",
    description: "My personal blog about book, film, photography.",
    img: "https://storage.googleapis.com/www.payamd.com/Portfolio/myprojects/blog_1750x1000.webp",
    url: "https://payamd-blog.vercel.app/",
    tags: ["Typescript", "Next.js", "Tailwind", "Redis", "Vercel"],
  },
  {
    index: 4,
    title: "Photos",
    description: "My photography blog for proffesionals",
    img: "https://storage.googleapis.com/www.payamd.com/Portfolio/myprojects/Portfolio_anim_Photography1750x1000.webp",
    url: "https://payamd-photo.vercel.app/",
    tags: ["Typescript", "Next.js", "Tailwind", "Vercel"],
  },
  {
    index: 5,
    title: "Algorithms for Life",
    description: "A GUI for learning Data Structure and Algorithms",
    img: "https://storage.googleapis.com/www.payamd.com/Portfolio/myprojects/algorithms_2100x1200.webp",
    url: "https://algorithms-next.vercel.app/",
    tags: ["Typescript", "Next.js", "Tailwind", "Vercel"],
  },
  {
    index: 6,
    title: "Nextfolio",
    description: "A portfolio website build for professionals",
    img: "https://storage.googleapis.com/www.payamd.com/Portfolio/myprojects/nextfolio_1925x1100.webp",
    url: "https://nextfolio-theta.vercel.app/",
    tags: ["Typescript", "Next.js", "Tailwind", "Vercel"],
  },
  {
    index: 7,
    title: "Paper Browser",
    description: "A research manegement user intrface",
    img: "https://storage.googleapis.com/www.payamd.com/Portfolio/myprojects/paper_browser_1750x1000.webp",
    url: "https://personal-informatics.depstein.net",
    tags: ["Typescript", "Angular", "Bootstrap", "Vercel"],
  },
  {
    index: 8,
    title: "Admin Web Portal",
    description: "A full-stack admin application",
    img: "https://storage.googleapis.com/www.payamd.com/Portfolio/myprojects/CalPlug_2100x1200.webp",
    url: "https://payamdowlatyari.github.io/admin-web-portal/",
    tags: ["React", "Redux", "Node", "Express", "Mongo", "Router"],
  },
  {
    index: 9,
    title: "M-Studios",
    description: "A responsive business portfolio",
    img: "https://storage.googleapis.com/www.payamd.com/Portfolio/myprojects/m-studios_1260x720.webp",
    url: "https://m-studios.us/",
    tags: ["HTML", "CSS", "Javascript", "Bootstrap", "Vercel"],
  },
];

export const about = {
  title: "My name is Payam Dowlatyari.",
  text: `I am a software engineer, web application developer, solutions architect, and UX designer. 
      I studied Software Engineering at UC Irvine and graduated in 2020. 
      I have been working in the tech industry as a full-stack web application developer 
      and web application AI developer since 2019. I am a hobbyist photographer and blogger 
      interested in art, philosophy, and social sciences.`,
};

export const portfolio = {
  name: "Payam Dowlatyari",
  text: [" I am", "Payam Dowlatyari", "in California"],
  titles:
    "UX Design ✳︎ Frontend Development ✳︎ API Development ✳︎ Backend Development ✳︎ Database Design ✳︎ DevOps ✳︎ Cloud Computing ✳︎ Aplication Architecture",
  email: "pdyari@gmail.com",
  phone: "+1 916 547 8918",
  words: [
    "Software Engineer",
    "Full Stack Developer",
    "Solutions Architect",
    "UX Designer",
    "Photographer",
    "Blogger",
  ],
};

export const intro = {
  text: `After obtaining my B.S. in Software Engineering from UC Irvine in 2020,
    I entered the tech industry and worked at Amplify.ai for three years developing AI applications. I satrted working as 
    a software engineer and web application architect at Avalon AI to improve healthcare services in the United States.
    Having the opportunity to study at UCI and work in an innovative start-up environments, 
    I've improved my technical and soft skills, uncovered my passion for design, and expanded my mastery in software development in recent years. \n 
    Meanwhile, I dedicated time to learning new skills and completed a 9-month postgraduate program in full-stack web development. 
    Likewise, I gained hands-on experience with different tools, such as JS/TS-based frameworks, including React.js, 
    server-side technologies such as Node.js, automation and DevOps tools, and database technologies such as SQL and NoSQL databases, 
    as well as cloud technologies such as AWS, Google Cloud, and Microsoft Azure.
    I am a team player, and I'm always willing to learn new skills and improve my skills.
    I have a great interest in learning new technologies and am always looking for new challenges.`,
};

export const experience = [
  {
    title: "Full Stack Engineer",
    subtitle: "Avalon AI",
    date: "Apr 2024 - Present",
    description: [
      "Define and document software requirements specifications and identify the best solutions",
      "Design system architecture and configure resources and development environments",
      "Work with a team to develop a full-stack web application for the healthcare industry",
      "Design, implement, and deploy backend features and API services",
      "Setup and utilize AWS service and serverless tools such as Lambda and DynamoDB",
    ],
    index: 0,
  },
  {
    title: "Software Engineer",
    subtitle: "Amplify.ai",
    date: "Dec 2020 - Nov 2023",
    description: [
      "Designed, Developed, tested, deployed, and maintained AI-powered applications",
      "Built 100+ user engagement apps on various platforms i.e. Facebook, Twitter, Twilio, etc.",
      "Created a developer-friendly toolkit to facilitate the configuration process using SvelteJS",
      "Implemented user authentication and authorization tools such as 2FA, OAuth, etc.",
    ],
    index: 1,
  },
  {
    title: "Web Developer",
    subtitle: "Freelance",
    date: "Sep 2019 - Present",
    description: [
      "Design and develop cross-browser compatible user interfaces",
      "Design and implement backend models and data access layers",
      "Build server-side applications, business logic, and API endpoints",
      "Optimize applications for maximum speed, security, and performance",
    ],
    index: 2,
  },
];

export const education = [
  {
    title: "UC Irvine",
    subtitle: "Software Engineering B.S.",
    date: "Class 2020",
    description: [
      "Capstone: Grid-Level Energy Negotiation for EVSE",
      "Research Area: Informatics and Human-Computer Interaction",
      "Honor Society: National Society of Leadership and Success (ΣAπ)",
    ],
    index: 1,
  },
  {
    title: "American River College",
    subtitle: "Computer Science A.S.",
    date: "Class 2018",
    description: ["Activities and societies: Math and Computer Science tutor"],
    index: 2,
  },
];

export const certificate = [
  {
    title: "Postgraduate Certificate, Caltech",
    subtitle: "Full-Stack Web Development",
    date: "Mar 2023",
    link: "https://success.simplilearn.com/a8ed0cbb-aa08-40b3-b6ce-a5eac2e55dd4#gs.1kwd89",
    description:
      "Capstone: A bank portal application with Angular2+, Java, Spring,MySQL, REST API, and CRUD functionality",
  },
  {
    title: "University of Colorado Boulder",
    subtitle: "Secure Software Design",
    date: "Sep 2020",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/CMWVV4CZ59WM",
    description: "Software Development Lifecycle, Design and Implementation",
  },
  {
    title: "The Interaction Design Foundation",
    subtitle: "User Experience Design Courses",
    date: "Oct 2019",
    link: "https://www.interaction-design.org/members/payam-dowlatyari",
    description:
      "12+ Course Certificates on various topics such as Design Thinking, Data-driven design, Service Design, Information visualization, etc.",
  },
];

export const publication = [
  {
    title: "Mapping and Taking Stock of the Personal Informatics Literature",
    link: "https://dl.acm.org/doi/10.1145/3432231",
    date: "Dec 2020",
    subtitle:
      "Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies, Article No.: 126",
    description:
      "The research community on the study and design of systems for personal informatics has grown over the past decade. To take stock of what the topics the field has studied and methods the field has used, we map and label 523 publications from ACM's library, IEEE Xplore, and PubMed. We surface that the literature has focused on studying and designing for health and wellness domains, an emphasis on understanding and overcoming barriers to data collection and reflection, and progressively fewer contributions involving artifacts being made. Our mapping review suggests directions future research could explore, such as identifying and resolving barriers to tracking stages beyond collection and reflection, engaging more with domain experts, and further discussing the privacy and ethical concerns around tracked data.",
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
