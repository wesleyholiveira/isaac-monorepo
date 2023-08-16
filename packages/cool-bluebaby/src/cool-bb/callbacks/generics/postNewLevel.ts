import { LevelStage, ModCallback } from "isaac-typescript-definitions";
import { state } from "../../states/cool-bb.state";

export function postNewLevel(mod: Mod): void {
  let currentStage: LevelStage = LevelStage.BASEMENT_1;
  mod.AddCallback(ModCallback.POST_NEW_LEVEL, () => {
    const stage = Game().GetLevel().GetStage();

    if (stage > currentStage) {
      currentStage = stage;
      state.persist.MAX_DIPS += 10;
    }
  });
}
