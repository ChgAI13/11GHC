export const zh = {
  common: {
    brand: "GradPlan",
    subtitle: "自信规划你的学位路径。",
    language: "语言",
    english: "English",
    chinese: "中文",
    profile: "Profile",
    settings: "设置",
    comingSoon: "暂未开放",
    resetAllData: "清空所有数据",
    resetConfirm:
      "确定要清空 Academic Profile 吗？Dashboard、GPA Planner、Degree Planner 和 Graduation Checker 会同步重置。",
    loading: "加载中",
    unknown: "未知",
    all: "全部",
    clear: "清空",
    save: "保存",
    search: "搜索",
    units: "学分",
    course: "门课程",
    courses: "门课程",
    semester: "学期",
    level: "年级",
    difficulty: "难度",
    math: "数学强度",
    currentGpa: "当前 GPA",
    targetGpa: "目标 GPA",
    completedCourses: "已完成课程",
    remainingCourses: "剩余课程",
    preferredWorkload: "偏好学习负荷",
    academicProfile: "Academic Profile",
    fromAcademicProfile: "来自 Academic Profile",
    navLabel: "主导航"
  },
  nav: {
    dashboard: "首页",
    gpaPlanner: "GPA 规划",
    coursePlanner: "学位规划",
    graduationChecker: "毕业检查",
    courseDatabase: "课程库"
  },
  footer: {
    brand: "GradPlan Beta",
    builtBy: "由一名大学生独立开发。",
    unofficial: "非官方学业规划平台。",
    notAffiliated: "与 The University of Queensland 没有官方合作关系。",
    betaWarning:
      "Beta 版本 — 选课前请务必用 UQ 官方资源核对所有学业决定。",
    links: {
      about: "关于",
      privacy: "隐私",
      disclaimer: "免责声明",
      terms: "使用条款"
    },
    version: "版本"
  },
  feedback: {
    floatingButton: "💬 Feedback",
    title: "反馈",
    intro: "报告问题或分享想法，帮助 GradPlan 变得更好。",
    typeLabel: "类型",
    typeOptions: {
      bug: "Bug Report",
      feature: "Feature Request",
      general: "General Feedback"
    },
    messageLabel: "反馈内容",
    messagePlaceholder: "Tell us what happened...",
    emailLabel: "Email（可选）",
    emailPlaceholder: "you@example.com",
    submit: "提交反馈",
    close: "关闭反馈弹窗",
    validation: "请先填写反馈内容。",
    success: "Thank you for helping improve GradPlan!"
  },
  landing: {
    badge: "GradPlan Beta",
    titleLine1: "规划你的学位。",
    titleLine2: "不是整理表格。",
    subtitle:
      "GradPlan 帮助大学生规划每个学期、追踪毕业进度、估算 GPA，并做出更聪明的选课决定。",
    primaryCta: "开始规划",
    secondaryCta: "查看功能",
    featureSection: {
      eyebrow: "核心功能",
      title: "为完整学位规划而做，不是一次性问答。",
      description:
        "所有功能都连接同一份 Academic Profile，让规划更系统，不再到处散落。", 
      openFeature: "打开功能"
    },
    features: [
      {
        emoji: "🎓",
        title: "学位规划器",
        description: "按学期规划整个大学课程路径。",
        href: "/course-planner"
      },
      {
        emoji: "📈",
        title: "GPA 规划器",
        description: "在出成绩前估算你的 GPA 走势。",
        href: "/gpa"
      },
      {
        emoji: "✅",
        title: "毕业检查器",
        description: "清楚知道毕业前还缺什么要求。",
        href: "/graduation"
      },
      {
        emoji: "🧠",
        title: "智能课程推荐",
        description: "根据你的 Profile 和毕业规则推荐下一步课程。",
        href: "/course-planner"
      }
    ],
    why: {
      eyebrow: "为什么用 GradPlan？",
      title: "为什么用 GradPlan？",
      items: [
        {
          title: "不用反复读 Handbook PDF",
          description: "把复杂的专业要求变成真正能用的清晰路线图。"
        },
        {
          title: "不用像 ChatGPT 一样重复提问",
          description:
            "你的 Profile、已完成课程和毕业规则会连接在同一个流程里。"
        },
        {
          title: "所有规划集中在一个地方",
          description:
            "GPA、选课、毕业检查和课程推荐会一起工作。"
        }
      ]
    },
    how: {
      eyebrow: "如何使用",
      title: "四步把混乱规划变成清晰路线图。",
      step: "步骤",
      steps: [
        "创建 Academic Profile",
        "规划每个学期",
        "追踪毕业进度",
        "更有把握地毕业"
      ]
    },
    support: {
      title: "当前支持",
      university: "University of Queensland",
      program: "Bachelor of Economics",
      beta: "Beta"
    },
    comingSoon: {
      title: "即将支持",
      items: [
        "Commerce",
        "Business",
        "Engineering",
        "更多大学",
        "云同步",
        "AI 学习规划器"
      ]
    },
    preview: {
      title: "学位路线图",
      program: "Bachelor of Economics",
      beta: "Beta",
      rows: [
        { label: "学期路线图", value: "6 个学期", width: "86%" },
        { label: "毕业进度", value: "62%", width: "62%" },
        { label: "GPA 目标", value: "6.2", width: "74%" }
      ],
      gpaReady: "GPA 估算已准备",
      rulesChecked: "规则已检查"
    },
    finalCta: {
      title: "用一张清晰路线图替代表格和零散规划。",
      description:
        "先创建 Academic Profile，再让 GradPlan 连接 GPA 规划、学期规划和毕业进度。",
      button: "开始规划"
    }
  },
  profilePage: {
    eyebrow: "学生数据中心",
    title: "Academic Profile",
    intro:
      "这里是整个产品唯一的数据入口。保存后，GPA Planner、Degree Planner 和 Graduation Checker 都会读取同一份学习资料。",
    status: "Profile 状态",
    statusLine: ({ currentGpa, targetGpa, remainingCourses }) =>
      `当前 GPA ${currentGpa || "-"} · 目标 GPA ${targetGpa || "-"} · 剩余 ${remainingCourses} 门课程`,
    basicInfo: "基础信息",
    fixedSupport: "第一版固定支持 University of Queensland · Bachelor of Economics。",
    university: "University",
    program: "Program",
    currentGpaPlaceholder: "例如 5.60",
    targetGpaPlaceholder: "例如 6.20",
    expectedGraduationSemester: "预计毕业学期",
    graduationPlaceholder: "请选择预计毕业学期",
    completedSummary: ({ completed, total, remaining }) =>
      `已完成 ${completed} / ${total} 门课程 · 剩余 ${remaining} 门`,
    searchCourses: "搜索课程",
    searchPlaceholder: "搜索课程代码或名称，例如 ECON2010",
    selectedCourses: "已选择课程",
    selected: "已选择",
    unselectTitle: "点击取消选择",
    noCourseFound:
      "没有找到匹配课程。试试课程代码，例如 ECON1010、ECON2010、ECON3440。",
    defaultCourseHint:
      "默认只显示前 8 门课程。输入课程代码或名称后会筛选完整课程库。",
    dataFlow: "数据流",
    singleSource: "唯一数据源",
    localStorageNote:
      "Profile 保存到 Local Storage，页面切换、刷新、关闭浏览器后都会恢复。",
    plannerNote:
      "Degree Planner 会读取这里的 GPA、已完成课程和学习强度，再调用规则引擎。",
    nextStep: "下一步",
    generateCoursePlan: "生成课程计划",
    nextStepDescription:
      "保存后可以直接去 Degree Planner，不需要重复输入 GPA 或已完成课程。",
    openCoursePlanner: "打开 Degree Planner",
    saveButton: "保存 Academic Profile",
    savedMessage:
      "Academic Profile 已保存，Dashboard、GPA Planner、Degree Planner 和 Graduation Checker 已同步更新。",
    workloadLabels: {
      Light: "轻量",
      Medium: "中等",
      Heavy: "较重"
    }
  },
  gpaPage: {
    eyebrow: "UQ Bachelor of Economics",
    title: "GPA 目标规划器",
    intro: "自动读取 Academic Profile，估算剩余课程平均需要达到多少 GPA。",
    requiredAverage: "剩余每门课平均需要",
    missingProfile: "请先到 Academic Profile 填写 Current GPA 和 Target GPA。",
    impossible: "按当前课程数量，目标超过 7 分制上限。",
    alreadySafe: "你已经高于目标轨道，后续重点是稳住。",
    requiredStatus: ({ remaining, required }) =>
      `剩余 ${remaining} 门课平均需要达到 ${required}。`,
    notFilled: "未填写",
    profileData: "Academic Profile 数据",
    profileDataDescription:
      "GPA Planner 不再单独保存数据。请在 Academic Profile 修改 GPA 和课程进度。",
    targetGraduationGpa: "目标毕业 GPA",
    completedCourseCount: "已完成课程数",
    remainingCourseCount: "剩余课程数",
    fromCompletedCourses: "来自 Completed Courses",
    fromMockRules: "根据 Mock Degree Rules 计算",
    generateSemesterPlan: "生成学期计划",
    editProfile: "去 Academic Profile 修改数据",
    gapToTarget: "当前距离目标",
    achieved: "已达标",
    gap: (value) => `差 ${value}`,
    currentVsTarget: ({ current, target }) => `当前 ${current} / 目标 ${target}`,
    difficulty: "达成难度",
    completed: "已完成",
    remaining: "剩余",
    smartAdvice: (title) => `智能建议：${title}`,
    adviceDescription:
      "根据你的目标和剩余课程数量生成，仅作为规划参考。",
    formulaTitle: "公式",
    formulaText:
      "剩余平均 =（目标 GPA x 总课程数 - 当前 GPA x 已完成课程数）÷ 剩余课程数",
    rangesTitle: "难度区间",
    rangesText: "≤5.5 轻松，5.5-6.2 中等，6.2-6.7 困难，超过 6.7 非常困难。",
    reminderTitle: "提醒",
    reminderText:
      "不同学校和学院可能有自己的 GPA 或 WAM 规则，正式用途请以学校说明为准。",
    difficultyLevels: {
      easy: {
        label: "轻松",
        detail: "剩余课程保持稳定即可。"
      },
      moderate: {
        label: "中等",
        detail: "需要多数课程达到 Credit 到 Distinction。"
      },
      hard: {
        label: "困难",
        detail: "需要稳定冲 Distinction 到 HD。"
      },
      veryHard: {
        label: "非常困难",
        detail: "基本需要剩余课程接近满分。"
      }
    },
    advice: {
      impossible: {
        title: "目标过高，建议先调整选课策略",
        items: [
          "这个目标按 7 分制已经超过单科满分，单靠剩余课程很难实现。",
          "优先选择评分透明、作业占比高、你有基础的课程，避免纯期末考试占比过高的课。",
          "如果目标是升学或转专业，建议同时准备替代方案，例如补充实习、作品集或语言成绩。"
        ]
      },
      veryHard: {
        title: "需要冲刺高分，选课要更保守",
        items: [
          "剩余课程基本需要稳定拿到 HD 水平，容错空间很小。",
          "尽量选择你已经有基础、老师评分标准清楚、历年反馈较稳定的课程。",
          "开学第一周就整理每门课的 rubric、due date 和分数组成，所有大作业至少提前一周完成初稿。"
        ]
      },
      hard: {
        title: "目标偏难，但可以通过节奏管理实现",
        items: [
          "多数课程需要保持 Distinction 附近，不能让任何一门课明显掉队。",
          "把每门课最高权重的 assessment 单独列出来，优先投入时间。",
          "遇到英文要求不确定时，尽早问 tutor 或 student support，不要等到提交前一天。"
        ]
      },
      moderate: {
        title: "目标可行，重点是稳定发挥",
        items: [
          "剩余课程只要保持稳定，目标 GPA 有不错机会达成。",
          "建议每周固定复盘 lecture 和 tutorial，避免 due week 集中爆雷。",
          "如果同时打工，把所有 deadline 放进日历，提前处理多个作业撞车的周。"
        ]
      },
      alreadyOnTrack: {
        title: "你已经在目标轨道上",
        items: [
          "当前 GPA 已经接近或高于目标，重点是不要被低分课程拖后腿。",
          "可以优先选择自己擅长或感兴趣的课程，保持出勤和提交节奏。",
          "多余精力可以放在实习、简历、作品集或英文表达能力上。"
        ]
      },
      steady: {
        title: "目标比较稳，继续保持节奏",
        items: [
          "剩余课程平均要求不高，正常发挥就有机会达成。",
          "建议保持每周学习节奏，提前处理小测、quiz 和 tutorial participation。",
          "如果课程邮件或作业要求看不懂，可以尽早向 tutor 或 support 求助。"
        ]
      }
    }
  },
  plannerPage: {
    eyebrow: "UQ Bachelor of Economics",
    title: "Degree Planner",
    intro:
      "把未来 6 个学期排出来。课程来自 Course Database，毕业检查来自 Program Rules，推荐来自 Recommendation Engine。",
    plannedProgress: "已规划学位进度",
    progressSummary: ({ count, missingUnits }) =>
      `${count} 门课程已完成或已规划 · 还缺 ${missingUnits} 学分`,
    plannedCourses: "已规划课程",
    nextRecommendations: "下一步推荐",
    sixSemesterPlan: "六学期计划",
    sixSemesterDescription:
      "Add、Move、Remove 课程都会保存到 Academic Profile。",
    generateSemesterPlan: "生成学期计划",
    analyzeSemester: "分析这个学期",
    emptySemester:
      "这个学期还没有课程。可以手动添加，也可以用推荐引擎生成计划。",
    chooseCourse: "选择课程",
    addCourse: "添加课程",
    moveUp: "上移课程",
    moveDown: "下移课程",
    removeCourse: "移除课程",
    currentTargetGpa: "当前 / 目标 GPA",
    graduationCheck: "毕业检查",
    graduationCheckDescription:
      "使用当前 Profile + 已规划课程调用 Graduation Checker。",
    semesterAnalysis: "学期分析",
    mathIntensity: "数学强度",
    examLoad: "考试占比",
    assignmentLoad: "作业占比",
    estimatedStudyHours: "预计学习时间",
    hoursPerWeek: "小时 / 周",
    courseUnitsSummary: ({ courseCount, units }) => `${courseCount} 门课程 · ${units} 学分`,
    noSemesterRisk: "暂未发现学期风险。",
    warnings: "风险提示",
    warningHint: "添加、移动或删除课程后，系统会实时刷新风险提示。",
    recommendationEngine: "推荐引擎",
    recommendedNextCourses: "推荐下一步课程",
    recommendedDescription:
      "这里只展示 Recommendation Engine 的结果。点击加入计划会加入第一个有空位的 semester。",
    addToPlan: "加入计划",
    noRecommendations:
      "当前没有可推荐课程。请检查 Profile 或清理已规划课程。",
    riskLabels: {
      "High Risk Semester": "高风险学期",
      "Exam Heavy": "考试占比较高",
      "Assignment Heavy": "作业占比较高"
    },
    engineText: {
      "No semester risk detected.": "暂未发现学期风险。",
      "High Risk Semester: total math intensity is above 8.":
        "高风险学期：总数学强度超过 8。",
      "Exam Heavy: average exam load is above 70%.":
        "考试占比较高：平均考试占比超过 70%。",
      "Assignment Heavy: average assignment load is above 70%.":
        "作业占比较高：平均作业占比超过 70%。",
      "Course has not been completed yet.": "该课程尚未完成。",
      "Prerequisites need to be checked before enrolment.": "选课前需要检查先修课。",
      "Core Economics requirements are prioritised to protect graduation progress.":
        "优先推荐核心经济学要求，以保护毕业进度。",
      "Core and quantitative requirements are ranked ahead of general electives.":
        "核心课和定量要求会优先于普通选修课。",
      "Recommendation generated from completed courses, GPA risk, prerequisites, math intensity, preferred workload, and graduation requirements.":
        "推荐结果基于已完成课程、GPA 风险、先修课、数学强度、偏好学习负荷和毕业要求生成。"
    },
    profileIssuePrefix: "如果你先到",
    profileIssueLink: "Academic Profile",
    profileIssueSuffix: "填写 Current GPA、Target GPA 和已完成课程，推荐结果会更准确。",
    workloadLabels: {
      Light: "轻量",
      Medium: "中等",
      Heavy: "较重"
    }
  },
  graduationPage: {
    eyebrow: "Mock Degree Rules",
    title: "毕业检查",
    intro:
      "自动读取 Academic Profile，用 Mock UQ Economics 规则检查毕业进度、缺课、缺学分和下一步建议。",
    overallProgress: "整体毕业进度",
    totalUnitsCompleted: ({ completed, required }) => `${completed}/${required} 总学分已完成`,
    program: "项目",
    missingUnits: "缺失学分",
    noCompletedCourses:
      "还没有已完成课程数据。请先到",
    noCompletedCoursesSuffix: "填写 Current GPA 和 Completed Courses。",
    warnings: "风险提示",
    warningsDescription: "包括先修课缺失和推荐课程风险提示。",
    requirementStatus: "毕业要求状态",
    requirementDescription:
      "Core Courses、Flexible Core、Electives、Level 1、Level 2、Level 3、Total Units。",
    completedRequirements: "已完成要求",
    completedRequirementsDescription: "已经满足的毕业要求。",
    noCompletedRequirements:
      "目前还没有完全满足的要求。继续完成核心课和学分后这里会更新。",
    remainingRequirements: "剩余要求",
    remainingRequirementsDescription: "还需要继续完成的要求。",
    noRemainingRequirements: "所有 Mock requirement 都已满足。",
    missingCourses: "缺失课程",
    missingCoursesDescription:
      "根据当前 Mock Course Database 可以明确列出的缺课。",
    noMissingCourses:
      "当前 Mock Course Database 暂无更多可列出的缺课；缺失学分会继续显示在 Missing Units。",
    missingUnitsDescription:
      "这是基于 Mock total units 的剩余学分估算。真实版本会接入 UQ 官方 degree rules 和 course list。",
    fixMyDegree: "修复我的学位计划",
    updateProfile: "更新 Academic Profile",
    recommendedNextCourses: "推荐下一步课程",
    recommendedDescription:
      "这里调用现有 Recommendation Engine，根据 Profile 和毕业缺口给出下一步建议。",
    noRecommendations: "当前规则没有生成推荐课程。请先完善 Academic Profile。",
    requirementTranslations: {
      labels: {
        "BEcon Core Courses": "BEcon 核心课程",
        "BEcon Flexible Core Courses": "BEcon Flexible Core 课程",
        "Level 1 Maximum": "Level 1 上限",
        "Level 3 Minimum": "Level 3 下限",
        "Total Units": "总学分"
      },
      descriptions: {
        "Complete 16 units for all BEcon Core Courses.":
          "完成全部 BEcon 核心课程，共 16 学分。",
        "Complete 16 to 32 units from BEcon Flexible Core Courses when following the flexible core pathway.":
          "如果走 flexible core 路径，需要完成 16 到 32 学分的 BEcon Flexible Core 课程。",
        "Selected courses must include at most 24 units at level 1.":
          "所选课程中 Level 1 课程最多 24 学分。",
        "Selected courses must include at least 8 units at level 3.":
          "所选课程中 Level 3 课程至少 8 学分。",
        "Complete 48 units comprising BEcon Core Courses plus one approved major, elective, or flexible core pathway.":
          "完成 48 学分，包括 BEcon 核心课程和获批的 major、elective 或 flexible core 路径。"
      }
    },
    engineText: {
      "Course has not been completed yet.": "该课程尚未完成。",
      "Prerequisites need to be checked before enrolment.": "选课前需要检查先修课。",
      "Core Economics requirements are prioritised to protect graduation progress.":
        "优先推荐核心经济学要求，以保护毕业进度。",
      "Recommendation generated from completed courses, GPA risk, prerequisites, math intensity, preferred workload, and graduation requirements.":
        "推荐结果基于已完成课程、GPA 风险、先修课、数学强度、偏好学习负荷和毕业要求生成。"
    },
    requirementLabels: {
      completed: "已完成",
      required: "要求",
      missing: "缺失"
    }
  },
  coursesPage: {
    eyebrow: "UQ Bachelor of Economics · 2026",
    title: "课程数据库",
    intro: "查看 Economics 课程、学期、先修课、难度和官方来源。",
    search: "搜索课程代码或课程名称",
    searchLabel: "搜索",
    filters: "筛选",
    level: "年级",
    category: "类别",
    semester: "学期",
    results: "门课程",
    noResults: "没有找到匹配课程。",
    prerequisites: "先修课",
    difficulty: "难度",
    math: "数学强度",
    confidence: "数据可信度",
    source: "官方来源",
    description: "课程简介",
    sourceLink: (index) => `来源 ${index}`,
    completed: "Profile 已完成",
    profileCompleted: "已在 Profile 完成",
    expand: "展开详情",
    collapse: "收起详情",
    both: "两个学期",
    categoryLabels: {
      Core: "核心",
      "Flexible Core": "Flexible Core",
      Elective: "选修"
    }
  },
  legal: {
    productInformation: "产品信息",
    version: "版本",
    buildDate: "构建日期",
    contactEmail: "联系邮箱",
    officialUq: "UQ 官方 Programs and Courses",
    openOfficialUq: "打开 UQ 官方 Programs and Courses",
    navLabel: "法律页面",
    pages: {
      about: {
        eyebrow: "关于",
        title: "关于 GradPlan",
        intro:
          "GradPlan 是一个独立学业规划平台，帮助大学生更高效地规划自己的学位路径。",
        sections: [
          {
            title: "当前 Beta 支持范围",
            items: [
              "当前 Beta 版本先服务 University of Queensland 学生。",
              "第一版支持 Bachelor of Economics。",
              "未来版本会支持更多大学、专业和规划流程。"
            ]
          },
          {
            title: "使命",
            items: [
              "让学业规划变简单。",
              "GradPlan 帮助学生规划学期、追踪毕业进度、计算 GPA，并建立 degree roadmap。",
              "GradPlan 目前处于 Beta 阶段，欢迎反馈和纠错。"
            ]
          }
        ]
      },
      privacy: {
        eyebrow: "隐私",
        title: "隐私政策",
        intro: "本政策说明当前 Beta 版本如何处理用户数据。",
        sections: [
          {
            title: "当前 Beta 版本",
            items: [
              "当前 Beta 版本不要求注册账号。",
              "我们不收集身份证件信息。",
              "我们不收集银行卡或支付信息。",
              "我们不会出售用户数据。"
            ]
          },
          {
            title: "Academic Profile 数据",
            items: [
              "Academic Profile 默认保存在你的浏览器 Local Storage。",
              "当前 Beta 版本不会把你的 Academic Profile 上传到服务器。",
              "这意味着你的 Profile 保存在自己的设备和浏览器中，而不是云端数据库。",
              "你可以随时使用 Reset All Data 清除本地数据。",
              "如果未来加入云同步、账号、分析或支付功能，我们会在使用这些功能前更新隐私政策。"
            ]
          }
        ]
      },
      disclaimer: {
        eyebrow: "免责声明",
        title: "免责声明",
        intro: "在使用 GradPlan 进行学业规划前，请先阅读本免责声明。",
        sections: [
          {
            title: "仅供参考",
            items: [
              "本网站仅用于学习、规划和一般参考。",
              "本网站不属于 The University of Queensland，也没有与 The University of Queensland 建立官方合作关系。",
              "所有课程信息、毕业要求、GPA 计算和课程推荐都仅供参考。"
            ]
          },
          {
            title: "准确性和责任",
            items: [
              "虽然我们努力保持信息准确，但不能保证始终与大学官方最新要求一致。",
              "学生在选课、毕业或学业决定前，应查阅学校官方网站。",
              "学校官方规则和公开课程信息始终应作为最终依据。",
              "用户应自行承担选课、注册和学业决定的责任。"
            ]
          },
          {
            title: "责任限制",
            items: [
              "本网站不对因使用或依赖本网站造成的任何直接或间接损失承担责任。",
              "如果你不确定自己的学位计划，请联系 UQ Student Central、学院或官方学业顾问。"
            ]
          }
        ]
      },
      terms: {
        eyebrow: "条款",
        title: "使用条款",
        intro: "这些条款说明使用 GradPlan 的基本规则。",
        sections: [
          {
            title: "网站使用",
            items: [
              "当前 Beta 阶段，用户可以免费使用本网站。",
              "用户不得攻击、干扰或尝试破坏本网站。",
              "用户不得自动抓取、复制或提取大量网站数据。"
            ]
          },
          {
            title: "服务可用性",
            items: [
              "我们不保证网站始终可用或完全无错误。",
              "我们保留更新网站内容、数据、设计和功能的权利。",
              "在 Beta 阶段，我们可能随时修改、暂停或停止部分服务。"
            ]
          }
        ]
      }
    }
  }
};
