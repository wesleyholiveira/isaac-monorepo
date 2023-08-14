import { getEntityID } from "isaacscript-common";
import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import { CoolBBState } from "../../states/cool-bb.state";

export function postWispsInit(mod: Mod): void {
    mod.AddCallback(ModCallback.POST_FAMILIAR_INIT, (familiar: EntityFamiliar) => {
        const { shits, wisps, wispsCounter } = CoolBBState.persist;

        if (familiar.SubType === 733 && shits !== undefined) {
            wisps[familiar.InitSeed] = shits[wispsCounter] ?? getEntityID(familiar);
            CoolBBState.persist.wispsCounter++;
        }
    }, FamiliarVariant.WISP);
}