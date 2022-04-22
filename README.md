# GitHub OAuth Demo with NextAuth.js

A simple demo on how to do GitHub OAuth with Next.js and [NextAuth.js](https://next-auth.js.org/).

## Getting Started

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/luckyyang/nextjs-oauth-demo-with-github.git
cd nextjs-oauth-demo-with-github
yarn
```

### 2. Configure your local environment

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Refer to [this blog](https://dev.to/k4u5h4l/using-github-oauth-with-next-js-4e8o) to get github Client ID and Client Secret, then put them to `.env.local`

### 3. Run

```bash
yarn dev
```

## Reference

- [NextAuth.js Docs](https://next-auth.js.org/getting-started/introduction)