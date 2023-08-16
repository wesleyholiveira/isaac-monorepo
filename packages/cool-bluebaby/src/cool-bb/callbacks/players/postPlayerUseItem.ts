import {
  CollectibleType,
  EntityType,
  FamiliarVariant,
  GridEntityType,
  ModCallback,
  PoopEntityVariant,
  PoopGridEntityVariant,
  UseFlag,
} from "isaac-typescript-definitions";
import {
  VectorZero,
  getEntityID,
  getGridEntityID,
  getRandomArrayElement,
  getRandomInt,
} from "isaacscript-common";
import { CollectibleTypeCustom } from "../../../@shared/enums/CollectibleTypeCustom";
import { PlayerTypeCustom } from "../../../@shared/enums/PlayerTypeCustom";
import { state } from "../../states/cool-bb.state";

enum Poop {
  NORMAL = 10,
  ROCK = 11,
  CORNY = 12,
  FLAMING = 13,
  STINKY = 14,
  GIS = 15,
  HOLY = 16,
  GOLDEN = 1,
  RAINBOW = 0,
}

const POOPS = {
  NORMAL: [PoopEntityVariant.NORMAL, PoopEntityVariant.CORNY],
  RARE: [
    Poop.ROCK,
    Poop.FLAMING,
    Poop.STINKY,
    Poop.GIS,
    Poop.HOLY,
    Poop.GOLDEN,
    PoopGridEntityVariant.RAINBOW,
  ],
} as const;

export function postUseItem(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_USE_ITEM, useItem);
}

function useItem(
  collectibleType: CollectibleType,
  rng: RNG,
  player: EntityPlayer,
  useFlags: BitFlags<UseFlag>,
  activeSlot: int,
  customVarData: int,
) {
  let spawnedEntity: any;
  if (collectibleType === CollectibleTypeCustom.LUCKY_POOP) {
    const { dips } = state.persist;
    const bonusLuck = (100 * player.Luck) / 15;
    const chance = getRandomInt(0, 100);
    let randomPoop: number =
      chance === 0 ? 0 : getRandomArrayElement(POOPS.NORMAL);

    Isaac.ConsoleOutput(`Poop chance: ${chance}, ${bonusLuck}\n`);
    if (bonusLuck + chance >= 80) {
      randomPoop = getRandomArrayElement(POOPS.RARE);

      if (player.GetPlayerType() === PlayerTypeCustom.COOL_BB) {
        const normalDips = dips.filter(
          (d) =>
            d.Variant === FamiliarVariant.DIP &&
            (d.SubType === 0 || d.SubType === 2),
        );
        normalDips.slice(0, 3).forEach((d) => d.Remove());
      }
    }

    spawnedEntity =
      randomPoop === 4
        ? Isaac.GridSpawn(
            GridEntityType.POOP,
            PoopGridEntityVariant.RAINBOW,
            player.Position,
          )
        : Isaac.Spawn(
            EntityType.POOP,
            randomPoop,
            0,
            player.Position,
            VectorZero,
            player,
          );

    if (spawnedEntity !== undefined) {
      const ID =
        "Variant" in spawnedEntity
          ? getEntityID(spawnedEntity)
          : getGridEntityID(spawnedEntity);
      state.persist.shits?.push(ID);
    }
  }
  return undefined;
}
