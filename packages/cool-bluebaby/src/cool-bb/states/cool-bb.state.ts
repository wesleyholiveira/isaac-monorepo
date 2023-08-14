interface State {
    room: {},
    persist: {
        removedDirtyMind?: boolean;
        dips: Array<EntityFamiliar>,
        MAX_DIPS: number,
        shits?: string[] | undefined,
        wisps: {[key: Seed]: string},
        tears: Record<Seed, boolean>,
        wispsCounter: number,
    }
}

export const CoolBBState: State = {
    room: {},
    persist: {
        removedDirtyMind: undefined,
        dips: [],
        MAX_DIPS: 0,
        shits: [],
        wisps: [],
        tears: {},
        wispsCounter: 0,
    },
};