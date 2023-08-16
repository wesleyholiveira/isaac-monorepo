import { SaveDataManager } from "isaacscript-common/dist/src/classes/features/other/SaveDataManager";
import * as callbacks from "./cool-bb/callbacks";
import { state } from "./cool-bb/states/cool-bb.state";

const MOD_NAME = "cool-bluebaby";

main();

function main() {
  const mod = RegisterMod(MOD_NAME, 1);
  const saveManager = new SaveDataManager();

  saveManager.saveDataManager("coolBBState", state);
  Object.values(callbacks).forEach((callback) => callback(mod));
}
