"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

/** Redirect to sign-in (and back to the current URL) when there is no session. */
export function useRequireAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      const back = window.location.pathname + window.location.search;
      router.replace(`/auth/signin?callbackUrl=${encodeURIComponent(back)}`);
    }
  }, [status, router]);

  return { session, ready: status === "authenticated" };
}
