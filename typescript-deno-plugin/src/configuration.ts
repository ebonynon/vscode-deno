import merge from "deepmerge";
import equal from "deep-equal";

export type DenoPluginConfig = {
  enable: boolean;
  import_map: string;
  unstable: boolean;
};

type UpdateDenoPluginConfig = {
  enable?: boolean;
  import_map?: string;
  unstable?: boolean;
};

export class ConfigurationManager {
  private static readonly defaultConfiguration: DenoPluginConfig = {
    enable: false,
    import_map: "",
    unstable: false,
  };

  private readonly _configUpdatedListeners = new Set<() => void>();

  public get config(): DenoPluginConfig {
    return this._configuration;
  }

  private _configuration: DenoPluginConfig =
    ConfigurationManager.defaultConfiguration;

  public update(c: UpdateDenoPluginConfig) {
    const oldConfig = JSON.parse(JSON.stringify(this.config));
    this._configuration = merge(this.config, c);

    if (!equal(oldConfig, this.config)) {
      for (const listener of this._configUpdatedListeners) {
        listener();
      }
    }
  }

  public onUpdatedConfig(listener: () => void) {
    this._configUpdatedListeners.add(listener);
  }
}
