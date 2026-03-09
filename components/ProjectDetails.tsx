export type ProjectDetail = {
  id: string
  title: string
  overview: string
  role: string[]
  challenges: string[]
  learned: string[]
  links?: {label: string, href: string}[]
}

export const projectDetails: Record<string, ProjectDetail> = {
  "powercool": {
    id: "powercool",
    title: "PowerCool Hub",
    overview:
      "PowerCool Hub is a full-stack web application built by a team of five to streamline job scheduling and logistics for an HVAC company.",
    role: [
      "Integrated PostgreSQL with the Spring Boot backend.",
      "Implemented secure authentication and role-based access control using server-side sessions.",
      "Developed an interactive scheduling calendar using JavaScript."
    ],
    challenges: [
      "Time-zone differences between the host server and client browsers led to bugs that only occurred at certain times of the day.",
      "Role-based access control required careful design, especially around caching, to ensure security without hindering usability."
    ],
    learned: [
      "Designing RESTful APIs for frontend interaction.",
      "Implementing authentication and session management in Spring.",
      "Collaborating in an Agile environment while coordinating backend, frontend, and database components."
    ],
    links: [
      { label: "GitHub", href: "https://github.com/rishabhxverma/PowerCoolHub" }
    ]
  },

  "compile-time-tester": {
    id: "compile-time-tester",
    title: "Automated Compile-time Feature Tester",
    overview:
      "An automated differential testing pipeline built by a team of four that evaluates the robustness and runtime impact of C++ compile-time features across compilers.",
    role: [
      "Designed the architecture around Clang AST tooling with CMake.",
      "Implemented a well-documented `constinit` inserter to act as a reference for the team.",
      "Built Python scripts to analyze runtime performance data."
    ],
    challenges: [
      "Setting up Clang tooling and CMake integration was complex. There was even a bug in a Clang header I had to fix.",
      "Runtime analysis of the features required balancing statistical rigor with pipeline efficiency."
    ],
    learned: [
      "Working with compiler tooling and abstract syntax trees.",
      "Designing extensible experimental pipelines.",
      "Leading development by creating clear reference implementations and architecture for teammates to build on."
    ],
    links: [
      { label: "GitHub", href: "https://github.com/trevormclean/csmith-compiletime" },
      { label: "Report", href: "https://drive.google.com/file/d/10KRRJxM7OG4PYFETDYlCuBzQrRFujWFT/view"}
    ]
  },

  "deductive-verifier": {
    id: "deductive-verifier",
    title: "Deductive Verifier",
    overview:
      "A deductive verifier built by a team of four for a simple custom imperative language with Hoare-style specifications, generating verification conditions using weakest-precondition reasoning and discharging them with the Z3 SMT solver.",
    role: [
      "Designed the verifier architecture and defined the custom verification language.",
      "Implemented a Python lexer and recursive-descent parser to translate programs into an abstract syntax tree (AST).",
      "Developed an AST structure enabling recursive traversal and weakest-precondition reasoning."
    ],
    challenges: [
      "Understanding how to parse programs into an AST representation."
    ],
    learned: [
      "Applying formal methods to software verification.",
      "Designing modular and extensible Python components.",
      "The elegance and power of recursive-descent parsing."
    ],
    links: [
      { label: "GitHub", href: "https://github.com/trevormclean/deductive-verifier" },
      { label: "Report", href: "https://drive.google.com/file/d/10baEGJFyC6nLIAALYjDP2c-fD_4dPAW3/view" }
    ]
  },

  "yase": {
    id: "yase",
    title: "Custom Database Storage Engine (YASE)",
    overview:
      "A database storage engine built in C++ that supports page-based storage, buffer management, indexing, and concurrent access to records.",
    role: [
      "Implemented core storage components including page-based file abstractions and record storage structures.",
      "Developed a buffer manager supporting page pinning, eviction (LRU), and mapping between pages and buffer frames.",
      "Implemented a disk-backed concurrent skip list index for efficient record lookup."
    ],
    challenges: [
      "Designing the buffer manager to safely support concurrent page access while maintaining correct eviction and pinning behavior.",
      "Coordinating concurrency across tables, pages, and shared metadata without introducing excessive locking."
    ],
    learned: [
      "How database storage engines manage pages, records, and directory metadata on disk.",
      "Designing concurrent systems using mutexes and fine-grained latching.",
      "Implementing indexing structures that persist to disk."
    ]
  },

  "portfolio": {
    id: "portfolio",
    title: "Interactive Portfolio",
    overview:
      "A personal developer portfolio featuring an interactive graph-based interface for exploring projects and their technical details.",
    role: [
      "Designed and implemented a graph-based UI in React and TypeScript for visualizing project relationships.",
      "Implemented SVG-based wire routing to visually connect nodes while maintaining clean layout spacing.",
      "Used AI-assisted development to rapidly prototype UI components and iterate on layout logic."
    ],
    challenges: [
      "Designing edge routing logic that dynamically adjusts wire paths based on node positions while avoiding visual overlap."
    ],
    learned: [
      "Effectively integrating AI tools into the development workflow.",
      "Structuring a React application with modular, reusable UI components.",
      "Building dynamic SVG visualizations and layout logic."
    ],
    links: [
      { label: "GitHub", href: "https://github.com/trevormclean/portfolio" }
    ]
  }


}