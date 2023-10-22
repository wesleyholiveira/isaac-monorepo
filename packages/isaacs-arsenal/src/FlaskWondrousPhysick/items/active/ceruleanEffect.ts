import { EffectResult } from "@shared/types";
import {
  EntityType,
  HeartSubType,
  PickupVariant,
} from "isaac-typescript-definitions";
import { VectorZero, getRandomInt } from "isaacscript-common";

export function ceruleanEffect(player: EntityPlayer): EffectResult {
  const chance = getRandomInt(1, 100, undefined);

  let soulHeart = HeartSubType.SOUL;
  if (chance <= 50) {
    soulHeart = HeartSubType.HALF_SOUL;
  }

  Isaac.Spawn(
    EntityType.PICKUP,
    PickupVariant.HEART,
    soulHeart,
    player.Position.add(Vector(0, 20)),
    VectorZero,
    undefined,
  );

  return {
    charge: 0,
  };
}
