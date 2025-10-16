import * as esbuild from "esbuild";
import {
  readFileSync,
  renameSync,
  existsSync,
  unlinkSync,
  copyFileSync,
} from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

// Keep a backup of the source file in git-ignored location
const tsSource = "./api/index.ts";
const tsBackup = "./api/index.ts.original";

// Create a backup before building (for local development)
if (existsSync(tsSource) && !existsSync(tsBackup)) {
  copyFileSync(tsSource, tsBackup);
  console.log("📦 Created backup of source file");
}

await esbuild.build({
  entryPoints: [tsSource],
  bundle: true,
  outfile: "./api/index.js",
  platform: "node",
  target: "node22",
  format: "esm",
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

// In CI/Vercel environment, remove the TypeScript source so only the bundle is used
if (process.env.CI || process.env.VERCEL) {
  if (existsSync(tsSource)) {
    unlinkSync(tsSource);
    console.log("🗑️  Removed source TypeScript file (CI/Vercel environment)");
  }
}

console.log("✅ Vercel function built successfully!");
