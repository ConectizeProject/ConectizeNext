# ConectizeNext

A Next.js project offering a robust platform for task management and team collaboration.

## Production Environment

- Production URL: [https://app.conectize.com.br/](https://app.conectize.com.br/)
- Vercel Deploy: [https://vercel.com/](https://vercel.com/)

## Getting Started

To run the development server:

```bash
npm run dev
```

The server will start at [http://localhost:3000](http://localhost:3000)

## Features

- Secure user management and authentication with [Supabase](https://supabase.io/docs/guides/auth)
- Powerful data access & management tooling on top of PostgreSQL with [Supabase](https://supabase.io/docs/guides/database)
- Integration with [Stripe Checkout](https://stripe.com/docs/payments/checkout) and the [Stripe customer portal](https://stripe.com/docs/billing/subscriptions/customer-portal)
- Automatic syncing of pricing plans and subscription statuses via [Stripe webhooks](https://stripe.com/docs/webhooks)

## Technologies Used

- Next.js
- TypeScript
- Supabase
- Stripe
- Tailwind CSS
- Shadcn UI
- Zustand
- Dnd Kit

## Local Development with Supabase

Use a local Supabase instance for development and testing. We have provided a set of custom commands for this in `package.json`.

### Prerequisites

1. Install [Docker](https://www.docker.com/get-started/)
2. Install [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started):

```bash
# macOS
brew install supabase/tap/supabase

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
curl -fsSL https://raw.githubusercontent.com/supabase/cli/main/install.sh | bash
```

3. Copy or rename the environment files:

- `.env.local.example` -> `.env.local`
- `.env.example` -> `.env`

### Starting Local Development

Initialize a new Supabase project:

```bash
npm run supabase:start
```

The terminal output will provide you with URLs to access the different services within the Supabase stack. The Supabase Studio is where you can make changes to your local database instance.

Copy the value for the `service_role_key` and paste it as the value for the `SUPABASE_SERVICE_ROLE_KEY`, `API URL` paste `NEXT_PUBLIC_SUPABASE_URL`, `service_role key` on `SUPABASE_SERVICE_ROLE_KEY` in your `.env.local` file.

You can print out these URLs at any time with the following command:

```bash
npm run supabase:status
```

To link your local Supabase instance to your project, run the following command, navigate to the Supabase project you created above, and enter your database password.

```bash
npm run supabase:link
```

If you need to reset your database password, head over to [your database settings](https://supabase.com/dashboard/project/_/settings/database) and click "Reset database password", and this time copy it across to a password manager! 😄

🚧 Warning: This links our Local Development instance to the project we are using for `production`. Currently, it only has test records, but once it has customer data, we recommend using [Branching](https://supabase.com/docs/guides/platform/branching) or manually creating a separate `preview` or `staging` environment, to ensure your customer's data is not used locally, and schema changes/migrations can be thoroughly tested before shipping to `production`.

Once you've linked your project, you can pull down any schema changes you made in your remote database with:

```bash
npm run supabase:pull
```

You can seed your local database with any data you added in your remote database with:

```bash
npm run supabase:generate-seed
npm run supabase:reset
```

🚧 Warning: this is seeding data from the `production` database. Currently, this only contains test data, but we recommend using [Branching](https://supabase.com/docs/guides/platform/branching) or manually setting up a `preview` or `staging` environment once this contains real customer data.

You can make changes to the database schema in your local Supabase Studio and run the following command to generate TypeScript types to match your schema:

```bash
npm run supabase:generate-types
```

You can also automatically generate a migration file with all the changes you've made to your local database schema with the following command:

```bash
npm run supabase:generate-migration
```

And push those changes to your remote database with:

```bash
npm run supabase:push
```

Remember to test your changes thoroughly in your `local` and `staging` or `preview` environments before deploying them to `production`!
