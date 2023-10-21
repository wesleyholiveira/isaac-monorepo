import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import { getPlayers } from "isaacscript-common";
import { PlayerTypeCustom } from "../../../@shared/enums/PlayerTypeCustom";
import { state } from "../../states/cool-bb.state";

export function postDipsInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_FAMILIAR_INIT, dipInit, FamiliarVariant.DIP);
}

function dipInit(familiar: EntityFamiliar) {
  const players = getPlayers().filter(
    (p) => p.GetPlayerType() === PlayerTypeCustom.COOL_BB,
  );

  if (players.length > 0) {
    const { dips, MAX_DIPS } = state.persist;

    let i = 0;
    for (const dip of dips) {
      if (dip.IsDead()) {
        dip.Remove();
        dips.splice(i, 1);
      }

      i++;
    }

    if (dips.length >= MAX_DIPS) {
      let d = 0;
      const dipsToBeRemoved = Math.abs(dips.length - MAX_DIPS);
      for (const dip of dips.slice(0, dipsToBeRemoved + 1)) {
        dip.Remove();
        dips.splice(d, 1);
        d++;
      }

      familiar.Remove();
    } else {
      Isaac.ConsoleOutput(
        `Quantidade de dips ${state.persist.dips.length + 1} / ${MAX_DIPS}, ${
          familiar.SubType
        }\n`,
      );
      dips.push(familiar);
    }
  }
}
