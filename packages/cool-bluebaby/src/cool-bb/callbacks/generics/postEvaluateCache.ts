import { CacheFlag, ModCallback } from "isaac-typescript-definitions";
import { PlayerTypeCustom } from "../../../@shared/enums/PlayerTypeCustom";

export function postEvaluateCache(mod: Mod): void {
  mod.AddCallback(ModCallback.EVALUATE_CACHE, evaluateCache);
}

function evaluateCache(player: EntityPlayer, cacheFlag: CacheFlag) {
  if (player.GetPlayerType() === PlayerTypeCustom.COOL_BB) {
    switch (cacheFlag) {
      case CacheFlag.SHOT_SPEED: {
        player.ShotSpeed -= 0.25;
        break;
      }

      case CacheFlag.SPEED: {
        player.MoveSpeed -= 0.25;
        break;
      }

      case CacheFlag.FIRE_DELAY: {
        player.MaxFireDelay++;
        break;
      }
    }
  }
}
