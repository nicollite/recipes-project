import { exec } from "shelljs";

export function start() {
  console.log(exec("pm2 start ecosystem.config.js").stdout);
}
