import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.minerva.afoqt",
  appName: "MINERVA",
  webDir: "../frontend/out",
  server: {
    androidScheme: "https",
  },
  android: {
    backgroundColor: "#111827",
  },
};

export default config;
