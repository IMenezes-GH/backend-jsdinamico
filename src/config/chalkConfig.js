import chalk from "chalk"

export const cLog = console.log;
export const cInfo = (message) => console.info(chalk.blue(message));
export const cWarn = (message) => console.warn(chalk.bold.yellow(message));
export const cError = (message) => console.error(chalk.bold.red(message));
export const cSuccess = (message) => console.info(chalk.green(message));
