import type { ProgramCourseReference, ProgramRequirement, ProgramRule } from "../programRules.ts";

const UQ_BECON_2026_REQUIREMENTS_URL =
  "https://programs-courses.uq.edu.au/requirements/program/2467/2026";

const coreCourses: ProgramCourseReference[] = [
  {
    courseCode: "ECON1010",
    courseName: "Introductory Microeconomics",
    units: 2,
    level: 1,
    category: "Economics Core"
  },
  {
    courseCode: "ECON1020",
    courseName: "Introductory Macroeconomics",
    units: 2,
    level: 1,
    category: "Economics Core"
  },
  {
    courseCode: "ECON1050",
    courseName: "Tools of Economic Analysis",
    units: 2,
    level: 1,
    category: "Quantitative Core"
  },
  {
    courseCode: "ECON1310",
    courseName: "Introductory Statistics for Social Sciences",
    units: 2,
    level: 1,
    category: "Quantitative Core"
  },
  {
    courseCode: "ECON2010",
    courseName: "Intermediate Microeconomics",
    units: 2,
    level: 2,
    category: "Economics Core"
  },
  {
    courseCode: "ECON2020",
    courseName: "Intermediate Macroeconomics",
    units: 2,
    level: 2,
    category: "Economics Core"
  },
  {
    courseCode: "ECON2101",
    courseName: "Cost-Benefit Analysis",
    units: 2,
    level: 2,
    category: "Economics Core"
  },
  {
    courseCode: "ECON2300",
    courseName: "Introductory Econometrics",
    units: 2,
    level: 2,
    category: "Economics Core"
  }
];

const flexibleCoreCourses: ProgramCourseReference[] = [
  { courseCode: "ECON1200", courseName: "Money and Mind", units: 2, level: 1, category: "Economics Elective" },
  { courseCode: "ECON2030", courseName: "Microeconomic Policy", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2040", courseName: "Macroeconomic Policy", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2050", courseName: "Mathematical Economics", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2060", courseName: "Behavioural Economics", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2070", courseName: "Introduction to Strategic Thinking", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2102", courseName: "Experiments and Decision Making", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2103", courseName: "Financial Economics", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2105", courseName: "Statistical Theory for Economists", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2200", courseName: "Management of Financial Institutions", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2320", courseName: "Business & Economic Decision Techniques", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2333", courseName: "Big Data and Machine Learning for Economics and Finance", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2410", courseName: "Economics of Business Strategy", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2460", courseName: "Health Economics", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2540", courseName: "Economics of Innovation and Entrepreneurship", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2560", courseName: "Economics of Globalisation and Development", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON2800", courseName: "Labour Economics", units: 2, level: 2, category: "Economics Elective" },
  { courseCode: "ECON3010", courseName: "Advanced Microeconomics", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3020", courseName: "Advanced Macroeconomics", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3200", courseName: "Monetary Economics", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3210", courseName: "Financial Markets & Institutions", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3330", courseName: "Econometric Analysis", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3340", courseName: "Productivity and Efficiency Analysis", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3350", courseName: "Applied Econometrics for Macroeconomics and Finance", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3360", courseName: "Causal Inference for Microeconometrics", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3380", courseName: "Practicum", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3430", courseName: "Managerial Economics", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3440", courseName: "Competition Policy and Regulation", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3450", courseName: "Public Economics", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3460", courseName: "Ethics in Economics", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3510", courseName: "International Trade Theory & Policy", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3520", courseName: "Economics of International Finance", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3700", courseName: "Environmental Economics", units: 2, level: 3, category: "Economics Elective" },
  { courseCode: "ECON3820", courseName: "Understanding China", units: 2, level: 3, category: "Economics Elective" }
];

const coreRequirements: ProgramRequirement[] = [
  {
    key: "core-courses",
    label: "BEcon Core Courses",
    type: "course-list",
    requiredUnits: 16,
    minUnits: 16,
    description: "Complete 16 units for all BEcon Core Courses.",
    sourceUrl: UQ_BECON_2026_REQUIREMENTS_URL,
    requiredCourseCodes: coreCourses.map((course) => course.courseCode),
    courses: coreCourses
  }
];

const flexibleCoreRequirements: ProgramRequirement[] = [
  {
    key: "flexible-core",
    label: "BEcon Flexible Core Courses",
    type: "course-list",
    requiredUnits: 16,
    minUnits: 16,
    maxUnits: 32,
    description:
      "Complete 16 to 32 units from BEcon Flexible Core Courses when following the flexible core pathway.",
    sourceUrl: UQ_BECON_2026_REQUIREMENTS_URL,
    requiredCourseCodes: flexibleCoreCourses.map((course) => course.courseCode),
    courses: flexibleCoreCourses
  }
];

const electiveRequirements: ProgramRequirement[] = [
  {
    key: "becon-major-options",
    label: "BEcon Majors",
    type: "plan-choice",
    requiredUnits: 32,
    description:
      "Students complete 32 units for 2 BEcon Majors, or 16 units for 1 BEcon Major plus 16 units of General Elective Courses, or the Flexible Core pathway.",
    sourceUrl: UQ_BECON_2026_REQUIREMENTS_URL,
    minUnits: 16,
    maxUnits: 32,
    options: [
      {
        planCode: "ECOSBC2467",
        planName: "Economics of Strategy and Behaviour",
        requiredUnits: 16
      },
      {
        planCode: "ECOPPC2467",
        planName: "Economics and Public Policy",
        requiredUnits: 16
      },
      {
        planCode: "ITFINC2467",
        planName: "International and Financial Economics",
        requiredUnits: 16
      },
      {
        planCode: "QUANTC2467",
        planName: "Quantitative Analysis",
        requiredUnits: 16
      }
    ]
  },
  {
    key: "general-electives",
    label: "General Elective Courses",
    type: "category-units",
    requiredUnits: 0,
    minUnits: 0,
    maxUnits: 16,
    description:
      "General Elective Courses may include BEcon Flexible Core Courses or courses from other undergraduate course lists.",
    sourceUrl: UQ_BECON_2026_REQUIREMENTS_URL,
    categories: ["Economics Elective", "General Elective"]
  }
];

const levelRequirements: ProgramRequirement[] = [
  {
    key: "level-1-maximum",
    label: "Level 1 Maximum",
    type: "level-units-max",
    requiredUnits: 24,
    maxUnits: 24,
    description: "Selected courses must include at most 24 units at level 1.",
    sourceUrl: UQ_BECON_2026_REQUIREMENTS_URL,
    levels: [1]
  },
  {
    key: "level-3-minimum",
    label: "Level 3 Minimum",
    type: "level-units",
    requiredUnits: 8,
    minUnits: 8,
    description: "Selected courses must include at least 8 units at level 3.",
    sourceUrl: UQ_BECON_2026_REQUIREMENTS_URL,
    levels: [3]
  }
];

export const uqBachelorOfEconomics2026ProgramRule: ProgramRule = {
  university: "University of Queensland",
  programCode: "2467",
  programName: "Bachelor of Economics",
  year: 2026,
  totalUnits: 48,
  sourceUrl: UQ_BECON_2026_REQUIREMENTS_URL,
  coreRequirements,
  flexibleCoreRequirements,
  electiveRequirements,
  levelRequirements,
  graduationRequirements: [
    ...coreRequirements,
    ...flexibleCoreRequirements,
    ...levelRequirements,
    {
      key: "total-units",
      label: "Total Units",
      type: "total-units",
      requiredUnits: 48,
      minUnits: 48,
      description:
        "Complete 48 units comprising BEcon Core Courses plus one approved major, elective, or flexible core pathway.",
      sourceUrl: UQ_BECON_2026_REQUIREMENTS_URL
    }
  ]
};
