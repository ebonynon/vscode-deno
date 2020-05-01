import * as path from "path";

import {
  readConfigurationFromVscodeSettings,
  DenoPluginConfig,
} from "./vscode_settings";

const TEST_DIR = path.join(__dirname, "..", "__test__");

test("core / vscode_settings", async () => {
  const vscodeDir = path.join(TEST_DIR, "vscode_settings");
  const config = readConfigurationFromVscodeSettings(vscodeDir);

  expect(config).toEqual({
    enable: true,
    import_map: "./import_map.json",
    unstable: true,
  } as DenoPluginConfig);

  expect(readConfigurationFromVscodeSettings("./file/not/exist")).toEqual(
    undefined
  );
});

test("core / vscode_settings if it empty", async () => {
  const vscodeDir = path.join(TEST_DIR, "vscode_settings_1");
  const config = readConfigurationFromVscodeSettings(vscodeDir);

  expect(config).toEqual({
    enable: false,
    import_map: undefined,
    unstable: false,
  } as DenoPluginConfig);
});
