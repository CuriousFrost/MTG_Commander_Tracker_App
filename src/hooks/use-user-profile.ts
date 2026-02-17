import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createCache } from "@/lib/cache";
import {
  ensureUserProfile,
  updateUsername as updateUsernameLib,
  type ProfileData,
} from "@/lib/friends";

const cache = createCache<ProfileData>();

export function useUserProfile() {
  const { user } = useAuth();
  const cached = user ? cache.get(user.uid) : null;
  const [profile, setProfile] = useState<ProfileData | null>(cached);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setError(null);
      setLoading(false);
      return;
    }
    const userUid = user.uid;

    if (cache.get(userUid)) {
      setProfile(cache.get(userUid));
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    async function load() {
      try {
        const data = await ensureUserProfile(userUid, user!.email ?? "");
        if (!cancelled) {
          setProfile(data);
          cache.set(userUid, data);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load profile.");
          console.error("useUserProfile error:", err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const updateUsername = useCallback(
    async (username: string) => {
      if (!user || !profile) return;
      const trimmed = username.trim();
      if (!trimmed) return;

      // Optimistic
      const updated = { ...profile, username: trimmed };
      setProfile(updated);
      cache.set(user.uid, updated);

      try {
        await updateUsernameLib(user.uid, trimmed);
      } catch (err) {
        setError("Failed to update username.");
        console.error("updateUsername error:", err);
        // Revert
        setProfile(profile);
        cache.set(user.uid, profile);
      }
    },
    [user, profile],
  );

  return { profile, loading, error, updateUsername };
}
