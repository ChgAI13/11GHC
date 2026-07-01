export type CourseDataConfidence = "high" | "medium" | "low";

export type CourseCategory = "Economics" | "Language" | "unknown";

export interface EconomicsCourse {
  courseCode: string;
  courseName: string;
  units: number | null;
  level: 1 | 2 | 3 | "unknown";
  semester: string[] | "unknown";
  prerequisites: string[] | "unknown";
  category: CourseCategory;
  // internal estimate, not official UQ data
  difficultyScore: number | null;
  // internal estimate, not official UQ data
  mathIntensity: number | null;
  examWeight: number | null;
  assignmentWeight: number | null;
  groupWork: boolean | null;
  // internal estimate, not official UQ data
  estimatedStudyHours: number | null;
  description: string;
  sourceUrl: string[];
  dataConfidence: CourseDataConfidence;
}

export const uqEconomicsCourses: EconomicsCourse[] = [
  {
    courseCode: "ECON1010",
    courseName: "Introductory Microeconomics",
    units: 2,
    level: 1,
    semester: ["Semester 1, 2026", "Semester 2, 2026", "Summer Semester, 2026"],
    prerequisites: "unknown",
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 2,
    // internal estimate, not official UQ data
    mathIntensity: 2,
    examWeight: 55,
    assignmentWeight: 45,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "Provides students with a practical understanding of the core economic principles that explain why individuals, companies and governments make the decisions they do, and how their decision-making might be improved to make best use of available resources.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON1010",
      "https://course-profiles.uq.edu.au/course-profiles/ECON1010-20794-7620"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON1020",
    courseName: "Introductory Macroeconomics",
    units: 2,
    level: 1,
    semester: ["Semester 1, 2026", "Semester 2, 2026", "Summer Semester, 2026"],
    prerequisites: "unknown",
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 2,
    // internal estimate, not official UQ data
    mathIntensity: 2,
    examWeight: 40,
    assignmentWeight: 60,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "Examines functioning of the economy & its interaction with international economy. Studies GDP, unemployment & inflation, interest rates, investment, government expenditure, taxation policies & balance of payments. Alternative macroeconomic theories & models examined.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON1020",
      "https://course-profiles.uq.edu.au/course-profiles/ECON1020-20796-7620"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON1050",
    courseName: "Tools of Economic Analysis",
    units: 2,
    level: 1,
    semester: ["Semester 1, 2026", "Semester 2, 2026"],
    prerequisites: ["(Maths B or Mathematical Methods (Units 3 & 4, C) or equivalent) or MATH1040"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 5,
    examWeight: 60,
    assignmentWeight: 40,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "This course provides essential mathematical tools for studying Economics. It includes functions of one variable, differentiation, integrals, optimisation, and matrix algebra.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON1050",
      "https://course-profiles.uq.edu.au/course-profiles/ECON1050-20797-7620"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON1310",
    courseName: "Introductory Statistics for Social Sciences",
    units: 2,
    level: 1,
    semester: ["Semester 1, 2026", "Semester 2, 2026", "Summer Semester, 2026"],
    prerequisites: [
      "Maths B; or Maths C; or MATH1040; or one of Mathematical Methods or Specialist Mathematics (Units 3 and 4, C)"
    ],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 4,
    examWeight: 60,
    assignmentWeight: 40,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Basic statistical concepts and techniques such as descriptive statistics, probability concepts, theoretical distributions, inferential statistics (confidence intervals and hypothesis testing) are applied in business and economics.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON1310",
      "https://course-profiles.uq.edu.au/course-profiles/ECON1310-20798-7620"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON1200",
    courseName: "Money and Mind",
    units: 2,
    level: 1,
    semester: ["Semester 2, 2026"],
    prerequisites: "unknown",
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 2,
    // internal estimate, not official UQ data
    mathIntensity: 1,
    examWeight: 60,
    assignmentWeight: 40,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "The course is an introduction to concepts and theories relevant to students' everyday economic and financial decision-making while at university and after graduation. It covers practical matters that are meaningful for them, such as controlling expenses, preparing a budget, managing debt, choosing a bank account, a saving product or a credit card, financing a car, choosing a car insurance, selecting a mobile phone or internet plan, deciding whether to undertake further education, and activities that are familiar to students. The course equips students with tools to make sound economic decisions and avoid psychological biases. It offers both an intellectual framework based on the latest insights from behavioural economics and practical solutions to students' economic and financial challenges. In-class experiments highlight biases students might have in making economic decisions and increase student engagement.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON1200",
      "https://course-profiles.uq.edu.au/course-profiles/ECON1200-60563-7660"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON2010",
    courseName: "Intermediate Microeconomics",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026", "Semester 2, 2026"],
    prerequisites: ["ECON1010 or 1011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 4,
    examWeight: 0,
    assignmentWeight: 100,
    groupWork: true,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "This course further enhances critical thinking of students around topics that cover theories of the firm, partial and general equilibrium of markets, and production and cost analysis. These tools will equip students with a deeper understanding of the functioning of markets and institutions and the behaviour of economic agents, as well as of the implications for policy makers and managers.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON2010",
      "https://course-profiles.uq.edu.au/course-profiles/ECON2010-20799-7620"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON2020",
    courseName: "Intermediate Macroeconomics",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026", "Semester 2, 2026"],
    prerequisites: ["ECON1010 + 1020"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: 40,
    assignmentWeight: 60,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "This course further enhances critical thinking of students around macroeconomic theory topics such as determinants of national expenditure, income and employment in closed and open economies. It addresses the role of monetary and fiscal policy, and factors influencing interest rates, inflation and unemployment.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON2020",
      "https://course-profiles.uq.edu.au/course-profiles/ECON2020-20802-7620"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON2030",
    courseName: "Microeconomic Policy",
    units: 2,
    level: 2,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON1050 + (ECON2010 or 2011)"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 4,
    examWeight: 50,
    assignmentWeight: 50,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Extends microeconomic theory and demonstrates application to microeconomic policy issues; welfare economics, trade practices legislation, tariff policy and public enterprises.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON2030",
      "https://course-profiles.uq.edu.au/course-profiles/ECON2030-60761-7660"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON2300",
    courseName: "Introductory Econometrics",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026", "Semester 2, 2026"],
    prerequisites: ["ECON1310; (For BInfTech students ECON1010 + STAT2004)"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 5,
    examWeight: 45,
    assignmentWeight: 55,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Introductory applied econometric course for students with basic economic statistics background. Topics covered include: economic models and role of econometrics, linear regression with single and multiple regressors, hypothesis testing and confidence intervals, dummy variables and nonlinear regression functions, internal and external validity of regression models, panel data models, binary response models, instrumental variable regressions, experiments and quasi-experiments, as well as basic time series analysis. Practical problems are solved using the R econometrics software.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON2300",
      "https://course-profiles.uq.edu.au/course-profiles/ECON2300-20808-7620"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON3010",
    courseName: "Advanced Microeconomics",
    units: 2,
    level: 3,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON1050 + 2010. For BAdvFin&Econ(Hons) students - ECON1050 and 2030."],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 5,
    // internal estimate, not official UQ data
    mathIntensity: 5,
    examWeight: 40,
    assignmentWeight: 60,
    groupWork: true,
    // internal estimate, not official UQ data
    estimatedStudyHours: 14,
    description: "Developments & implications of microeconomic theory.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON3010",
      "https://course-profiles.uq.edu.au/course-profiles/ECON3010-20809-7620"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON3020",
    courseName: "Advanced Macroeconomics",
    units: 2,
    level: 3,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON1050 + 2040"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 5,
    // internal estimate, not official UQ data
    mathIntensity: 4,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 14,
    description:
      "Principles of Keynesian and classical macroeconomics. Theories of consumption, investment, inflation.",
    sourceUrl: ["https://my.uq.edu.au/programs-courses/course.html?course_code=ECON3020"],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON3200",
    courseName: "Monetary Economics",
    units: 2,
    level: 3,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON2020 or 2021 or 2040"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 4,
    examWeight: 70,
    assignmentWeight: 30,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "This course introduces and examines a number of advanced topics in monetary economics. Topics include: existence of money and currency regimes, the short-run and long-run effect of money in the economy, optimal monetary policy in a closed and open economy, and the time-inconsistency problem in monetary policy.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON3200",
      "https://course-profiles.uq.edu.au/course-profiles/ECON3200-20810-7620"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON3360",
    courseName: "Causal Inference for Microeconometrics",
    units: 2,
    level: 3,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON2300 + (ECON2010 or ECON2011)"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 5,
    // internal estimate, not official UQ data
    mathIntensity: 5,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 14,
    description:
      "The purpose of the course is to offer advanced students in Economics, Commerce and Business an understanding of the econometric tools that apply to microeconomic data. The approach is from an applied perspective. Lectures will introduce specific cross-sectional and panel models and the techniques required to estimate/predict with the model. The course will make use of the econometric package, Stata, for purposes of analysing of the data. Core content includes the analysis of individual-level data on the economic behaviour of individuals or firms using regression methods for cross section and panel data. Skills and Perspective provided by applications in the area of labour economics, consumer choice, health and education. Assumed Background: Students are expected to have an intermediate knowledge (second year undergraduate at least) of economic theory and econometrics or statistics and mathematics (see prerequisites).",
    sourceUrl: ["https://my.uq.edu.au/programs-courses/course.html?course_code=ECON3360"],
    dataConfidence: "medium"
  },
  {
    courseCode: "ECON3430",
    courseName: "Managerial Economics",
    units: 2,
    level: 3,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON2010 or 2410"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: 75,
    assignmentWeight: 25,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Application of economic analysis to business decision-making & organisation: basic economic tools, business objectives, demand analysis; pricing policies & competitive strategies, cost & production analysis, market structure, decision-making under uncertainty, capital budgeting & investment analysis.",
    sourceUrl: [
      "https://my.uq.edu.au/programs-courses/course.html?course_code=ECON3430",
      "https://course-profiles.uq.edu.au/course-profiles/ECON3430-21305-7620"
    ],
    dataConfidence: "medium"
  },
  {
    courseCode: "CHIN2600",
    courseName: "Essentials of Chinese Language in Social Life",
    units: 2,
    level: 2,
    semester: ["Semester 2, 2026"],
    prerequisites: "unknown",
    category: "Language",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 1,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "This course is designed for students who speak Mandarin Chinese as their first language and for students who are studying advanced Mandarin Chinese in Australia. The course covers language issues related to policy, place, history, ideology, and social practice that concern users of Mandarin Chinese in everyday life.",
    sourceUrl: ["https://my.uq.edu.au/programs-courses/course.html?course_code=CHIN2600"],
    dataConfidence: "medium"
  }
];
