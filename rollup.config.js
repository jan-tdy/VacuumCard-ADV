import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/vacuum-card-adv.ts",
  output: {
    file: "vacuum-card-adv.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [resolve(), typescript(), terser()],
};
