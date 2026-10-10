# GCP Worker Setup — EngagePilot

## 1. Requirements

- Node.js 22
- npm
- PM2
- Neon PostgreSQL
- Redis connection for BullMQ

## 2. Install PM2

```bash
npm install -g pm2
```

## 3. Install Dependencies

Project directory-te giye:

```bash
cd /root/EngagePilot
npm ci
npx prisma generate
```

## 4. Environment Variables

Worker-er required environment variables `.env` file-e configure korte hobe, including:

- `DATABASE_URL`
- Redis/BullMQ connection settings
- Required API credentials

Secrets GitHub-e commit korbe na.

## 5. PM2 Worker Configuration

Create `worker.config.cjs`:

```javascript
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

## 6. Start Worker

```bash
pm2 start worker.config.cjs
pm2 save
pm2 status
```

## 7. Logs

View worker logs:

```bash
pm2 logs EngagePilot-Worker --lines 30
```

Clear old PM2 logs:

```bash
pm2 flush
```

## 8. Restart Worker

```bash
pm2 restart EngagePilot-Worker
```

## 9. Stop Worker

```bash
pm2 stop EngagePilot-Worker
```

## 10. Important Notes

- Worker continuously run korar jonno PM2 use kora hoy.
- Worker-er imported source files and generated Prisma Client available thakte hobe.
- Redis connection Vercel application-er queue-r sathe same hote hobe.
- Database migration deploy korar jonno worker server-e migration command blindly run korbe na.
- `.env` ebong credentials publicly share korbe na.