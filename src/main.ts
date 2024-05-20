if ("NODE_ENV_DEV_SOURCE_MAP_SUPPORT" in process.env) {
  const sourceMapSupport =
    require("source-map-support") as typeof import("source-map-support");
  sourceMapSupport.install({
    handleUncaughtExceptions: false,
  });
}

import * as ansi from "ansi-colors";
import cleanStack = require("clean-stack");
import * as dayjs from "dayjs";
import exitHook = require("exit-hook");
import * as inspector from "inspector";
import * as util from "util";

Object.assign(util.inspect.styles, {
  bigint: "magenta",
  boolean: "blue",
  date: "green",
  module: "underline",
  null: "red",
  number: "magenta",
  regexp: "green",
  special: "cyan",
  string: "green",
  symbol: "grey",
  undefined: "red",
} as typeof util.inspect.styles);

Object.assign(util.inspect.defaultOptions, {
  breakLength: Infinity,
  colors: true,
  compact: false,
  depth:
    "NODE_ENV_DEV_DEPTH" in process.env
      ? Number(process.env.NODE_ENV_DEV_DEPTH)
      : 4,
  getters: false,
  maxArrayLength: Infinity,
  maxStringLength: Infinity,
  showHidden: false,
  showProxy: false,
  sorted: true,
} as typeof util.inspect.defaultOptions);

export function depth(
  depth = Infinity as typeof util.inspect.defaultOptions.depth
) {
  util.inspect.defaultOptions.depth = depth;
}
export function getters(
  getters = true as typeof util.inspect.defaultOptions.getters
) {
  util.inspect.defaultOptions.getters = getters;
}

function toCleanStack(error: Error) {
  if (error?.stack?.length) {
    let stack = cleanStack(error.stack);
    if (stack?.trim().length) {
      Object.assign(error, { stack });
    }
  }
  return error;
}
process.on("uncaughtException", (error: Error, origin: string) => {
  console.error(
    `${ansi.red.bold("[UNCAUGHT EXCEPTION]")}\n%O`,
    toCleanStack(error)
  );
});
process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
  console.error(
    `${ansi.red.bold("[UNHANDLED REJECTION]")}\n%O`,
    toCleanStack(reason)
  );
});

if (inspector.url()) {
  // inspector.waitForDebugger()
  let timeout = setInterval(Function, 1 << 30);
  exitHook(() => clearTimeout(timeout));
  exitHook(() => inspector.close());
}
if (process.env.NODE_ENV == "development") {
  let now = dayjs().format("hh:mm:ss A");
  console.log(
    `\n${ansi.dim("████  ")}${ansi.cyan.bold(now)}${ansi.dim("  ████")}\n`
  );
}
if (inspector.url()) {
  inspector.console.clear();
}

declare module "inspector" {
  var console: Console;
}
