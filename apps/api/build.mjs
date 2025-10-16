import * as esbuild from "esbuild";
import { readFileSync, renameSync, existsSync } from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

// Rename the source file temporarily during build
const tsSource = "./api/index.ts";
const tsBackup = "./api/index.ts.backup";

if (existsSync(tsSource)) {
  renameSync(tsSource, tsBackup);
  console.log("📦 Backed up source file for build");
}

await esbuild.build({
  entryPoints: [tsBackup],
  bundle: true,
  outfile: "./api/index.js",
  platform: "node",
  target: "node22",
  format: "esm",
  loader: {
    ".backup": "ts",
  },
  external: [
    // Don't bundle Node.js built-ins
    "node:*",
  ],
  banner: {
    js: `// @repo/api v${packageJson.version}`,
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  minify: false,
  sourcemap: true,
  logLevel: "info",
});

console.log("✅ Vercel function built successfully!");
