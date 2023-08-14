import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { CoolBBState } from "../../states/cool-bb.state";
import { PlayerTypeCustom } from "../../../@shared/enums/PlayerTypeCustom";

export function postPlayerUpdate(mod: Mod): void {
    mod.AddCallback(ModCallback.POST_PLAYER_UPDATE, playerUpdate);
}

function playerUpdate(player: EntityPlayer) {
    const { removedDirtyMind } = CoolBBState.persist;

    const itemConfig = Isaac.GetItemConfig().GetCollectible(CollectibleType.DIRTY_MIND);
    if (
        player.GetPlayerType() === PlayerTypeCustom.COOL_BB
    ) {
        if (removedDirtyMind && itemConfig !== undefined) {
            player.RemoveCostume(itemConfig);
            CoolBBState.persist.removedDirtyMind = false;
        }

        const redHearts = player.GetHearts();
        if (redHearts > 0) {
            const removeRedHearts = -1 * redHearts;
            player.AddHearts(removeRedHearts);
            player.AddMaxHearts(removeRedHearts, true);
            player.AddSoulHearts(redHearts);
        }
    }
}