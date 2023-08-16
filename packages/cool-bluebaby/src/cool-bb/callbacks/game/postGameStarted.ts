import { ModCallback } from "isaac-typescript-definitions";
import { state } from "../../states/cool-bb.state";

export function postGameStarted(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, gameStarted);
}

function gameStarted(isContinued: boolean) {
  if (!isContinued) {
    state.room = {};
    state.persist.removedDirtyMind = false;
    state.persist.dips = [];
    state.persist.MAX_DIPS = 10;
    state.persist.shits = [];
    state.persist.wisps = [];
    state.persist.tears = {};
    state.persist.wispsCounter = 0;
  }
}
