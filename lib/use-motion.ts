"use client";

import { useSyncExternalStore } from "react";
import { isMotionOff, subscribeMotion } from "@/lib/motion";

/* html[data-motion] dış durumunu abonelikle okur. */
export function useMotionOff(): boolean {
  return useSyncExternalStore(subscribeMotion, isMotionOff, () => false);
}

type Listener = () => void;
const mediaSubscribers = new Map<string, (listener: Listener) => () => void>();
const mediaSnapshots = new Map<string, () => boolean>();

function mediaStore(query: string) {
  let subscribe = mediaSubscribers.get(query);
  let snapshot = mediaSnapshots.get(query);
  if (!subscribe || !snapshot) {
    subscribe = (listener) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    };
    snapshot = () => window.matchMedia(query).matches;
    mediaSubscribers.set(query, subscribe);
    mediaSnapshots.set(query, snapshot);
  }
  return { subscribe, snapshot };
}

const serverSnapshot = () => false;

export function useMediaQuery(query: string): boolean {
  const { subscribe, snapshot } = mediaStore(query);
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
