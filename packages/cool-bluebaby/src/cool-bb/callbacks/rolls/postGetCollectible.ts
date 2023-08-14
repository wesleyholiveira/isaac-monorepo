import { CollectibleType, ItemPoolType, ModCallback } from "isaac-typescript-definitions";
import { CoolBBState } from "../../states/cool-bb.state";
import { PlayerTypeCustom } from "../../../@shared/enums/PlayerTypeCustom";

export function postGetCollectible(mod: Mod): void {
    mod.AddCallback(ModCallback.POST_GET_COLLECTIBLE, getCollectible);
}

function getCollectible(collectibleType: CollectibleType, itemPoolType: ItemPoolType, decrease: boolean, seed: Seed) {
    const player = Isaac.GetPlayer();

    if (
        player.GetPlayerType() === PlayerTypeCustom.COOL_BB &&
        !player.HasCollectible(CollectibleType.DIRTY_MIND)
    ) {
        CoolBBState.persist.removedDirtyMind = true;
        return CollectibleType.DIRTY_MIND;
    }
    return collectibleType;
}