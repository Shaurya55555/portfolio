export type StoreListener = () => void;

let active: string | null = null;
const listeners = new Set<StoreListener>();

/** Which horizontal-scene station is centred right now (null outside the scene). */
export const sceneStore = {
  get: () => active,
  set(v: string | null) {
    if (v === active) return;
    active = v;
    listeners.forEach((l) => l());
  },
  subscribe(l: StoreListener) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};
