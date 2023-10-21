interface State {
  room: Record<string, never>;
  persist: {
    removedDirtyMind?: boolean;
    dips: EntityFamiliar[];
    MAX_DIPS: number;
    shits?: string[] | undefined;
    wisps: Record<Seed, string>;
    tears: Record<Seed, boolean>;
    wispsCounter: number;
    stageIndex: number;
  };
}

export const state: State = {
  room: {},
  persist: {
    removedDirtyMind: undefined,
    dips: [],
    MAX_DIPS: 10,
    shits: [],
    wisps: [],
    tears: {},
    wispsCounter: 0,
    stageIndex: 0,
  },
};
