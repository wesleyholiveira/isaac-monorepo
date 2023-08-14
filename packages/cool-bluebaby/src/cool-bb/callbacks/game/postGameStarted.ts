import { ModCallback } from "isaac-typescript-definitions";
import { CoolBBState } from "../../states/cool-bb.state";

export function postGameStarted(mod: Mod): void {
    mod.AddCallback(ModCallback.POST_GAME_STARTED, gameStarted);
}

function gameStarted(isContinued: boolean) {
    if (!isContinued) {
        CoolBBState.room = {};
        CoolBBState.persist.removedDirtyMind = false;
        CoolBBState.persist.dips = [];
        CoolBBState.persist.MAX_DIPS = 10;
        CoolBBState.persist.shits = [];
        CoolBBState.persist.wisps = [];
        CoolBBState.persist.tears = {};
        CoolBBState.persist.wispsCounter = 0;
    }
}