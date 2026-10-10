# GCP Worker Setup — EngagePilot

## 1. Requirements

- Node.js 22
- npm
- PM2
- Neon PostgreSQL
- Redis connection for BullMQ

## 2. Install PM2

```
npm install -g pm2
```

## 3. Install Dependencies

Navigate to the project directory and install the dependencies:

```
cd /root/EngagePilot
npm ci
npx prisma generate
```

## 4. Environment Variables

Configure the required environment variables in the `.env` file, including:

- `DATABASE_URL`
- Redis/BullMQ connection settings
- Required API credentials

Never commit secrets or credentials to GitHub.

## 5. PM2 Worker Configuration

Create a file named `worker.config.cjs` in the project root:

```
module.exports = {
  apps: [
    {
      name: "EngagePilot-Worker",
      script: "node_modules/tsx/dist/cli.mjs",
      args: "worker/dm-worker.ts",
      cwd: "/root/EngagePilot",
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
```

## 6. Start the Worker

Run the following commands:

```
pm2 start worker.config.cjs
pm2 save
pm2 status
```

## 7. View and Clear Logs

View the worker logs:

```
pm2 logs EngagePilot-Worker --lines 30
```

Clear existing PM2 logs:

```
pm2 flush
```

## 8. Restart the Worker

```
pm2 restart EngagePilot-Worker
```

## 9. Stop the Worker

```
pm2 stop EngagePilot-Worker
```

## 10. Important Notes

- PM2 keeps the worker running continuously and automatically restarts it if it crashes.
- All imported source files and the generated Prisma Client must be available on the server.
- The worker must use the same Redis connection and queue configuration as the Vercel application.
- Do not run database migration commands blindly on the worker server. Apply migrations through your established deployment process.
- Never share your `.env` file or expose API keys, database URLs, Redis credentials, or other secrets publicly.
- Ensure PM2 is configured to start automatically after a server reboot if persistent operation is required.