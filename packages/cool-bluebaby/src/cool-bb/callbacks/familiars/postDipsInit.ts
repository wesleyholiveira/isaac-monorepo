import { FamiliarVariant, ModCallback } from "isaac-typescript-definitions";
import { CoolBBState } from "../../states/cool-bb.state";
import { PlayerTypeCustom } from "../../../@shared/enums/PlayerTypeCustom";
import { getPlayerFamiliars, getPlayers } from "isaacscript-common";

export function postDipsInit(mod: Mod): void {
    mod.AddCallback(ModCallback.POST_FAMILIAR_INIT, dipInit, FamiliarVariant.DIP);
    
}

function dipInit(familiar: EntityFamiliar) {
    const players = getPlayers().filter((p) => p.GetPlayerType() === PlayerTypeCustom.COOL_BB);

    if (players.length > 0) {
        const { dips, MAX_DIPS } = CoolBBState.persist;
        
        Isaac.ConsoleOutput(`Quantidade de dips ${CoolBBState.persist.dips.length} / ${MAX_DIPS}\n`);
        let i = 0;
    
        for (const dip of dips) {
            if (dip.IsDead()) {
                dip.Remove();
                dips.splice(i, 1);
            }
    
            i++;
        }
    
        dips.push(familiar);
        
        const exceededDips = dips.slice(MAX_DIPS);
        exceededDips.forEach((e) => e.Remove());
        
        dips.splice(MAX_DIPS);
    }
}