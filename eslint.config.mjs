import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Intentional: the source site renders plain <img> tags. Using next/image
      // would change rendered pixels / introduce layout shift and break the
      // pixel-parity requirement of this migration, so plain <img> is kept.
      "@next/next/no-img-element": "off",
      // The Inter/Manrope Google Font <link> tags live in the root layout <head>
      // (the App Router equivalent of _document) to reproduce the source site's
      // fonts exactly. This rule targets the pages-router _document and misfires
      // here, so it is disabled.
      "@next/next/no-page-custom-font": "off",
      // Experimental React-hooks (React Compiler) rule that false-positives on a
      // ref read inside an event handler (CourseModules step navigation). The
      // pattern is correct and preserved verbatim from the source; the ref is
      // only read on click, never during render.
      "react-hooks/refs": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
