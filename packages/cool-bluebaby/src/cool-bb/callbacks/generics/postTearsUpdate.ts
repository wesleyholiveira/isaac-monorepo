import { FamiliarVariant, ModCallback, TearFlag, TearVariant } from "isaac-typescript-definitions";
import { CoolBBState } from "../../states/cool-bb.state";
import { getRandomInt } from "isaacscript-common";

const POOPS_WISPS: Record<string, {color: Color, flag: TearFlag}> = {
    "245.0.0": {
        color: Color(0.43, .329, 0.212),
        flag: TearFlag.ECOLI
    },
    "245.1.0": {
        color: Color(0.961, 0.776, 0.024),
        flag: TearFlag.MIDAS,
    },
    "245.11.0": {
        color: Color(0.62, 0.62, 0.62),
        flag: TearFlag.ROCK,
    },
    "245.12.0": {
        color: Color(0.11, 0.635, 0.941),
        flag: TearFlag.MULLIGAN,
    },
    "245.13.0": {
        color: Color(0.941, 0.192, 0.11),
        flag: TearFlag.BURN,
    },
    "245.14.0": {
        color: Color(0, 0.788, 0.145),
        flag: TearFlag.POISON,
    },
    "245.15.0": {
        color: Color(0.09, 0.09, 0.09),
        flag: TearFlag.GISH,
    },
    "245.16.0": {
        color: Color(0.878, 0.878, 0.878),
        flag: TearFlag.GLOW
    },
    "14.4": {
        color: Color(1, 0, 0.667),
        flag: TearFlag.HP_DROP
    }
} as const;

export function postTearsUpdate(mod: Mod): void {
    mod.AddCallback(ModCallback.POST_TEAR_INIT, (tear: EntityTear) => {
        CoolBBState.persist.tears[tear.InitSeed] = false;
        const chance = getRandomInt(0, 100);
        if (chance !== 0 && chance >= 85) {
            CoolBBState.persist.tears[tear.InitSeed] = true;
        }
    })
    mod.AddCallback(ModCallback.POST_TEAR_UPDATE, tearUpdate);
}

function tearUpdate(tear: EntityTear) {
    const parent = tear.Parent;
    const familiar = parent?.ToFamiliar();

    if (
        (parent !== undefined && familiar !== undefined) && 
        familiar.Variant === FamiliarVariant.WISP &&
        familiar.SubType === 733
    ) {
        const { wisps } = CoolBBState.persist;
        const shitID = wisps[familiar.InitSeed];

        tear.ChangeVariant(TearVariant.BALLOON);
        if (shitID !== undefined) {
            const { tears } = CoolBBState.persist;
            const poopWisps = POOPS_WISPS[shitID];
            if (poopWisps !== undefined && tears[tear.InitSeed]) {
                tear.AddTearFlags(poopWisps.flag);
                tear.SetColor(poopWisps.color, 0, 99);
            }
        }

        if (tear.Variant !== TearVariant.BLUE) {
            tear.ChangeVariant(TearVariant.BLUE);
        }
    }
    return undefined;
}