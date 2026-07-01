"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_ACADEMIC_PROFILE,
  loadProfile,
  resetProfile,
  saveProfile,
  subscribe,
  updateProfile
} from "@/lib/profileStore";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_ACADEMIC_PROFILE);

  useEffect(() => {
    setProfile(loadProfile());

    return subscribe((nextProfile) => {
      setProfile(nextProfile);
    });
  }, []);

  const value = useMemo(
    () => ({
      profile,
      resetProfile,
      saveProfile,
      updateProfile
    }),
    [profile]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
}
