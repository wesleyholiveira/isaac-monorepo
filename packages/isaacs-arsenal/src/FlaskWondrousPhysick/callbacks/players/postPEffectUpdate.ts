import { PlayerEffects } from "@fowp/items/player.effects";
import { FOWPState } from "@fowp/states/fowpState";
import { CollectibleTypeCustom } from "@shared/enums/CollectibleTypeCustom";
import { Rarity } from "@shared/enums/Rarity";
import {
  CollectibleType,
  EntityType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  VectorZero,
  getRandomArrayElement,
  itemConfig,
} from "isaacscript-common";

export function postEffectUpdate(mod: Mod): void {
  const trinkets = Object.entries(PlayerEffects).filter(
    ([_, trinket]) => trinket.rarity === Rarity.GRANTED,
  );

  const defaultCharge =
    itemConfig.GetCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK)
      ?.MaxCharges ?? 4;

  mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, (player: EntityPlayer) => {
    const frame = Game().GetFrameCount();

    const { frameCount } = FOWPState.persistent;

    if (frame > frameCount) {
      FOWPState.persistent.stopped = false;
      FOWPState.persistent.frameCount = frame;
    }

    if (
      player.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK)
    ) {
      const { playerID, statsPlayer } = FOWPState.persistent;
      const stats = statsPlayer[playerID];

      if (stats !== undefined) {
        const { droppedItems } = stats;

        if (droppedItems.length < 1) {
          const [randomItem] = getRandomArrayElement(trinkets, undefined);
          const id = parseInt(randomItem, 10);
          Isaac.Spawn(
            EntityType.PICKUP,
            PickupVariant.TRINKET,
            id,
            Vector(player.Position.X, player.Position.Y + 20),
            VectorZero,
            undefined,
          );

          droppedItems.push({
            id,
            rarity: Rarity.GRANTED,
          });
        }
      }
    }

    const soulBloodCharge = player.GetSoulCharge() + player.GetBloodCharge();
    const batterySoulChargeBloodCharge =
      player.GetActiveCharge() + player.GetBatteryCharge() + soulBloodCharge;
    if (
      player.HasCollectible(
        CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
      )
    ) {
      if (batterySoulChargeBloodCharge >= defaultCharge) {
        player.RemoveCollectible(
          CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
        );

        player.AddCollectible(
          CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
          soulBloodCharge >= defaultCharge
            ? 0
            : batterySoulChargeBloodCharge - soulBloodCharge,
        );
      }
    }

    if (
      player.HasCollectible(CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK) &&
      !player.HasCollectible(CollectibleType.SCHOOLBAG)
    ) {
      if (batterySoulChargeBloodCharge < defaultCharge) {
        player.RemoveCollectible(
          CollectibleTypeCustom.FLASK_OF_WONDROUS_PHYSICK,
        );
        player.AddCollectible(
          CollectibleTypeCustom.EMPTY_FLASK_OF_WONDROUS_PHYSICK,
          0,
        );
      }
    }
  });
}
