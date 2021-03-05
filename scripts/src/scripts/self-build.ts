import { cd, exec } from "shelljs";

/** Build this scripts */
export function selfBuild() {
  cd("scripts");
  exec("yarn build");
}
