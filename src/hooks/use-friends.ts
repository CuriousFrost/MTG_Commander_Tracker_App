import { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { createCache } from "@/lib/cache";
import {
  acceptFriendRequest as acceptLib,
  declineFriendRequest as declineLib,
  getFriendPublicData as getDataLib,
  loadFriendsWithProfiles,
  removeFriend as removeLib,
  sendFriendRequest as sendLib,
} from "@/lib/friends";
import type { Friend, FriendPublicData, FriendRequest } from "@/types";

type FriendsData = {
  friends: Friend[];
  pendingRequests: FriendRequest[];
};

const cache = createCache<FriendsData>();

export function useFriends(myFriendId: string | null, myUsername: string) {
  const { user } = useAuth();
  const cached = user ? cache.get(user.uid) : null;
  const [friends, setFriends] = useState<Friend[]>(cached?.friends ?? []);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>(
    cached?.pendingRequests ?? [],
  );
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!user) return;

    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      const data = snap.data();

      const friendIds: string[] = data?.friends ?? [];
      const pending: FriendRequest[] = data?.pendingFriendRequests ?? [];

      const resolved = await loadFriendsWithProfiles(friendIds);
      setFriends(resolved);
      setPendingRequests(pending);
      cache.set(user.uid, { friends: resolved, pendingRequests: pending });
    } catch (err) {
      setError("Failed to load friends.");
      console.error("useFriends reload error:", err);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setFriends([]);
      setPendingRequests([]);
      setError(null);
      setLoading(false);
      return;
    }
    const userUid = user.uid;

    if (cache.get(userUid)) {
      const c = cache.get(userUid)!;
      setFriends(c.friends);
      setPendingRequests(c.pendingRequests);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    async function load() {
      try {
        await reload();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user, reload]);

  const sendRequest = useCallback(
    async (targetFriendId: string) => {
      if (!user || !myFriendId) throw new Error("Not signed in");
      await sendLib(user.uid, myFriendId, myUsername, targetFriendId);
      // No reload needed — the request goes to the OTHER user's doc
    },
    [user, myFriendId, myUsername],
  );

  const acceptRequest = useCallback(
    async (fromFriendId: string) => {
      if (!user || !myFriendId) return;
      await acceptLib(user.uid, myFriendId, fromFriendId);
      await reload();
    },
    [user, myFriendId, reload],
  );

  const declineRequest = useCallback(
    async (fromFriendId: string) => {
      if (!user) return;
      await declineLib(user.uid, fromFriendId);
      await reload();
    },
    [user, reload],
  );

  const removeFriend = useCallback(
    async (friendId: string) => {
      if (!user) return;
      await removeLib(user.uid, friendId);
      await reload();
    },
    [user, reload],
  );

  const getFriendData = useCallback(
    async (friendId: string): Promise<FriendPublicData> => {
      return getDataLib(friendId);
    },
    [],
  );

  return {
    friends,
    pendingRequests,
    loading,
    error,
    sendRequest,
    acceptRequest,
    declineRequest,
    removeFriend,
    getFriendData,
    reload,
  };
}
