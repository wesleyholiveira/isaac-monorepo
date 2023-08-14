import { CollectibleType, ItemPoolType, ModCallback } from "isaac-typescript-definitions";
import { CoolBBState } from "../../states/cool-bb.state";
import { PlayerTypeCustom } from "../../../@shared/enums/PlayerTypeCustom";
import { getPlayers } from "isaacscript-common";

export function postGetCollectible(mod: Mod): void {
    mod.AddCallback(ModCallback.POST_GET_COLLECTIBLE, getCollectible);
}

function getCollectible(collectibleType: CollectibleType, itemPoolType: ItemPoolType, decrease: boolean, seed: Seed) {
    const players = getPlayers().filter((p) =>
            p.GetPlayerType() === PlayerTypeCustom.COOL_BB &&
            !p.HasCollectible(CollectibleType.DIRTY_MIND
        )
    );

    if (players.length > 0) {
        CoolBBState.persist.removedDirtyMind = true;
        return CollectibleType.DIRTY_MIND;
    }
    return collectibleType;
}