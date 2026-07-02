import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_ACADEMIC_PROFILE,
  saveProfile,
  subscribe,
  updateProfile
} from "./profileStore.ts";

test("notifies subscribers when the academic profile is saved", () => {
  let notifiedCurrentGpa = "";
  const unsubscribe = subscribe((profile) => {
    notifiedCurrentGpa = profile.currentGpa;
  });

  saveProfile({
    ...DEFAULT_ACADEMIC_PROFILE,
    currentGpa: "5.75"
  });

  unsubscribe();

  assert.equal(notifiedCurrentGpa, "5.75");
});

test("updates profile from the existing store snapshot", () => {
  saveProfile({
    ...DEFAULT_ACADEMIC_PROFILE,
    currentGpa: "5.50",
    targetGpa: "6.00"
  });

  const updatedProfile = updateProfile({
    targetGpa: "6.20"
  });

  assert.equal(updatedProfile.currentGpa, "5.50");
  assert.equal(updatedProfile.targetGpa, "6.20");
});

test("keeps completed courses aligned with the latest course catalog", () => {
  const savedProfile = saveProfile({
    ...DEFAULT_ACADEMIC_PROFILE,
    completedCourses: ["econ1010", "FAKE1000", " ECON1020 "]
  });

  assert.deepEqual(savedProfile.completedCourses, ["ECON1010", "ECON1020"]);
});

test("normalizes the six-semester degree plan", () => {
  const savedProfile = saveProfile({
    ...DEFAULT_ACADEMIC_PROFILE,
    semesterPlan: [
      { id: "semester-1", name: "Semester 1", courses: ["econ2010", "FAKE1000"] }
    ]
  });

  assert.equal(savedProfile.semesterPlan.length, 6);
  assert.deepEqual(savedProfile.semesterPlan[0].courses, ["ECON2010"]);
  assert.deepEqual(savedProfile.semesterPlan[1].courses, []);
});
