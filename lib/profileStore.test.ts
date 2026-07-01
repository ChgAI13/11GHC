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
