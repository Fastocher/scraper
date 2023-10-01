import { defineConfig } from "cypress";

import { createUser } from "./app/models/user.server";
import { createAd, clearAds } from "./app/models/ads.server";
import type { AdsCart } from "@prisma/client";

export default defineConfig({
  e2e: {
    setupNodeEvents: (on, config) => {
      const isDev = config.watchForFileChanges;
      const port = process.env.PORT ?? (isDev ? "3000" : "8811");
      const configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `http://localhost:${port}`,
        video: !process.env.CI,
        screenshotOnRunFailure: !process.env.CI,
      };

      // To use this:
      // cy.task('log', whateverYouWantInTheTerminal)
      on("task", {
        log: (message) => {
          console.log(message);

          return null;
        },
      });

      on("task", {
        "db:saveUser": async ({ password, email }) => {
          console.log(password, email);

          return createUser(email, password);
        },
      });

      on("task", {
        "db:createAds": async ({ title, images }: AdsCart) => {
          return createAd({ title, images });
        },
      });

      on("task", {
        "db:clearAds": async () => {
          return clearAds();
        },
      });

      return { ...config, ...configOverrides };
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
