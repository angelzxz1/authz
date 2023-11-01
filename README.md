# Authz

## Introduction

This is a guide on how to install Authz. Keep in mind that Authz is not a library, is just a set of steps to set up you own session manager.

Right now is on baby steps and the Idea is to updated it and make it bertter ans safer.

I started with Next 13 using app router, however, with time I want to use the pages router, as well make it available for Vite, astro and React as well. However since nothing is installed you can use this as a beggining point

## Guide

### What will be used?

I'll be using the following tools:

-   [Next 13 with app router.](https://nextjs.org/docs/getting-started/installation)
-   [Typescript](https://www.typescriptlang.org/docs/)
-   [Prisma](https://www.prisma.io/docs/guides)
-   [Zod](https://zod.dev/)
-   [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
-   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
-   [axios](https://axios-http.com/docs/intro)
-   [React Hook Form](https://react-hook-form.com/get-started)

For styling I'll be using:

-   [Tailwind](https://tailwindcss.com/docs/installation)
-   [Shadcn/ui](https://ui.shadcn.com/docs/installation/next)

The case of Shadcn/ui it's special since this is not package, but uses [Radix ui](https://www.radix-ui.com/themes/docs/overview/getting-started), [Class Variance Authority](https://cva.style/docs/getting-started/installation), [clsx](https://github.com/lukeed/clsx) and [Lucide React](https://lucide.dev/guide/packages/lucide-react).

Keep in mind that for styling you can choose to use other options, I use shadcn/ui for practicity.

### Set up

In this project I'll be using [Bun](https://bun.sh/docs) to speedup some process. The first part can be found directly in the [Shadcn/ui](https://ui.shadcn.com/docs/installation/next) documentation, but I add it here for simplicity.

Create your project:

```console
bunx --bun create-next-app@latest my-app --typescript --tailwind --eslint
```

Remember to change the project name from my-app you the name of your project.

Just hit enter untill it's done the set up.

Run the shadcn-ui init command to setup your project:

```
bunx --bun shadcn-ui@latest init
```

You'll be asked this, just select the answers I put:

```
Would you like to use TypeScript (recommended)? yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › app/globals.css
Do you want to use CSS variables for colors? › yes
Where is your tailwind.config.js located? › tailwind.config.ts
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › yes
```

Now it's set up. also you can use dark mode, just follow [this guide](https://ui.shadcn.com/docs/dark-mode/next).

Now install prisma:

```
bun install prisma --save-dev
```

and set up Prisma with the init command of the Prisma CLI:

```
bunx prisma init
```

This by default will create prisma folder with the schema.prisma file wiht this:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
