import type { CourseCategory, CourseLevel } from "./courses.ts";

export type GraduationRequirementType =
  | "course-list"
  | "category-units"
  | "level-units"
  | "total-units";

export interface GraduationRequirement {
  key: string;
  label: string;
  type: GraduationRequirementType;
  requiredUnits: number;
  description: string;
  requiredCourseCodes?: string[];
  categories?: CourseCategory[];
  levels?: CourseLevel[];
}

export interface GraduationRules {
  university: "University of Queensland";
  program: "Bachelor of Economics";
  totalUnits: number;
  requirements: GraduationRequirement[];
}

export const uqBachelorOfEconomicsGraduationRules: GraduationRules = {
  university: "University of Queensland",
  program: "Bachelor of Economics",
  totalUnits: 48,
  requirements: [
    {
      key: "core-courses",
      label: "Core Courses",
      type: "course-list",
      requiredUnits: 12,
      requiredCourseCodes: [
        "ECON1010",
        "ECON1020",
        "ECON1050",
        "ECON1310",
        "ECON2010",
        "ECON2020"
      ],
      description:
        "Mock compulsory Economics foundation and intermediate courses for the first MVP."
    },
    {
      key: "flexible-core",
      label: "Flexible Core",
      type: "category-units",
      requiredUnits: 2,
      categories: ["Economics Elective"],
      description:
        "Mock flexible Economics course requirement. First version uses Economics Elective courses."
    },
    {
      key: "electives",
      label: "Electives",
      type: "category-units",
      requiredUnits: 4,
      categories: ["Economics Elective", "General Elective"],
      description:
        "Mock elective space that can be filled with Economics electives or general electives."
    },
    {
      key: "level-1",
      label: "Level 1",
      type: "level-units",
      requiredUnits: 8,
      levels: [1],
      description: "Mock minimum Level 1 study progress requirement."
    },
    {
      key: "level-2",
      label: "Level 2",
      type: "level-units",
      requiredUnits: 8,
      levels: [2],
      description: "Mock minimum Level 2 study progress requirement."
    },
    {
      key: "level-3",
      label: "Level 3",
      type: "level-units",
      requiredUnits: 8,
      levels: [3],
      description:
        "Mock Level 3 requirement. Level 3 course data will be expanded in a later version."
    },
    {
      key: "total-units",
      label: "Total Units",
      type: "total-units",
      requiredUnits: 48,
      description: "Mock total program unit requirement for the Bachelor of Economics MVP."
    }
  ]
};
