import * as esbuild from "esbuild";
import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

await esbuild.build({
  entryPoints: ["./api/index.ts"],
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

console.log("✅ Vercel function built successfully!");
