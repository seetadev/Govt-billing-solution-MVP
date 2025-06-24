/// <reference types="vite/client" />

// ——————————————
// Polyfill crypto.getRandomValues in Vite Dev Mode
// ——————————————
// We pull in Node's WebCrypto via require (so TS doesn't complain
// about missing browser APIs during dev).
const { webcrypto: nodeCrypto } = require('crypto');
if (typeof globalThis.crypto === 'undefined' || !globalThis.crypto.getRandomValues) {
  // @ts-ignore
  globalThis.crypto = nodeCrypto;
}

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    commonjs(),
    VitePWA({ registerType: "autoUpdate" }),
  ],
});
