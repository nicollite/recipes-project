import { program } from "commander";
import { cd } from "shelljs";
import { install } from "source-map-support";
import { config } from "./config";
import { wrapAction, wrapJustOptions } from "./helpers";

// Actions
import { build, buildModules } from "./scripts/build-modules";
import { selfBuild } from "./scripts/self-build";
import { start } from "./scripts/run";

// Use source map support
install();

program.version("1.0.0");

program.command("self-build").description("build the scripts").action(selfBuild);

// Build all modules
program
  .command("build-modules")
  .option("-c, --copy <path>", "copy the built package to the destination")
  .description("build all the modules in modules folder")
  .action(wrapJustOptions(buildModules));

// Build a specific module
program
  .command("build <module>")
  .description("build a the specific module")
  .action(wrapAction(([module]) => build(module)));

// Start the stack
program
  .command("start")
  .description("start the stack with pm2 and the exosystem file")
  .action(start);

/**
 * Run the cli program with commander in async
 */
export async function runCliProgram(): Promise<void> {
  try {
    // Change the current direct to the root directory
    cd(config.rootDir);
    await program.parseAsync(process.argv);
  } catch (err) {
    console.error("Error at runtime");
    console.error(err);
  }
}
