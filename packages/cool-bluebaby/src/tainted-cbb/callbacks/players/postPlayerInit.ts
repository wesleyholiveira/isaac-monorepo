import { ModCallback } from "isaac-typescript-definitions";
import { PlayerTypeCustom } from "../../../@shared/enums/PlayerTypeCustom";

export function postPlayerInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, playerInit);
}

function playerInit(player: EntityPlayer) {
  if (player.GetPlayerType() === PlayerTypeCustom.TCBB) {
  }
}
