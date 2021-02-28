import { program } from "commander";
import { cd } from "shelljs";
import { install } from "source-map-support";
import { config } from "./config";
import { wrapAction } from "./helpers";
import { build, buildModules } from "./scripts/build-modules";

// Use source map support
install();

program.version("1.0.0");

// Build all modules
program
  .command("build-modules")
  .description("build all the modules in modules folder")
  .action(() => buildModules(config.moduleNames));

// Build a specific module
program
  .command("build <module>")
  .description("build a the specific module")
  .action(wrapAction(([module]) => build(module)));

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
