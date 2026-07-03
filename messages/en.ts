export const en = {
  common: {
    brand: "GradPlan",
    subtitle: "Plan Your Degree with Confidence.",
    language: "Language",
    english: "English",
    chinese: "中文",
    profile: "Profile",
    settings: "Settings",
    comingSoon: "Coming soon",
    resetAllData: "Reset All Data",
    resetConfirm:
      "Clear Academic Profile? Dashboard, GPA Planner, Degree Planner, and Graduation Checker will reset together.",
    loading: "Loading",
    unknown: "unknown",
    all: "All",
    clear: "Clear",
    save: "Save",
    search: "Search",
    units: "units",
    course: "course",
    courses: "courses",
    semester: "Semester",
    level: "Level",
    difficulty: "Difficulty",
    math: "Math",
    currentGpa: "Current GPA",
    targetGpa: "Target GPA",
    completedCourses: "Completed Courses",
    remainingCourses: "Remaining Courses",
    preferredWorkload: "Preferred Workload",
    academicProfile: "Academic Profile",
    fromAcademicProfile: "From Academic Profile",
    navLabel: "Main navigation"
  },
  nav: {
    dashboard: "Dashboard",
    gpaPlanner: "GPA Planner",
    coursePlanner: "Degree Planner",
    graduationChecker: "Graduation Checker",
    courseDatabase: "Course Database"
  },
  footer: {
    brand: "GradPlan Beta",
    builtBy: "Built independently by a university student.",
    unofficial: "Unofficial academic planning platform.",
    notAffiliated: "Not affiliated with The University of Queensland.",
    betaWarning:
      "Beta Version — Please verify all academic decisions with official UQ resources before enrolling in courses.",
    links: {
      about: "About",
      privacy: "Privacy",
      disclaimer: "Disclaimer",
      terms: "Terms"
    },
    version: "Version"
  },
  feedback: {
    floatingButton: "💬 Feedback",
    title: "Feedback",
    intro: "Help improve GradPlan by reporting a problem or sharing an idea.",
    typeLabel: "Type",
    typeOptions: {
      bug: "Bug Report",
      feature: "Feature Request",
      general: "General Feedback"
    },
    messageLabel: "Feedback",
    messagePlaceholder: "Tell us what happened...",
    emailLabel: "Email (optional)",
    emailPlaceholder: "you@example.com",
    submit: "Submit Feedback",
    close: "Close feedback dialog",
    validation: "Please tell us what happened first.",
    success: "Thank you for helping improve GradPlan!"
  },
  landing: {
    badge: "GradPlan Beta",
    titleLine1: "Plan Your Degree.",
    titleLine2: "Not Your Spreadsheets.",
    subtitle:
      "GradPlan helps university students plan every semester, track graduation progress, estimate GPA, and make smarter course decisions.",
    primaryCta: "Start Planning",
    secondaryCta: "Explore Features",
    featureSection: {
      eyebrow: "Core features",
      title: "Built for degree planning, not one-off answers.",
      description:
        "Each feature connects to the same academic profile, so planning feels structured instead of scattered.",
      openFeature: "Open feature"
    },
    features: [
      {
        emoji: "🎓",
        title: "Degree Planner",
        description: "Plan your entire degree semester by semester.",
        href: "/course-planner"
      },
      {
        emoji: "📈",
        title: "GPA Planner",
        description: "Estimate your GPA before results are released.",
        href: "/gpa"
      },
      {
        emoji: "✅",
        title: "Graduation Checker",
        description: "Know exactly what you still need to graduate.",
        href: "/graduation"
      },
      {
        emoji: "🧠",
        title: "Smart Recommendations",
        description: "Receive course suggestions based on your profile and graduation rules.",
        href: "/course-planner"
      }
    ],
    why: {
      eyebrow: "Why GradPlan?",
      title: "Why GradPlan?",
      items: [
        {
          title: "Stop reading handbook PDFs",
          description: "Turn program requirements into a clear roadmap you can actually use."
        },
        {
          title: "No repeated prompts like ChatGPT",
          description:
            "Your profile, completed courses, and degree rules stay connected in one workflow."
        },
        {
          title: "Everything in one place",
          description:
            "GPA planning, course planning, graduation checks, and recommendations work together."
        }
      ]
    },
    how: {
      eyebrow: "How it works",
      title: "Four steps from messy planning to a clear roadmap.",
      step: "Step",
      steps: [
        "Create your Academic Profile",
        "Plan your semesters",
        "Track graduation progress",
        "Graduate with confidence"
      ]
    },
    support: {
      title: "Current Support",
      university: "University of Queensland",
      program: "Bachelor of Economics",
      beta: "Beta"
    },
    comingSoon: {
      title: "Coming Soon",
      items: [
        "Commerce",
        "Business",
        "Engineering",
        "Multiple Universities",
        "Cloud Sync",
        "AI Study Planner"
      ]
    },
    preview: {
      title: "Degree Roadmap",
      program: "Bachelor of Economics",
      beta: "Beta",
      rows: [
        { label: "Semester roadmap", value: "6 semesters", width: "86%" },
        { label: "Graduation progress", value: "62%", width: "62%" },
        { label: "GPA target", value: "6.2", width: "74%" }
      ],
      gpaReady: "GPA estimate ready",
      rulesChecked: "Rules checked"
    },
    finalCta: {
      title: "Replace scattered planning with one clear academic roadmap.",
      description:
        "Start with your Academic Profile, then let GradPlan connect GPA planning, semester planning, and graduation progress.",
      button: "Start Planning"
    }
  },
  profilePage: {
    eyebrow: "Student Data Hub",
    title: "Academic Profile",
    intro:
      "This is the single data entry point for the whole product. After saving, GPA Planner, Degree Planner, and Graduation Checker read the same academic profile.",
    status: "Profile Status",
    statusLine: ({ currentGpa, targetGpa, remainingCourses }) =>
      `Current GPA ${currentGpa || "-"} · Target GPA ${targetGpa || "-"} · ${remainingCourses} courses remaining`,
    basicInfo: "Basic Information",
    fixedSupport: "The first version supports University of Queensland · Bachelor of Economics.",
    university: "University",
    program: "Program",
    currentGpaPlaceholder: "e.g. 5.60",
    targetGpaPlaceholder: "e.g. 6.20",
    expectedGraduationSemester: "Expected Graduation Semester",
    graduationPlaceholder: "Select expected graduation semester",
    completedSummary: ({ completed, total, remaining }) =>
      `${completed} / ${total} courses completed · ${remaining} remaining`,
    searchCourses: "Search courses",
    searchPlaceholder: "Search course code or name, e.g. ECON2010",
    selectedCourses: "Selected courses",
    selected: "selected",
    unselectTitle: "Click to unselect",
    noCourseFound:
      "No matching courses found. Try a course code such as ECON1010, ECON2010, or ECON3440.",
    defaultCourseHint:
      "Showing the first 8 courses by default. Search a course code or name to filter the full course database.",
    dataFlow: "Data Flow",
    singleSource: "Single Source",
    localStorageNote:
      "Profile is saved to Local Storage and restored after page changes, refreshes, and browser restarts.",
    plannerNote:
      "Degree Planner reads GPA, completed courses, and workload from here before calling the rule engine.",
    nextStep: "Next Step",
    generateCoursePlan: "Generate Course Plan",
    nextStepDescription:
      "After saving, go directly to Degree Planner without entering GPA or completed courses again.",
    openCoursePlanner: "Open Degree Planner",
    saveButton: "Save Academic Profile",
    savedMessage:
      "Academic Profile saved. Dashboard, GPA Planner, Degree Planner, and Graduation Checker are now synced.",
    workloadLabels: {
      Light: "Light",
      Medium: "Medium",
      Heavy: "Heavy"
    }
  },
  gpaPage: {
    eyebrow: "UQ Bachelor of Economics",
    title: "GPA Goal Planner",
    intro: "Reads your Academic Profile and estimates the average GPA required for remaining courses.",
    requiredAverage: "Average required for remaining courses",
    missingProfile: "Complete Current GPA and Target GPA in Academic Profile first.",
    impossible: "Based on your remaining courses, the target exceeds the 7-point GPA scale.",
    alreadySafe: "You are already above the target path. Focus on staying consistent.",
    requiredStatus: ({ remaining, required }) =>
      `Your remaining ${remaining} courses need an average GPA of ${required}.`,
    notFilled: "Not filled",
    profileData: "Academic Profile Data",
    profileDataDescription:
      "GPA Planner no longer stores separate data. Edit GPA and course progress in Academic Profile.",
    targetGraduationGpa: "Target Graduation GPA",
    completedCourseCount: "Completed Course Count",
    remainingCourseCount: "Remaining Course Count",
    fromCompletedCourses: "From Completed Courses",
    fromMockRules: "Calculated from mock degree rules",
    generateSemesterPlan: "Generate Semester Plan",
    editProfile: "Edit Academic Profile",
    gapToTarget: "Gap to target",
    achieved: "Achieved",
    gap: (value) => `${value} behind`,
    currentVsTarget: ({ current, target }) => `Current ${current} / Target ${target}`,
    difficulty: "Difficulty",
    completed: "Completed",
    remaining: "Remaining",
    smartAdvice: (title) => `Smart advice: ${title}`,
    adviceDescription:
      "Generated from your target and remaining course count. Use this as planning guidance only.",
    formulaTitle: "Formula",
    formulaText:
      "Required average = (Target GPA x total courses - Current GPA x completed courses) / remaining courses",
    rangesTitle: "Difficulty ranges",
    rangesText: "≤5.5 Easy, 5.5-6.2 Moderate, 6.2-6.7 Hard, above 6.7 Very Hard.",
    reminderTitle: "Reminder",
    reminderText:
      "Different universities and faculties may use their own GPA or WAM rules. Always confirm official rules before using this for formal decisions.",
    difficultyLevels: {
      easy: {
        label: "Easy",
        detail: "Remaining courses only need stable performance."
      },
      moderate: {
        label: "Moderate",
        detail: "Most remaining courses need Credit to Distinction-level results."
      },
      hard: {
        label: "Hard",
        detail: "You need consistent Distinction to HD-level performance."
      },
      veryHard: {
        label: "Very Hard",
        detail: "Remaining courses need results close to the top of the scale."
      }
    },
    advice: {
      impossible: {
        title: "Target is too high. Adjust your course strategy first.",
        items: [
          "This target is above the single-course maximum on the 7-point scale, so remaining courses alone are unlikely to achieve it.",
          "Choose courses with clearer rubrics, higher assignment weighting, and topics you already understand.",
          "If the goal is for transfer or postgraduate study, prepare backup evidence such as internships, portfolio work, or language scores."
        ]
      },
      veryHard: {
        title: "High-score sprint required. Choose courses conservatively.",
        items: [
          "Most remaining courses need HD-level results with very little room for error.",
          "Prioritise courses where you have background knowledge and clear assessment criteria.",
          "In week one, map rubrics, due dates, and assessment weights for every course."
        ]
      },
      hard: {
        title: "Challenging but possible with careful workload control.",
        items: [
          "Most courses need to stay around Distinction level.",
          "Identify the highest-weighted assessment in each course and protect time for it.",
          "Ask tutors or student support early when assignment wording is unclear."
        ]
      },
      moderate: {
        title: "Target is realistic. Focus on consistency.",
        items: [
          "If you stay consistent, this target has a reasonable chance.",
          "Review lectures and tutorials weekly instead of waiting for due weeks.",
          "If you work part-time, put all deadlines into a calendar early."
        ]
      },
      alreadyOnTrack: {
        title: "You are already on track.",
        items: [
          "Your current GPA is close to or above target. Focus on avoiding low outlier results.",
          "Choose courses you are interested in or confident about while keeping submission rhythm stable.",
          "Use extra capacity for internships, resumes, portfolios, or academic English skills."
        ]
      },
      steady: {
        title: "Target looks steady. Keep the rhythm.",
        items: [
          "The remaining average requirement is not high, so normal performance can be enough.",
          "Keep weekly study routines and prepare for quizzes and participation early.",
          "If course emails or assignment requirements are unclear, ask for help early."
        ]
      }
    }
  },
  plannerPage: {
    eyebrow: "UQ Bachelor of Economics",
    title: "Degree Planner",
    intro:
      "Plan the next 6 semesters. Courses come from Course Database, graduation checks come from Program Rules, and recommendations come from Recommendation Engine.",
    plannedProgress: "Planned Degree Progress",
    progressSummary: ({ count, missingUnits }) =>
      `${count} courses completed or planned · ${missingUnits} units missing`,
    plannedCourses: "Planned Courses",
    nextRecommendations: "Next Recommendations",
    sixSemesterPlan: "Six-Semester Plan",
    sixSemesterDescription:
      "Add, move, and remove courses. Every change saves to Academic Profile.",
    generateSemesterPlan: "Generate Semester Plan",
    analyzeSemester: "Analyze Semester",
    emptySemester:
      "No courses in this semester yet. Add courses manually or generate a plan from recommendations.",
    chooseCourse: "Choose course",
    addCourse: "Add Course",
    moveUp: "Move Course up",
    moveDown: "Move Course down",
    removeCourse: "Remove Course",
    currentTargetGpa: "Current / Target GPA",
    graduationCheck: "Graduation Check",
    graduationCheckDescription:
      "Uses the current Profile plus planned courses to run Graduation Checker.",
    semesterAnalysis: "Semester Analysis",
    mathIntensity: "Math Intensity",
    examLoad: "Exam Load",
    assignmentLoad: "Assignment Load",
    estimatedStudyHours: "Estimated Study Hours",
    hoursPerWeek: "hrs / week",
    courseUnitsSummary: ({ courseCount, units }) => `${courseCount} courses · ${units} units`,
    noSemesterRisk: "No semester risk detected.",
    warnings: "Warnings",
    warningHint: "Add, move, or remove courses to refresh simulator warnings.",
    recommendationEngine: "Recommendation Engine",
    recommendedNextCourses: "Recommended Next Courses",
    recommendedDescription:
      "This section displays Recommendation Engine results. Click Add to Plan to place a course in the first semester with available space.",
    addToPlan: "Add to Plan",
    noRecommendations:
      "No recommended courses right now. Check your Profile or remove already planned courses.",
    riskLabels: {
      "High Risk Semester": "High Risk Semester",
      "Exam Heavy": "Exam Heavy",
      "Assignment Heavy": "Assignment Heavy"
    },
    engineText: {
      "No semester risk detected.": "No semester risk detected.",
      "High Risk Semester: total math intensity is above 8.":
        "High Risk Semester: total math intensity is above 8.",
      "Exam Heavy: average exam load is above 70%.":
        "Exam Heavy: average exam load is above 70%.",
      "Assignment Heavy: average assignment load is above 70%.":
        "Assignment Heavy: average assignment load is above 70%.",
      "Course has not been completed yet.": "Course has not been completed yet.",
      "Prerequisites need to be checked before enrolment.":
        "Prerequisites need to be checked before enrolment.",
      "Core Economics requirements are prioritised to protect graduation progress.":
        "Core Economics requirements are prioritised to protect graduation progress.",
      "Core and quantitative requirements are ranked ahead of general electives.":
        "Core and quantitative requirements are ranked ahead of general electives.",
      "Recommendation generated from completed courses, GPA risk, prerequisites, math intensity, preferred workload, and graduation requirements.":
        "Recommendation generated from completed courses, GPA risk, prerequisites, math intensity, preferred workload, and graduation requirements."
    },
    profileIssuePrefix: "Recommendations will be more accurate if you first complete",
    profileIssueLink: "Academic Profile",
    profileIssueSuffix: "with Current GPA, Target GPA, and completed courses.",
    workloadLabels: {
      Light: "Light",
      Medium: "Medium",
      Heavy: "Heavy"
    }
  },
  graduationPage: {
    eyebrow: "Mock Degree Rules",
    title: "Graduation Checker",
    intro:
      "Reads your Academic Profile and checks graduation progress, missing courses, missing units, and next actions using mock UQ Economics rules.",
    overallProgress: "Overall Graduation Progress",
    totalUnitsCompleted: ({ completed, required }) => `${completed}/${required} total units completed`,
    program: "Program",
    missingUnits: "Missing Units",
    noCompletedCourses:
      "No completed course data yet. Go to",
    noCompletedCoursesSuffix: "and fill in Current GPA and Completed Courses.",
    warnings: "Warnings",
    warningsDescription: "Includes missing prerequisites and recommendation risk notes.",
    requirementStatus: "Requirement Status",
    requirementDescription:
      "Core Courses, Flexible Core, Electives, Level 1, Level 2, Level 3, and Total Units.",
    completedRequirements: "Completed Requirements",
    completedRequirementsDescription: "Graduation requirements already satisfied.",
    noCompletedRequirements:
      "No requirements are fully satisfied yet. This will update as you complete core courses and units.",
    remainingRequirements: "Remaining Requirements",
    remainingRequirementsDescription: "Requirements that still need more work.",
    noRemainingRequirements: "All mock requirements are satisfied.",
    missingCourses: "Missing Courses",
    missingCoursesDescription:
      "Courses that can be clearly listed from the current mock Course Database.",
    noMissingCourses:
      "No more missing courses can be listed from the current mock Course Database. Missing units still appear under Missing Units.",
    missingUnitsDescription:
      "This is an estimate based on mock total units. A production version should use official UQ degree rules and course lists.",
    fixMyDegree: "Fix My Degree",
    updateProfile: "Update Academic Profile",
    recommendedNextCourses: "Recommended Next Courses",
    recommendedDescription:
      "Calls the existing Recommendation Engine and suggests next courses based on Profile and graduation gaps.",
    noRecommendations: "No recommended courses generated. Complete Academic Profile first.",
    requirementTranslations: {
      labels: {
        "BEcon Core Courses": "BEcon Core Courses",
        "BEcon Flexible Core Courses": "BEcon Flexible Core Courses",
        "Level 1 Maximum": "Level 1 Maximum",
        "Level 3 Minimum": "Level 3 Minimum",
        "Total Units": "Total Units"
      },
      descriptions: {
        "Complete 16 units for all BEcon Core Courses.":
          "Complete 16 units for all BEcon Core Courses.",
        "Complete 16 to 32 units from BEcon Flexible Core Courses when following the flexible core pathway.":
          "Complete 16 to 32 units from BEcon Flexible Core Courses when following the flexible core pathway.",
        "Selected courses must include at most 24 units at level 1.":
          "Selected courses must include at most 24 units at level 1.",
        "Selected courses must include at least 8 units at level 3.":
          "Selected courses must include at least 8 units at level 3.",
        "Complete 48 units comprising BEcon Core Courses plus one approved major, elective, or flexible core pathway.":
          "Complete 48 units comprising BEcon Core Courses plus one approved major, elective, or flexible core pathway."
      }
    },
    engineText: {
      "Course has not been completed yet.": "Course has not been completed yet.",
      "Prerequisites need to be checked before enrolment.":
        "Prerequisites need to be checked before enrolment.",
      "Core Economics requirements are prioritised to protect graduation progress.":
        "Core Economics requirements are prioritised to protect graduation progress.",
      "Recommendation generated from completed courses, GPA risk, prerequisites, math intensity, preferred workload, and graduation requirements.":
        "Recommendation generated from completed courses, GPA risk, prerequisites, math intensity, preferred workload, and graduation requirements."
    },
    requirementLabels: {
      completed: "Completed",
      required: "Required",
      missing: "Missing"
    }
  },
  coursesPage: {
    eyebrow: "UQ Bachelor of Economics · 2026",
    title: "Course Database",
    intro: "Browse Economics courses, semesters, prerequisites, difficulty, and official sources.",
    search: "Search course code or course name",
    searchLabel: "Search",
    filters: "Filters",
    level: "Level",
    category: "Category",
    semester: "Semester",
    results: "courses",
    noResults: "No matching courses found.",
    prerequisites: "Prerequisites",
    difficulty: "Difficulty",
    math: "Math intensity",
    confidence: "Data confidence",
    source: "Official source",
    description: "Description",
    sourceLink: (index) => `Source ${index}`,
    completed: "Completed in Profile",
    profileCompleted: "completed in Profile",
    expand: "Expand details",
    collapse: "Collapse details",
    both: "Both",
    categoryLabels: {
      Core: "Core",
      "Flexible Core": "Flexible Core",
      Elective: "Elective"
    }
  },
  legal: {
    productInformation: "Product Information",
    version: "Version",
    buildDate: "Build Date",
    contactEmail: "Contact Email",
    officialUq: "Official UQ Programs and Courses",
    openOfficialUq: "Open official UQ Programs and Courses",
    navLabel: "Legal pages",
    pages: {
      about: {
        eyebrow: "About",
        title: "About GradPlan",
        intro:
          "GradPlan is an independent academic planning platform designed to help university students plan their degree more efficiently.",
        sections: [
          {
            title: "Current Beta focus",
            items: [
              "The current Beta focuses on University of Queensland students.",
              "The first supported program is Bachelor of Economics.",
              "Future versions will support more universities, programs, and planning workflows."
            ]
          },
          {
            title: "Mission",
            items: [
              "Make academic planning simple.",
              "GradPlan helps students plan semesters, track graduation progress, calculate GPA, and build a degree roadmap.",
              "GradPlan is built independently and is currently in Beta. Feedback and corrections are welcome."
            ]
          }
        ]
      },
      privacy: {
        eyebrow: "Privacy",
        title: "Privacy Policy",
        intro: "This policy explains how the Beta version handles user data.",
        sections: [
          {
            title: "Current Beta version",
            items: [
              "The current Beta version does not require users to create an account.",
              "We do not collect identity document information.",
              "We do not collect bank card or payment information.",
              "We do not sell user data."
            ]
          },
          {
            title: "Academic Profile data",
            items: [
              "Academic Profile data is stored in your browser Local Storage by default.",
              "Your Academic Profile is not uploaded to a server in the current Beta version.",
              "This means your profile is saved on your own device and browser, not in a cloud database.",
              "You can clear local profile data at any time by using the Reset All Data button.",
              "If cloud sync, accounts, analytics, or payment features are added in the future, this Privacy Policy will be updated before those features are used."
            ]
          }
        ]
      },
      disclaimer: {
        eyebrow: "Disclaimer",
        title: "Disclaimer",
        intro: "Please read this disclaimer before using GradPlan for academic planning.",
        sections: [
          {
            title: "Reference only",
            items: [
              "This website is provided for learning, planning, and general reference only.",
              "This website is not part of The University of Queensland and has no official partnership with The University of Queensland.",
              "All course information, graduation requirements, GPA calculations, and course recommendations are for reference only."
            ]
          },
          {
            title: "Accuracy and responsibility",
            items: [
              "Although we try to keep information accurate, we cannot guarantee that it always matches the latest official university requirements.",
              "Students should check their university's official website before making enrolment, graduation, or academic decisions.",
              "Official university rules and published course information should always be treated as the final source of truth.",
              "Users are responsible for their own course selection, enrolment, and academic decisions."
            ]
          },
          {
            title: "Limitation of responsibility",
            items: [
              "This website is not responsible for any direct or indirect loss caused by using or relying on the website.",
              "If you are unsure about your degree plan, contact UQ Student Central, your faculty, or an official academic adviser."
            ]
          }
        ]
      },
      terms: {
        eyebrow: "Terms",
        title: "Terms of Use",
        intro: "These terms describe the basic rules for using GradPlan.",
        sections: [
          {
            title: "Use of the website",
            items: [
              "Users may use this website for free during the current Beta period.",
              "Users must not attack, disrupt, or attempt to damage the website.",
              "Users must not automatically scrape, copy, or extract large amounts of data from the website."
            ]
          },
          {
            title: "Service availability",
            items: [
              "We do not guarantee that the website will always be available or error-free.",
              "We reserve the right to update website content, data, design, and features.",
              "We may modify, pause, or stop part of the service at any time, especially while the product is in Beta."
            ]
          }
        ]
      }
    }
  }
};
