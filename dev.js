#!/usr/bin/env node
/**
 * Entry for tooling that runs `node dev` instead of `npm run dev`.
 */
const { spawnSync } = require("child_process");

const result = spawnSync("npm", ["run", "dev"], {
    stdio: "inherit",
    cwd: __dirname,
    shell: true,
    env: process.env,
});

process.exit(result.status ?? 1);
