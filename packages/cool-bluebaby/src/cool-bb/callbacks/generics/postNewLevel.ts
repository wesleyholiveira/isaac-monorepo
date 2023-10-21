import { ModCallback } from "isaac-typescript-definitions";
import { state } from "../../states/cool-bb.state";

export function postNewLevel(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_LEVEL, () => {
    const { stageIndex } = state.persist;

    if (stageIndex > 0) {
      state.persist.MAX_DIPS += 7;
    }

    state.persist.stageIndex++;
  });
}
