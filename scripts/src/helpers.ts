import { Command } from "commander";
import { cp, exec, ls } from "shelljs";

/** Command arguments string array */
export type Arguments = string[];

/** Options key-value object */
export type Options = { [key: string]: any };

/** Arguments passed on .action() */
//@ts-ignore
export type ActionArguments = [...Arguments, Command];

/** Function to execute in wrapAction() */
export type ActionOptionFn = (args?: Arguments, options?: Options) => Promise<void> | void;

/** Function to execute in wrapJustOptions() */
export type OptionFn = (options?: Options) => Promise<void> | void;

// Helper functions to use with commander

/**
 * Wrap the .action() arguments to a function that recives the arguments and options of the command
 * @param fn The host function to be executed that receives the arguments and options
 */
export function wrapAction(fn: ActionOptionFn) {
  return (...actionArgs: ActionArguments) => {
    const command = actionArgs.pop() as Command;
    const args = actionArgs.concat() as string[];
    const options = command.opts();
    fn(args, options);
  };
}

/**
 * Set just the options object in the host function
 * @param fn The host function to be executed that receives the options
 */
export function wrapJustOptions(fn: OptionFn) {
  return wrapAction((args: Arguments, options: Options) => fn(options));
}

// General Helper functions

/**
 * Remove a directory in the working directory
 * @param dirName The directory to be removed
 * @return This WorkingDirectory instance
 */
export function rmdir(dirName: string) {
  exec(`rm -rf ${dirName}`);
}

/**
 * Check if a file exists in a given path
 * @param fileName The file name to look if it exists
 * @param path The path to check if the file exists, Default is the current path
 * @returns If a file exists in the given path
 */
export function fileExists(fileName: string, path: string = ""): boolean {
  return ls(path).some(listedFiles => listedFiles === fileName);
}
