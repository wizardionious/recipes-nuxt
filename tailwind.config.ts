// tailwind.config.ts
import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  theme: {
    extend: {
      keyframes: {
        "progress-indeterminate": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        "progress-indeterminate": "progress-indeterminate 1.2s linear infinite",
      },
    },
  },
};
