module.exports = {
  apps: [
    {
      name: "EngagePilot-Worker",
      script: "node_modules/tsx/dist/cli.mjs",
      args: "worker/dm-worker.ts",
      cwd: __dirname,
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};