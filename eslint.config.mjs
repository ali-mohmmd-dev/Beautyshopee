import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  prettier,
  {
    files: ["src/app/layout.tsx"],
    // This Pages Router rule does not account for the shared App Router layout.
    rules: { "@next/next/no-page-custom-font": "off" },
  },
  globalIgnores([".next/**", ".output/**", ".wrangler/**", "dist/**", "next-env.d.ts"]),
]);
