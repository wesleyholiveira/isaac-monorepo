export const PlayerTypeCustom = {
  COOL_BB: Isaac.GetPlayerTypeByName("CoolBB"),
  TCBB: Isaac.GetPlayerTypeByName("TaintedCBB", true),
} as const;
