import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import alias from "@rollup/plugin-alias";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    alias({
      entries: [
        {
          find: "@ui",
          replacement: path.resolve(__dirname, "./src/components/ui"),
        },
        {
          find: "@utils",
          replacement: path.resolve(__dirname, "./src/utils"),
        },
        {
          find: "@Blast",
          replacement: path.resolve(__dirname, "./src/components/Blast"),
        },
        {
          find: "@Ariadne",
          replacement: path.resolve(__dirname, "./src/components/Ariadne"),
        },
      ],
    }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MyLib",
      formats: ["es", "umd"],
      fileName: (format) => `nitro-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
    },
  },
});
