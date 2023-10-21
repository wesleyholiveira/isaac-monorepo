import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import { getEntityID } from "isaacscript-common";
import { CollectibleTypeCustom } from "../../../@shared/enums/CollectibleTypeCustom";
import { state } from "../../states/cool-bb.state";

export function postWispsInit(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_FAMILIAR_INIT,
    (familiar: EntityFamiliar) => {
      const { shits, wisps, wispsCounter } = state.persist;

      if (
        familiar.SubType === CollectibleTypeCustom.LAXATIVE &&
        shits !== undefined
      ) {
        wisps[familiar.InitSeed] = shits[wispsCounter] ?? getEntityID(familiar);
        state.persist.wispsCounter++;
      }
    },
    FamiliarVariant.WISP,
  );
}
