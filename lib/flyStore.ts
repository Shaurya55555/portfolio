/** Shared between the hero planets and the astronaut: where on screen the
 *  astronaut should fly to, and what to do when it gets there. */
type Target = { x: number; y: number };

export const flyStore = {
  target: null as Target | null,
  onArrive: null as (() => void) | null,
  /** set once the astronaut canvas is mounted and listening */
  listening: false,
  flyTo(t: Target, done: () => void) {
    if (!flyStore.listening) {
      done();
      return;
    }
    flyStore.target = t;
    flyStore.onArrive = done;
    // safety net so a navigation can never hang on the flight
    window.setTimeout(() => flyStore.arrive(), 1800);
  },
  arrive() {
    const cb = flyStore.onArrive;
    flyStore.onArrive = null;
    flyStore.target = null;
    cb?.();
  },
};
