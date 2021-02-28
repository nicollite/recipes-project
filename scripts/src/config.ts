export interface ScriptConfig {
  /** The project root  */
  rootDir: string;
  /** Module names in `modules/` folder */
  moduleNames: string[];
  /** Packages path */
  packagesPath: string;
  /** Modules path */
  modulesPath: string;
}

export const config: ScriptConfig = require("../config.json");
// Set root dir path
config.rootDir = __dirname.split("/").slice(0, -2).join("/");
config.packagesPath = `${config.rootDir}/${config.packagesPath}`;
config.modulesPath = `${config.rootDir}/${config.modulesPath}`;
