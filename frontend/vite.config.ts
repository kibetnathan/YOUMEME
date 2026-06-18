import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Silences warnings coming from node_modules (like Bootstrap)
        quietDeps: true,
        // Silences the legacy @import and function warnings in your own files
        silenceDeprecations: [
          "import",
          "global-builtin",
          "color-functions",
          "if-function",
        ],
      },
    },
  },
});
