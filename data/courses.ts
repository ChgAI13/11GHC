export type CourseLevel = 1 | 2 | 3;

export type CourseCategory =
  | "Economics Core"
  | "Economics Elective"
  | "Quantitative Core"
  | "General Elective";

export type SemesterAvailability = 1 | 2 | "Both";

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Course {
  code: string;
  name: string;
  units: number;
  level: CourseLevel;
  category: CourseCategory;
  difficulty: Rating;
  mathIntensity: Rating;
  examWeight: number;
  assignmentWeight: number;
  groupWork: boolean;
  prerequisites: string[];
  semester: SemesterAvailability;
  description: string;
}

export const uqBachelorOfEconomicsCourses: Course[] = [
  {
    code: "ECON1010",
    name: "Introductory Microeconomics",
    units: 2,
    level: 1,
    category: "Economics Core",
    difficulty: 2,
    mathIntensity: 2,
    examWeight: 60,
    assignmentWeight: 40,
    groupWork: false,
    prerequisites: [],
    semester: "Both",
    description:
      "Mock first-year economics course introducing supply, demand, markets, incentives, and basic consumer and firm decision-making."
  },
  {
    code: "ECON1020",
    name: "Introductory Macroeconomics",
    units: 2,
    level: 1,
    category: "Economics Core",
    difficulty: 2,
    mathIntensity: 2,
    examWeight: 60,
    assignmentWeight: 40,
    groupWork: false,
    prerequisites: [],
    semester: "Both",
    description:
      "Mock first-year macroeconomics course covering GDP, inflation, unemployment, monetary policy, fiscal policy, and open-economy basics."
  },
  {
    code: "ECON1050",
    name: "Tools of Economic Analysis",
    units: 2,
    level: 1,
    category: "Quantitative Core",
    difficulty: 3,
    mathIntensity: 4,
    examWeight: 55,
    assignmentWeight: 45,
    groupWork: false,
    prerequisites: [],
    semester: 1,
    description:
      "Mock quantitative economics course focused on mathematical tools used in economic modelling, optimisation, and applied analysis."
  },
  {
    code: "ECON1310",
    name: "Quantitative Economic and Business Analysis",
    units: 2,
    level: 1,
    category: "Quantitative Core",
    difficulty: 3,
    mathIntensity: 4,
    examWeight: 50,
    assignmentWeight: 50,
    groupWork: true,
    prerequisites: [],
    semester: 2,
    description:
      "Mock statistics and data analysis course introducing probability, descriptive statistics, inference, and spreadsheet-based analysis."
  },
  {
    code: "ECON1200",
    name: "Economics of Social Issues",
    units: 2,
    level: 1,
    category: "Economics Elective",
    difficulty: 2,
    mathIntensity: 1,
    examWeight: 40,
    assignmentWeight: 60,
    groupWork: true,
    prerequisites: [],
    semester: "Both",
    description:
      "Mock applied economics course using economic concepts to discuss inequality, education, health, environment, and public policy issues."
  },
  {
    code: "ECON2010",
    name: "Microeconomic Theory",
    units: 2,
    level: 2,
    category: "Economics Core",
    difficulty: 4,
    mathIntensity: 4,
    examWeight: 65,
    assignmentWeight: 35,
    groupWork: false,
    prerequisites: ["ECON1010", "ECON1050"],
    semester: 1,
    description:
      "Mock intermediate microeconomics course covering consumer theory, producer theory, market structure, welfare, and strategic behaviour."
  },
  {
    code: "ECON2020",
    name: "Macroeconomic Theory",
    units: 2,
    level: 2,
    category: "Economics Core",
    difficulty: 4,
    mathIntensity: 3,
    examWeight: 65,
    assignmentWeight: 35,
    groupWork: false,
    prerequisites: ["ECON1020"],
    semester: 2,
    description:
      "Mock intermediate macroeconomics course covering growth, business cycles, inflation, unemployment, expectations, and policy analysis."
  },
  {
    code: "CHIN2600",
    name: "Chinese Language and Culture",
    units: 2,
    level: 2,
    category: "General Elective",
    difficulty: 3,
    mathIntensity: 1,
    examWeight: 30,
    assignmentWeight: 70,
    groupWork: true,
    prerequisites: [],
    semester: "Both",
    description:
      "Mock general elective focused on Chinese language development, cultural context, written communication, and applied class participation."
  }
];
