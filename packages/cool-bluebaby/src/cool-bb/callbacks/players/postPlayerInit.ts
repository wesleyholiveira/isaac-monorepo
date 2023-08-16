import {
  CacheFlag,
  CollectibleType,
  ModCallback,
} from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../../../@shared/enums/CollectibleTypeCustom";
import { PlayerTypeCustom } from "../../../@shared/enums/PlayerTypeCustom";

export function postPlayerInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, playerInit);
}

function playerInit(player: EntityPlayer) {
  if (player.GetPlayerType() === PlayerTypeCustom.COOL_BB) {
    const itemPool = Game().GetItemPool();
    const luckyPoopItem = Isaac.GetItemConfig().GetCollectible(
      CollectibleTypeCustom.LUCKY_POOP,
    );
    const dirtyMindItem = Isaac.GetItemConfig().GetCollectible(
      CollectibleType.DIRTY_MIND,
    );

    player.AddCollectible(
      CollectibleTypeCustom.LUCKY_POOP,
      luckyPoopItem?.MaxCharges ?? 2,
    );
    player.AddCollectible(CollectibleType.DIRTY_MIND);

    player.AddCacheFlags(CacheFlag.SHOT_SPEED);
    player.AddCacheFlags(CacheFlag.SPEED);
    player.AddCacheFlags(CacheFlag.FIRE_DELAY);

    player.ShotSpeed -= 0.25;
    player.MoveSpeed -= 0.25;
    player.MaxFireDelay++;

    itemPool.RemoveCollectible(CollectibleType.DIRTY_MIND);
    if (dirtyMindItem !== undefined) {
      player.RemoveCostume(dirtyMindItem);
    }
  }
}
