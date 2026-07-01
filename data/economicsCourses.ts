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
    courseCode: "ECON2040",
    courseName: "Macroeconomic Policy",
    units: 2,
    level: 2,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON1050 + (ECON2020 or 2021)"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Theory and practice of fiscal and monetary policy over the short/medium term. Conventional and unconventional monetary policy. Business cycles and stabilization policy. Exchange rate regimes. Labour markets and unemployment. Microfounded macroeconomic models. Macroecomic data analysis.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2040"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2050",
    courseName: "Mathematical Economics",
    units: 2,
    level: 2,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON1050 or MATH1051 or MATH1071"],
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
      "This course begins extending elementary calculus concepts from ECON1050 to the analysis of functions of several variables. Then it covers convex multivariate optimisation. This is followed by further analysis on constrained optimisation. Finally, it provides essential elements of dynamic optimisation in discrete time. Applications include consumer problems, cost minimisation, and dynamic programming for dynamic economies.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2050"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2060",
    courseName: "Behavioural Economics",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON1010 or 1011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 2,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "Examines approaches to economics of consumers and firms based upon applications of psychology and studies of actual behaviour in complex, uncertain and rapidly changing environments. Examines the policy implications of these contributions and includes coverage of recent work on the economics of happiness. The significance of behavioural economics was acknowledged by Nobel Prizes awarded to Herbert Simon (1978) and Daniel Kahneman (2002) and it has become widely taught in the past decade. The unit will be taught in a way that aims to develop critical thinking skills rather than focusing on mathematical techniques.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2060"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2070",
    courseName: "Introduction to Strategic Thinking",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026", "Summer Semester, 2026"],
    prerequisites: ["ECON1010 or 1011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "The way that economists think about strategic situations is through the application of game theory. One aim of the course is to teach you some strategic considerations to take into account when making your own choices. A second aim is to predict how other people or organizations behave when they are in strategic settings. We will see that these aims are closely related. We will learn new concepts, methods and terminology. A third aim is to apply these tools to settings from economics and other disciplines. The course will emphasize examples.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2070"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2101",
    courseName: "Cost-Benefit Analysis",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026", "Semester 2, 2026"],
    prerequisites: ["ECON1010 or 1011 or 2011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "Cost-benefit analysis is essential in economics and public policy. This course develops the skills to systematically assess and evaluate costs and benefits of an intervention, project, or policy to ensure efficient allocation of scarce resources. Going beyond financial appraisals, this course utilises basic microeconomic theory to predict and monetise social and economic impacts caused by market failures. The course also covers ethical and social consequences of decision-making within a cost-benefit analysis framework.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2101"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2102",
    courseName: "Experiments and Decision Making",
    units: 2,
    level: 2,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON1010 or ECON1011 or ECON2011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "Experimental economics is concerned with how people make real world decisions. It is also concerned with how businesses, organisations, teams, markets and other institutions work as a result of decisions made by real people. It employs laboratory or field experiments to find out whether or not real people actually behave in the way economic theory predicts, and if not why not and why this matters for policy makers and managers. This course will examine a number of topics in economics using experimental methods.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2102"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2103",
    courseName: "Financial Economics",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON2010 or 2011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 4,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Modern finance theory has its foundations in economics. This course will provide an in-depth analysis of economic decision making in an uncertain environment as well as the implications for asset pricing and contract design. Students will learn to use economic tools enabling them to solve real world complex problems in the financial sphere.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2103"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2105",
    courseName: "Statistical Theory for Economists",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON1050 + 1310"],
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
      "This course provides a rigorous introduction to the statistical methods which are fundamental to further study in econometrics and mathematical economics. It aims to provide students with a formal understanding of key results encountered in elementary courses such as Introductory Econometrics (ECON2300) and to prepare students for more advanced courses such as Econometric Theory (ECON3330). Topics include probability theory, concentration inequalities, moment generating functions, estimation theory (Ordinary Least Squares, Maximum Likelihood, Method of Moments), notions of convergence, asymptotic properties of estimators, laws of large numbers, central limit theorem, hypothesis testing and inference.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2105"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2200",
    courseName: "Management of Financial Institutions",
    units: 2,
    level: 2,
    semester: ["Semester 2, 2026", "Summer Semester, 2026"],
    prerequisites: ["ECON1010 or 1011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "Analyses economics of modern banking theory and financial institutions management. Describes various types of financial institutions and examines means of managing their operations.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2200"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2320",
    courseName: "Business and Economic Decision Techniques",
    units: 2,
    level: 2,
    semester: ["Semester 2, 2026"],
    prerequisites: [
      "ECON1050; For BInfTech students ECON1010 + STAT2004; For Engineering students MATH1050, 1051 or 1052"
    ],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 5,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Provides a working understanding of some of the principal techniques used in business decision making. Topics include linear programming, transportation and assignment models, project scheduling and control, inventory models, decision theory and games. These techniques can be used to solve problems in areas as diverse as product mixing and blending, firm efficiency and benchmarking, project management, and multi-period financial planning. Problems and exercises are solved using Microsoft Excel or a simple menu-drive software package.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2320"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2333",
    courseName: "Big Data and Machine Learning for Economics and Finance",
    units: 2,
    level: 2,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON1310"],
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
      "As bigger datasets become available and more and more companies and institutions require analysis of such a huge amount of information, the fields of Big Data and Machine Learning become more and more essential for economics and business students to learn about. This course builds on the basic knowledge built in elementary econometrics courses and strives to provide basic tools for analysing Big Data. The major topics discussed will be supervised learning (linear regression in high dimensions, classification by logistic regression and support vector machines, splines, nearest neighbours), unsupervised learning and Neural Networks. The course will be practical and will provide students with an R library of computer code to explore the topics in a practical fashion.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2333"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2410",
    courseName: "Economics of Business Strategy",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON1010 or 1011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "Economics of the growth strategies of modern corporations, including vertical integration, diversification and multinational enterprise. Economic underpinnings of marketing management, including economics of retailing and Internet businesses.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2410"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2460",
    courseName: "Health Economics",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON2010"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Life, healthy living, longevity, ageing, death: why health economics is important - this course will provide descriptive and theoretical aspects and help you to look at health and health care issues through the distinctive lens of an economist, changing forever the way you think about these concepts. The central concern is the behaviour of economic agents (that includes you!) when confronted with scarcity. Choice and opportunity cost are central. This course will focus on demand for and supply of healthcare, health insurance, equity and need, health and labour market, lifestyle behaviours, measurement of health outcomes, health economics ageing and longevity, welfarist and non-welfarist foundations of economic evaluation.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2460"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2540",
    courseName: "Economics of Innovation and Entrepreneurship",
    units: 2,
    level: 2,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON1010 or 1120 or 1011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "This course provides an introduction to the theory of entrepreneurship and innovation via the theory of industrial organisation. Students will be introduced to the theory of the firms, imperfect competition, oligopoly theory, and other strategic behaviours, including mergers. In the area of innovation, students will be introduced to different topics of innovation, including intellectual property, R&D and patents, and network and network effects.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2540"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2560",
    courseName: "Economics of Globalisation and Development",
    units: 2,
    level: 2,
    semester: ["Semester 2, 2026"],
    prerequisites: ["(ECON1010 and 1020) or ECON1011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 2,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description: "Introduces students to issues related to globalisation and economic development in less developed countries.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2560"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON2800",
    courseName: "Labour Economics",
    units: 2,
    level: 2,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON1010"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "Analysis of labour markets & its application to contemporary labour market issues, including labour demand & supply issues, unemployment, employment, wage determination & human capital development.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON2800"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3210",
    courseName: "Financial Markets and Institutions",
    units: 2,
    level: 3,
    semester: ["Semester 2, 2026", "Summer Semester, 2026"],
    prerequisites: [
      "(ECON1010 or 1011) + (FINM1415 or 1416 or 2400 or 2401) or (ECON2011 + FINM2411) or (ECON2012 + FINM2412) or ECON2200"
    ],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 4,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Flow of funds and financial markets, theory and behaviour of interest rates, term and risk structure of interest rates, exchange rates, interest parity, expectations formation, equity markets, debt market, Euro markets, derivatives markets, social allocation of capital.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3210"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3330",
    courseName: "Econometric Analysis",
    units: 2,
    level: 3,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON2105 or 3320"],
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
      "Theory of general linear model-topics include: least squares, generalised method of moments and maximum likelihood estimators under iid, autocorrelated and heteroskedastic error specifications.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3330"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3340",
    courseName: "Productivity and Efficiency Analysis",
    units: 2,
    level: 3,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON2300"],
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
      "This course provides a comprehensive coverage of modern methods for analysing the productivity and efficiency of different types of decision-making units (e.g., individuals, firms, industries, regions, economies). Students learn how different assumptions concerning technologies, markets and firm behaviour can be used to guide the construction of proper productivity indexes. They then learn how these indexes can be exhaustively decomposed into measures of technical change, environmental change, and various types of efficiency change. Students learn how to estimate these components using data envelopment analysis (DEA), deterministic frontier analysis (DFA) and stochastic frontier analysis (SFA) methods. Students gain an understanding of why the estimation of these components is critically important for public policy-making. The course has a strong applied focus.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3340"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3350",
    courseName: "Applied Econometrics for Macroeconomics and Finance",
    units: 2,
    level: 3,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON2300 + (ECON2020 or 2021 or FINM2401 or 2411 or 1415 or 2412)"],
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
      "The purpose of the course is to offer advanced students in finance and economics an understanding of the econometric tools that apply to financial and macroeconomics data. The approach is from an applied perspective. Lectures will introduce specific financial and macroeconomic models and the techniques required to estimate/predict/forecast with the model. The course will make use of a suitable econometric package for purposes of analysing of the data. Core content includes: statistical characteristics of time series data; capital asset pricing models; cointegrated models; volatility and volatility models; models of price changes. Skills and Perspective provided by applications to: stock prices, derivatives, exchange rates, interest rates, high-frequency data analysis, market microstructure.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3350"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3380",
    courseName: "Practicum",
    units: 2,
    level: 3,
    semester: ["Semester 1, 2026"],
    prerequisites: ["GPA of 4.0 or higher. Approval required from Head of School via BEL Student Administration Team."],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 2,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "This course aims to provide final year students with the opportunity to apply conceptual knowledge to the real world via a professional placement. As such, this course strongly links discipline learnings, personal employability skills and attributes developed by students across the duration of their studies with the challenges and expectations of working in industry. In doing so, students have the opportunity to gain valuable work and to connect this experience to the development of a workplace ready skill-set. Successful completion of the course will provide students with the employability skills required for transition to the world of work. Further information about how to apply for ECON3380 can be found on the Faculty's work-integrated learning website",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3380"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3440",
    courseName: "Competition Policy and Regulation",
    units: 2,
    level: 3,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON2010 or 2011 or 2410"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Theory and practice of regulation and regulatory reform; special reference to transport and utility (eg energy, telecommunications & water) industries; competition policy, privatisation, industry structural change, vertical and horizontal separation, access pricing, spot markets, contracts, multi-product pricing and investment.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3440"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3450",
    courseName: "Public Economics",
    units: 2,
    level: 3,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON2010 or 2011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "This course focuses on the role of the government in the economy. Public policy issues are analysed theoretically and empirically. The course covers topics in government expenditure, taxation and political economy.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3450"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3460",
    courseName: "Ethics in Economics",
    units: 2,
    level: 3,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON1010 or 1011 or 2011"],
    category: "Economics",
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
      "Economics focuses on finding the best ways of using scarce resources, but what is 'best' for serving an individual's self-interest may not be 'right' in terms of the greater good. For policymakers who are expected to act in the interest of the wider population, what does it mean to say that 'society' is 'better off'? Changes in policy result in winners and losers, which raises questions of equity and fairness. This course examines the past, present and potential future relationships between ethics and economics, and questions the ethical side of choices made by individuals or groups. This includes what (not) to teach in economics and how this may influence the ethical outlook of social scientists.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3460"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3510",
    courseName: "International Trade Theory and Policy",
    units: 2,
    level: 3,
    semester: ["Semester 1, 2026"],
    prerequisites: ["ECON2010"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Pure theory of international trade, comparative advantage, Heckscher-Ohlin, growth and trade. Commercial policies: protection and welfare, economic integration, trade and economic development, Australian perspectives.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3510"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3520",
    courseName: "Economics of International Finance",
    units: 2,
    level: 3,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON2020 or 2021"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 4,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "International monetary system, the IMF, dependent economy models, competitiveness, fiscal & monetary policy in open economy, external adjustment, capital mobility, exchange rate volatility, the current account, macroeconomics of foreign investment & external debt.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3520"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3700",
    courseName: "Environmental Economics",
    units: 2,
    level: 3,
    semester: ["Semester 2, 2026"],
    prerequisites: ["ECON1010 or 1011 or 2011"],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 4,
    // internal estimate, not official UQ data
    mathIntensity: 3,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 12,
    description:
      "Markets, market failures and externalities; economics of environmental pollution problems; economic measures for pollution control and environmental regulation. Environmental change, economic growth, natural resource depletion and population growth.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3700"
    ],
    dataConfidence: "high"
  },
  {
    courseCode: "ECON3820",
    courseName: "Understanding China",
    units: 2,
    level: 3,
    semester: ["Semester 2, 2026"],
    prerequisites: [
      "Single bachelor degree students: minimum of 24 units; dual bachelor degree students: minimum of 32 units."
    ],
    category: "Economics",
    // internal estimate, not official UQ data
    difficultyScore: 3,
    // internal estimate, not official UQ data
    mathIntensity: 2,
    examWeight: null,
    assignmentWeight: null,
    groupWork: null,
    // internal estimate, not official UQ data
    estimatedStudyHours: 10,
    description:
      "This is a multidisciplinary course designed for anyone who has an interest in the Chinese economy and wants to learn about a wide range of issues from a holistic perspective. The course is taught by experts who work on China from various disciplines across the university. More specifically, this course will critically examine China's policies and consider the key economic, business, political, social, legal and normative factors that shape China's current situation. By examining the complexity and nuance of China's position on a number of issues arising from various disciplines, the course aims to provide students with a deeper understanding of China's global engagement in a changing world.",
    sourceUrl: [
      "https://programs-courses.uq.edu.au/requirements/program/2467/2026",
      "https://programs-courses.uq.edu.au/course.html?course_code=ECON3820"
    ],
    dataConfidence: "high"
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
