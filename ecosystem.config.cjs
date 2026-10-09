/* eslint-disable @typescript-eslint/no-require-imports */

require("dotenv").config();

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME || "EngagePilot",
      script: "npm",
      args: "run start",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "EngagePilot-Worker",
      script: "npm",
      args: "run worker",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};