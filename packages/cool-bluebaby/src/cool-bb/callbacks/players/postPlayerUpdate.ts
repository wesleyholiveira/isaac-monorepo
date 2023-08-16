import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { PlayerTypeCustom } from "../../../@shared/enums/PlayerTypeCustom";
import { state } from "../../states/cool-bb.state";

export function postPlayerUpdate(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_UPDATE, playerUpdate);
}

function playerUpdate(player: EntityPlayer) {
  const { removedDirtyMind } = state.persist;

  const itemConfig = Isaac.GetItemConfig().GetCollectible(
    CollectibleType.DIRTY_MIND,
  );
  if (player.GetPlayerType() === PlayerTypeCustom.COOL_BB) {
    if (removedDirtyMind && itemConfig !== undefined) {
      player.RemoveCostume(itemConfig);
      state.persist.removedDirtyMind = false;
    }

    const redHearts = player.GetHearts();
    if (redHearts > 0) {
      const removeRedHearts = -1 * redHearts;
      player.AddMaxHearts(removeRedHearts, true);
      player.AddSoulHearts(redHearts);
    }
  }
}
