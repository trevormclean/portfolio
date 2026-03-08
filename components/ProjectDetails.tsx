export type ProjectDetail = {
  id: string
  title: string
  overview: string
  role: string[]
  challenges: string[]
  learned: string[]
}

export const projectDetails: Record<string, ProjectDetail> = {
  "powercool": {
    id: "powercool",
    title: "PowerCool Hub",

    overview:
      "PowerCool Hub is a full-stack web application designed to streamline job scheduling and logistics for an HVAC company.",

    role: [
      "Integrated PostgreSQL with the Spring Boot backend.",
      "Implemented secure authentication and role-based access control using server-side sessions.",
      "Developed an interactive scheduling calendar using JavaScript."
    ],

    challenges: [
      "Synchronizing backend job data with the frontend calendar display.",
      "Handling time-zone differences when displaying schedules."
    ],

    learned: [
      "Designing RESTful APIs for frontend interaction.",
      "Implementing authentication and session management in Spring."
    ]
  },

  "compile-time-tester": {
    id: "compile-time-tester",
    title: "Automated Compile-time Feature Tester",

    overview:
      "An automated differential testing pipeline that evaluates the robustness and runtime impact of C++ compile-time features across compilers.",

    role: [
      "Designed the architecture around Clang AST tooling.",
      "Implemented the first compile-time feature inserter using `constinit`.",
      "Built Python scripts to analyze runtime performance data."
    ],

    challenges: [
      "Understanding and safely modifying code using Clang AST tooling.",
      "Designing a modular testing pipeline for future feature support."
    ],

    learned: [
      "Working with Clang compiler tooling and AST transformations.",
      "Designing extensible experimental pipelines."
    ]
  }
}