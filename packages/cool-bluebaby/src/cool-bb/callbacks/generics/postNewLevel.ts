import { LevelStage, ModCallback, StageID } from "isaac-typescript-definitions";
import { CoolBBState } from "../../states/cool-bb.state";

export function postNewLevel(mod: Mod): void {
    let currentStage = 0;
    mod.AddCallback(ModCallback.POST_NEW_LEVEL, () => {
        const stage = Game().GetLevel().GetStage();

        if (stage !== LevelStage.BASEMENT_1 && stage > currentStage) {
            currentStage = stage;
            CoolBBState.persist.MAX_DIPS += 10;
        }
    });
}